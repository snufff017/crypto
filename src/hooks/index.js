import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { OrderBook } from "libs/OrderBook";
import { ArrayOrderBook } from "libs/Tests/Array";
import { setOrderBook } from "redux/orderBookSlice";

const DOMAIN_WS = 'wss://beta-ws.kraken.com';
const TYPE_REQUESTED_DATA_BTC = {
    event: "subscribe", 
    pair: ["XBT/USDT"],
    reqid: 1,
    subscription: {
        name: "book",
        depth: 10
    }
}
const TYPE_REQUESTED_DATA_ETH = {
    event: "subscribe", 
    pair: ["ETH/USDT"],
    reqid: 1,
    subscription: {
        name: "book",
        depth: 1000
    }
}

const TYPE_REQUESTED_DATA_TRX = {
    event: "subscribe", 
    pair: ["TRX/USD"],
    reqid: 1,
    subscription: {
        name: "book",
        depth: 1000
    }
}

const TYPE_REQUESTED_DATA_ALGO = {
    event: "subscribe", 
    pair: ["ALGO/USD"],
    reqid: 1,
    subscription: {
        name: "book",
        depth: 1000
    }
}

const TYPE_REQUESTED_DATA_LTC = {
    event: "subscribe", 
    pair: ["LTC/USD"],
    reqid: 1,
    subscription: {
        name: "book",
        depth: 100
    }
}


export const useAPIWebsocket = (wsChannel) => {

    const dispatch = useDispatch();
    const currentOrderBook = useSelector(state => state.orderBook.data);

    const tempOrderBook = new OrderBook();
    const [status, setStatus] = useState("");

    let testArray = [];
    let testMap = {};
    
    
    useEffect(() => {

        wsChannel.current = new WebSocket(DOMAIN_WS);
            
        wsChannel.current.onopen = (event) => {
            wsChannel.current.send(JSON.stringify(
                TYPE_REQUESTED_DATA_BTC
            ));
            // wsChannel.current.send(JSON.stringify(
            //     TYPE_REQUESTED_DATA_ETH
            // ));
            // wsChannel.current.send(JSON.stringify(
            //     TYPE_REQUESTED_DATA_TRX
            // ));
            // wsChannel.current.send(JSON.stringify(
            //     TYPE_REQUESTED_DATA_ALGO
            // ));
            // wsChannel.current.send(JSON.stringify(
            //     TYPE_REQUESTED_DATA_LTC
            // ));
        };	
        wsChannel.current.onmessage = e => {
            
            let data = JSON.parse(e.data)
            if (!data[1]) {
              //  console.log("data", data)
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
        }, 4000)

        return () => clearInterval(timerId);
    }, [])

    return currentOrderBook;
}  