<script lang="ts">
  import logo from "/logo.svg";
  import Synth from "./lib/Synth.svelte";
  import StartPrompt from "./lib/StartPrompt.svelte";
  let started = $state(false);
  function onStart(){
    started = !started;
  }

</script>

<main>
  {#if !started}
    <StartPrompt {onStart} />
  {:else}
    <Synth />
  {/if}
</main>
