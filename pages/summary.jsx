import { useFood } from "../context/FoodProvider"
import Layout from "../layout/Layout"
import SummaryProduct from "./components/SummaryProduct"

export default function Summary() {
    const { order } = useFood()

    return (
        <Layout page={'Resumen'}>
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl my-10">Revisa tu Pedido</p>
            {order.length === 0 ? (
                <p className="text-center text-2xl">No hay elementos en tu pedido</p>
            ) : (
                order.map(product => (
                    <SummaryProduct
                        product={product}
                    />
                ))
            )}
        </Layout>
    )
}