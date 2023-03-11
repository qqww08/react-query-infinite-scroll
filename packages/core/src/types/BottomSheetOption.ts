export interface BottomSheetOption {
  portal?: boolean;
  target?: HTMLElement | string;
  zIndex?: number;
}
export interface BottomSheetReturn extends RenderReturn {
  option: BottomSheetOption;
}

export interface RenderReturn {
  hide: () => void;
  show: () => void;
}
