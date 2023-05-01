import { useState } from "react"
import { useProductContext } from "../hooks/useProductsContext";

const ProductForm = () => {
    const { dispatch } = useProductContext();

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [errorFields, setErrorFields] = useState([]);

    const submitHandler = async (x) => {
        setSuccess(null);
        x.preventDefault();
        const product = { id, name, price, quantity, description };
        const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(product),//the "JSON.stringify()" gonna convert the product from object to json.
            headers: {
                'Content-type': 'application/json'
            }
        })
        const answer = await response.json();
        if (!response.ok) {
            setError(`${answer.error}\n`);
            if (answer.errorFields) { setErrorFields(answer.errorFields) };
        }
        if (response.ok) {
            setError(null);
            setId('');
            setName('');
            setPrice(undefined);
            setQuantity(undefined)
            setDescription('');
            setErrorFields([]);
            dispatch({ type: 'add_product', payload: answer })
            setSuccess(`New product by the name ${name} was created.`)
        }
    }

    return (
        <form className="create" onSubmit={submitHandler}>
            <h3>Add new product</h3>

            <label>ID: </label>
            <input className={errorFields.includes('Id') ? 'error' : ''} type="text" onChange={(x) => { setId(x.target.value) }} value={id} />

            <label>Name: </label>
            <input className={errorFields.includes('Name') ? 'error' : ''} type="text" onChange={(x) => { setName(x.target.value) }} value={name} />

            <label>Price: </label>
            <input className={errorFields.includes('Price') ? 'error' : ''} type="number" onChange={(x) => { setPrice(x.target.value) }} value={price} />

            <label>Quantity: </label>
            <input className={errorFields.includes('Quantity') ? 'error' : ''} type="number" onChange={(x) => { setQuantity(x.target.value) }} value={quantity} />

            <label>Description: </label>
            <textarea 
            className={errorFields.includes('Description') ? 'error' : ''} 
            rows ={3}
            onChange={(x) => { setDescription(x.target.value) }} 
            minLength={3} 
            maxLength={100}
            />

            <button className="button">Create Product</button>
            {success && <div className="seccess">{success}</div>}
            {error && <div className="error">{error}</div>}
        </form>
    );
}
export default ProductForm;