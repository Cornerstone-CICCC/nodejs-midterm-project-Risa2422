"use client";
import { createContext, PropsWithChildren, useState } from "react";

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextType {
  loggedUserId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loggedUserId, setUserId] = useState<string | null>("0");

  return (
    <UserContext.Provider value={{ loggedUserId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
export { UserContext };
