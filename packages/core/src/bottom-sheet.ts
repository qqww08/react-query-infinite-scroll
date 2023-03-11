import { render } from "./utils";
import type { BottomSheetOption, BottomSheetReturn } from "./types";
import { EventEmmit } from "./events";

export function BottomSheet(
  option: BottomSheetOption = {
    portal: true,
    zIndex: 1000,
    className: "bottom-sheet",
  }
): BottomSheetReturn {
  const renderProps = render(option);
  return {
    event: EventEmmit,
    ...renderProps,
    option,
  };
}
