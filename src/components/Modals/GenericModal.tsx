import React from "react";
import ReactDom from 'react-dom'
import {useClickOutside} from '../../helper/UIHelpers'
import { ITheme } from "../../interfaces/ThemeInterface";
import {getCurrentTheme} from '../../services/themeService'

interface Props {
  children : any,
  handleClose : any
}

// GenericModal : Component Responsible for rendering a modal through react portal
function GenericModal({children, handleClose} : Props) {
  
  // --- Redux State ---
  const theme : ITheme = getCurrentTheme();
  
  // --- Custom Hooks ---

  // Custom Hook to handle cliciing outside the modal
  const domNode = useClickOutside(handleClose)

  // --- Constants ---
  const modalStyles : any = {
    position : 'fixed',
    top : '50%',
    left : '50%',
    transform : 'translate(-50%, -50%)',
    borderColor : theme.accent,
    zIndex : 1000
  }
  
  return ReactDom.createPortal(
    <div 
      ref = {domNode}
      style = {modalStyles}
      className = {`bg-[#27292b] rounded-md border-[2px] overflow-hidden w-[40vw] `}
      >
        
      {children}

    </div>,

  document.getElementById('portal')!
  );
}

export default GenericModal;
