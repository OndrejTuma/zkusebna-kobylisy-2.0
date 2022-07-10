import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import MUIModal from '@mui/material/Modal'
import Close from '@mui/icons-material/Close'
import Button from 'Components/generic/Button'
import React from 'react'

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}
const closeButtonStyle = {
  position: 'absolute',
  right: 0,
  top: 0,
  p: 1,
  minWidth: 0,
}

type Props = {
  children?: React.ReactNode,
  open: boolean,
  onClose: () => void,
}

const Modal = ({ children, open, onClose }: Props) => {
  return (
    <MUIModal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Button variant="text" sx={closeButtonStyle}>
            <Close onClick={onClose}/>
          </Button>
          {children}
        </Box>
      </Fade>
    </MUIModal>
  )
}

export default Modal