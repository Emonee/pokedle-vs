<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  const { children, classes, ...attributes }: HTMLAnchorAttributes & { classes?: string } = $props()
</script>

<a target="_blank" referrerpolicy="no-referrer" {...attributes} class={`text-blue-600 hover:text-blue-800 ${classes}`}>
  {@render children?.()}
</a>