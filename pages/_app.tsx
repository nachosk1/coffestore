import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { FoodProvider } from '@/context/FoodProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FoodProvider>
      <Component {...pageProps} />
    </FoodProvider>
  )
}
