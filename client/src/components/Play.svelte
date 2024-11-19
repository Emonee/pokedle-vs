<script lang="ts">
  import PkmCard from "./PkmCard.svelte";
  import PkmComparisonCards from "./PkmComparisonCards.svelte";

  type Props = {
    play: Play
  }
  const { play }: Props = $props();
</script>

<div class="flex items-center gap-2">
  <PkmCard pokemon={play.pokemon} />
  <PkmComparisonCards play={play} />
</div>
