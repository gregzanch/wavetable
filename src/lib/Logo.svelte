<script lang="ts">
  import { draw } from 'svelte/transition';
  import { onMount } from "svelte";
  import { quintInOut } from 'svelte/easing';

  type LogoProps = {
    animateIn?: boolean;
    width?: number;
    height?: number;
  };

  let { animateIn = false, width = 300, height = 300 }: LogoProps = $props();
  let ready = $state(false);
  onMount(() => ready = true);

</script>

<svg {width} {height} viewBox="0 0 512 512">
  {#if ready}
    <path
      in:draw={{ easing: quintInOut }}
      class="logo-path"
      d="M64 256L231.125 144.583C241.758 137.495 256 145.117 256 157.896V354.104C256 366.883 270.242 374.505 280.875 367.417L448 256"
      fill="none"
      stroke-width="32"
      stroke-linecap="round"
    />
  {/if}
</svg>

<style>
  .logo-path {
    stroke: var(--mono-darkest);
  }
</style>
