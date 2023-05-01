import { createContext, useReducer } from "react";

//option to manage the reducer actions.
// export const reducerActions = {
//     SetProduct = 'SET_PRODUCTS',
//     CreateProduct = 'CREATE_PRODUCT'
// }
export const ProductContext = createContext();
export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'new_products':
          return {
                products: action.payload
        };
        case 'add_product':
            return {
                products: [action.payload, ...state.products]
            };
        case 'delete_one':
            return {
                products: state.products.filter((p) => p._id !== action.payload._id)
            };
        default:
            return state;
    }
}
export const ProductContextProvider = ({ children }) => {
    //the "children" is whatever this function is wraping in index.js file, where it is used.
    const [state, dispatch] = useReducer(productsReducer, { products: null });
    return (
        <ProductContext.Provider value={{ ...state, dispatch }}>
            {children}
            {/* passing on the values to all the children thet productContext is wraping */}
        </ProductContext.Provider>
    )
}