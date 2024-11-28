<script lang="ts">
  import { onMount } from "svelte";
  import { registerHotKey } from "../../utils/hotkeys";


  type KeyKind = "light" | "dark";
  
  type KeyProps = {
    label: string;
    kind: KeyKind;
    keybinding: string;
    keydown?: (event: KeyboardEvent) => void;
    keypress?: (event: KeyboardEvent) => void;
    keyup?: (event: KeyboardEvent) => void;
  }

  let { label = "A", kind = "light", keybinding = label.toLowerCase(), keydown, keypress, keyup }: KeyProps = $props();

  let pressed = $state(false);

  function keydownWrapper(e: KeyboardEvent) {
    if(keydown) keydown(e);
    pressed = true;
  }

  function keyupWrapper(e: KeyboardEvent) {
    if(keyup) keyup(e);
    pressed = false;
  }

  onMount(() => {
    const unbindFunctions = [
      keydown && registerHotKey(keybinding, "keydown", keydownWrapper),
      keypress && registerHotKey(keybinding, "keypress", keypress),
      keyup && registerHotKey(keybinding, "keyup", keyupWrapper),
    ];
    return () => unbindFunctions.forEach(fn => fn && fn());
  })

</script>

<button class={["key", kind, pressed ? "down" : ""].join(" ")}>
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