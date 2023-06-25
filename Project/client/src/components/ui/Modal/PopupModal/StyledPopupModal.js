import { Box, Modal, Typography } from '@mui/material';
import React,{useEffect,useState} from 'react'

function StyledPopupModal({children,isOpen,handleSetOpen}){

  function handleClose(){
    handleSetOpen(false)
  }

    return (
      <div>
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#424242',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
                  }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            </Typography>
              <div>
                  <div>
                    {children}
                  </div>
              </div>
          </Box>
        </Modal>
      </div>
    );
}

export default StyledPopupModal