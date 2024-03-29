import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./loginSlice";

const initialState = {
    message: undefined,
    type: undefined,
    msg_list: [],
    visible: false,
}

export const commonSlice = createSlice({
    name: "commons",
    initialState,
    reducers: {
        show_success: (state, action) =>{
            state.message = action.payload
            state.type = "success"
            state.visible = false
        },
        show_error: (state, action) =>{
            state.message = action.payload
            state.type = "error"
            state.visible = false
            state.msg_list.push({type: "error", message: action.payload})
        },
        setInitialState: (state,action) =>{
            state.message = undefined
            state.type = undefined
            state.msg_list.pop()
        },
    }
})

export const showSuccessMessage = (message) => async (dispatch) => {
    dispatch(show_success(message))
}

export const handleError = (error) => async (dispatch) => {
    let message = error.response && error.response.data.detail ? error.response.data.detail : error.message
    if (message === "Token is invalid or expired"){
        dispatch(logout());
    }else{
        dispatch(showErrorMessage(message))
    }
}

export const showErrorMessage = (message) => async (dispatch) => {
    console.log(message);
    dispatch(show_error(message))
}

export default commonSlice.reducer
export const {show_error, show_success, setInitialState, setVisibility} = commonSlice.actions