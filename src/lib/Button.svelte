<script lang="ts">
  type ButtonColor = "dark" | "light" | "green" | "yellow" | "red" | "blue";


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
    padding: 8px 12px;
    font-size: 16px;
    border-radius: 0.5em;
  }
</style>

