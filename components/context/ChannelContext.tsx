import { createContext, useState } from "react";

interface IChannelContext {
  currentChannel: Record<string, unknown>;
  setCurrentChannel?: (selected: Record<string, unknown>) => void;
}

const defaultCurrentChannel = {
  currentChannel: {},
}

export const CurrentChannelContext = createContext<IChannelContext>(defaultCurrentChannel);


export const ChannelContextContainer = ({ children } : {children: React.ReactNode}) => {
  const [currentChannel, setCurrentChannel] = useState<Record<string, unknown>>({});

  return (
      <CurrentChannelContext.Provider value={{currentChannel, setCurrentChannel}}>
        {children}
      </CurrentChannelContext.Provider>
  )
}