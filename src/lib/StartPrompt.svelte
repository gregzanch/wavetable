<script lang="ts">
  import { fade } from "svelte/transition";
  import Logo from "./Logo.svelte";
  import Button from "./Button.svelte";
  import { onMount } from "svelte";

  type StartPromptProps = {
    onStart: () => void;
    fadeOutDuration: number;
  };

  let { onStart, fadeOutDuration = 250 }: StartPromptProps = $props();
  let isReady = $state(false);
  onMount(() => isReady=true);
</script>

<div class="vertical-layout"  out:fade={{duration: fadeOutDuration}}>
    <Logo animateIn={true} />
    {#if isReady}
      <div in:fade={{duration: 500, delay: 500}}>
        <Button onclick={onStart}>Start</Button>
      </div>
    {/if}
  </div>

<style>
  .vertical-layout {
    display: flex;
    flex-direction: column;
    text-align: center;
    max-width: 300px;
    justify-content: center;
    align-items: center;
  }
</style>
