import { Overlay, Underlay } from '@/components/Overlay'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
