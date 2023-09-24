import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Link from '@mui/material/Link'
import { Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'

const QuietTime = () => {
  // Clicking on Icon should not trigger parent's onClick
  const handleStopPropagation = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => e.stopPropagation()

  return (
    <Tooltip
      onMouseDown={handleStopPropagation}
      title={
        <Typography>
          V čas vaší rezervace probíhá akce v kostele/knihovně. Ujistěte se, že
          nebudete rušit{' '}
          <Link
            color='inherit'
            target='_blank'
            href='http://zkusebna-kobylisy.cz/ticho-ve-zkusebne/'
          >
            ticho ve zkušebně
          </Link>
        </Typography>
      }
      arrow
    >
      <WarningAmberIcon color='warning' sx={{ verticalAlign: 'middle' }} />
    </Tooltip>
  )
}

export default QuietTime
