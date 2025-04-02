import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

// Define types for your data structures
// interface UserData {
// Define specific fields if available; otherwise, use an index signature
//   [key: string]: any;
// }
interface PollOption {
    text: string;
    votes: number;
    _id: string;
}

export interface IElection {
    _id: string;
    title: string;
    description: string;
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    options: PollOption[];
    status: "ongoing" | "completed"; // Use union type if there are only specific statuses
}

// voters: string[];  // Array of voter IDs (if applicable)

// interface StudentData {
//     [key: string]: any;
// }
interface IPollsMathData {
    totalVotes: number;
    activePollsCount: number;
    pollWithMostVotes: IElection | null;
}
// Define the shape of the context
interface UserContextType {
    PollsData: IElection[];
    // userData: UserData;
    // setStudents: Dispatch<SetStateAction<StudentData[]>>;
    // StudentsData: StudentData[];
    PollsMathData: IPollsMathData;
    setPolls: Dispatch<SetStateAction<IElection[]>>;
    fetchPollsData: (silent?: boolean) => Promise<void>;
    // fetchUserData: (silent?: boolean) => Promise<void>;
}

// Define the props for the provider
interface UserProviderProps {
    children: ReactNode;
}

// Create User Context with a default value (null)
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
    // const [userData, setUser] = useState<UserData>({});
    const [PollsData, setPolls] = useState<IElection[]>([]);
    // const [StudentsData, setStudents] = useState<StudentData[]>([]);
    const [PollsMathData, setPollsMathData] = useState<IPollsMathData>({ pollWithMostVotes: null, totalVotes: 0, activePollsCount: 0 });

    // Function to fetch user data
    // const fetchUserData = async (silent = false): Promise<void> => {
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
    //             method: "GET",
    //             credentials: "include",
    //             headers: { "Content-Type": "application/json" },
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //             setUser(data.data);
    //             console.log("Successfully Fetched profile data...");
    //             if (!silent) toast.success("Successfully Fetched User Data");
    //         } else {
    //             if (!silent) toast.error(data.msg);
    //             console.log("Bad Request user profile data...");
    //         }
    //     } catch (error) {
    //         console.error("Network error:", error);
    //     }
    // };

    // Function to fetch polls data
    const fetchPollsData = async (silent = false): Promise<void> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/all-elections`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (response.ok) {
                setPolls(data.elections);
                // console.log(data.logic)
                setPollsMathData(data.logic)
                console.log("Successfully Fetched Polls data...");
                if (!silent) toast.success("Successfully Fetched Polls Data");
            } else {
                if (!silent) toast.error(data.msg);
                console.log("Bad Request Polls data...");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    // Fetch user data and polls data on mount
    useEffect(() => {
        // fetchUserData(true);
        fetchPollsData(false);
    }, []);

    return (
        <UserContext.Provider
            value={{
                // userData,
                // fetchUserData
                // setStudents,
                // StudentsData, 
                PollsMathData,
                PollsData,
                setPolls, fetchPollsData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
