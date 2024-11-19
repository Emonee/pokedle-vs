<script lang="ts">
  import pokemons from "../assets/pokemons.json";
  import { gameState } from "../states/game.svelte";
  import { sendMessage } from "../states/socket.svelte";
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

  {#each gameState.plays as play}
    <p>{play.player.user_name} played {play.pokemon.name}</p>
  {/each}
</form>