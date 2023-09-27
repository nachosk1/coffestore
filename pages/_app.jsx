import '@/styles/globals.css'
import { FoodProvider } from '@/context/FoodProvider'

export default function App({ Component, pageProps }) {
  return (
    <FoodProvider>
      <Component {...pageProps} />
    </FoodProvider>
  )
}
