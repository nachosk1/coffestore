import Head from "next/head";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children, page }) {
    return (
        <>
            <Head>
                <title>{`Cafetería ${page}`}</title>
                <meta name="description" content="Quosco Cafetería" />
            </Head>

            <div className="md:flex">
                <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 py-5 bg-gray-200">
                    <div className="flex justify-center">
                        <Image src={'/assets/img/logo.svg'} width={200} height={200} alt="Imagen logotipo" priority={true} style={{ width: '150px', height: '150px' }} />
                    </div>
                    <h2 className="text-center mt-8 text-2xl font-bold">Bienvenido Admin</h2>
                </aside>

                <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                    <div className="p-10">
                        {children}
                    </div>
                </main>
            </div>
            <ToastContainer />
        </>
    );
}