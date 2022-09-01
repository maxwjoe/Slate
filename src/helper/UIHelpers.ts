import { useRef, useEffect, LegacyRef, useState } from "react";
import { BsWordpress } from "react-icons/bs";
import {
  IFloatingMenuData,
  ITextPosition,
} from "../interfaces/FloatingMenuDataInterface";

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

// getWordCount : Gets word count for a string (Limitation : Cannot count Asian + Nonasian languages at once)
export const getWordCount = (data: string) => {
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

// getFloatingActionMenuOffset : Determines appropriate offset for floating action menu
export const getFloatingActionMenuOffset = (position: ITextPosition) => {
  if (!position) return position;

  // Unpack Position Object and Handle Undefined
  const contentContainerHeight: number = position?.parentHeight
    ? position?.parentHeight
    : 0;
  const selectionOffsetTop: number = position?.top ? position?.top : 0;

  // Set Offset Based on position within content container
  let offsetStyle = {};
  if (selectionOffsetTop > contentContainerHeight / 2) {
    offsetStyle = {
      top: position?.top - 190,
      bottom: "auto",
      left: position?.left,
      right: position?.right,
    };
  } else {
    offsetStyle = {
      top: position?.top + 30,
      bottom: position?.bottom,
      left: position?.left,
      right: position?.right,
    };
  }

  return offsetStyle;
};
