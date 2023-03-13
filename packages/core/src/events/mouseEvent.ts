const transitionend = (el: any) => {
  el.style.transition = "none";
};

const bottomSheetEnd = (el: any) => {
  const sheetHeight = el.clientHeight;
  const clientHeight = window.innerHeight;
  const heightPercent = Math.floor((sheetHeight / clientHeight) * 100);
  const sheetScroll = document.querySelector(
    ".bottom-sheet-container"
  ) as HTMLDivElement;

  if (heightPercent > 70) {
    sheetScroll.style.overflowY = "scroll";
    el.style.height = "90%";
  }

  if (heightPercent <= 60) {
    sheetScroll.style.overflowY = "hidden";
    el.style.height = "50%";
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
export const mouseEvent = (el: HTMLElement) => {
  el.addEventListener("mousedown", (ev) => onMouseDown(ev, el));
};
