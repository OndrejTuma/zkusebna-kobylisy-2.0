import Modal from 'Components/generic/Modal'

interface HowToModalProps {
  isOpen: boolean
  onClose: () => void
}

const HowToModal = ({ isOpen, onClose }: HowToModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Title>Jak vytvořit novou rezervaci?</Modal.Title>
      <Modal.Content>
        <ol>
          <li>
            V kalendáři zjistěte, zda váš termín nekoliduje s jinou rezervací.
          </li>
          <li>Zvolte si datum a čas rezervace.</li>
          <li>
            Vyplňte všechny požadované údaje jako název akce (např. svatba
            Josefky Novákové), jméno a kontakt toho, kdo si rezervuje a účel
            rezervace.
          </li>
          <li>
            Vyberte si položky (u položek uvidíte, zda je možné je rezervovat).
          </li>
          <li>Rezervaci odešlete a vyčkejte na její schválení.</li>
          <li>
            Případnou platbu poukazujte na účet číslo 2101195475 / 2010
            (preferujeme),{' '}
            <strong>do zprávy pro příjemce napište název akce</strong>.
          </li>
          <li>Nebo hotově správci zkušebny.</li>
        </ol>
      </Modal.Content>
    </Modal>
  )
}

export default HowToModal
