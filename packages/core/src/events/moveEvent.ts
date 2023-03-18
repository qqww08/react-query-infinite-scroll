import { hide } from "../shared";

const transitionend = (el: HTMLElement) => {
  el.style.transition = "none";
};

const bottomSheetEnd = (el: HTMLElement, cn: string) => {
  const handleHide = hide(cn);
  const sheetHeight = el.clientHeight;
  const clientHeight = window.innerHeight;
  const heightPercent = Math.floor((sheetHeight / clientHeight) * 100);

  const sheetScroll = document.querySelector(`.${cn}-container`) as HTMLElement;
  if (heightPercent > 60) {
    sheetScroll.style.overflowY = "scroll";
    el.style.height = "90%";
  }

  if (heightPercent < 60 && heightPercent > 20) {
    sheetScroll.style.overflowY = "hidden";
    el.style.height = "50%";
  }
  console.log(heightPercent);
  if (heightPercent < 20) {
    handleHide();
  }

  el.style.transition = "200ms all";
  el.ondragstart = null;
  el?.addEventListener("transitionend", () => transitionend(el), {
    once: true,
  });
};
const onMouseDown = (ev: MouseEvent, el: HTMLElement, cn: string) => {
  const { height } = el.getBoundingClientRect();
  el.ondragstart = () => {
    return false;
  };
  const mouseMoveHandler = (moveEvent: MouseEvent) => {
    const dimmer = document.querySelector(`.${cn}-dimmer`) as HTMLElement;

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
    bottomSheetEnd(el, cn);
    document.removeEventListener("mousemove", mouseMoveHandler);
    el.removeEventListener("mousedown", (ev) => onMouseDown(ev, el, cn));
  };
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler, { once: true });
};
const onTouchStart = (ev: TouchEvent, el: HTMLElement, cn: string) => {
  const { height } = el.getBoundingClientRect();
  const touchMoveHandler = (moveEvent: TouchEvent) => {
    const deltaY = moveEvent.touches[0].pageY - ev.touches[0].pageY;
    el.style.height = `${height - deltaY}px`;
  };
  const touchEndHandler = () => {
    bottomSheetEnd(el, cn);
    el.removeEventListener("touchstart", (ev) => onTouchStart(ev, el, cn));
    document.removeEventListener("touchmove", touchMoveHandler);
  };

  document.addEventListener("touchmove", touchMoveHandler, { passive: false });
  document.addEventListener("touchend", touchEndHandler, { once: true });
};
export const moveEvent = (el: HTMLElement, cn: string) => {
  const isTouchScreen = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  ).matches;
  if (isTouchScreen) {
    el.addEventListener("touchstart", (ev) => onTouchStart(ev, el, cn));
  } else {
    el.addEventListener("mousedown", (ev) => onMouseDown(ev, el, cn));
  }
};
