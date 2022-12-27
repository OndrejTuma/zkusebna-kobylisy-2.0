import Token from 'Models/Token'
import { NextApiResponse } from 'next'

const getTokenData = async (res: NextApiResponse) => {
  const tokens = await Token.findOne()

  if (!tokens) {
    throw new Error('Chybí token pro Google kalendář a nelze zobrazit rezervace. Navštivte stránku /auth kde si token vygenerujete')
  }

  if (!tokens.calendar_id) {
    throw new Error('Není definovaný kalendář pro rezervace. Navštivte stránku /auth kde si vygenerujete token a zvolíte kalendář')
  }

  return {
    accessToken: tokens?.access_token,
    token: tokens?.refresh_token,
    calendarId: tokens?.calendar_id,
  }
}

export default getTokenData