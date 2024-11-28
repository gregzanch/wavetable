<script lang="ts">
  import Key from "./Key.svelte";

  type KeyboardProps = {
    keydown: (key: string) => void;
    keyup: (key: string) => void;
  }

  let { keydown, keyup }: KeyboardProps = $props();

  const pressedKeys = new Set<string>();

  const createKeydownFunction = (key: string) => {
    return () => {
      if(!pressedKeys.has(key)) {
        keydown(key);
        pressedKeys.add(key);
      }
    }
  }

  const createKeyupFunction = (key: string) => {
    return () => {
      keyup(key);
      pressedKeys.delete(key);
    }
  }

</script>

<div class="keyboard">
  <div class="upper">
    <Key label="W" kind="dark" keybinding="w" keydown={createKeydownFunction("w")} keyup={createKeyupFunction("w")} />
    <Key label="E" kind="dark" keybinding="e" keydown={createKeydownFunction("e")} keyup={createKeyupFunction("e")} />
    <div class="empty-key"></div>
    <Key label="T" kind="dark" keybinding="t" keydown={createKeydownFunction("t")} keyup={createKeyupFunction("t")} />
    <Key label="Y" kind="dark" keybinding="y" keydown={createKeydownFunction("y")} keyup={createKeyupFunction("y")} />
    <Key label="U" kind="dark" keybinding="u" keydown={createKeydownFunction("u")} keyup={createKeyupFunction("u")} />
  </div>
  <div class="lower">
    <Key label="A" kind="light" keybinding="a" keydown={createKeydownFunction("a")} keyup={createKeyupFunction("a")} />
    <Key label="S" kind="light" keybinding="s" keydown={createKeydownFunction("s")} keyup={createKeyupFunction("s")} />
    <Key label="D" kind="light" keybinding="d" keydown={createKeydownFunction("d")} keyup={createKeyupFunction("d")} />
    <Key label="F" kind="light" keybinding="f" keydown={createKeydownFunction("f")} keyup={createKeyupFunction("f")} />
    <Key label="G" kind="light" keybinding="g" keydown={createKeydownFunction("g")} keyup={createKeyupFunction("g")} />
    <Key label="H" kind="light" keybinding="h" keydown={createKeydownFunction("h")} keyup={createKeyupFunction("h")} />
    <Key label="J" kind="light" keybinding="j" keydown={createKeydownFunction("j")} keyup={createKeyupFunction("j")} />
  </div>
</div>

<style>
  .empty-key {
    width: 64px;
    height: 64px;
  }

  .lower,
  .upper {
    display: flex;
    flex-direction: row;
    gap: 14px;
  }

  .lower {
    width: fit-content;
  }

  .upper {
    width: 100%;
    justify-content: center;
  }

  .keyboard {
    display: flex;
    flex-direction: column;
    width: fit-content;
  }
</style>
