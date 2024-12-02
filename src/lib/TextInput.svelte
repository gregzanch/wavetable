<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";

  type TextInputProps = {
    value: string;
    bg?: string;
    fg?: string;
    onchange?: ChangeEventHandler<HTMLInputElement>;
  };

  let {
    value,
    bg = "var(--mono-lighter)",
    fg = "var(--mono-darker)",
    onchange = (e) => {
      value = e.currentTarget.value;
    },
  }: TextInputProps = $props();
</script>

<input type="text" {value} {onchange} style:background-color={bg} style:color={fg} />

<style>
  input {
    padding: var(--spacing-200) var(--spacing-300);
    border-radius: 0.5em;
    border: solid 1px var(--mono-light);
  }
</style>
