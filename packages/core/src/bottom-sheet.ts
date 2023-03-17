import { render } from "./utils";
import type { BottomSheetOption, BottomSheetReturn } from "./types";
import { EventEmmit } from "./events";
import { hide, show } from "./shared";

export function BottomSheet(
  option: BottomSheetOption = {
    portal: true,
    zIndex: 1000,
    className: "bottom-sheet",
  }
): BottomSheetReturn {
  render(option);
  return {
    show,
    hide,
    event: EventEmmit,
    option,
  };
}
