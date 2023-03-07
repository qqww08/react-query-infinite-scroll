import { BottomSheetOption } from "../types";

const className = "bottom-sheet";

const template = `
    <div class="${className}-dimmer"></div>
    <div class="${className}-container"></div>
`;

export const render = (option: BottomSheetOption) => {
  const { portal } = option;

  if (portal) {
    const main = document.createElement("div");
    main.className = "bottom-sheet";
    main.innerHTML = template;
    document.body.appendChild(main);
  } else {
    const main = document.querySelector(".bottom-sheet") as HTMLDivElement;
    main.innerHTML = template;
  }
};
