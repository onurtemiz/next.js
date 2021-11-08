import {useEffect, useState} from "react"
import Script from "next/script"

import s from "../styles/lazy.module.css"

export default function Lazyload() {
  const [log, setLog] = useState([])

  useEffect(() => {
    setLog(() => log.concat({time: new Date(), text: `Page loaded window.FB is undefined`}))
  }, [])

  return (
    <>
      {/* We lazy load the FB SDK */}
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() => setLog(log => log.concat({time: new Date(), text: `script loaded correctly, window.FB has been populated`}))}
      />

      <main className={s.container}>
        <h1>Lazy Loading FB sdk</h1>
        <h5>You can check `window.FB` on browser console</h5>
        <ul>
          {log.map(({time, text}) => (
            <li key={+time}>{time.toISOString()}: {text}</li>
          ))}
        </ul>
      </main>
    </>
  )
}