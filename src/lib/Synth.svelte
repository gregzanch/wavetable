<script lang="ts">
  import { audioState } from "../state/AudioState.svelte";
  import DetuneControl from "./DetuneControl.svelte";
  import Keyboard from "./Keyboard/Keyboard.svelte";
  import NumberInput from "./NumberInput.svelte";
  import Scope from "./Scope.svelte";
  import TextInput from "./TextInput.svelte";

  audioState.engine.createSynths();

  let keyboardOctave = $state(4);
  const onOctaveChanged = (value: number) => {
    console.log(value);
    keyboardOctave = value;
    audioState.engine.setOctave(value);
  }

  const keydown = (key: string) => audioState.engine.getSynthForKey(key)?.setMute(false);
  const keyup = (key: string) => audioState.engine.getSynthForKey(key)?.setMute(true);


</script>

<div class="synth">
  <Scope id="main-scope" />
  <div class="keyboard-controls">
    <DetuneControl />
    <NumberInput onchange={onOctaveChanged} value={keyboardOctave} min={1} max={7} step={1} label="Octave" />
  </div>
  <Keyboard {keydown} {keyup} />
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
  .keyboard-controls {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-4000);
  }
</style>