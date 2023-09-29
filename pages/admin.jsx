import useSWR from "swr"
import AdminLayout from "../layout/AdminLayout"
import axios from "axios"
import Order from "./components/Order"

export default function Admin() {
    const fetcher = () => axios('/api/orders').then(datas => datas.data)
    const { data, error, isLoading } = useSWR('/api/orders', fetcher, {refreshInterval: 100})

    //console.log(data)

    return (
        <AdminLayout page={'admin'}>
            <h1 className="text-4xl font-black">Panel de administración</h1>
            <p className="text-2xl my-10">Administra tus ordenes</p>
            {data && data.length ?
                data.map(order =>
                    <Order key={order.id} orders={order} />
                ) : (
                    <p>No hay ordenes pendientes</p>
                )}
        </AdminLayout>
    )
}