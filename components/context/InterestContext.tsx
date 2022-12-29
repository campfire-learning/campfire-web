import { createContext, useState } from "react";

interface IInterestContext {
  currentInterest: Record<string, unknown>;
  setCurrentInterest?: (selected: Record<string, unknown>) => void;
}

const defaultCurrentInterest = {
  currentInterest: {},
}

export const CurrentInterestContext = createContext<IInterestContext>(defaultCurrentInterest);


export const InterestContext = ({ children } : {children: React.ReactNode}) => {
  const [currentInterest, setCurrentInterest] = useState<Record<string, unknown>>({});

  return (
      <CurrentInterestContext.Provider value={{currentInterest, setCurrentInterest}}>
        {children}
      </CurrentInterestContext.Provider>
  )
}