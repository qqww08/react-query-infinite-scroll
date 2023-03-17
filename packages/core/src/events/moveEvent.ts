import { hide } from "../shared";

const transitionend = (el: HTMLElement) => {
  el.style.transition = "none";
};

const bottomSheetEnd = (el: HTMLElement) => {
  const sheetHeight = el.clientHeight;
  const clientHeight = window.innerHeight;
  const heightPercent = Math.floor((sheetHeight / clientHeight) * 100);

  const sheetScroll = document.querySelector(
    ".bottom-sheet-container"
  ) as HTMLElement;
  if (heightPercent > 60) {
    sheetScroll.style.overflowY = "scroll";
    el.style.height = "90%";
  }

  if (heightPercent < 60 && heightPercent > 20) {
    sheetScroll.style.overflowY = "hidden";
    el.style.height = "50%";
  }
  if (heightPercent < 20) {
    hide();
  }

  el.style.transition = "200ms all";
  el.ondragstart = null;
  el?.addEventListener("transitionend", () => transitionend(el), {
    once: true,
  });
};
const onMouseDown = (ev: MouseEvent, el: HTMLElement) => {
  const { height } = el.getBoundingClientRect();
  el.ondragstart = () => {
    return false;
  };
  const mouseMoveHandler = (moveEvent: MouseEvent) => {
    const dimmer = document.querySelector(
      ".bottom-sheet-dimmer"
    ) as HTMLElement;

    const sheetHeight = el.clientHeight;
    const clientHeight = window.innerHeight;
    const heightPercent = Math.floor((sheetHeight / clientHeight) * 100);

    if (heightPercent > 40) {
      const maxOpacity = heightPercent * 0.01;
      dimmer.style.opacity =
        maxOpacity > 0.8 ? "0.8" : `${String(heightPercent * 0.01)}`;
      dimmer.style.animationName = "none";
    }
    const deltaY = moveEvent.pageY - ev.pageY;
    el.style.height = `${height - deltaY}px`;
  };

  const mouseUpHandler = () => {
    bottomSheetEnd(el);
    document.removeEventListener("mousemove", mouseMoveHandler);
    el.removeEventListener("mousedown", (ev) => onMouseDown(ev, el));
  };
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler, { once: true });
};
export const moveEvent = (el: HTMLElement) => {
  el.addEventListener("mousedown", (ev) => onMouseDown(ev, el));
};
