type Game = {
  started: boolean
  winner: string | null
  playerInTurn: { user_name: string, user_tag: string }
  plays: Play[]
}

const initialState: Game = {
  started: false,
  winner: null,
  plays: [],
  playerInTurn: { user_name: '', user_tag: '' }
}

export const gameState = $state(initialState);

export function startGame({ playerInTurn }: { playerInTurn: Game['playerInTurn'] }) {
  gameState.started = true;
  gameState.winner = null;
  gameState.plays = [];
  gameState.playerInTurn = playerInTurn;
}
