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

<PkmComparisonCard animationDelay={0} state={play.matching_results.type1}>
  {play.pokemon.type1}
</PkmComparisonCard>

<PkmComparisonCard animationDelay={0.5} state={play.matching_results.type2}>
  {play.pokemon.type2}
</PkmComparisonCard>

<PkmComparisonCard animationDelay={1} state={play.matching_results.habitat ? 'match' : 'no_match'}>
  {play.pokemon.habitat}
</PkmComparisonCard>

<PkmComparisonCard animationDelay={1.5} state={play.matching_results.colors ? 'match' : 'no_match'}>
  {play.pokemon.colors}
</PkmComparisonCard>

<PkmComparisonCard animationDelay={2} state={play.matching_results.evolution_stage ? 'match' : 'no_match'}>
  {play.pokemon.evolution_stage}
</PkmComparisonCard>

<PkmComparisonCard animationDelay={2.5} state={measureToStatus(play.matching_results.height_comparison)}>
  {play.pokemon.height} m
</PkmComparisonCard>

<PkmComparisonCard animationDelay={3} state={measureToStatus(play.matching_results.weight_comparison)}>
  {play.pokemon.weight} kg
</PkmComparisonCard>