<script lang="ts">
  import { audioState } from "../state/AudioState.svelte";
  import Button from "./Button.svelte";

  function onmousedown(e: MouseEvent) {
    const target = e.currentTarget as HTMLButtonElement;
    if(!target) return;
    switch(target.id) {
      case "detune-down": audioState.engine.detune("down"); break;
      case "detune-up": audioState.engine.detune("up"); break;
      default: break;
    }
  }
  
  function onmouseup(e: MouseEvent) {
    const target = e.currentTarget as HTMLButtonElement;
    if(!target) return;
    audioState.engine.detune("normal");
  }
</script>


<fieldset>
  <legend>Detune</legend>
  <label for="detune-down" hidden>Detune Down</label>
  <Button id="detune-down" {onmousedown} {onmouseup}>{"<"}</Button>

  <label for="detune-up" hidden>Detune Up</label>
  <Button id="detune-up" {onmousedown} {onmouseup}>{">"}</Button>
</fieldset>


<style>

</style>