import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Index.module.css'
import { AiFillGithub } from 'react-icons/ai'

const Home: NextPage = () => {
  function getOS(): string {
    if (navigator.userAgent.indexOf('Mac')) {
      return 'Mac OS'
    } else if (navigator.userAgent.indexOf('Win')) {
      return 'Windows'
    } else if (navigator.userAgent.indexOf('Linux')) {
      return 'Linux'
    }

    return 'Unknown'
  }

  return (
    <>
      <Head>
        <title>Screen Recorder</title>
        <meta name="description" content="Open source screen recorder that uploads the video to YouTube and Google Drive" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.body}>
        <header>
          <nav className={styles.nav}>
            <div>
              <a href='https://brenoxavier.dev'>
                <p className={styles.navOwner}>An open source project by Breno Xavier</p>
              </a>
              <h1 className={styles.navTitle}>Screen Recorder</h1>
            </div>
            <a href='https://github.com/brenoxavier/screen-recorder'>
              <AiFillGithub size="35" />
            </a>
          </nav>
        </header>
        <main className={styles.main}>
          <h1>Record Screen Quickly.</h1>
          <p>Record the screen and automatically upload to YouTube or Google Drive.</p>
          <button>
            Download for MacOS
          </button>
        </main>
        <footer className={styles.footer}>
          <a href='https://github.com/brenoxavier/screen-recorder/blob/main/LICENSE'>
            <p>This software is distributed under MIT license.</p>
          </a>
          <a href='https://brenoxavier.dev'>
            <p>Copyright © 2022 Breno Xavier</p>
          </a>
        </footer>
      </div>
    </>
  )
}

export default Home
