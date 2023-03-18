import { createElement } from "../utils";
import { EventEmmit, moveEvent } from "../events";
import { hide } from "./hide";
import { store } from "./store";
export const show = (cn = "bottom-sheet") => {
  return () => {
    const handleHide = hide(cn);
    const children = store.getState("children") as HTMLCollection;
    const main = createElement("div", { className: cn });
    const dimmer = createElement("div", { className: `${cn}-dimmer` });
    const container = createElement("div", {
      className: `${cn}-container`,
    });
    main.classList.add("visible");
    dimmer.addEventListener("click", handleHide, { once: true });
    EventEmmit.emit("start", "start");
    main.append(dimmer, container);
    if (children) {
      Object.values(children).forEach((ele) => {
        container.append(ele);
      });
    }
    moveEvent(container, cn);

    document.body.append(main);
  };
};
