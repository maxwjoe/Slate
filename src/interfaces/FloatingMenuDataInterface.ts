// IFloatingMenuData : Passed to the floating action menu to tell it what and where to render
export interface IFloatingMenuData {
  selectedText: string;
  positionData: DOMRect;
}

// ITextPosition : Interface for passing absolute positioning data for floating action menu
export interface ITextPosition {
  top: number;
  bottom: number;
  left: number;
  right: number;
  parentHeight: number;
  parentWidth: number;
}
