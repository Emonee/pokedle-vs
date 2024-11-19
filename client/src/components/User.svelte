<script lang="ts">
  type Props = {
    user: User
  }
  const { user }: Props = $props();
</script>

<p class="text-md bg-inherit px-2 py-1 border-[green] border-2 rounded-md w-fit flex justify-center items-center gap-2 before:animate-pulse">{user.user_name}</p>

<style>
  p::before {
    content: '';
    display: inline-block;
    height: 8px;
    width: 8px;
    background-color: green;
    border-radius: 50%;
    vertical-align: middle;
  }
</style>