// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const EventEmmit = {
  events: {},
  token: -1,
  emit(type, data) {
    if (this.events[type]) {
      this.events[type].forEach(({ listener }) => {
        listener(data);
      });
    }
  },
  on(type, listener) {
    const token = String(++this.token);
    this.events = {
      ...this.events,
      [type]: [
        ...(this.events[type] || []),
        {
          listener,
          token,
        },
      ],
    };
    return token;
  },
  off(token) {
    this.events = Object.keys(this.events).reduce((obj, key) => {
      return {
        ...obj,
        [key]: this.events[key].filter((item) => {
          return item.token !== token;
        }),
      };
    }, {});
  },
};
