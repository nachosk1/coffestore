import { useFood } from '@/context/FoodProvider'
import Layout from '@/layout/Layout'

export default function Home() {
  const {categoryCurrent} = useFood()

  return (
    <Layout page={`Menu`}>
      <h1 className='text-4xl font-black'>{categoryCurrent?.name}</h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuación
      </p>
    </Layout>
  )
}
