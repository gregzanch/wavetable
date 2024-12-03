<script lang="ts">
  import { nanoid } from "nanoid";
  import type { ChangeEventHandler } from "svelte/elements";

  type NumberInputProps = {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    bg?: string;
    fg?: string;
    onchange?: (value: number) => void;
    label?: string;
  };

  let {
    value,
    min = -Infinity,
    max = Infinity,
    step = 1,
    bg = "var(--mono-lighter)",
    fg = "var(--mono-darker)",
    onchange = () => {},
    label,
  }: NumberInputProps = $props();

  const onchangeWrapper: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.currentTarget) return;
    const newValue = e.currentTarget.valueAsNumber;
    if (newValue >= max) value = max;
    if (newValue <= min) value = min;
    value = newValue;
    onchange(value);
  };

  const id = nanoid();
  const inputId = nanoid();
</script>

{#if label}
  <div class="labeled-input-pair">
    <label {id} for={inputId}>{label}</label>
    <input
      id={inputId}
      type="number"
      {min}
      {max}
      {step}
      {value}
      onchange={onchangeWrapper}
      style:background-color={bg}
      style:color={fg}
      aria-labelledby={id}
    />
  </div>
{:else}
  <input
    id={inputId}
    type="number"
    {min}
    {max}
    {step}
    {value}
    onchange={onchangeWrapper}
    style:background-color={bg}
    style:color={fg}
    aria-labelledby={id}
  />
{/if}

<style>
  input[type=number]::-webkit-inner-spin-button {
    opacity: 1
  }
  input {
    padding: var(--spacing-200) var(--spacing-300);
    border-radius: 0.5em;
    border: solid 1px var(--mono-light);
  }

  label {
    color: var(--mono-darkest);
  }

  .labeled-input-pair {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-300);
  }

</style>
