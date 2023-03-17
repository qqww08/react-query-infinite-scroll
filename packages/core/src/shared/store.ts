interface Store {
  state: { [key: string]: any };
  getState: (key: string) => any;
  setState: (key: string, newState: any) => void;
}
export const store: Store = {
  state: {},
  getState(key: string) {
    return this.state[key];
  },
  setState(key, newState) {
    this.state[key] = {
      ...this.state[key],
      ...newState,
    };
  },
};
