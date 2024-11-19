<script lang="ts">
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import { Page, state } from "./pages/page.svelte";
  import Room from "./pages/Room.svelte";
  import Root from "./pages/Root.svelte";

  const pages = {
    [Page.ROOT]: Root,
    [Page.ROOM]: Room
  }
  const ActualPage = $derived(pages[state.page] || Root);
</script>

<Header />
<main class="p-4 bg-slate-200">
  <ActualPage />
</main>
<Footer />
