import { useWebSocket } from "../hooks/useWebSocket";

export default function RoomTitle() {
  const { roomId, roomName } = useWebSocket();
  return (
    <>
      <p>Room: {roomName}</p>
      <p>Room id: {roomId}</p>
    </>
  );
}
