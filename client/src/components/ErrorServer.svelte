<script lang="ts">
  type Props = { error: Error };
  const { error }: Props = $props();
</script>

<section class="h-full flex justify-center items-center">
  <div class="rounded-md p-5 bg-rose-900 text-white">
    <p class="text-xl bg-inherit">An error occured, please try again later.</p>
    <p class="text-sm bg-inherit text-white/65">{error.message}</p>
  </div>
</section>
