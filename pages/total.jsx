import { useCallback, useEffect } from "react"
import Layout from "../layout/Layout"
import { useFood } from "../context/FoodProvider"
import { formatMoney } from "../helpers"

export default function Total() {
    const { order, name, setName, placeOrder, total } = useFood()

    const checkOrder = useCallback(() => {
        return order.length === 0 || name === '' || name.length < 3  //retorn un true o false
    }, [order, name])

    useEffect(() => {
        checkOrder()
    }, [order, checkOrder])

    return (
        <Layout page={'Total y confirmar pedido'}>
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

            <form onSubmit={placeOrder}>
                <div>
                    <label htmlFor="name" className="block uppercase text-slate-800 font-bold text-xl">Nombre</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md outline-none" />
                </div>
                <div className="mt-10">
                    <p className="text-2xl">Total a pagar {''}
                        <span className="font-bold">{formatMoney(total)}</span>
                    </p>
                </div>
                <div className="mt-5">
                    <input
                        type="submit"
                        value={'Confirmar Pedido'}
                        className={`${checkOrder() ? 'bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-800'} w-full lg:w-auto px-5 py-2 text-center rounded uppercase font-bold text-white`}
                        disabled={checkOrder()}
                    />
                </div>
            </form>
        </Layout>
    )
}
