<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';

  type Props = SvelteHTMLElements['div'] & {
    state: MatchingResults['type1'],
    animationDelay?: number
  }

  const { children, state, animationDelay = 0 }: Props = $props();
  const bgColorClass = {
    'match': 'bg-green-500',
    'no_match': 'bg-red-500',
    'partial': 'bg-yellow-500'
  }[state];
</script>

<div class="size-20 flex items-center justify-center rounded-md shadow card" style={`--animation-delay: ${animationDelay}s;`}>
  <div class="card-back rounded-md"></div>
  <div class={`card-front rounded-md ${bgColorClass}`}><p class="text-md bg-inherit">{@render children?.()}</p></div>
</div>

<style>
.card {
  position: relative;
  transform-style: preserve-3d;
  animation: flip 0.6s ease-out forwards; /* Start animation immediately */
  animation-delay: var(--animation-delay, 0s);
}
.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-front {
  transform: rotateY(180deg);
}
.card-back {
  background-color: #727272;
}
@keyframes flip {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(180deg);
  }
}
</style>
