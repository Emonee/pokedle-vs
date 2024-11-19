import type { Play } from "../types"

type Game = {
  started: boolean
  winner: string | null
  plays: Play[]
}

const initialState: Game = {
  started: false,
  winner: null,
  plays: []
}

export const gameState = $state(initialState);

export function startGame() {
  gameState.started = true;
  gameState.winner = null;
  gameState.plays = [];
}
