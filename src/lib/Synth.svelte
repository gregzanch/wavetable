<script lang="ts">
  import { audioState } from "../state/AudioState.svelte";
  let paused = $state(true);
  Object.assign(window, { audioState });
  const synth = audioState.engine.createSynth();
</script>

<button
  onclick={() => {
    paused = !paused;
    synth.setMute(paused);
  }}
>
  {paused ? "play" : "pause"}
</button>
