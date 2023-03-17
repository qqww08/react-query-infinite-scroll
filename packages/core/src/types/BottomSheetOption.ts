import { EventEmmit } from "../events";

export interface BottomSheetOption {
  portal?: boolean;
  className?: string;
  zIndex?: number;
}
export interface BottomSheetReturn {
  option: BottomSheetOption;
  event: typeof EventEmmit;
  hide: (cn: string) => void;
  show: (cn: string) => void;
}
