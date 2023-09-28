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
                handleDeleteProduct
            }}>
            {children}
        </FoodContext.Provider>
    );
};

export const useFood = () => useContext(FoodContext);
