import { useWebSocket } from "../hooks/useWebSocket";
import { useGame } from "../providers/GameProvider";

export default function StartGameBtn() {
  const { sendMessage } = useWebSocket();
  const { setPlays } = useGame();
  const onClick = () => {
    sendMessage({ action: 'start_game' });
    setPlays([]);
  }
  return (
    <button onClick={onClick}>Start game</button>
  );
}