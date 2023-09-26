import Head from "next/head"
import { Inter } from 'next/font/google'
import Sidebar from '@/pages/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children, page }) {
  return (
    <>
      <Head>
        <title>Café - {page}</title>
        <meta name="description" content="Cafetería, tu lugar para comer" />
      </Head>
      <div className={inter.className}>
        <div className='flex'>
          <aside className='md:w-4/12 xl:w-1/4 2xl:w-1/5'>
            <Sidebar />
          </aside>
          <main className='md:w-8/12 xl:w-3/4 2xl:w-4/5 md:h-3 bg-blue-200'>
            <div className="p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
