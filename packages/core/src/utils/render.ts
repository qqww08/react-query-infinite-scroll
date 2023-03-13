import type { BottomSheetOption, RenderReturn } from "../types";
import { createElement } from "./createElement";
import { typeGuard } from "./typeGuard";
import { EventEmmit, mouseEvent } from "../events";
let visible = false;

let temp: HTMLCollection | null = null;
export const render = (option: BottomSheetOption): RenderReturn => {
  const { portal, className } = option;
  const isString = typeGuard.isString(className);
  const cn = isString ? className : "bottom-sheet";
  const sheetEl = document.querySelector(`.${cn}`) as HTMLDivElement;
  const dimmer = createElement("div", { className: `${cn}-dimmer` });
  const container = createElement("div", {
    className: `${cn}-container`,
  });
  sheetEl.remove();
  temp = sheetEl.children;

  const show = () => {
    const main = createElement("div", { className: cn });
    main.classList.add("visible");
    dimmer.addEventListener("click", hide, { once: true });
    EventEmmit.emit("start", "start");

    if (portal) {
      main.append(dimmer, container);
      if (temp) {
        Array.from(temp).forEach((ele) => {
          container.append(ele);
        });
      }
      mouseEvent(container);

      document.body.append(main);
    }
  };
  const hide = () => {
    const sheetEl = document.querySelector(`.${cn}`) as HTMLDivElement;
    sheetEl.classList.add("remove");
    EventEmmit.emit("end", "end");

    container.addEventListener(
      "animationend",
      () => {
        const sheetEl = document.querySelector(`.${cn}`) as HTMLDivElement;
        temp = sheetEl.children;
        visible = false;
        sheetEl.remove();
      },
      { once: true }
    );
  };

  return {
    show,
    hide,
    visible,
  };
};
