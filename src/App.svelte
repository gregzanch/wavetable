<script lang="ts">
  import logo from "/logo.svg";
  import Synth from "./lib/Synth.svelte";
  import StartPrompt from "./lib/StartPrompt.svelte";
  import Layout from "./lib/Layout.svelte";
  import WaitFor from "./lib/WaitFor.svelte";

  let started = $state(false);
  function onStart() {
    started = !started;
    document.startViewTransition();
  }
  const transitionDuration = 250;
</script>

<main>
  {#if !started}
    <StartPrompt {onStart} fadeOutDuration={transitionDuration} />
  {:else}
  <WaitFor duration={transitionDuration}>
    <Layout>
      <Synth />
    </Layout>
  </WaitFor>
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }
</style>