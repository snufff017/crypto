import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';


const userPanelSlice = createSlice({
    name: 'userPanel',
    initialState: {
        buying: [],
        scale: {
            start: 0,
            finish: 0
        }
    },

    // в свойстве reducers создаем экшены
    reducers: {
        calculateBuying(state, action){
            console.log('calculateBuying')
            let currentBuying = {};
            currentBuying['count'] = action.payload[0];
            currentBuying['amount'] = action.payload[1];
            currentBuying['price'] = parseInt((action.payload[1] / action.payload[0]).toFixed(0));
            currentBuying['time'] = moment().format('hh:mm:ss');

            state.buying.push(currentBuying);

            if(state.scale.start !== 0){
                if(state.scale.start > currentBuying['price']){
                    state.scale.start = currentBuying['price']
                }
                if(state.scale.finish < currentBuying['price']){
                    state.scale.finish = currentBuying['price']
                }
            } else {
                state.scale.start = currentBuying['price'];
                state.scale.finish = currentBuying['price'];
            }
        },
    }
})

export default userPanelSlice.reducer

// нужно экшены экспортировать особенным образом
export const {calculateBuying} = userPanelSlice.actions