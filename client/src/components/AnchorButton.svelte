<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  const { children, ...attributes }: HTMLAnchorAttributes = $props()
</script>

<a class="p-2 rounded-md hover:bg-slate-300" { ...attributes }>
  {@render children?.()}
</a>
