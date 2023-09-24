import { PrismaClient } from '@prisma/client'
import { categories } from './data/categories'
import { products } from './data/products'

const prisma = new PrismaClient()

const main = async (): Promise<void> => {  //tipado de typescript, es una funcionn pero no retorna nada
    try {
        await prisma.category.createMany({
            data: categories  //data requiere prisma, son los datos que se van agregar, entonces uno le pasa categorias
        })
        await prisma.product.createMany({
            data: products
        })
    } catch (error) {
        console.log(error)
    }
}
main()