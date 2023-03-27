import { auth } from '@googleapis/oauth2'

const oAuth2Client = new auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,
)

export const setOAuthCredentials = (refreshToken?: string) => oAuth2Client.setCredentials({
  refresh_token: refreshToken,
})

export default oAuth2Client