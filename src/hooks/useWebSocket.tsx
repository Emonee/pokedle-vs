import { createContext, useCallback, useContext, useEffect, useRef, useState, type MutableRefObject, type ReactNode } from 'react';

type WebSocketContextType = {
  isConnected: boolean;
  isLoading: boolean;
  sendMessage: (message: { [key: string]: any }) => void;
  socketRef: MutableRefObject<WebSocket | null> | null;
  roomId: string;
  roomName: string;
  players: any[];
};

const WebSocketContext = createContext<WebSocketContextType>({
  isConnected: false,
  isLoading: true,
  sendMessage: () => {},
  roomId: '',
  roomName: '',
  players: [],
  socketRef: null
});

export const WebSocketProvider = ({ url, children }: { url: string; children: ReactNode }) => {
  console.log('WebSocketProvider');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const socketRef = useRef<WebSocket | null>(null);
  const [roomId, setRoomId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    socketRef.current = new WebSocket(url);
    socketRef.current.onopen = () => {
      setIsConnected(true);
      setIsLoading(false);
      console.log('WebSocket connected');
    };
    socketRef.current.onclose = (e) => {
      setIsLoading(false);
      setIsConnected(false);
      console.log(`WebSocket disconnected: ${e.code} | ${e.reason}`);
    };
    socketRef.current.onerror = (error) => {
      setIsLoading(false);
      console.error('WebSocket error:', error);
    };
    socketRef.current.addEventListener('message', e => {
      const json = JSON.parse(e.data)
      if (json.action === 'start_room') {
        setRoomId(json.data.room_id)
        setRoomName(json.data.room_name)
        setPlayers([json.data.initial_player])
      } else if (json.action === 'room_users') {
        setRoomId(json.data.room_id)
        setRoomName(json.data.room_name)
        setPlayers(json.data.users)
      } else if (json.action === 'user_joined') {
        setPlayers(players => [...players, json.data])
      } else if (json.action === 'user_left') {
        const { user_name: userName, user_tag: userTag } = json.data
        setPlayers(players => players.filter(player => player.user_name !== userName && player.user_tag !== userTag))
      }
    });
    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = useCallback(
    (message: {[key: string]: any}) => {
      if (isConnected) {
        socketRef.current?.send(JSON.stringify(message));
      }
    },
    [isConnected]
  );

  // Provide WebSocket data and functions
  return (
    <WebSocketContext.Provider value={{
      isConnected,
      isLoading,
      sendMessage,
      socketRef,
      roomId,
      roomName,
      players
    }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use WebSocket context
export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
