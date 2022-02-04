import { useEffect, useState, useCallback } from "react";
import Button from 'atoms/Button';
import Input from 'atoms/Input';
import styled from 'styled-components';
import { calculateBuying } from "toolkitRedux/userPanelSlice";
import {useDispatch, useSelector} from 'react-redux';
import { SimpleLineChartBuying } from 'components/charts/simpleLineChartBuying'

import { debounce } from "lodash";

const ButtonsWrap = styled.div`
    position: relative;
    display: flex;
    margin: 0 0 12px 75px;
`

const UserPanel = () => {

    const [intervalId, setIntervalId] = useState();
    const [countBuying, setCountBuying] = useState(1);
    const [isDisabledBuying, setIsDisabledBuying] = useState(false);

    const dispatch = useDispatch();
    const currentOrderBook = useSelector(state => state.orderBook.data);
    const buying = useSelector(state => state.userPanel);

    const debouncedCalculateBuying = debounce((buying) => dispatch(calculateBuying(buying)), 600)  
   
    useEffect(() => {

        if(currentOrderBook != null && countBuying) {
            const buying = currentOrderBook.buyPrice(countBuying, false);
            dispatch(calculateBuying(buying))
           // dispatch(calculateBuying(buying))
          //  debouncedCalculateBuying(buying)
        }
        
       
    }, [currentOrderBook])

       useEffect(() => {

        if(currentOrderBook != null && countBuying) {
            const buying = currentOrderBook.buyPrice(countBuying, false);
           // dispatch(calculateBuying(buying))
            debouncedCalculateBuying(buying)
        }
        
       
    }, [currentOrderBook, countBuying])

    const onClick = (e) => {

        if(intervalId) {
            setIntervalId(clearInterval(intervalId));
        }

        setIsDisabledBuying(true);

        let intervalIdCurrent = setInterval(() =>{
            const buying = currentOrderBook.buyPrice(countBuying, false);
            dispatch(calculateBuying(buying))
        }, 5000);

        setIntervalId(intervalIdCurrent)
        
    }

    const stopBuildingChart = () => {
        setIsDisabledBuying(false)
        setIntervalId(clearInterval(intervalId))
    }
    console.log('currentOrderBook', currentOrderBook)
    return (
        <div>
            <Input
                type='number'
                onChange={(e) => {setCountBuying(e.target.value)}}
                value={countBuying}
                label='Введите количество валюты'
            />
            <ButtonsWrap>   
                <Button onClick={onClick}text='Calculate'/>
                <Button disabled={!isDisabledBuying} onClick={stopBuildingChart}text='Stop monitoring'/>
            </ButtonsWrap>
            <SimpleLineChartBuying data={buying} />
        </div>
    )
}

export default UserPanel;