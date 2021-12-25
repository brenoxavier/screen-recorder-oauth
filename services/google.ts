import { OAuth2Client } from 'google-auth-library'

export function createOAuthClient(clientId: string, clientSecret: string, redirectUri: string) {
  return new OAuth2Client({ clientId, clientSecret, redirectUri })
}

export function createRequestUserConsentUrl(oAuthClient: OAuth2Client) {
  return oAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube']
  })
}

export async function requestGoogleAccessToken(oAuthClient: OAuth2Client, authorizationToken: string) {
  try {
    return await oAuthClient.getToken(authorizationToken)
  } catch (error) {
    console.error(error)
  }
}