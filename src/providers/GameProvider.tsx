import { createContext, useContext, useEffect, useState, type Dispatch } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

type GameContextType = {
  plays: any[]
  setPlays: Dispatch<React.SetStateAction<any[]>>
};

const GameContext = createContext<GameContextType>({
  plays: [],
  setPlays: () => {}
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [plays, setPlays] = useState<any[]>([]);
  const { socketRef, isConnected } = useWebSocket();
  useEffect(() => {
    if (!isConnected) return;
    socketRef?.current?.addEventListener('message', e => {
      const json = JSON.parse(e.data)
      if (json.action === 'play') {
        setPlays(plays => [json.data, ...plays])
      }
    });
  }, [isConnected]);
  return <GameContext.Provider value={{ plays, setPlays }}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  return useContext(GameContext);
};
