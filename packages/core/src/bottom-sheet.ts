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
  const handleShow = show(option.className);
  const handleHide = hide(option.className);
  return {
    show: handleShow,
    hide: handleHide,
    event: EventEmmit,
    option,
  };
}
