<script lang="ts">
  type Props = {
    name: string;
    age: number;
  };
  let { name, age }: Props = $props();
  console.log({name, age});
</script>

<p>{name}: {age}</p>