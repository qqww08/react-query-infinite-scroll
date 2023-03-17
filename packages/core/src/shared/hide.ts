import { EventEmmit } from "../events";

export const hide = (cn = "bottom-sheet") => {
  const sheetEl = document.querySelector(`.${cn}`) as HTMLDivElement;
  const container = document.querySelector(
    `.${cn}-container`
  ) as HTMLDivElement;
  sheetEl.classList.add("remove");
  EventEmmit.emit("end", "end");
  container.addEventListener(
    "animationend",
    () => {
      const sheetEl = document.querySelector(`.${cn}`) as HTMLDivElement;
      sheetEl.remove();
    },
    { once: true }
  );
};
