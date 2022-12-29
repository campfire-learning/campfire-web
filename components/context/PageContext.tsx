import { createContext, useState } from "react";

interface ISelectedChannelLevel {
  selectedChannelLevel: Record<string, unknown>;
  setSelectedChannelLevel?: (selected: Record<string, unknown>) => void;
}

const defaultSelectedChannelLevel = {
  selectedChannelLevel: {},
}

const SelectedChannelLevel = createContext<ISelectedChannelLevel>(defaultSelectedChannelLevel);

interface ISelectedGroupLevel {
  selectedGroupLevel: Record<string, unknown>;
  setSelectedGroupLevel?: (selected: Record<string, unknown>) => void;
}

const defaultSelectedGroupLevel = {
  selectedGroupLevel: {},
}

const SelectedGroupLevel = createContext<ISelectedGroupLevel>(defaultSelectedGroupLevel);


export {SelectedChannelLevel, SelectedGroupLevel}

export const PageContextContainer = ({ children } : {children: React.ReactNode}) => {
  const [selectedChannelLevel, setSelectedChannelLevel] = useState<Record<string, unknown>>({});
  const [selectedGroupLevel, setSelectedGroupLevel] = useState<Record<string, unknown>>({});

  return (
    <SelectedChannelLevel.Provider value={{selectedChannelLevel, setSelectedChannelLevel}}>
      <SelectedGroupLevel.Provider value={{selectedGroupLevel, setSelectedGroupLevel}}>
        {children}
      </SelectedGroupLevel.Provider>
    </SelectedChannelLevel.Provider>
  )
}