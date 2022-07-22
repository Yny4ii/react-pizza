import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: "loading"
}

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
    console.log(params)
    const {api, currentPage, category, sortType, typeOfSort, search} = params;
    const {data} = await axios.get(`${api}?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sort}&order=${typeOfSort}${search}`)
    return data
})

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers:{
        [fetchPizza.pending]: (state)=>{
            state.status = 'loading';
            state.items = []
        },

        [fetchPizza.fulfilled] :(state, action)=>{
            state.status = 'success';
            state.items  = action.payload
        },
        [fetchPizza.rejected] : (state)=>{
            state.status = 'error';
            state.items = [];
        }
    }
})

export const {setItems} = pizzaSlice.actions
export default pizzaSlice.reducer