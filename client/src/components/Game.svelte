<script lang="ts">
  import pokemons from "../assets/pokemons.json";
  import { gameState } from "../states/game.svelte";
  import { sendMessage } from "../states/socket.svelte";
  import Play from "./Play.svelte";

  const pkmList = Object.entries(pokemons.pokemons).sort(([id], [id2]) => +id - +id2) 

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

<form {onsubmit}>
  <select name="pokemonNumber" required>
    <option value="0" selected disabled>Choose a pokemon</option>
    {#each pkmList as pokemon}
      <option value={pokemon[1].id}>{pokemon[1].name}</option>
    {/each}
  </select>
  <button>I chooose you!</button>
</form>
<section class="max-w-full overflow-x-auto">
  <div class="flex flex-col gap-1 w-fit mx-auto">
    {#each gameState.plays.slice().reverse() as play (play.pokemon.name)}
      <Play {play} />
    {/each}
  </div>
</section>
