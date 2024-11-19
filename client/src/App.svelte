<script lang="ts">
  import { Page, state } from "./pages/page.svelte";
  import Room from "./pages/Room.svelte";
  import Root from "./pages/Root.svelte";

  const pages = {
    [Page.ROOT]: Root,
    [Page.ROOM]: Room
  }

  const ActualPage = $derived(pages[state.page] || Root);
</script>

<main>
  <ActualPage />
</main>
