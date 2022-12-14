import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { showErrorMessage } from "./commonSlice";

const initialState = {
    data: [],
    loading: true,
}

export const productListSlice = createSlice({
    name: "products_list",
    initialState,
    reducers: {
        get_products_list_request: (state, action) => {
            state.loading = true
        },
        get_products_list: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        reset: (state) => {
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
        dispatch(showErrorMessage(JSON.parse(err.response.data)))
        dispatch(reset())
    }
};

export default productListSlice.reducer
// export const showProducts = (state) => state.products_list.data;
// export const loading = (state) => state.products_list.loading;
// export const error_ = (state) => state.products_list.error_;
export const { get_products_list_request, get_products_list, reset } = productListSlice.actions