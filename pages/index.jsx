import { useFood } from '@/context/FoodProvider'
import Layout from '@/layout/Layout'
import Product from './components/Product'

export default function Home() {
  const { categoryCurrent } = useFood()

  let nameCategory = categoryCurrent?.name || ''
  console.log(categoryCurrent?.name)

  return (
    <Layout page={`Menu`}>
      <h1 className='text-4xl font-black'>{categoryCurrent?.name}</h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuación
      </p>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {categoryCurrent?.products?.map(product => (
          <Product
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </Layout>
  )
}