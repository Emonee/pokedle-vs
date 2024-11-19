<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Game from "../components/Game.svelte";
  import RoomHeader from "../components/RoomHeader.svelte";
  import { gameState } from "../states/game.svelte";
  import { socketState, startSocket } from "../states/socket.svelte";

  const roomUrl = new URL(window.location.href);
  roomUrl.searchParams.delete('user_name');

  const copyRoomUrlToClipboard = () => {
    navigator.clipboard.writeText(roomUrl.toString())
      .then(() => alert('Copied room url to clipboard'))
      .catch(() => alert('Failed to copy room url to clipboard'));
  }

  onMount(startSocket)
  onDestroy(() => socketState.socket?.close())
</script>

{#if socketState.connected}
  <RoomHeader />
{:else if socketState.error}
  <p>Error: {socketState.error}. <a href={import.meta.env.BASE_URL}>Back to home</a></p>
{:else if socketState.closed}
  <p>Connection closed: {socketState.closed.reason}. <a href={import.meta.env.BASE_URL}>Back to home</a></p>
{:else}
  <p>Connecting to server...</p>
{/if}

{#if gameState.started}
  <Game />
{/if}
