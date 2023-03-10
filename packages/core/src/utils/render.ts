import type { BottomSheetOption } from "../types";
import { createElement } from "./createElement";
import { typeGuard } from "./typeGuard";

const id = "bottom-sheet";

export const render = (option: BottomSheetOption) => {
  const { portal, target } = option;
  const isElString = typeGuard.isString(target);
  const bodyChild = isElString ? document.querySelector(`.${target}`) : target;

  const dimmer = createElement("div", { id: `${id}-dimmer` });
  const header = createElement("div", { id: `${id}-header` });
  const body = createElement("div", { id: `${id}-body` });
  const container = createElement("div", {
    id: `${id}-container`,
  });
  const main = createElement("div", { id });

  const styles = document.createElement("style");
  document.head.append(styles);
  body.append(bodyChild as HTMLElement);
  container.append(header, body);

  if (portal) {
    main.append(dimmer, container);

    document.body.append(main);
  } else {
    const sheetEl = document.querySelector("#bottom-sheet") as HTMLDivElement;
    sheetEl.append(dimmer, container);
  }
};
