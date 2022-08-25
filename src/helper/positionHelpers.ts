import { useRef, useEffect } from "react";

// useClickOutside : Handles user clicking outside of an element by calling handler() callback
export const useClickOutside = (handler: any) => {
  let domNode = useRef<any>();

  useEffect(() => {
    let checkHandler = (event: any) => {
      if (!domNode.current.contains(event.target)) {
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

// useTextSelector : Handles user highlighting text
export const useTextSelector = () => {
  const handler = () => {
    // const selection = window.getSelection();
    // const text = selection?.toString();
    // const location = selection?.getRangeAt(0).getBoundingClientRect();
  };

  const domNode = useRef<any>();

  useEffect(() => {
    const checkHandler = (event: any) => {
      // if (domNode.current.contains(event.target)) {
      //   handler();
      // }
    };

    document.addEventListener("mouseup", checkHandler);

    return () => {
      document.addEventListener("mouseup", checkHandler);
    };
  });

  return domNode;
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
