import type { BottomSheetOption } from "../types";
import { createElement } from "./createElement";
import { typeGuard } from "./typeGuard";

const className = "bottom-sheet";

export const render = (option: BottomSheetOption) => {
  const { portal, target } = option;
  const isElString = typeGuard.isString(target);
  const bodyChild = isElString ? document.querySelector(`.${target}`) : target;

  const dimmer = createElement("div", { className: `${className}-dimmer` });
  const header = createElement("div", { className: `${className}-header` });
  const body = createElement("div", { className: `${className}-body` });
  const container = createElement("div", {
    className: `${className}-container`,
  });
  const main = createElement("div", { className });
  if (bodyChild) {
    body.append(bodyChild as HTMLElement);
  }
  container.append(header, body);

  if (portal) {
    main.append(dimmer, container);

    document.body.append(main);
  } else {
    const sheetEl = document.querySelector(".bottom-sheet") as HTMLDivElement;
    body.append(sheetEl.children[0]);
    sheetEl.append(dimmer, container);
  }
};
