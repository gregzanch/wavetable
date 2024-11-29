<script lang="ts">
  import { onMount } from "svelte";
  import { Synth } from "../audio/Synth";
  import { audioState } from "../state/AudioState.svelte";
  import { mapValueFromRange } from "../utils/math";
  import { expect } from "../utils/expect";

  type ScopeProps = {
    id: string;
  }

  let { id }: ScopeProps = $props();

  const buffer = new Float32Array(Synth.bufferLength)
  audioState.engine.analyzer.getFloatTimeDomainData(buffer);

  

  const paintWaveform = (
    context: CanvasRenderingContext2D,
    channelData: Float32Array
  ) => {
    if (!channelData) return;
    const mapX = mapValueFromRange(0, Synth.bufferLength, 0, context.canvas.width);
    const mapY = mapValueFromRange(-1.5, 1.5, 0, context.canvas.height);
    context.strokeStyle = "green";
    context.beginPath();
    context.moveTo(mapX(0), mapY(0));
    for (let i = 0; i < channelData.length; i++) {
      context.lineTo(mapX(i), mapY(channelData[i]));
    }
    context.stroke();
  };


  onMount(() => {
    const draw = () => {
      const canvas = document.getElementById(id) as HTMLCanvasElement;
      const context = expect(canvas.getContext("2d"), "failed to get context");
      context.fillStyle = "black";
      context.fillRect(0,0,canvas.width, canvas.height);
      audioState.engine.analyzer.getFloatTimeDomainData(buffer);
      paintWaveform(context, buffer);
    }

    const interval = setInterval(draw, 1000/60);

    return () => {
      clearInterval(interval);
    }

  })



</script>

<canvas {id} class="scope" width="720px" height="256px"></canvas>

<style>
  canvas.scope {
    border: solid 1px var(--color-mono-dark);
    border-radius: 1em;
  }
</style>