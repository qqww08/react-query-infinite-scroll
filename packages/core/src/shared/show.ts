import { createElement } from "../utils";
import { EventEmmit, mouseEvent } from "../events";
import { hide } from "./hide";
import { share } from "./share";
import { store } from "./store";
export const show = (cn = "bottom-sheet") => {
  const children = store.getState("children") as HTMLCollection;
  const main = createElement("div", { className: cn });
  const dimmer = createElement("div", { className: `${cn}-dimmer` });
  const container = createElement("div", {
    className: `${cn}-container`,
  });
  main.classList.add("visible");
  dimmer.addEventListener("click", () => hide(cn), { once: true });
  EventEmmit.emit("start", "start");
  main.append(dimmer, container);
  if (children) {
    Object.values(children).forEach((ele) => {
      container.append(ele);
    });
  }
  mouseEvent(container);

  document.body.append(main);
};
