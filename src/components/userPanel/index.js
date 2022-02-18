import { useEffect, useState, useCallback } from "react";
import Button from 'atoms/Button';
import Input from 'atoms/Input';
import styled from 'styled-components';
import { calculateBuying } from "redux/userPanelSlice";
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
    const currentOrderBook = useSelector(state => state.orderBook.orderBookList);
    const buying = useSelector(state => state.userPanel);

    const debouncedCalculateBuying = debounce((buying) => dispatch(calculateBuying(buying)), 600)  

       useEffect(() => {
        if(currentOrderBook != null) {
            const buying = currentOrderBook.buyPrice(countBuying, false);
         //   console.log('currentOrderBook', currentOrderBook)
            dispatch(calculateBuying(buying))
        }
    }, [currentOrderBook])

    const onClick = (e) => {
        const buying = currentOrderBook.buyPrice(countBuying, false);
        dispatch(calculateBuying(buying)) 
    }

    const stopBuildingChart = () => {
        setIsDisabledBuying(false)
        setIntervalId(clearInterval(intervalId))
    }

    return (
        <div>
            <Input
                type='number'
                onChange={(e) => {setCountBuying(e.target.value)}}
                value={countBuying}
                label='Введите количество валюты'
            />
            <ButtonsWrap>   
                <Button onClick={(e) => {onClick(e)}}text='Calculate'/>
                <Button disabled={!isDisabledBuying} onClick={stopBuildingChart}text='Stop monitoring'/>
            </ButtonsWrap>
            <SimpleLineChartBuying data={buying} />
        </div>
    )
}

export default UserPanel;