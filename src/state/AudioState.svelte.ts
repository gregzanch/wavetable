import { Engine } from "../audio/Engine";

class AudioState {
  engine: Engine = $state(new Engine());
}

export const audioState = new AudioState();
