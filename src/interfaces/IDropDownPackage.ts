import { IconType } from "react-icons";

// IDropDownPackage : Interface for passing arguments to generic dropdown menus
export interface IDropDownPackage {
  Icon: IconType;
  ActionTitle: string;
  ActionFunction: any;
}
