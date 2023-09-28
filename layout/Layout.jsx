import Head from "next/head"
import Steps from "../pages/components/Steps"
import ModalProduct from "../pages/components/ModalProduct"
import Sidebar from '@/pages/components/Sidebar'
import Modal from "react-modal"
import { useFood } from "../context/FoodProvider"
import { ToastContainer } from "react-toastify"   // poder llamar el toast para poderlo mostrar
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ['latin'] })

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement("#__next")

export default function Layout({ children, page }) {
  const { modal } = useFood()

  return (
    <div className={inter.className}>
      <Head>
        <title>{`${page}`}</title>
        <meta name="description" content="Cafetería, tu lugar para comer" />
      </Head>
      <div className='flex'>
        <aside className='md:w-4/12 xl:w-1/4 2xl:w-1/5'>
          <Sidebar />
        </aside>
        <main className='md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll'>
          <div className="p-10">
            <Steps />
            {children}
          </div>
        </main>
      </div>
      {modal && (
        <Modal
          isOpen={modal}
          style={customStyles}
        >
          <ModalProduct />
        </Modal>
      )}
      <ToastContainer />
    </div>
  )
}