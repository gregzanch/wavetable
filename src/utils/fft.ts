import { isPowerOfTwo, ComplexPairArray } from "./math";

/**
 * FFT class to provide performant complex fourier transforms
 * Adapted from [fft.js](https://github.com/indutny/fft.js)
 */
export class FFT {
  size: number;

  output: ComplexPairArray;
  input: ComplexPairArray;

  private table: Array<number>;
  private width: number;
  private bitReversalPatterns: Array<number>;
  private invert: boolean;

  constructor(size: number) {
    if (!isPowerOfTwo(size)) {
      throw new Error(
        `FFT size must be a power of 2. '${size}' is not a power of 2`
      );
    }
    this.size = size;
    this.input = new ComplexPairArray(this.size);
    this.output = new ComplexPairArray(this.size);
    this.table = this.constructTable();

    // Find the power of two value
    let power = 0;
    for (let exponent = 1; exponent < this.size; exponent <<= 1) {
      power += 1;
    }

    // Calculate initial step's width
    // If we are full radix-4 it is 2x smaller to give inital length=8
    // Otherwise it is the same as `power` to give length=4
    this.width = power % 2 === 0 ? power - 1 : power;

    // Pre-compute bit-reversal patterns
    this.bitReversalPatterns = new Array(1 << this.width);
    for (var j = 0; j < this.bitReversalPatterns.length; j++) {
      this.bitReversalPatterns[j] = 0;
      for (var shift = 0; shift < this.width; shift += 2) {
        var revShift = this.width - shift - 2;
        this.bitReversalPatterns[j] |= ((j >>> shift) & 3) << revShift;
      }
    }

    this.invert = false;
  }

  private constructTable(): Array<number> {
    const table = new Array(this.size * 2);
    for (var i = 0; i < table.length; i += 2) {
      const angle = (Math.PI * i) / this.size;
      table[i] = Math.cos(angle);
      table[i + 1] = -Math.sin(angle);
    }
    return table;
  }

  transform(input?: ComplexPairArray): ComplexPairArray {
    this.input = input || this.input;
    this.input.interleave();
    this.invert = false;
    this.transform4();
    this.output.unravel();
    return this.output;
  }

  inverseTransform(input?: ComplexPairArray): ComplexPairArray {
    this.input = input || this.input;
    this.input.interleave();
    this.invert = true;
    this.transform4();
    for (let i = 0; i < this.output.interleaved.length; i++) {
      this.output.interleaved[i] /= this.size;
    }
    this.output.unravel();
    return this.output;
  }

  private transform4() {
    const out = this.output.interleaved;
    const size = this.size << 1;

    // Initial step (permute and transform)
    const width = this.width;
    let step = 1 << width;
    let length = (size / step) << 1;

    if (length === 4) {
      for (
        let outputOffset = 0, t = 0;
        outputOffset < size;
        outputOffset += length, t++
      ) {
        const off = this.bitReversalPatterns[t];
        this.singleTransform2(outputOffset, off, step);
      }
    } else {
      // length === 8
      for (
        let outputOffset = 0, t = 0;
        outputOffset < size;
        outputOffset += length, t++
      ) {
        const off = this.bitReversalPatterns[t];
        this.singleTransform4(outputOffset, off, step);
      }
    }

    // Loop through steps in decreasing order
    const inv = this.invert ? -1 : 1;

    for (step >>= 2; step >= 2; step >>= 2) {
      length = (size / step) << 1;
      var quarterLen = length >>> 2;

      // Loop through offsets in the data
      for (let outputOffset = 0; outputOffset < size; outputOffset += length) {
        // Full case
        var limit = outputOffset + quarterLen;
        for (var i = outputOffset, k = 0; i < limit; i += 2, k += step) {
          const A = i;
          const B = A + quarterLen;
          const C = B + quarterLen;
          const D = C + quarterLen;

          // Original values
          const Ar = out[A];
          const Ai = out[A + 1];
          const Br = out[B];
          const Bi = out[B + 1];
          const Cr = out[C];
          const Ci = out[C + 1];
          const Dr = out[D];
          const Di = out[D + 1];

          // Middle values
          const MAr = Ar;
          const MAi = Ai;

          const tableBr = this.table[k];
          const tableBi = inv * this.table[k + 1];
          const MBr = Br * tableBr - Bi * tableBi;
          const MBi = Br * tableBi + Bi * tableBr;

          const tableCr = this.table[2 * k];
          const tableCi = inv * this.table[2 * k + 1];
          const MCr = Cr * tableCr - Ci * tableCi;
          const MCi = Cr * tableCi + Ci * tableCr;

          const tableDr = this.table[3 * k];
          const tableDi = inv * this.table[3 * k + 1];
          const MDr = Dr * tableDr - Di * tableDi;
          const MDi = Dr * tableDi + Di * tableDr;

          // Pre-Final values
          const T0r = MAr + MCr;
          const T0i = MAi + MCi;
          const T1r = MAr - MCr;
          const T1i = MAi - MCi;
          const T2r = MBr + MDr;
          const T2i = MBi + MDi;
          const T3r = inv * (MBr - MDr);
          const T3i = inv * (MBi - MDi);

          // Final values
          const FAr = T0r + T2r;
          const FAi = T0i + T2i;

          const FCr = T0r - T2r;
          const FCi = T0i - T2i;

          const FBr = T1r + T3i;
          const FBi = T1i - T3r;

          const FDr = T1r - T3i;
          const FDi = T1i + T3r;

          out[A] = FAr;
          out[A + 1] = FAi;
          out[B] = FBr;
          out[B + 1] = FBi;
          out[C] = FCr;
          out[C + 1] = FCi;
          out[D] = FDr;
          out[D + 1] = FDi;
        }
      }
    }
  }

  private singleTransform2(outputOffset: number, offset: number, step: number) {
    const out = this.output.interleaved;
    const data = this.input.interleaved;

    const evenR = data[offset];
    const evenI = data[offset + 1];
    const oddR = data[offset + step];
    const oddI = data[offset + step + 1];

    const leftR = evenR + oddR;
    const leftI = evenI + oddI;
    const rightR = evenR - oddR;
    const rightI = evenI - oddI;

    out[outputOffset] = leftR;
    out[outputOffset + 1] = leftI;
    out[outputOffset + 2] = rightR;
    out[outputOffset + 3] = rightI;
  }

  private singleTransform4(outputOffset: number, offset: number, step: number) {
    const out = this.output.interleaved;
    const data = this.input.interleaved;
    const inv = this.invert ? -1 : 1;
    const step2 = step * 2;
    const step3 = step * 3;

    // Original values
    const Ar = data[offset];
    const Ai = data[offset + 1];
    const Br = data[offset + step];
    const Bi = data[offset + step + 1];
    const Cr = data[offset + step2];
    const Ci = data[offset + step2 + 1];
    const Dr = data[offset + step3];
    const Di = data[offset + step3 + 1];

    // Pre-Final values
    const T0r = Ar + Cr;
    const T0i = Ai + Ci;
    const T1r = Ar - Cr;
    const T1i = Ai - Ci;
    const T2r = Br + Dr;
    const T2i = Bi + Di;
    const T3r = inv * (Br - Dr);
    const T3i = inv * (Bi - Di);

    // Final values
    const FAr = T0r + T2r;
    const FAi = T0i + T2i;

    const FBr = T1r + T3i;
    const FBi = T1i - T3r;

    const FCr = T0r - T2r;
    const FCi = T0i - T2i;

    const FDr = T1r - T3i;
    const FDi = T1i + T3r;

    out[outputOffset] = FAr;
    out[outputOffset + 1] = FAi;
    out[outputOffset + 2] = FBr;
    out[outputOffset + 3] = FBi;
    out[outputOffset + 4] = FCr;
    out[outputOffset + 5] = FCi;
    out[outputOffset + 6] = FDr;
    out[outputOffset + 7] = FDi;
  }
}
