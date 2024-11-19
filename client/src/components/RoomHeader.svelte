<script lang="ts">
  import { roomState } from "../states/room.svelte";
  import { socketState } from "../states/socket.svelte";

  const roomUrl = new URL(window.location.href);
  roomUrl.searchParams.delete('user_name');

  const copyRoomUrlToClipboard = () => {
    navigator.clipboard.writeText(roomUrl.toString())
      .then(() => alert('Copied room url to clipboard'))
      .catch(() => alert('Failed to copy room url to clipboard'));
  }
</script>

<header>
  <button onclick={copyRoomUrlToClipboard}>Room{roomState.name}</button>
  <p>Users:</p>
  <ul class="list-disc">
    {#each roomState.users as user}
      <li>{user.user_name}</li>
    {/each}
  </ul>
  <button onclick={() => socketState.socket?.send(JSON.stringify({ action: 'start_game' }))}>Start game</button>
</header>