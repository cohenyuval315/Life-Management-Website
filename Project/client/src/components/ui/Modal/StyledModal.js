import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react'
import StyledButton from '../Button/StyledButton';

function DataModal({children}){
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    return (
      <div>
        <StyledButton name={"click"}  handleOnClick={handleOpen}/>
        <Modal
          open={open}
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
                    {/* {React.cloneElement(children, {handleClose:handleClose})} */}
                    {children}
                  </div>
              </div>
              <div style={{display:"inline-flex"}}>
              <StyledButton name={"cancel"}  handleOnClick={() => setOpen(false)}/>
              </div>
          </Box>
        </Modal>
      </div>
    );
}

export default DataModal