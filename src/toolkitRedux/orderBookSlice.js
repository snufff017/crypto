import {createSlice} from '@reduxjs/toolkit';

const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState: {  
        orderBookList: {},
        asksSorted: [],
        bidsSorted: [],
    },

    // в свойстве reducers создаем экшены
    reducers: {
        setOrderBook(state, action) {
            console.log('setOrderBook')
            return {
                ...state,
                orderBookList: {
                    ...action.payload
                },
            }
        },
        setSortedAsksAndBidsOrderBook(state, action) {
            state.asksSorted  = action.payload.asks;
            state.bidsSorted  = action.payload.bids; 
        },
        setTestOrderBook(state, action) {
            return {
                ...state,
                orderBookList: {
                    ...action.payload
                },
            }
        },

    }
})

export default orderBookSlice.reducer

export const {setOrderBook,  setSortedAsksAndBidsOrderBook, setTestOrderBook} = orderBookSlice.actions;