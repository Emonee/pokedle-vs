import { serverUrl } from "../consts/urls";
import { WebSocketProvider } from "../hooks/useWebSocket";
import { GameProvider } from "../providers/GameProvider";
import GamePlays from "./GamePlays";
import PlayerList from "./PlayerList";
import PlayForm from "./PlayForm";
import RoomTitle from "./RoomTitle";
import StartGameBtn from "./StartGameBtn";

export default function Room() {
  const urlSearchParams = new URLSearchParams(location.search)
  const userName = urlSearchParams.get('username')
  const roomName = urlSearchParams.get('room_name')
  const roomId = urlSearchParams.get('room_id')
  return (
    <WebSocketProvider url={`${serverUrl}?user_name=${userName}&room_name=${roomName}&room_id=${roomId}`}>
      <GameProvider>
        <RoomTitle />
        <PlayerList />
        <StartGameBtn />
        <PlayForm />
        <GamePlays />
      </GameProvider>
    </WebSocketProvider>
  );
}
