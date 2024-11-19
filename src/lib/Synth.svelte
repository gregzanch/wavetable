<script lang="ts">
  let paused = $state(true)

</script>

<button onclick={() => paused = !paused}>
  {paused ? "play" : "pause"}
</button>
