import { gameState, startGame } from "./game.svelte";
import { roomState } from "./room.svelte";

type Props = {
  socket: WebSocket | null;
  connected: boolean;
  closed: CloseEvent | null;
  error: Event | null;
};

export const socketState: Props = $state({
  socket: null,
  connected: false,
  closed: null,
  error: null
});

export function startSocket() {
  const clientSearchParams = new URLSearchParams(window.location.search);
  const protocol = import.meta.env.PROD ? 'wss://' : 'ws://'
  const socket = new WebSocket(`${protocol}${import.meta.env.VITE_SERVER_URL}/?room_name=${clientSearchParams.get('room_name')}&user_name=${clientSearchParams.get('user_name')}`);
  socket.onopen = () => {
    socketState.socket = socket;
    socketState.connected = true;
  }
  socket.onclose = (e) => {
    socketState.socket = null;
    socketState.connected = false;
    socketState.closed = e;
  }
  socket.onerror = (e) => {
    socketState.socket = null;
    socketState.connected = false;
    socketState.error = e;
  }
  socket.onmessage = (e) => {
    const messageData = JSON.parse(e.data) as MessageData;
    if (messageData.error) return alert(messageData.message);
    if (!messageData.action) return;
    const actionHandler = messageActionHandlers[messageData.action] || uninplementedActionHandler;
    actionHandler(messageData, e);
  }
}

export function sendMessage(messageData: MessageData) {
  socketState.socket?.send(JSON.stringify(messageData));
}

function uninplementedActionHandler(messageData: MessageData, e: MessageEvent) {
  console.warn('Unimplemented action handler', messageData);
}

var messageActionHandlers: { [key: string]: (messageData: MessageData, e: MessageEvent) => void } = {
  room_users: roomUsersActionHandler,
  user_joined: userJoinedActionHandler,
  user_left: userLeftActionHandler,
  start_game: startGameActionHandler,
  play: playActionHandler,
}

function roomUsersActionHandler({ data }: MessageData, e: MessageEvent) {
  roomState.users = data.users;
  roomState.name = data.room_name;
}

function startGameActionHandler(messageData: MessageData, e: MessageEvent) {
  const playerInTurn = messageData.data.player_in_turn;
  startGame({ playerInTurn });
}

function playActionHandler({ data }: MessageData, e: MessageEvent) {
  gameState.plays.push(data);
  gameState.playerInTurn = data.new_player_in_turn;
  if (data.winning_play) gameState.winner = data.player.user_name;
}

function userJoinedActionHandler({ data }: MessageData, e: MessageEvent) {
  roomState.users.push(data);
}

function userLeftActionHandler({ data }: MessageData, e: MessageEvent) {
  roomState.users = roomState.users.filter(user => user.user_name !== data.user_name && user.user_tag !== data.user_tag);
}
