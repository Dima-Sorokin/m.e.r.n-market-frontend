import { useProductContext } from "../hooks/useProductsContext";

const ProductDetails = ({ product }) => {
    const { dispatch } = useProductContext()
    const deleteHandler = async () => {
        const response = await fetch('/api/products/' + product._id, {
            method: 'DELETE'
        })
        const item = await response.json();
        if (response.ok) {
            dispatch({ type: 'delete_one', payload: item })
        }
        if (!response.ok){
            console.log(response.text());
        }
    }
    
    return (
        <div className="product-details">
            <h3>{product.name}</h3>
            <h4>Price: {product.price}</h4>
            <h4>In stock: {product.quantity}</h4>
            <h4>Description: </h4><p>{product.description}</p>
            <button className={'deletBtn'} onClick={deleteHandler}>Delete</button>
        </div>
    )
}
export default ProductDetails;