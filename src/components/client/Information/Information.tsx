import React from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
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
            <strong>pouze pro potřeby farnosti Kobylisy</strong>.
          </Typography>
          <Typography my={2}>
            Zde si můžete k zapůjčení rezervovat zkušebnu, zvukovou techniku a
            hudební nástroje.
          </Typography>
          <Typography mt={2}><strong>DŮLEŽITÉ!!!</strong></Typography>
          <Typography mb={2}>
            Před rezervací zkušebny zkontrolujte, zda vaší rezervací nebudete
            rušit akci v kostele nebo knihovně. <Link href='http://zkusebna-kobylisy.cz/ticho-ve-zkusebne/'>„Ticho“ ve zkušebně</Link>
          </Typography>
          <Typography my={2} sx={{ fontSize: 20 }}>
            Pomoc, dotazy, nápady a připomínky pište na{' '}
            <Link href='mailto:zkusebna.terezicka@gmail.com'>
              zkusebna.terezicka@gmail.com
            </Link>
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
