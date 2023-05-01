import React from 'react'
import { useEffect } from 'react'
import ProductDetails from '../components/ProductDetails'
import ProductForm from '../components/ProductForm';
import { useProductContext } from '../hooks/useProductsContext';


export default function Home() {
    const { products, dispatch } = useProductContext()
    //const [products, setProducts] = useState(null); // alternative to useProductContext
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/products');
            const items = await response.json(); // <= [{}]
            if (response.ok) {
                    dispatch({ type: 'new_products', payload: items })
                // setProducts(items);
            }
            if (!response.ok) {
                console.log(response.text());
            }
        }
         fetchProducts();
    },[])
    
    return (
        <div className='home'>
            <div className='products'>
                {products && products.map((product) => {
                    return (<ProductDetails key={product._id} product={product} />)
                })}
            </div>
            <ProductForm />
        </div>
    )
}
