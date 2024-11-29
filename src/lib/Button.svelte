<script lang="ts">
  import { onMount } from "svelte";

  type ButtonColor = "dark" | "light" | "green" | "yellow" | "red" | "blue";

  type ButtonProps = {
    bg?: string;
    fg?: string;
    onclick?: (e: MouseEvent) => void;
    children?: any;
    href?: string;
    ariaLabel?: string;
  };

  let {
    bg = "var(--mono-darker)",
    fg = "var(--mono-lighter)",
    children = "button",
    onclick = () => {},
    href,
    ariaLabel,
  }: ButtonProps = $props();

  let role = href ? "link" : "";
</script>

{#if href}
  <a {href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
    <button class="btn" style:background-color={bg} style:color={fg} {onclick} style:cursor="pointer">
      {@render children()}
    </button>
  </a>
{:else}
  <button class="btn" style:background-color={bg} style:color={fg} {onclick}>
    {@render children()}
  </button>
{/if}

<style>
  .btn {
    border: none;
    width: fit-content;
    padding: var(--spacing-200) var(--spacing-300);
    font-size: var(--font-size-default);
    border-radius: 0.5em;
  }
</style>
