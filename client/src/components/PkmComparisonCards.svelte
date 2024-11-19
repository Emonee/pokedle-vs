<script lang="ts">
    import PkmComparisonCard from "./PkmComparisonCard.svelte";

  type Props = {
    play: Play
  }
  const { play }: Props = $props();

  function measureToStatus (measure: MatchingResults['height_comparison'] | MatchingResults['weight_comparison']) {
    const fomatter: {[key: string]: MatchingResults['type1']} = {
      taller: 'no_match',
      lighter: 'no_match',
      shorter: 'no_match',
      heavier: 'no_match',
      match: 'match'
    }
    return fomatter[measure] ?? 'no_match'
  }
</script>

<PkmComparisonCard state={play.matching_results.type1}>
  <p class="text-md bg-inherit">{play.pokemon.type1}</p>
</PkmComparisonCard>

<PkmComparisonCard state={play.matching_results.type2}>
  <p class="text-md bg-inherit">{play.pokemon.type2}</p>
</PkmComparisonCard>

<PkmComparisonCard state={play.matching_results.habitat ? 'match' : 'no_match'}>
  <p class="text-sm bg-inherit">{play.pokemon.habitat}</p>
</PkmComparisonCard>

<PkmComparisonCard state={play.matching_results.colors ? 'match' : 'no_match'}>
  <p class="text-md bg-inherit">{play.pokemon.colors}</p>
</PkmComparisonCard>

<PkmComparisonCard state={play.matching_results.evolution_stage ? 'match' : 'no_match'}>
  <p class="text-md bg-inherit">{play.pokemon.evolution_stage}</p>
</PkmComparisonCard>

<PkmComparisonCard state={measureToStatus(play.matching_results.height_comparison)}>
  <p class="text-md bg-inherit">{play.pokemon.height}</p>
</PkmComparisonCard>

<PkmComparisonCard state={measureToStatus(play.matching_results.weight_comparison)}>
  <p class="text-md bg-inherit">{play.pokemon.weight}</p>
</PkmComparisonCard>