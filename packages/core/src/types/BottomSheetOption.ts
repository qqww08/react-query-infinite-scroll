import { EventEmmit } from "../events";

export interface BottomSheetOption {
  portal?: boolean;
  className?: HTMLElement | string;
  zIndex?: number;
}
export interface BottomSheetReturn extends RenderReturn {
  option: BottomSheetOption;
  event: typeof EventEmmit;
}

export interface RenderReturn {
  hide: () => void;
  show: () => void;
  visible: boolean;
}
