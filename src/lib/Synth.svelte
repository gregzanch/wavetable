<script lang="ts">
  import { audioState } from "../state/AudioState.svelte";
  import Keyboard from "./Keyboard/Keyboard.svelte";
  import Scope from "./Scope.svelte";

  let paused = $state(true);
  Object.assign(window, { audioState });
  audioState.engine.createSynths();


</script>

<div class="synth">
  <Scope id="main-scope" />
  <Keyboard keydown={(key) => {
    console.log(key, "down")
    audioState.engine.getSynthForKey(key)?.setMute(false);
  }} keyup={(key) => {
    audioState.engine.getSynthForKey(key)?.setMute(true);
    console.log(key, "up")
  }} />
</div>

<style>
  .synth {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 48px;
  }
</style>