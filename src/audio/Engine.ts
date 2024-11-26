import logger from "../utils/logger";
import { Synth } from "./Synth";

export class Engine {
  context: AudioContext;
  synthesizers: Map<string, Synth>;

  constructor() {
    // default sample rate: 44100
    this.context = new AudioContext({ sampleRate: 44100 });
    this.synthesizers = new Map();
  }

  createSynth(): Synth {
    const synth = new Synth(this.context);
    // for (let i = 0; i < synth.buffer.size; i++) {
    //   synth.buffer.real[i] = Math.sin((2 * Math.PI * i) / synth.buffer.size);
    // }
    // synth.fft.transform();
    // synth.updatePeriodicWave();
    synth.oscillator.type = "sawtooth";
    this.synthesizers.set(synth.id, synth);
    return synth;
  }

  /** Called when the engine should close */
  dispose() {
    this.context.close();
    logger.debug("Engine closed");
  }
}
