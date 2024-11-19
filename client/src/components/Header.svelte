<script lang="ts">
  import AnchorText from "./AnchorText.svelte";
  import HeaderAnchor from "./HeaderAnchor.svelte";
  import Info from "./Icons/Info.svelte";
  import Modal from "./Modal.svelte";
</script>

<header class="flex justify-between items-center p-3 shadow relative">
  <HeaderAnchor />
  <Modal>
    {#snippet openDialog(showModal: () => void)}
      <button onclick={showModal} class="hover:bg-slate-300 rounded-md size-8 text-blue-800"><Info /></button>
    {/snippet}
    <h3 class="text-center text-xl mb-4 font-bold">How to play?</h3>
    <ol class="list-decimal list-inside mb-6">
      <li>Create or join a room.</li>
      <li>When all members are ready, click on the "Start game" button.</li>
      <li>Then, all players will take turn to guess a random pokemon.</li>
      <li>The first player to choose the correct pokemon wins the game.</li>
    </ol>
    <h3 class="text-center text-xl mb-4 font-bold">About the project</h3>
    <p class="mb-3">Pokedle VS  is a replica of <AnchorText href="https://pokedle.net/">Pokedle</AnchorText>. Here, you can play alone or with your friends in real time!</p>
    <p class="mb-3">If you want to look at the code, you can find it <AnchorText href="https://github.com/emonee/pokedle-vs">here</AnchorText>.</p>
    <p class="mb-3">Also, if you want to collaborate, dont doubt to contact me on <AnchorText href="https://github.com/emonee">Github</AnchorText>.</p>
  </Modal>
</header>
