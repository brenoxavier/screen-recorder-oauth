import type { NextApiRequest, NextApiResponse } from 'next'

import { createOAuthClient, requestGoogleAccessToken } from '../../../services/google'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_SECRET_KEY && process.env.GOOGLE_REDIRECT_URI) {
    const oAuthClient = createOAuthClient(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_KEY, process.env.GOOGLE_REDIRECT_URI)
    const authorizationToken = typeof req.query.code === 'string' ? req.query.code : req.query.code[0]
    const tokens = await requestGoogleAccessToken(oAuthClient, authorizationToken)
  
    if (tokens) {
      res.json({
        token: tokens.tokens
      })
    }

    res.status(400)
  }

  res.status(500)
}

