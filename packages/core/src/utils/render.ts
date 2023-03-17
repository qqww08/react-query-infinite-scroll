import type { BottomSheetOption } from "../types";
import { typeGuard } from "./typeGuard";
import { store } from "../shared";

export const render = (option: BottomSheetOption) => {
  const { className } = option;
  const isString = typeGuard.isString(className);
  const cn = isString ? className : "bottom-sheet";
  const sheetEl = document.querySelector(`.${cn}`) as HTMLDivElement;

  if (!store.getState("children")) store.setState("children", sheetEl.children);
  sheetEl.remove();
};
