import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
}
export const cartSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {

        addItem(state, action) {
            const findItem = state.items.find(e => e.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({...action.payload, count: 1});
            }
            state.totalPrice = state.items.reduce((ac, e) => e.pizzaPrice * e.count + ac, 0)
        },

        removeItem(state, action) {
            const findItem = state.items.find(e => e.id === action.payload.id);
            if (findItem.count > 0) {
                findItem.count--;

            }
            if (findItem.count === 0) {
                state.items = state.items.filter(e => e.id !== action.payload.id)
            }
        },

        deleteItem(state, action){
            state.items = state.items.filter(e => e.id !== action.payload.id)

        },


        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }

})
export const {addItem, removeItem, clearCart, deleteItem} = cartSlice.actions;
export default cartSlice.reducer;