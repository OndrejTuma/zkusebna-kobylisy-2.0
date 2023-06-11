import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Modal from 'Components/generic/Modal'
import Stepper, { useStepper } from 'Components/generic/Stepper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

interface HowToModalProps {
  isOpen: boolean
  onClose: () => void
}

const steps = ['', '', '', '', '']

const HowToModal = ({ isOpen, onClose }: HowToModalProps) => {
  const { activeStep, handleNext, handleBack } = useStepper()

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Title>Jak vytvořit novou rezervaci?</Modal.Title>
      <Modal.Content>
        <Box mb={4}>
          <Stepper activeStep={activeStep} steps={steps} />
        </Box>
        {activeStep === 0 ? (
          <>
            <Typography variant='h6'>Jednodenní rezervace</Typography>
            <Typography>
              Pokud chcete vytvořit rezervaci na jediný den, stačí kliknout na
              políčko v kalendáři.
            </Typography>
            <Image
              src='/howto/single-day-pick.webp'
              alt='Jednodenní rezervace'
              width={536}
              height={341}
            />
          </>
        ) : activeStep === 1 ? (
          <>
            <Typography variant='h6'>Vícedenní rezervace</Typography>
            <Typography>
              Pro rezervaci na více dní můžete kliknout a táhnout myší.
            </Typography>
            <Image
              src='/howto/multiple-days-pick.webp'
              alt='Vícedenní rezervace'
              width={536}
              height={341}
            />
          </>
        ) : activeStep === 2 ? (
          <>
            <Typography variant='h6'>Výběr času</Typography>
            <Typography>
              V rezervaci můžete dodatečně upravit datum i čas
            </Typography>
            <Image
              src='/howto/time-pick.webp'
              alt='Výběr času'
              width={536}
              height={341}
            />
          </>
        ) : activeStep === 3 ? (
          <>
            <Typography variant='h6'>Výběr položek</Typography>
            <Typography>
              Již zarezervované položky se zobrazí, ale není možné je vybrat.
            </Typography>
            <Typography>
              Vyberte položky, které potřebujete a klikněte na tlačítko{' '}
              <strong>Rezervovat</strong>
            </Typography>
            <Typography>
              Vytvoření rezervace může chvíli trvat, mějte prosím strpení a
              vyčkejte, dokud se rezervační okno nezavře.
            </Typography>
            <Typography>
              Měli byste poté vidět svojí rezervaci v kalendáři
            </Typography>
            <Image
              src='/howto/items-pick.webp'
              alt='Výběr položek'
              width={536}
              height={341}
            />
          </>
        ) : (
          <>
            <Typography variant='h6'>Potvrzující email</Typography>
            <Typography>Poté vyčkejte na potvrzující email.</Typography>
            <Image
              src='/howto/confirm-email.webp'
              alt='Potvrzující email'
              width={536}
              height={341}
            />
          </>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Stack justifyContent='space-between' direction='row'>
          <Button
            disabled={activeStep === 0}
            variant='outlined'
            onClick={handleBack}
          >
            Předchozí
          </Button>
          <Button
            disabled={activeStep >= steps.length - 1}
            variant='outlined'
            onClick={handleNext}
          >
            Další
          </Button>
        </Stack>
      </Modal.Actions>
    </Modal>
  )
}

export default HowToModal
