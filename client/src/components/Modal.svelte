<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLDialogAttributes } from 'svelte/elements';
  import Close from './Icons/Close.svelte';

  type Props = HTMLDialogAttributes & { openDialog: Snippet<[() => void]> };

  let dialog: HTMLDialogElement;
  const { children, openDialog }: Props = $props();

  const onclick = (e: MouseEvent) => {
    const rect = dialog.getBoundingClientRect();
    const outsideDialog = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
    if (outsideDialog) dialog.close();
  }
  const showModal = () => dialog.showModal();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialog} {onclick} class="p-5 rounded-md relative max-w-2xl">
  <form method="dialog" class="absolute top-2 right-2">
    <button class="size-7 hover:bg-slate-200 rounded-md"><Close /></button>
  </form>
  {@render children?.()}
</dialog>
{@render openDialog(showModal)}

<style>
  /*   Open state of the dialog  */
  dialog[open] {
    opacity: 1;
    translate: 0 0;
  }

  /*   Closed state of the dialog   */
  dialog {
    opacity: 0;
    translate: 0 100px;
    transition:
      opacity 300ms ease-out,
      translate 300ms ease-out,
      overlay 300ms ease-out allow-discrete,
      display 300ms ease-out allow-discrete;
    /* Equivalent to
    transition: all 300ms allow-discrete; */
  }

  /*   Before-open state  */
  /* Needs to be after the previous dialog[open] rule to take effect,
      as the specificity is the same */
  @starting-style {
    dialog[open] {
      opacity: 0;
      translate: 0 100px;
    }
  }

  /* Transition the :backdrop when the dialog modal is promoted to the top layer */
  dialog::backdrop {
    background-color: rgb(0 0 0 / 0%);
    transition:
      display 300ms allow-discrete,
      overlay 300ms allow-discrete,
      background-color 300ms;
    /* Equivalent to
    transition: all 300ms allow-discrete; */
  }

  dialog[open]::backdrop {
    background-color: rgba(0, 0, 0, 0.75);
  }

  /* This starting-style rule cannot be nested inside the above selector
  because the nesting selector cannot represent pseudo-elements. */

  @starting-style {
    dialog[open]::backdrop {
      background-color: rgb(0 0 0 / 0%);
    }
  }
</style>