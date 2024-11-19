<script lang="ts">
  import { Page, state } from "./page.svelte";
  const onsubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    const roomName = String(data.roomName);
    const userName = String(data.userName);
    if (!roomName) return;
    const url = new URL(window.location.href);
    url.searchParams.set('room_name', roomName);
    url.searchParams.set('user_name', userName);
    window.history.replaceState({}, '', url.toString());
    state.page = Page.ROOM;
  }
</script>

<main>
  <form {onsubmit}>
    <input type="text" name="userName" required>
    <input type="text" name="roomName" required>
    <button>Join/Create Room</button>
  </form>
</main>
