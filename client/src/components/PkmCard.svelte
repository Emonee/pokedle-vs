<script lang="ts">
  type Props = {
    pokemon: Pokemon
  }
  const { pokemon }: Props = $props();
</script>

<img src={pokemon.sprite} alt={pokemon.name} class="size-20" height="96" width="96">
