import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Role } from "./helper";


interface IUserData {
    role: Role;
    username: string
}
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


interface IPollsMathData {
    totalVotes: number;
    activePollsCount: number;
    pollWithMostVotes: IElection | null;
}

// Define the shape of the context
interface UserContextType {
    PollsData: IElection[];
    userData: IUserData;
    setUserData: Dispatch<SetStateAction<IUserData>>;
    PollsMathData: IPollsMathData;
    setPolls: Dispatch<SetStateAction<IElection[]>>;
    fetchPollsData: (silent?: boolean) => Promise<void>;
    fetchUserData: (silent?: boolean) => Promise<void>;
}

// Define the props for the provider
interface UserProviderProps {
    children: ReactNode;
}

// Create User Context with a default value (null)
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
    const [PollsData, setPolls] = useState<IElection[]>([]);
    const [PollsMathData, setPollsMathData] = useState<IPollsMathData>({ pollWithMostVotes: null, totalVotes: 0, activePollsCount: 0 });
    const [userData, setUserData] = useState<IUserData>({ role: null, username: '' });

    async function fetchUserData(silent = false): Promise<void> {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/authn/me`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            const data: IUserData & { msg: string } = await response.json();
            if (response.ok) {
                setUserData({ username: data.username, role: data.role })
                console.log("Successfully User  data...");
                if (!silent) toast.success(data.msg);
            } else {
                if (!silent) toast.error(data.msg);
                console.log("Bad Request User data...");
            }
        } catch (error) {
            console.error("fetchUserData error:", error);
        }
    };

    const fetchPollsData = async (silent = false): Promise<void> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/all-elections`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            const data: { elections: IElection[]; logic: IPollsMathData; msg: string } = await response.json();
            if (response.ok) {
                setPolls(data.elections);
                setPollsMathData(data.logic)
                console.log("Successfully Fetched Polls data...");
                if (!silent) toast.success(data.msg);
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
        fetchUserData(true);
        fetchPollsData(true);
    }, []);

    return (
        <UserContext.Provider
            value={{
                userData,
                PollsData,
                PollsMathData,
                setUserData,
                fetchUserData,
                setPolls,
                fetchPollsData
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
