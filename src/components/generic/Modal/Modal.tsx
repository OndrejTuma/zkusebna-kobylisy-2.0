import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import MUIModal from '@mui/material/Modal'
import React from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
        <Box sx={style}>
          {children}
        </Box>
      </Fade>
    </MUIModal>
  )
}

export default Modal