import { createContext, useState } from "react";

interface IClubContext {
  currentClub: Record<string, unknown>;
  setCurrentClub?: (selected: Record<string, unknown>) => void;
}

const defaultCurrentClub = {
  currentClub: {},
}

export const CurrentClubContext = createContext<IClubContext>(defaultCurrentClub);


export const ClubContextContainer = ({ children } : {children: React.ReactNode}) => {
  const [currentClub, setCurrentClub] = useState<Record<string, unknown>>({});

  return (
      <CurrentClubContext.Provider value={{currentClub, setCurrentClub}}>
        {children}
      </CurrentClubContext.Provider>
  )
}