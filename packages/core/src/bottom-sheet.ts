import { render } from "./utils";
import type { BottomSheetOption } from "./types";

function asd() {
  console.log(1);
}

export function BottomSheet(option: BottomSheetOption) {
  render(option);
  return {
    option,
  };
}
