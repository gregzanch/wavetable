/**
 * Determines if an integer is a valid power of 2
 * @param value integer to be tested
 * @returns {boolean}
 */
export function isPowerOfTwo(value: number): boolean {
  if (!Number.isSafeInteger(value)) {
    throw new Error(
      `'isPowerOfTwo' requires a safe integer. The supplied value '${value}' is not a safe integer`
    );
  }
  if (value == 0) {
    return false;
  }
  return (value & (value - 1)) == 0;
}

/**
 * Complex number array where the real and imaginary parts are split
 */
export class ComplexPairArray {
  /**
   * Real part of the array
   */
  real: Float32Array;

  /**
   * Imaginary part of the array
   */
  imag: Float32Array;

  /**
   * Interleaved array that alternates real and imaginary parts.
   * The size of this array is 2 * size
   */
  interleaved: Float32Array;

  /**
   * The size of the array
   */
  size: number;

  constructor(size: number) {
    this.size = size;
    this.real = new Float32Array(size);
    this.imag = new Float32Array(size);
    this.interleaved = this.interleave();
  }

  /**
   * Interleaves the real and imaginary parts, and stores in into `interleaved`
   * @returns {Float32Array} the interleaved data
   */
  interleave(): Float32Array {
    this.interleaved ||= new Float32Array(this.size * 2);
    for (let i = 0; i < this.size; i++) {
      this.interleaved[i * 2] = this.real[i];
      this.interleaved[i * 2 + 1] = this.imag[i];
    }
    return this.interleaved;
  }

  /**
   * Unravels the interleaved data and stores it back into the `real` and `imag`
   * @returns {ComplexPairArray}
   */
  unravel(): ComplexPairArray {
    for (let i = 0; i < this.size; i++) {
      this.real[i] = this.interleaved[i * 2];
      this.imag[i] = this.interleaved[i * 2 + 1];
    }
    return this;
  }

  /**
   * Calculates the magnitude of each complex number
   * @returns {Float32Array} the magnitude array
   */
  getMagnitude(): Float32Array {
    const magnitude = new Float32Array(this.size);
    for (let i = 0; i < this.size; i++) {
      magnitude[i] = Math.sqrt(this.real[i] ** 2 + this.imag[i] ** 2);
    }
    return magnitude;
  }
}
