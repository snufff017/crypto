import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { OrderBook } from "libs/OrderBook";
import { setOrderBook } from "toolkitRedux/orderBookSlice";

const DOMAIN_WS = 'wss://beta-ws.kraken.com';
const TYPE_REQUESTED_DATA = {
    event: "subscribe", 
    pair: ["XBT/USDT"],
    reqid: 1,
    subscription: {
        name: "book",
        depth: 10
    }
}

export const useAPIWebsocket = (wsChannel) => {

    const dispatch = useDispatch();
    const currentOrderBook = useSelector(state => state.orderBook.data);

    const tempOrderBook = new OrderBook();
    const [status, setStatus] = useState("");
    
    
    useEffect(() => {

        wsChannel.current = new WebSocket(DOMAIN_WS);
            
        wsChannel.current.onopen = (event) => {
            wsChannel.current.send(JSON.stringify(
                TYPE_REQUESTED_DATA
            ));
        };	
        wsChannel.current.onmessage = e => {
            
            let data = JSON.parse(e.data)
            if (!data[1]) {
                return
            }

            let parsedData = JSON.parse(e.data)[1]

            if (parsedData['as']) {
                parsedData['as']?.map((node)=> {
                    tempOrderBook.replaceAskPrice(parseFloat(node[0], 10), parseFloat(node[1], 10))
                })
            }
            if (parsedData['a']) {
                parsedData['a']?.map((node)=> {
                    tempOrderBook.replaceAskPrice(parseFloat(node[0], 10), parseFloat(node[1], 10))
                })
            }
            if (parsedData['bs']) {
                parsedData['bs']?.map((node)=> {
                    tempOrderBook.replaceBidPrice(parseFloat(node[0], 10), parseFloat(node[1], 10))
                })
            }
            if (parsedData['b']) {
                parsedData['b']?.map((node)=> {
                    tempOrderBook.replaceBidPrice(parseFloat(node[0], 10), parseFloat(node[1], 10))
                })
            }

            wsChannel.current.onclose = () => setStatus("Соединение закрыто"); 
        }

        return () => wsChannel.current.close();
    }, [])

    useEffect(() => { 

        dispatch(setOrderBook(tempOrderBook))

        const timerId = setInterval(function() {
           dispatch(setOrderBook(null))
           dispatch(setOrderBook(tempOrderBook))
        }, 6000)

        return () => clearInterval(timerId);
    }, [])

    return currentOrderBook;
}  