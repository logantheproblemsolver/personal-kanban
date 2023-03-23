'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter();


  const url = new URL(window.location.href)
  const [authCode, setAuthCode] = useState(null);
  console.log(router);
  console.log(url, url.searchParams.get('code'));

  useEffect(() => {
    
    if (url.searchParams.get('code')) {
      const data = {
        'grant_type': 'authorization_code',
        'client_id': process.env.NEXT_PUBLIC_JIRA_CLIENT_ID,
        'client_secret': process.env.NEXT_PUBLIC_JIRA_CLIENT_SECRET,
        'code': url.searchParams.get('code'),
        'redirect_uri': process.env.NEXT_PUBLIC_REDIRECT_URI
      };
      setAuthCode(url.searchParams.get('code'));
      // TODO: make post request to get token info
      fetch('/api/jiraAuth', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          console.log('res', res);
          return res.text();
        })
        .then((data) => {
          console.log('data', data);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }, [url]);
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
    
      <div className={styles.center}>
        <a href={`${process.env.NEXT_PUBLIC_JIRA_AUTH_CODE_URL}`}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </a>

        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
