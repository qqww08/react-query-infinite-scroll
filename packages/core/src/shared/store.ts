// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
class Store {
  constructor() {
    this.state = {};
    this.listeners = {};
  }

  getState(key) {
    return this.state[key];
  }

  setState(key, newState) {
    this.state[key] = {
      ...this.state[key],
      ...newState,
    };
  }
}

export const store = new Store();
