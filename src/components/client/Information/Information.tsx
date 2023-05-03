import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import useModal from 'Components/generic/Modal/useModal'
import HowToModal from '../HowToModal'

const Information = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Container maxWidth={'lg'}>
        <Box mb={5}>
          <Typography pt={5} pb={2} variant='h1'>
            Vítejte na rezervační stránce kobyliské zkušebny
          </Typography>
          <Typography my={2}>
            Tyto stránky slouží jako rezervační systém{' '}
            <strong>pouze pro potřeby farnosti Kobylisy</strong> nebo výjimečně
            po dohodě se správcem zkušebny i jiným zájemcům.
          </Typography>
          <Typography my={2}>
            Zde si můžete k zapůjčení rezervovat zkušebnu, zvukovou techniku a
            hudební nástroje.
          </Typography>
          <Typography my={2} sx={{ fontSize: 20 }}>
            Pomoc, dotazy a připomínky na zkusebna.kobylisy@centrum.cz
          </Typography>
          <Button variant='text' onClick={showModal}>
            Jak rezervovat?
          </Button>
        </Box>
      </Container>
      <HowToModal isOpen={isOpen} onClose={hideModal} />
    </>
  )
}

export default Information
