import { useEffect } from "react"
import Layout from "../layout/Layout"

export default function Total() {
    const checkOrder = () => {  // Comprobar pedido

    }

    const placeOrder = e => {   // Colocar pedido
        e.preventDefault()
        console.log('enviando orden')
    }

    return (
        <Layout page={'Total y confirmar pedido'}>
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

            <form onSubmit={placeOrder}>
                <div>
                    <label htmlFor="name" className="block uppercase text-slate-800 font-bold text-xl">Nombre</label>
                    <input type="text" id="name" className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md outline-none" />
                </div>
                <div className="mt-10">
                    <p className="text-2xl">Total a pagar {''}
                        <span className="font-bold">$200</span>
                    </p>
                </div>
                <div className="mt-5">
                    <input type="submit" value={'Confirmar Pedido'} className="w-full lg:w-auto px-5 py-2 text-center rounded uppercase font-bold text-white bg-indigo-600" />
                </div>
            </form>
        </Layout>
    )
}