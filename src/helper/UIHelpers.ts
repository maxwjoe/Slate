import { useRef, useEffect, LegacyRef, useState } from "react";
import { BsWordpress } from "react-icons/bs";
import { IFloatingMenuData } from "../interfaces/IFloatingMenuData";

// useClickOutside : Handles user clicking outside of an element by calling handler() callback
export const useClickOutside = (handler: any) => {
  let domNode = useRef<any>();

  useEffect(() => {
    let checkHandler = (event: any) => {
      if (!domNode?.current?.contains(event?.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", checkHandler);

    return () => {
      document.removeEventListener("mousedown", checkHandler);
    };
  });

  return domNode;
};

// getWordCount : Gets word count for a string
export const getWordCount = (data: string) => {
  // //Count Korean Words
  // let koreanCount = 0;
  // for (let i = 0; i < data.length; i++) {
  //   let c = data.charAt(i);
  //   if (c.match(/[\u3131-\u314e]/)) koreanCount++;
  //   else if (c.match(/[\u314f-\u3163]/)) koreanCount++;
  //   else if (c.match(/[\uac00-\ud7a3]/)) koreanCount++;
  // }

  //Count Chinese Characters
  let chineseCount = 0;
  for (let i = 0; i < data.length; i++) {
    let c = data.charAt(i);
    if (c.match(/[\u4e00-\u9fa5]/)) chineseCount++;
    else if (c.match(/[\u9FA6-\u9fcb]/)) chineseCount++;
  }

  const asianLanguageCount: number = chineseCount;
  if (asianLanguageCount > 0) return asianLanguageCount;

  //Count English (Only words if korean and chinese are zero for now)
  const wordArray: string[] = data.split(" ");
  return wordArray.length;
};

// getComponentBounds : Gets offset of an element on page
export const getComponentBounds = (elementId: string) => {
  const boundingRect = document
    .getElementById(elementId)
    ?.getBoundingClientRect();
  return boundingRect;
};

// applyShift : Helps apply position shifts and handles undefined case
export const applyShift = (value: any, shift: any) => {
  if (!value || shift === "auto") return "auto";
  return value + shift;
};

// // useTextSelector : Handles user highlighting text
// export const useTextSelector = () => {
//   const [floatingMenuData, setFloatingMenuData] = useState<IFloatingMenuData>({
//     selectedText: "",
//     positionData: window
//       .getSelection()
//       ?.getRangeAt(0)
//       ?.getBoundingClientRect() as DOMRect,
//   });

//   // Handles text selection
//   const handler = () => {
//     // const sel = window?.getSelection();
//     // if (sel === null || sel.rangeCount === null || isNaN(sel.rangeCount)) {
//     //   console.log("Invalid Selection");
//     //   return;
//     // }
//     // const range = sel.getRangeAt(0).cloneRange();
//     // const text: string = range.toString();
//     // const pos: DOMRect = range.getBoundingClientRect();
//     // setFloatingMenuData({
//     //   selectedText: text,
//     //   positionData: pos,
//     // });
//   };

//   const domNode: any = useRef();

//   useEffect(() => {
//     const checkHandler = (event: any) => {
//       if (domNode?.current?.contains(event?.target)) {
//         handler();
//       }
//     };

//     document.addEventListener("mouseup", checkHandler);

//     return () => {
//       document.addEventListener("mouseup", checkHandler);
//     };
//   }, []);

//   return { domNode, floatingMenuData };
// };
