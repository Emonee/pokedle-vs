<script lang="ts">
  import AnchorButton from "./AnchorButton.svelte";

  const root = import.meta.env.BASE_URL;
  const techs = [
    { name: 'Vite', url: 'https://vitejs.dev', imgSrc: root + 'img/vite_logo.svg' },
    { name: 'Svelte', url: 'https://svelte.dev', imgSrc: root + 'img/svelte_logo.png' },
    { name: 'Tailwind', url: 'https://tailwindcss.com', imgSrc: root + 'img/tailwind_logo.svg', imgWidth: 34 },
  ]
</script>

<footer class="flex justify-around flex-wrap gap-x-10 gap-y-2 p-4 shadow-[0px_-1px_6px_0px_#00000017]">
  <p class="self-center">Made with ❤️ by <a href="https://github.com/emonee" target="_blank" referrerpolicy="no-referrer" class="text-blue-600 hover:text-blue-800">Emone</a></p>
  <div class="flex items-center">
    <p class="mr-1">Powered with:</p>
    {#each techs as tech}
      <AnchorButton href={tech.url} target="_blank" referrerpolicy="no-referrer">
        <img src={tech.imgSrc} alt={tech.name} class="h-5 w-auto" height="20" width={tech.imgWidth ?? 20}>
      </AnchorButton>
    {/each}
  </div>
</footer>
