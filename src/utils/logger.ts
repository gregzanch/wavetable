class Logger {
  #debugOn: boolean = true;

  debug(...args: any[]) {
    if (this.#debugOn) {
      console.log(args);
    }
  }
}

export default new Logger();
