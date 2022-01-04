import type { GetServerSideProps } from 'next'

import { createOAuthClient, createRequestUserConsentUrl } from '../../services/google'

interface AuthProps {
  consentUrl: string | null
}

function Auth(props: AuthProps) {
  if (props.consentUrl) {
    return (
      <div>
        <h1>Authorize Screen Recorder to access your YouTube account</h1>
        <p>This is necessary to upload the recordings. No data will be saved.</p>
        <a href={props.consentUrl}>
          <button>Continue</button>
        </a>
      </div>
    )
  }

  return (
    <h1>Error! Try again later</h1>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let consentUrl = null

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_SECRET_KEY && process.env.GOOGLE_REDIRECT_URI) {
    const oAuthClient = createOAuthClient(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_KEY, process.env.GOOGLE_REDIRECT_URI)
    consentUrl = createRequestUserConsentUrl(oAuthClient)
  }

  return {
    props: { consentUrl }
  }
}

export default Auth
