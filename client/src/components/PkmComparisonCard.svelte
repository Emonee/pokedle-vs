<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';

  type Props = SvelteHTMLElements['div'] & {
    state: MatchingResults['type1']
  }

  const { children, state }: Props = $props();
  const bgColorClass = {
    'match': 'bg-green-500',
    'no_match': 'bg-red-500',
    'partial': 'bg-yellow-500'
  }[state];
</script>

<div class={`${bgColorClass} size-20 flex items-center justify-center rounded-md shadow`}>
  {@render children?.()}
</div>