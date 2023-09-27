import Image from "next/image"
import { formatMoney } from '../../helpers/index'
import { useFood } from "../../context/FoodProvider"

export default function Product({ product }) {
    const { handleSetProduct } = useFood()
    const { name, image, price } = product


    return (
        <div className='border p-3'>
            <Image src={`/assets/img/${image}.jpg`} alt={`Imagen Platillo ${name}`} width={400} height={500} />
            <div className="py-4">
                <h3 className="text-2xl font-bold">{name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatMoney(price)}
                </p>
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => {
                        handleChangeModal()
                        handleSetProduct(product)
                    }}
                >Agregar</button>
            </div>
        </div>
    )
}
