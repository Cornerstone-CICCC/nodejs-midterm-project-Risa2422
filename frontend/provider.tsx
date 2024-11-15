"use client";
import { createContext, PropsWithChildren, useState } from "react";

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarContextType {
  loggedUserId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loggedUserId, setUserId] = useState<string | null>("0");

  return (
    <SidebarContext.Provider value={{ loggedUserId, setUserId }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default Provider;
export { SidebarContext };
