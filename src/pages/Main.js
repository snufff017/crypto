import { useEffect, useState, useRef, useCallback } from "react";
//import { useParams } from 'react-router-dom';
import { OrderBook } from "libs/OrderBook";
import * as _ from 'lodash';
import { startDataListening, stopDataListening } from "redux/reducers/main";
import {useDispatch, useSelector} from 'react-redux'
import { addTodo, decrement, increment, removeLastTodo } from "toolkitRedux/toolkitSlice";
import { useGetPokemonByNameQuery } from "toolkitAPI/websocket";
import { useGetStreamDataQuery } from "toolkitAPI/websocket-copy";
import { useAPIWebsocket } from "hooks";
import { SimpleLineChart } from "components/charts/simpleLineChart";
import MarketView from "components/MarketView";
import { SimpleBarChart } from "components/charts/simpleBarChart";
import UserPanel from "components/userPanel";

const {log} = console;

const MainPage = () =>  {

     let wsChannel = useRef(null);
     const orderBook = useAPIWebsocket(wsChannel);

    const dataForChart = {
        asks: [],
        bids: []
    }

      if(orderBook !== null) {
        dataForChart['asks'] = Object.keys(orderBook?.asksBook?.book?.list?.nodesByPrice);
        dataForChart['bids'] = Object.keys(orderBook?.bidsBook?.book?.list?.nodesByPrice);
    }
     
    return(
            <MarketView data={dataForChart} />
    )


}

export default MainPage;
