import { useGame } from "../providers/GameProvider";

export default function GamePlays() {
  const { plays } = useGame();
  
  return (
    <div>
      <p>Game plays:</p>
      {plays.map((play, index) => (
        <div key={index}>
          <p>{play.player.name}: {play.pokemon.name}</p>
          <img src={play.pokemon.sprite}></img>
          <p>Type 1: {play.pokemon.type1} {getEmojiByMatchingResult(play.matching_results.type1)}</p>
          <p>Type 2: {play.pokemon.type2} {getEmojiByMatchingResult(play.matching_results.type2)}</p>
          <p>Habitat: {play.pokemon.habitat} {play.matching_results.habitat ? '✅' : '⛔'}</p>
          <p>Color: {play.pokemon.colors} {play.matching_results.colors ? '✅' : '⛔'}</p>
          <p>Evolution Stage: {play.pokemon.evolution_stage} {play.matching_results.evolution_stage ? '✅' : '⛔'}</p>
          <p>Height: {play.pokemon.height} {getEmojiByMatchingResult(play.matching_results.height_comparison)}</p>
          <p>Weight: {play.pokemon.weight} {getEmojiByMatchingResult(play.matching_results.weight_comparison)}</p>
          <p>Winning choice: {play.winning_play ? '✅' : '⛔'}</p>
        </div>
      ))}
    </div>
  );
}

function getEmojiByMatchingResult(result: string) {
  const emojis: {[key: string]: string} = {
    match: '✅',
    partial: '🟡',
    no_match: '⛔',
    taller: '⬆️',
    shorter: '⬇️',
    heavier: '⬆️',
    lighter: '⬇️'
  }
  return emojis[result] || 'Unknow'
}
