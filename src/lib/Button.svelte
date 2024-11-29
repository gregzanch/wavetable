<script lang="ts">

  type ButtonProps = {
    bg?: string;
    fg?: string;
    onclick?: (e: MouseEvent) => void;
    children?: any;
  };

  let {
    bg = "var(--mono-darker)",
    fg = "var(--mono-lighter)",
    children = "button",
    onclick = () => {},
  }: ButtonProps = $props();
</script>

<button class="btn" style:background-color={bg} style:color={fg} {onclick}>
  {@render children()}
</button>

<style>
  .btn {
    border: none;
    width: fit-content;
    padding: var(--spacing-200) var(--spacing-300);
    font-size: var(--font-size-default);
    border-radius: 0.5em;
  }
</style>

