<script lang="ts">
  import { onMount } from "svelte";
  import { registerHotKey } from "../../utils/hotkeys";
  import Keyboard from "./Keyboard.svelte";


  type KeyKind = "light" | "dark";
  
  type KeyProps = {
    label: string;
    kind: KeyKind;
    keybinding: string;
    keydown?: (event: KeyboardEvent) => void;
    keypress?: (event: KeyboardEvent) => void;
    keyup?: (event: KeyboardEvent) => void;
    contextMatcher: (event: KeyboardEvent) => boolean;
  }

  let { label = "A", kind = "light", keybinding = label.toLowerCase(), keydown, keypress, keyup, contextMatcher = () => true }: KeyProps = $props();

  let pressed = $state(false);

  function keydownWrapper(e: KeyboardEvent) {
    if(keydown) keydown(e);
    pressed = true;
    document.getElementById(e.key.toLowerCase())?.focus();
  }

  function keyupWrapper(e: KeyboardEvent) {
    if(keyup) keyup(e);
    pressed = false;
  }

  onMount(() => {
    const unbindFunctions = [
      keydown && registerHotKey(keybinding, "keydown", keydownWrapper, contextMatcher),
      keypress && registerHotKey(keybinding, "keypress", keypress, contextMatcher),
      keyup && registerHotKey(keybinding, "keyup", keyupWrapper, contextMatcher),
    ];
    return () => unbindFunctions.forEach(fn => fn && fn());
  })

</script>

<button id={keybinding} class={["key", kind, pressed ? "down" : ""].join(" ")}>
  {label}
</button>

<style>
  .key {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    font-size: 24px;
  }

  .key.dark {
    background-color: var(--color-mono-darkest);
    border: 1px solid var(--color-mono-dark);
    color: var(--color-mono-lighter);
  }

  .key.dark:active, .key.dark.down {
    background-color: var(--color-mono-darkest-down);
  }

  .key.light {
    background-color: var(--color-mono-lighter);
    border: 1px solid var(--color-mono-dark);
    color: var(--color-mono-darkest);
  }

  .key.light:active, .key.light.down {
    background-color: var(--color-mono-lighter-down);
  }

</style>