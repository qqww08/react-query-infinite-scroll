import { render } from "./utils";
import type { BottomSheetOption, BottomSheetReturn } from "./types";

export function BottomSheet(
  option: BottomSheetOption = {
    portal: true,
    zIndex: 1000,
    target: "bottom-sheet",
  }
): BottomSheetReturn {
  const renderProps = render(option);
  return {
    ...renderProps,
    option,
  };
}
