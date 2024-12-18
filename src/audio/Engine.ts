import logger from "../utils/logger";
import { Synth } from "./Synth";

/**
 * Map of the frequency belonging to each note in the first octave.
 * Just multiply by the octave number to get the corresponding freq.
 */
const octaveFrequencyMap: Record<string, number> = {
  ["c"]: 32.7032,
  ["c#"]: 34.64783,
  ["d"]: 36.7081,
  ["d#"]: 38.89087,
  ["e"]: 41.20344,
  ["f"]: 43.65353,
  ["f#"]: 46.2493,
  ["g"]: 48.99943,
  ["g#"]: 51.91309,
  ["a"]: 55.0,
  ["a#"]: 58.27047,
  ["b"]: 61.73541,
};

octaveFrequencyMap["c2"] = octaveFrequencyMap["c"] * 2;
octaveFrequencyMap["c#2"] = octaveFrequencyMap["c#"] * 2;
octaveFrequencyMap["d2"] = octaveFrequencyMap["d"] * 2;
octaveFrequencyMap["d#2"] = octaveFrequencyMap["d#"] * 2;
octaveFrequencyMap["e2"] = octaveFrequencyMap["e"] * 2;

const keyToNoteMap: Record<string, string> = {
  ["w"]: "c#",
  ["e"]: "d#",
  ["t"]: "f#",
  ["y"]: "g#",
  ["u"]: "a#",
  ["a"]: "c",
  ["s"]: "d",
  ["d"]: "e",
  ["f"]: "f",
  ["g"]: "g",
  ["h"]: "a",
  ["j"]: "b",
  ["k"]: "c2",
  ["l"]: "d2",
  [";"]: "e2",
  ["o"]: "c#2",
  ["p"]: "d#2",
};

export class Engine {
  context: AudioContext;
  synthesizers: Map<string, Synth>;
  outputSink: GainNode;
  analyzer: AnalyserNode;
  constructor() {
    // default sample rate: 44100
    this.context = new AudioContext({ sampleRate: 44100 });
    this.synthesizers = new Map();
    this.analyzer = new AnalyserNode(this.context, {
      fftSize: Synth.bufferLength,
    });
    this.outputSink = new GainNode(this.context);
    this.outputSink.connect(this.analyzer);
    this.analyzer.connect(this.context.destination);
  }

  createSynths() {
    for (const note of Object.keys(octaveFrequencyMap)) {
      const synth = new Synth(this.context);
      synth.oscillator.type = "sawtooth";
      synth.oscillator.frequency.value = octaveFrequencyMap[note] * 4;
      this.synthesizers.set(note, synth);
      synth.gainNode.connect(this.outputSink);
    }
  }

  /**
   * Changes the keyboard octave
   * @param octave number between 1 and 7
   * @returns {void}
   */
  setOctave(octave: number) {
    if (!Number.isSafeInteger(octave)) {
      console.warn(`cannot set the keyboards octave to ${octave}`);
      return;
    }
    for (const note of Object.keys(octaveFrequencyMap)) {
      if (!this.synthesizers.has(note)) continue;
      const synth = this.synthesizers.get(note)!;
      synth.oscillator.frequency.value = octaveFrequencyMap[note] * octave;
    }
  }

  detune(direction: "up" | "down" | "normal") {
    let cents = 0;
    switch (direction) {
      case "up":
        cents = 100;
        break;
      case "down":
        cents = -100;
        break;
      case "normal":
      default:
        cents = 0;
        break;
    }
    for (const note of Object.keys(octaveFrequencyMap)) {
      if (!this.synthesizers.has(note)) continue;
      const synth = this.synthesizers.get(note)!;
      synth.oscillator.detune.cancelScheduledValues(this.context.currentTime);
      synth.oscillator.detune.setValueAtTime(
        synth.oscillator.detune.value,
        this.context.currentTime
      );
      synth.oscillator.detune.linearRampToValueAtTime(
        cents,
        this.context.currentTime + 0.125
      );
    }
  }

  getSynthForKey(key: string): Synth | null {
    if (keyToNoteMap[key]) {
      return this.synthesizers.get(keyToNoteMap[key]) || null;
    }
    return null;
  }

  /** Called when the engine should close */
  dispose() {
    this.context.close();
    logger.debug("Engine closed");
  }
}
