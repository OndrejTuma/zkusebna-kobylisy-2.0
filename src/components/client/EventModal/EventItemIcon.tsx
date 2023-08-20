import ListItemIcon from '@mui/material/ListItemIcon'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import CableIcon from '@mui/icons-material/Cable'
import MicIcon from '@mui/icons-material/Mic'
import CampaignIcon from '@mui/icons-material/Campaign';
import TuneIcon from '@mui/icons-material/Tune';
import LyricsIcon from '@mui/icons-material/Lyrics';
import PermCameraMicIcon from '@mui/icons-material/PermCameraMic';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';

interface EventItemIconProps {
  categoryId?: string
}

const EventItemIcon = ({ categoryId }: EventItemIconProps) => {
  let icon

  switch (categoryId) {
    case '62c5a079180acca8f5d88609': // Zkušebna
      icon = <RecordVoiceOverIcon />
      break
    case '62e03493f1204056ce5afec8': // Kabely prodlužovací
    case '62e034a4f1204056ce5afedb': // Kabely mikrofonové
    case '62e034c6f1204056ce5afefa': // Kabely nástrojové
    case '62f3726f5da040f39c3abdaf': // Kabely napájecí
      icon = <CableIcon />
      break
    case '62f3734a5da040f39c3abde5': // Mikrofony na zpěv
    case '62f3737f5da040f39c3abe06': // Mikrofony nástrojové
      icon = <MicIcon />
      break
    case '62c5a15c180acca8f5d8866e': // Nástroje
      icon = <MusicNoteIcon />
      break
    case '62cac25a6c722ddc352a8bf3': // Reproduktory
      icon = <CampaignIcon />
      break
    case '62cac2486c722ddc352a8be0': // Mixy a DI boxy
      icon = <TuneIcon />
      break
    case '62f376415da040f39c3abe72': // Stojany na mikrofon
      icon = <PermCameraMicIcon />
      break
    case '62f375f35da040f39c3abe55': // Stojany na noty
      icon = <LyricsIcon />
      break
    case '62cac2676c722ddc352a8c08': // Stojany
      icon = <SurroundSoundIcon />
      break
    default:
      icon = <MusicNoteIcon />
  }

  return <ListItemIcon sx={{ minWidth: 35 }}>{icon}</ListItemIcon>
}

export default EventItemIcon
