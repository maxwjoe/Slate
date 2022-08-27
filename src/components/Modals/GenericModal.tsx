import React from "react";
import ReactDom from 'react-dom'
import {useClickOutside} from '../../helper/UIHelpers'

interface Props {
  children : any,
  handleClose : any
}


function GenericModal({children, handleClose} : Props) {
  
  const modalStyles : any = {
    position : 'fixed',
    top : '50%',
    left : '50%',
    transform : 'translate(-50%, -50%)',
    zIndex : 1000
  }

  // Custom Hook to handle cliciing outside the modal
  const domNode = useClickOutside(handleClose)
  
  
  return ReactDom.createPortal(
    <div 
      ref = {domNode}
      style = {modalStyles}
      className = "bg-[#27292b] rounded-md border-[2px] border-slate-accent overflow-hidden w-[40vw] "
      >
        
      {children}

    </div>,

  document.getElementById('portal')!
  );
}

export default GenericModal;
