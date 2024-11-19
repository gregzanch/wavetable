<script lang="ts">
  import logo from "/logo.svg";
  import Synth from "./lib/Synth.svelte";
</script>

<main>
  <img src={logo} alt="" class="logo" />
  <Synth />
</main>

<style>
  .logo {
    height: 8em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 1em rgba(0, 0, 0, 40%))
  }
</style>
