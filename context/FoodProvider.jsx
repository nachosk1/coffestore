import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; //poder llamar el toastify
import { useRouter } from 'next/router'

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [categoryCurrent, setCategoryCurrent] = useState({})
    const [product, setProduct] = useState({})
    const [modal, setModal] = useState(false)
    const [order, setOrder] = useState([])
    const [name, setName] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const getCategories = async () => {
        try {
            const { data } = await axios('/api/categories');
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        setCategoryCurrent(categories[0])
    }, [categories]) //si no tiene categories, no va a cargar ya que el useEffect anterior donde busca la categoria en la base de datos puede tardar y este useEffect funcione correctamente

    useEffect(() => {
        const newTotal = order.reduce((total, product) => (product.price * product.amount) + total, 0)         //reduce es un acumulador y su valor inicial es 0
        setTotal(newTotal)
    }, [order])

    const handleClickCategory = id => {
        const category = categories.filter(cat => cat.id === id)
        setCategoryCurrent(category[0])
        router.push('/')
    }

    const handleSetProduct = product => {
        setProduct(product)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAddOrder = ({ categoryId, ...product }) => {  // la id de categoria y la imagen no va incluido en el pedido
        if (order.some(productState => productState.id === product.id)) {
            // el producto ya existe. Actualizar la cantidad
            const orderUpdate = order.map(productState => productState.id === product.id ? product : productState)
            setOrder(orderUpdate)
            toast.success('Pedido Actualizado')
        } else {
            // el producto no existe
            setOrder([...order, product])
            toast.success('Agregado al Pedido')
        }
        setModal(false)
    }

    const handleEditAmounts = id => {
        const productUpdate = order.filter(product => product.id === id)
        setProduct(productUpdate[0])
        setModal(!modal)
    }

    const handleDeleteProduct = id => {
        const productUpdated = order.filter(product => product.id !== id)
        setOrder(productUpdated)
    }

    const placeOrder = async e => {   //colocar orden y como va interactuar con la base de datos se coloca async
        e.preventDefault()

        try {   //axios por default recibe una conexion de tipo GET
            await axios.post('/api/orders', { order, name, total, date: Date.now().toString() })

            // Resetear la app
            setCategoryCurrent(categories[0])
            setOrder([])
            setName('')
            setTotal(0)

            toast.success('Pedido Realizado Correctamente')

            setTimeout(() => {
                router.push('/')
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FoodContext.Provider
            value={{
                categories,
                categoryCurrent,
                handleClickCategory,
                product,
                handleSetProduct,
                modal,
                handleChangeModal,
                handleAddOrder,
                order,
                handleEditAmounts,
                handleDeleteProduct,
                name,
                setName,
                placeOrder,
                total
            }}>
            {children}
        </FoodContext.Provider>
    );
};

export const useFood = () => useContext(FoodContext);
