<script lang="ts">
  import Input from "../components/Input.svelte";
  import { Page, state } from "./page.svelte";

  const url = new URL(window.location.href);
  const roomName = url.searchParams.get('room_name');

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

<section class="flex justify-center items-center h-full">
  <form {onsubmit} class="flex flex-col justify-center gap-4 items-center">
    <Input type="text" name="userName" placeholder="User name" class="border-2 border-slate-400 rounded-md" maxlength={15} required />
    <Input type="text" name="roomName" placeholder="Room name" class="border-2 border-slate-400 rounded-md" maxlength={15} value={roomName} required />
    <button class="bg-green-500 rounded-md p-4 hover:bg-green-600 font-bold transition">Join<span class="bg-inherit mx-1">/</span>Create Room</button>
  </form>
</section>
