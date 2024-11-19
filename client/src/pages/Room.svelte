<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Game from "../components/Game.svelte";
  import { gameState } from "../states/game.svelte";
  import { roomState } from '../states/room.svelte';
  import { socketState, startSocket } from "../states/socket.svelte";

  onMount(startSocket)
  onDestroy(() => socketState.socket?.close())
</script>

<main>
  {#if socketState.connected}
    <p>Room: {roomState.name}</p>
    <p>Users:</p>
    <ul>
      {#each roomState.users as user}
        <li>{user.user_name}</li>
      {/each}
    </ul>
  {:else if socketState.error}
    <p>Error: {socketState.error}</p>
  {:else if socketState.closed}
    <p>Connection closed: {socketState.closed.reason}</p>
  {:else}
    <p>Connecting...</p>
  {/if}
  <button onclick={() => socketState.socket?.send(JSON.stringify({ action: 'start_game' }))}>Start game</button>
  {#if gameState.started}
    <Game />
  {/if}
</main>
