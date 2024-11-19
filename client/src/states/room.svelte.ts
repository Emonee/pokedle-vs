import type { User } from "../types";

type RoomState = {
  name: string
  users: User[]
}

export const roomState: RoomState = $state({
  name: '',
  users: []
});
