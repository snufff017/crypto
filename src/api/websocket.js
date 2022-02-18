import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrderBook } from "libs/OrderBook";
import { setOrderBook } from "redux/orderBookSlice";

export const wsAPI = createApi({
    reducerPath: 'wsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    
    endpoints: (build) => ({
        getStreamData: build.query({
            queryFn: () => ({ data: [] }),

            async onQueryStarted(
                arg,
                {dispatch, queryFulfilled}
            ) {
                const ws = new WebSocket('wss://beta-ws.kraken.com');
            
                try {
                  
                    const sendRequest = () => {
                        const typeData = {
                            event: "subscribe", 
                            pair: ["XBT/USDT"],
                            reqid: 1,
                            subscription: {
                                name: "book",
                                depth: 10
                            }
                        }
                        ws.send(JSON.stringify(typeData));
                    }

                    const tempOrderBook = new OrderBook();

                    const listener = (event) => {  

                        let parsedData = JSON.parse(event.data)[1];
           
                        if (parsedData && parsedData['as']) {
                            parsedData['as']?.map((node)=> {
                                tempOrderBook.replaceAskPrice(parseFloat(node[0], 10), parseFloat(node[1], 10))
                            })
                        }

                         if (parsedData && parsedData['a']) {
                            parsedData['a']?.map((node)=> {
                                tempOrderBook.replaceAskPrice(parseFloat(node[0], 10), parseFloat(node[1], 10))
                            })
                        }

                         if (parsedData && parsedData['bs']) {
                            parsedData['bs']?.map((node)=> {
                                tempOrderBook.replaceBidPrice(parseFloat(node[0], 10), parseFloat(node[1], 10))
                            })
                        }

                        if (parsedData && parsedData['b']) {
                            parsedData['b']?.map((node)=> {
                                tempOrderBook.replaceBidPrice(parseFloat(node[0], 10), parseFloat(node[1], 10))
                            })
                        }

                        
                    }
                
                       
                   
                    ws.addEventListener('open', sendRequest)
                    // ws.addEventListener('open', setInterval(() => {
                    //     dispatch(setOrderBook(null))
                    //     dispatch(setOrderBook(tempOrderBook))
                    // }, 6000))
                    ws.addEventListener('message', listener)
                } catch {}

             //   ws.close()
            },   
        })
    })
     
})

export const { useGetStreamDataQuery } = wsAPI

  

