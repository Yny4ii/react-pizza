import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchValue: '',
    currentPage: 1,
    categoryId: 0,
    sortType: {name: 'популярности', sort: 'rating'},

}
export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action){
            state.searchValue = action.payload;
        },
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSortType(state, action) {
            state.sortType = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
            state.sortType = action.payload.sortType;
        },

    }
})

export const {setSearchValue,setCategoryId, setSortType, setCurrentPage, setFilters} = filterSlice.actions
export default filterSlice.reducer