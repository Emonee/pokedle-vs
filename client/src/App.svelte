<script lang="ts">
  import ErrorServer from "./components/ErrorServer.svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import LoadingServer from "./components/LoadingServer.svelte";
  import ServerDown from "./components/ServerDown.svelte";
  import { Page, state } from "./pages/page.svelte";
  import Room from "./pages/Room.svelte";
  import Root from "./pages/Root.svelte";
  import { fetchServerHealth, prefetchImages } from "./services";

  const pages = {
    [Page.ROOT]: Root,
    [Page.ROOM]: Room
  }
  const ActualPage = $derived(pages[state.page] || Root);
  prefetchImages()
</script>

<Header />
<main class="p-4 max-w-[100dvw]">
  {#await fetchServerHealth()}
    <LoadingServer />
  {:then response} 
    {#if response}
      <ActualPage />
    {:else}
      <ServerDown />
    {/if}
  {:catch error}
    <ErrorServer {error} />
  {/await}
</main>
<Footer />
