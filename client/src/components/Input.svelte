<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  const props: HTMLInputAttributes = $props()
</script>

<div class="container">
  <input {...props} placeholder=" ">
  <span>{props.placeholder}</span>
</div>

<style>
  .container {
    position: relative;
    height: fit-content;
    width: fit-content;
  }

  input {
    width: 300px;
    padding:10px;
    font-size: 18px;
  }

  span {
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    left: 10px;
    font-size: 18px;
    color: gray;
    padding: 0px 8px;
    pointer-events: none;
    transition: top 200ms ease-in-out,
                color 200ms ease-in-out,
                translate 200ms ease-in-out,
                font-size 200ms ease-in-out;
  }

  input:focus + span, input:not(:placeholder-shown) + span {
    top: -8px;
    translate: 0 0;
    font-size: 12px;
  }

  input:-internal-autofill-selected {
    background-color: red !important;
  }
</style>