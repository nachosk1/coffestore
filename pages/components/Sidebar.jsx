import Image from "next/image"
import { useFood } from "@/context/FoodProvider"
import Category from './Category'

export default function Sidebar() {
    const { categories } = useFood()
    return (
        <>
            <div className="w-full flex items-center justify-center py-4">
                <Image src={'/assets/img/logo.svg'} width={200} height={200} alt="Imagen logotipo" priority={true} style={{ width: '150px', height: '150px' }}/>
            </div>
            <nav className="mt-5">
                {categories.map(category => (
                    <Category
                        key={category.id}
                        category={category}
                    />
                ))}
            </nav>
        </>
    )
}
