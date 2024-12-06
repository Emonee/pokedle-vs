<script lang="ts">
  import pokemons from "../assets/pokemons.json";
  import { gameState } from "../states/game.svelte";
  import { sendMessage } from "../states/socket.svelte";
  import Play from "./Play.svelte";

  let selectedPkm = $state('0')

  const pkmList = Object.values(pokemons.pokemons).sort((pkm1, pkm2) => +pkm1.id - +pkm2.id)
  const filteredPkmList = $derived(pkmList.filter(pkm => !gameState.plays.some(play => play.pokemon.name === pkm.name)))

  const onsubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { pokemonNumber } = Object.fromEntries(formData);
    sendMessage({
      action: 'play',
      data: { pokemon_number: +pokemonNumber }
    })
    form.reset();
  }
</script>

<p class="text-center mb-1">Player in turn: {gameState.playerInTurn.user_name}</p>

<form {onsubmit} class="mx-auto flex flex-col gap-2 justify-center items-center mb-10">
  <select name="pokemonNumber" class="px-4 py-2 border-2 border-slate-400 rounded-md" bind:value={selectedPkm} required>
    <option value="0" selected disabled>Choose a pokemon</option>
    {#each filteredPkmList as pokemon (pokemon.id)}
      <option value={pokemon.id}>{pokemon.name}</option>
    {/each}
  </select>
  <button class="bg-purple-400 rounded-md px-4 py-2 hover:bg-purple-600 disabled:bg-slate-500 block mx-auto" disabled={selectedPkm === '0' || !selectedPkm}>I choose you!</button>
</form>
<section class="max-w-full overflow-x-auto">
  {#if gameState.winner}
    <p class="text-center mb-4">Player {gameState.winner} just won!</p>
  {/if}
  <div class="flex flex-col gap-1 w-fit mx-auto">
    <div class="flex items-center gap-2 mb-2">
      <div class="w-20 text-center"></div>
      <div class="w-20 text-center">Type 1</div>
      <div class="w-20 text-center">Type 2</div>
      <div class="w-20 text-center">Habitat</div>
      <div class="w-20 text-center">Main color</div>
      <div class="w-20 text-center">Evolution</div>
      <div class="w-20 text-center">Height</div>
      <div class="w-20 text-center">Weight</div>
    </div>
    {#each gameState.plays.slice().reverse() as play (play.pokemon.name)}
      <Play {play} />
    {/each}
  </div>
</section>
