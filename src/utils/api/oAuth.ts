import { google } from 'googleapis'
import keys from 'Keys/oauth2.keys.json'

const oAuth2Client = new google.auth.OAuth2(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0],
)

export const setOAuthCredentials = (refreshToken?: string) => oAuth2Client.setCredentials({
  refresh_token: refreshToken,
})

export default oAuth2Client