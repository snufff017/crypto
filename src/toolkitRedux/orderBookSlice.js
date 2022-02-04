import {createSlice} from '@reduxjs/toolkit';

const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState: {  
        data: null,
        asksSorted: [],
        bidsSorted: [],
    },

    // в свойстве reducers создаем экшены
    reducers: {
        setOrderBook(state, action) {
            state.data  = action.payload 
        },
        setSortedAsksOrderBook(state, action) {
            state.asksSorted  = action.payload;
        },
        setSortedBidsOrderBook(state, action) {
            state.bidsSorted  = action.payload;
        },
    }
})

export default orderBookSlice.reducer

// нужно экшены экспортировать особенным образом
export const {setOrderBook, setSortedAsksOrderBook, setSortedBidsOrderBook} = orderBookSlice.actions