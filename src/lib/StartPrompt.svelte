<script lang="ts">
  type StartPromptProps = {
    onStart: () => void;
  }

  let { onStart }: StartPromptProps = $props();

</script>

<svg class="start-logo" width="512" height="512" viewBox="0 0 512 512">
  <path fill="none" d="M64 256L231.125 144.583C241.758 137.495 256 145.117 256 157.896V354.104C256 366.883 270.242 374.505 280.875 367.417L448 256" stroke-width="32" stroke-linecap="round" />
</svg>
<button onclick={onStart}>Start</button>

<style>
  :root {
    --start-logo-offset-value: 675;
  }
  svg {
    width: 300px;
    height: 8em;
    padding: 1.5em;
  }

  svg > path {
    stroke: #000000;
  }
  
  svg.start-logo {
    stroke-dasharray: var(--start-logo-offset-value);
    stroke-dashoffset: 0;
    animation: dash 1s cubic-bezier(0.55, 0.0, 0.07, 1);
  }
  
  @keyframes dash {
    from {
      stroke-dashoffset: var(--start-logo-offset-value);
    }
    to {
      stroke-dashoffset: 0;
    }
  }
</style>