<script lang="ts">
  import { fade } from "svelte/transition";
  import Logo from "./Logo.svelte";
  import Button from "./Button.svelte";

  type LayoutProps = {
    children: Function
  };

  let { children }: LayoutProps = $props();
</script>

<div class="layout" in:fade={{delay: 250}}>
  <nav class="nav-bar">
    <Logo width={32} height={32} />
    <Button>Share</Button>
  </nav>
  {@render children()}
</div>

<style>

  .layout {
    width: 100%;
    height: 100vh;
  }

  .nav-bar {
    padding: .5em;
    display: flex;
    justify-content: space-between;
  }
</style>