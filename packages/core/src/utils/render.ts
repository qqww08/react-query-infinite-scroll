import type { BottomSheetOption, RenderReturn } from "../types";
import { createElement } from "./createElement";
import { typeGuard } from "./typeGuard";

let temp: HTMLCollection | null = null;
export const render = (option: BottomSheetOption): RenderReturn => {
  const { portal, target } = option;
  const isString = typeGuard.isString(target);
  const className = isString ? target : "bottom-sheet";
  const sheetEl = document.querySelector(".bottom-sheet") as HTMLDivElement;
  const dimmer = createElement("div", { className: `${className}-dimmer` });
  const container = createElement("div", {
    className: `${className}-container`,
  });
  sheetEl.remove();
  temp = sheetEl.children;

  const show = () => {
    const main = createElement("div", { className });
    main.classList.add("visible");
    dimmer.addEventListener("click", hide, { once: true });

    if (portal) {
      main.append(dimmer, container);
      if (temp) {
        Array.from(temp).forEach((ele: any) => {
          container.append(ele);
        });
      }

      document.body.append(main);
    }
  };
  const hide = () => {
    const sheetEl = document.querySelector(".bottom-sheet") as HTMLDivElement;
    sheetEl.classList.add("remove");

    container.addEventListener(
      "animationend",
      () => {
        const sheetEl = document.querySelector(
          ".bottom-sheet"
        ) as HTMLDivElement;
        temp = sheetEl.children;
        sheetEl.remove();
      },
      { once: true }
    );
  };

  return {
    show,
    hide,
  };
};
