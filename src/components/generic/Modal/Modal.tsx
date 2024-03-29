import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import MUIModal from '@mui/material/Modal'
import Close from '@mui/icons-material/Close'
import Button from 'Components/generic/Button'
import React from 'react'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const modalWrapperStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  p: 4,
}
const modalStyle = {
  position: 'relative',
  maxWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  maxHeight: '100%',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
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
  const theme = useTheme();
  const isAboveMd = useMediaQuery(theme.breakpoints.up('sm'));

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
        <Box sx={modalWrapperStyle}>
          <Box sx={{...modalStyle, minWidth: isAboveMd ? 600 : 300}}>
            <Button variant="text" sx={closeButtonStyle}>
              <Close onClick={onClose}/>
            </Button>
            {children}
          </Box>
        </Box>
      </Fade>
    </MUIModal>
  )
}

export default Modal