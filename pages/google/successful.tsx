import type { GetServerSideProps } from 'next'
import { useEffect } from 'react'

import { createOAuthClient, requestGoogleAccessToken } from '../../services/google'

interface SuccessfulProps {
  screenRecorderUrl?: string
}

function Successful(props: SuccessfulProps) {
  useEffect(() => {
    if (props.screenRecorderUrl) {
      window.location.href = props.screenRecorderUrl
    }
  })

  return (
    <div>
      <h1>Successful!</h1>
      <p>Authentication was successful! You will be redirected back to Screen Recorder</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  let screenRecorderUrl = null

  if (typeof context.query.code === 'string') {
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_SECRET_KEY && process.env.GOOGLE_REDIRECT_URI) {
      const oAuthClient = createOAuthClient(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_KEY, process.env.GOOGLE_REDIRECT_URI)
      const tokens = await requestGoogleAccessToken(oAuthClient, context.query.code)

      if (tokens) {
        const token = tokens.tokens.access_token

        if (token) {
          screenRecorderUrl = `screen-recorder://sr.brenoxavier.dev?token=${token}`
        }
      }
    }
  }

  return {
    props: {
      screenRecorderUrl
    }
  }
}

export default Successful
