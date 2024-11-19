<script lang="ts">
  import Info from "./Icons/Info.svelte";
  import InfoModal from "./Modal.svelte";
</script>

<header class="flex justify-between items-center p-3 shadow relative">
  <a href={import.meta.env.BASE_URL}>Pokedle VS</a>
  <InfoModal>
    {#snippet openDialog(showModal: () => void)}
      <button onclick={showModal} class="hover:bg-slate-300 rounded-md size-8 text-blue-800"><Info /></button>
    {/snippet}
    <p>Pokedle VS  is a replica of <a href="https://pokedle.net/" target="_blank" referrerpolicy="no-referrer">Pokedle</a> but with a virtual opponent.</p>
    <p>You can play alone or with your friends. Just create a room and let the fun begin.</p>
    <p>If you want to look at the code, you can find it <a href="https://github.com/emonee/pokedle-vs" target="_blank" referrerpolicy="no-referrer">here</a>.</p>
    <p>Also, if you want to collaborate, dont doubt to contact me on <a href="https://github.com/emonee" target="_blank" referrerpolicy="no-referrer">Github</a>.</p>
  </InfoModal>
</header>
