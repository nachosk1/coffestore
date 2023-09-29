import Image from "next/image"
import { formatMoney } from '../../helpers/index'
import axios from "axios"
import { toast } from "react-toastify"

export default function Order({ orders }) {
    const { id, name, total, order } = orders

    const completeOrder = async () => {
        try {
            await axios.post(`/api/orders/${id}`)
            toast.success('Orden Lista')
        } catch (error) {
            toast.error('Hubo un error')
        }
    }

    return (
        <div className='border p-10 space-y-5'>
            <h3 className="text-2xl font-bold">Orden: {id}</h3>
            <p className="text-lg font-bold">Cliente: {name}</p>

            <div>
                {order.map(dish => (
                    <div key={dish.id} className='py-3 flex border-b last-of-type:border-0 items-center'>
                        <div className='w-32'>
                            <Image src={`/assets/img/${dish.image}.jpg`} width={400} height={500} alt={`Imagen Platillo ${dish.name}`} />
                        </div>
                        <div className="p-5 space-y-2">
                            <h4 className="text-xl font-bold text-amber-500">{dish.name}</h4>
                            <p className="text-lg font-bold">Cantidad: {dish.amount}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 font-black text-4xl text-amber-500">
                    Total a pagar: {formatMoney(total)}
                </p>
                <button className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg" type="button" onClick={completeOrder}>
                    Completar Orden
                </button>
            </div>
        </div>
    )
}
