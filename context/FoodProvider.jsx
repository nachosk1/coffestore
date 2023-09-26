import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [categoryCurrent, setCategoryCurrent] = useState({})

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
    }


    return (
        <FoodContext.Provider
            value={{
                categories,
                categoryCurrent,
                handleClickCategory
            }}>
            {children}
        </FoodContext.Provider>
    );
};

export const useFood = () => useContext(FoodContext);
