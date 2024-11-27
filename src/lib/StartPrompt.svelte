<script lang="ts">
  import { fade } from "svelte/transition";
  import Logo from "./Logo.svelte";

  type StartPromptProps = {
    onStart: () => void;
  };

  let { onStart }: StartPromptProps = $props();
</script>

<div class="vertical-layout" out:fade={{duration: 250}}>
  <Logo animateIn={true} />
  <button onclick={onStart}>Start</button>
</div>

<style>
  .vertical-layout {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1em;
  }
</style>
