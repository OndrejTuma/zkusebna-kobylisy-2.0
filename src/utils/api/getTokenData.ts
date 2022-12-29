import Token from 'Models/Token'

const getTokenData = async () => {
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
    user: tokens?.user_email,
    calendarId: tokens?.calendar_id,
  }
}

export default getTokenData