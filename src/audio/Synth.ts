import { nanoid } from "nanoid";
import type { ComplexPairArray } from "../utils/math";
import { FFT } from "../utils/fft";

export class Synth {
  fft: FFT;
  /** Number of samples in the waveform buffer */
  bufferLength: number = 1024;
  /** The engines audio context */
  context: AudioContext;
  /** the oscillator node that acts as the source */
  oscillator: OscillatorNode;
  /** gain after the oscillator */
  private gainNode: GainNode;
  /** unique id */
  id: string;
  constructor(context: AudioContext) {
    this.id = nanoid();
    this.context = context;
    this.fft = new FFT(this.bufferLength);
    this.gainNode = new GainNode(this.context, { gain: 1 });
    this.oscillator = new OscillatorNode(this.context, {
      type: "custom",
      frequency: 440,
      periodicWave: new PeriodicWave(this.context, {
        real: this.buffer.real,
        imag: this.buffer.imag,
      }),
    });
    this.setMute(true);
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.start();
  }

  setMute(mute: boolean) {
    if (mute) {
      this.gainNode.gain.value = 0;
    } else {
      this.gainNode.gain.value = 1;
    }
  }

  get buffer(): ComplexPairArray {
    return this.fft.input;
  }

  updatePeriodicWave() {
    this.oscillator.setPeriodicWave(
      new PeriodicWave(this.context, {
        real: this.buffer.real,
        imag: this.buffer.imag,
      })
    );
  }

  dispose() {
    this.oscillator.disconnect(this.context.destination);
  }
}
