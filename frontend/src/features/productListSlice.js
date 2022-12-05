import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    data: [],
    loading: true,
    error_: 0
}

export const productListSlice = createSlice({
    name: "products_list",
    initialState,
    reducers: {
        get_products_list_request: (state, action) =>{
            state.loading = true
        },
        get_products_list: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        error_throw: (state, action) => {
            state.error_ = action.payload
            state.loading = false
        }
    },
})

export const getProductListAsync = () => async (dispatch) => {
    try {
        dispatch(get_products_list_request());
        const response = await axios.get('/api/products');
        dispatch(get_products_list(response.data));
    } catch (err) {
        dispatch(error_throw(err.response.data))
    }
};

export default productListSlice.reducer
// export const showProducts = (state) => state.products_list.data;
// export const loading = (state) => state.products_list.loading;
// export const error_ = (state) => state.products_list.error_;
export const { get_products_list_request, get_products_list, error_throw } = productListSlice.actions