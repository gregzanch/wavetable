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
  private lastGain: number = 0.25;
  /** unique id */
  id: string;
  constructor(context: AudioContext) {
    this.id = nanoid();
    this.context = context;
    this.fft = new FFT(this.bufferLength);
    this.gainNode = new GainNode(this.context, { gain: this.lastGain });
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

  set gain(newGain: number) {
    this.lastGain = this.gainNode.gain.value;
    this.gainNode.gain.value = newGain;
  }

  setMute(mute: boolean) {
    if (mute) {
      this.gain = 0;
    } else {
      this.gain = this.lastGain;
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
