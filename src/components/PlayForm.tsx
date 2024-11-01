import { useState, type ChangeEvent, type FormEvent } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import pokemons from "../pokemons/pokemons.json";

const pkmList = Object.entries(pokemons.pokemons).sort(([id], [id2]) => +id - +id2)

export default function PlayForm() {
  const { sendMessage } = useWebSocket();
  const [selectedPkm, setSelectedPkm] = useState('');
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPkm(e.target.value.split(';')[1]);
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { pokemonData } = Object.fromEntries(formData);
    sendMessage({
      action: 'play',
      data: { pokemon_number: +(String(pokemonData).split(';')[0]) }
    })
  }
  return (
    <form onSubmit={onSubmit}>
      <select name="pokemonData" defaultValue='' onChange={onChange} required>
        <option value="" disabled>Chose your Pokemon!</option>
        {pkmList.map(([, pkm]) => <option key={pkm.id} value={`${pkm.id};${pkm.name}`}>{pkm.name}</option>)}
      </select>
      <button disabled={!selectedPkm}>{selectedPkm ? `${selectedPkm}, I Choose You!` : 'Choose your Pokemon!'}</button>
    </form>
  );
}
