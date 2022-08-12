import dbConnect from 'Lib/dbConnect'
import Token from 'Models/Token'
import { NextApiResponse } from 'next'

const getTokenData = async (res: NextApiResponse) => {
  await dbConnect()

  const tokens = await Token.findOne()

  if (!tokens) {
    const error = 'Chybí token pro Google kalendář a nelze zobrazit rezervace. Navštivte stránku /auth kde si token vygenerujete'

    res.status(401).end({ error })
  }

  if (!tokens.calendar_id) {
    const error = 'Není definovaný kalendář pro rezervace. Navštivte stránku /auth kde si vygenerujete token a zvolíte kalendář'

    res.status(401).end({ error })
  }

  return {
    accessToken: tokens?.access_token,
    token: tokens?.refresh_token,
    calendarId: tokens?.calendar_id,
  }
}

export default getTokenData