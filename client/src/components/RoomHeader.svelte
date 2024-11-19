<script lang="ts">
  import { gameState } from "../states/game.svelte";
  import { roomState } from "../states/room.svelte";
  import { socketState } from "../states/socket.svelte";
  import User from "./User.svelte";

  const roomUrl = new URL(window.location.href);
  roomUrl.searchParams.delete('user_name');
  const startButtonText = $derived(!gameState.started ? 'Start game' : gameState.winner ? 'Go for another round!' : 'Restart Game');

  const copyRoomUrlToClipboard = () => {
    navigator.clipboard.writeText(roomUrl.toString())
      .then(() => alert('Copied room url to clipboard'))
      .catch(() => alert('Failed to copy room url to clipboard'));
  }
</script>

<header class="mb-7">
  <button onclick={copyRoomUrlToClipboard} class="block bg-blue-400 rounded-md px-4 py-2 mx-auto hover:bg-blue-600 mb-7">Room: {roomState.name}</button>
  <div class="flex flex-wrap gap-2 mb-5 justify-center max-w-2xl mx-auto">
    {#each roomState.users as user}
      <User user={user} />
    {/each}
  </div>
  <button onclick={() => socketState.socket?.send(JSON.stringify({ action: 'start_game' }))} class="bg-green-400 rounded-md px-4 py-2 hover:bg-green-600 mb-7 block mx-auto">{startButtonText}</button>
</header>