import type { NextApiRequest, NextApiResponse } from 'next'

import { createOAuthClient, createRequestUserConsentUrl } from '../../../services/google'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_SECRET_KEY && process.env.GOOGLE_REDIRECT_URI) {
    const oAuthClient = createOAuthClient(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_KEY, process.env.GOOGLE_REDIRECT_URI)
    const requestUserConsentUrl = createRequestUserConsentUrl(oAuthClient)

    res.redirect(requestUserConsentUrl)
  }

  res.status(500)
}
