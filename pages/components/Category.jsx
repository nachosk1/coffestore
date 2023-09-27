import { useFood } from "@/context/FoodProvider"
import Image from "next/image"

export default function Category({ category }) {
    const { name, icon, id } = category// Distroychon
    const { categoryCurrent, handleClickCategory } = useFood()

    return (
        <button
            type="button"
            className={`${categoryCurrent?.id === id ? 'bg-amber-400' : ''} text-2xl font-bold hover:cursor-pointer flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}
            onClick={() => handleClickCategory(id)}     //() esto se llama un callback
        >
            <Image src={`/assets/img/icon_${icon}.svg`} width={70} height={70} alt="Imagen icono" priority={true} style={{ width: '70px', height: '70px' }}/>
            {name}
        </button>

    )
}
