<script lang="ts">
  import logo from "/logo.svg";
  import Synth from "./lib/Synth.svelte";
  import StartPrompt from "./lib/StartPrompt.svelte";
  import Layout from "./lib/Layout.svelte";

  let started = $state(false);
  function onStart() {
    started = !started;
    document.startViewTransition();
  }
</script>

<main>
  {#if !started}
    <StartPrompt {onStart} />
  {:else}
    <Layout>
      <Synth />
    </Layout>
  {/if}
</main>

<style>
  main {
    min-height: 100vh;
  }
</style>