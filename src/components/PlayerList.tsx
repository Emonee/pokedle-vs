import { useWebSocket } from "../hooks/useWebSocket";

export default function PlayerList() {
  const { players } = useWebSocket();
  return (
    <div>
      <p>Player list:</p>
      <ul>
        {players.map((player) => <li key={`${player.user_name}-${player.user_tag}`}>{player.user_name}#{player.user_tag}</li>)}
      </ul>
    </div>
  );
}