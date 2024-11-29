<script lang="ts">
  import { isTextInput } from "../../utils/focusable";
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

  function contextMatcher(e: KeyboardEvent) {
    if(e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return false;
    if(!e.target) return false;
    if((e.target as HTMLElement).classList.contains("key")) {
      return true;
    }
    if(isTextInput(e.target)) {
      return false;
    }
    return true;
  }

</script>

<div class="keyboard">
  <div class="upper">
    <Key label="W" kind="dark" keybinding="w" keydown={createKeydownFunction("w")} keyup={createKeyupFunction("w")} {contextMatcher} />
    <Key label="E" kind="dark" keybinding="e" keydown={createKeydownFunction("e")} keyup={createKeyupFunction("e")} {contextMatcher} />
    <div class="empty-key"></div>
    <Key label="T" kind="dark" keybinding="t" keydown={createKeydownFunction("t")} keyup={createKeyupFunction("t")} {contextMatcher} />
    <Key label="Y" kind="dark" keybinding="y" keydown={createKeydownFunction("y")} keyup={createKeyupFunction("y")} {contextMatcher} />
    <Key label="U" kind="dark" keybinding="u" keydown={createKeydownFunction("u")} keyup={createKeyupFunction("u")} {contextMatcher} />
    <div class="empty-key"></div>
    <Key label="O" kind="dark" keybinding="o" keydown={createKeydownFunction("o")} keyup={createKeyupFunction("o")} {contextMatcher} />
    <Key label="P" kind="dark" keybinding="p" keydown={createKeydownFunction("p")} keyup={createKeyupFunction("p")} {contextMatcher} />
  </div>
  <div class="lower">
    <Key label="A" kind="light" keybinding="a" keydown={createKeydownFunction("a")} keyup={createKeyupFunction("a")} {contextMatcher} />
    <Key label="S" kind="light" keybinding="s" keydown={createKeydownFunction("s")} keyup={createKeyupFunction("s")} {contextMatcher} />
    <Key label="D" kind="light" keybinding="d" keydown={createKeydownFunction("d")} keyup={createKeyupFunction("d")} {contextMatcher} />
    <Key label="F" kind="light" keybinding="f" keydown={createKeydownFunction("f")} keyup={createKeyupFunction("f")} {contextMatcher} />
    <Key label="G" kind="light" keybinding="g" keydown={createKeydownFunction("g")} keyup={createKeyupFunction("g")} {contextMatcher} />
    <Key label="H" kind="light" keybinding="h" keydown={createKeydownFunction("h")} keyup={createKeyupFunction("h")} {contextMatcher} />
    <Key label="J" kind="light" keybinding="j" keydown={createKeydownFunction("j")} keyup={createKeyupFunction("j")} {contextMatcher} />
    <Key label="K" kind="light" keybinding="k" keydown={createKeydownFunction("k")} keyup={createKeyupFunction("k")} {contextMatcher} />
    <Key label="L" kind="light" keybinding="l" keydown={createKeydownFunction("l")} keyup={createKeyupFunction("l")} {contextMatcher} />
    <Key label=";" kind="light" keybinding=";" keydown={createKeydownFunction(";")} keyup={createKeyupFunction(";")} {contextMatcher} />
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
