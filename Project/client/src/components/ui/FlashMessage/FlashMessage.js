import React,{ useContext } from 'react';
import Alert from '../Alert/Alert';
// import Collapse from '@mui/material/Collapse';
import { FlashContext } from '../../../context/FlashProvider';

export default function FlashMessage() {
  const { flashMessage, visible, hideFlash } = useContext(FlashContext);

  return (
    // <Collapse in={visible}>
      <div>
        <Alert type={flashMessage.type || 'info'}  onClose={hideFlash} message={flashMessage.message}/>
      </div>
    // </Collapse>
  );
}