<script lang="ts">
  import type { Person } from "../types";
  import Number from "./Number.svelte";

  let people: Person[] = $state([])
  const increment = () => {
    people.push({ name: "John", age: people.length + 1 });
    people[0].age = people.length;
  }
</script>

<button onclick={increment}>
  add number
</button>

{#each people as person}
  <Number name={person.name} age={person.age} />
{/each}
