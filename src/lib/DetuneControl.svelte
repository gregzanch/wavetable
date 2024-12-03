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


<fieldset aria-label="detune-label">
  <div id="detune-label" class="detune-label">Detune</div>
  <div class="left">
    <label for="detune-down" hidden>Detune Down</label>
    <Button id="detune-down" {onmousedown} {onmouseup} bg="var(--mono-lighter)" fg="var(--mono-darker)" border="var(--mono-light)">{"<"}</Button>
  </div>
<div class="right">
  <label for="detune-up" hidden>Detune Up</label>
  <Button id="detune-up" {onmousedown} {onmouseup} bg="var(--mono-lighter)" fg="var(--mono-darker)" border="var(--mono-light)">{">"}</Button>
</div>
</fieldset>


<style>
  fieldset {
    /* reset user agent styles */
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-block-start: 0em;
    padding-inline-start: 0em;
    padding-inline-end: 0em;
    padding-block-end: 0em;
    min-inline-size: min-content;
    border-width: 0px;
    border-style: none;
    border-color: none;
    border-image: initial;
    /* implement our grid */
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: var(--spacing-100);
    grid-row-gap: 0px;
    grid-auto-flow: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    justify-items: center;
  }

  div.detune-label {
    color: var(--mono-darkest);
    grid-area: 1 / 2 / 2 / 3;
  }

  div.left {
    grid-area: 1 / 1 / 2 / 2;
  }

  div.right {
    grid-area: 1 / 3 / 2 / 4;
  }

</style>