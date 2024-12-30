"use client";

import { AccountProps, ChildProps, ContextType } from "@/.next/types";
import React, { createContext, useContext, useState } from "react";

export const Context = createContext<ContextType | null>(null);

export const GlobalContext = ({ children }: ChildProps) => {
  const [account, setAccount] = useState<AccountProps | null>(null);
  return (
    <div>
      <Context.Provider value={{ account, setAccount }}>
        {children}
      </Context.Provider>
    </div>
  );
};

const useGlobalContext = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useGlobalContext must be used within a GlobalContext");
  }
  return context;
};

export default useGlobalContext;
