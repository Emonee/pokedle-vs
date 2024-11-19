<script lang="ts">
  import pokemons from "../assets/pokemons.json";
  import { gameState } from "../states/game.svelte";
  import { sendMessage } from "../states/socket.svelte";
  import Play from "./Play.svelte";

  let selectedPkm = '0'

  const pkmList = Object.values(pokemons.pokemons).sort((pkm1, pkm2) => +pkm1.id - +pkm2.id)

  const onsubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { pokemonNumber } = Object.fromEntries(formData);
    sendMessage({
      action: 'play',
      data: { pokemon_number: +pokemonNumber }
    })
  }
</script>

<form {onsubmit} class="mx-auto flex flex-col gap-2 justify-center items-center mb-7">
  <select name="pokemonNumber" class="px-4 py-2 border-2 border-slate-400 rounded-md" bind:value={selectedPkm} required>
    <option value="0" selected disabled>Choose a pokemon</option>
    {#each pkmList as pokemon}
      <option value={pokemon.id}>{pokemon.name}</option>
    {/each}
  </select>
  {#if selectedPkm && selectedPkm !== '0'}
    <button class="bg-purple-400 rounded-md px-4 py-2 hover:bg-purple-600 block mx-auto">I choose you!</button>
  {/if}
</form>
<section class="max-w-full overflow-x-auto">
  <div class="flex flex-col gap-1 w-fit mx-auto">
    {#each gameState.plays.slice().reverse() as play (play.pokemon.name)}
      <Play {play} />
    {/each}
  </div>
</section>
