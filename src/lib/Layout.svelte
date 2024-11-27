<script lang="ts">
  import { fade } from "svelte/transition";
  import Logo from "./Logo.svelte";

  type LayoutProps = {
    children: Function
  };

  let { children }: LayoutProps = $props();
</script>

<div class="layout" in:fade={{delay: 350}}>
  <nav class="nav-bar">
    <Logo animateIn={false} width={32} height={32} />
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
  }
</style>