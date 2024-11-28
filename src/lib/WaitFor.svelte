<script lang="ts">
  import { onMount } from 'svelte';
  let showComponent = $state(false);

  type WaitForProps = {
    children: any;
    duration?: number;
  }

  let { children, duration = 1000 }: WaitForProps = $props();
  onMount(() => {
    setTimeout(() => {
      showComponent = true;
    }, duration);
  });
</script>

{#if showComponent}
  {@render children()}
{/if}