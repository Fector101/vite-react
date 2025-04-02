import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

// Define types for your data structures
interface UserData {
  // Define specific fields if available; otherwise, use an index signature
//   [key: string]: any;
}

interface PollData {
  [key: string]: any;
}

interface StudentData {
  [key: string]: any;
}

// Define the shape of the context
interface UserContextType {
  userData: UserData;
  setStudents: Dispatch<SetStateAction<StudentData[]>>;
  PollsData: PollData[];
  StudentsData: StudentData[];
  setPolls: Dispatch<SetStateAction<PollData[]>>;
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
  const [userData, setUser] = useState<UserData>({});
  const [PollsData, setPolls] = useState<PollData[]>([]);
  const [StudentsData, setStudents] = useState<StudentData[]>([]);

  // Function to fetch user data
  const fetchUserData = async (silent = false): Promise<void> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.data);
        console.log("Successfully Fetched profile data...");
        if (!silent) toast.success("Successfully Fetched User Data");
      } else {
        console.log("Bad Request user profile data...");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Function to fetch polls data
  const fetchPollsData = async (silent = false): Promise<void> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/polls`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setPolls(data.data);
        console.log("Successfully Fetched Polls data...");
        if (!silent) toast.success("Successfully Fetched Polls Data");
      } else {
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
      value={{ userData, setStudents, PollsData, StudentsData, setPolls, fetchPollsData, fetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};
