import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import {useDispatch, useSelector} from 'react-redux';
import {  useEffect, useState } from "react";

const barColors = {"asks": "rgba(234,13,63,1)", "bids": "rgb(130,202,157)"}


export const OrderBookDepthChart = (props) => {

  const currentOrderBook = useSelector(state => state.orderBook.orderBookList);

  const [showedFullBook, setShowedFullBook] = useState([]);

  useEffect(() => {
      console.log('currentOrderBooka adfadf', currentOrderBook)

      let tempFullBook = [];
      if (currentOrderBook !== null) {
        let bid = currentOrderBook.bidsBook.book.list.head
        let amount = 0
        while (bid !== null) {
          amount += bid.amount
          const culc = currentOrderBook.sellPrice(amount)
          const avgPrice = Math.round(culc[1] / culc[0], -2)
          const newRow = {
            name: avgPrice,
            tooltip: avgPrice,
            bid: amount,
            price: avgPrice
          }
          tempFullBook.unshift(newRow)
          bid = bid.next
        }


        let ask = currentOrderBook.asksBook.book.list.head
        amount = 0
        while (ask !== null) {
          amount += ask.amount
          const culc = currentOrderBook.buyPrice(amount)
          const avgPrice = Math.round(culc[1] / culc[0], -2)
          const newRow = {
            name: avgPrice,
            tooltip: avgPrice,
            ask: amount,
            price: avgPrice
          }
          tempFullBook.push(newRow)
          ask = ask.next
        }
        setShowedFullBook(tempFullBook)
      }

 }, [currentOrderBook]);


  return (
    <BarChart
      width={600}
      height={400}
      data={showedFullBook}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis />
      <XAxis dataKey="price" name="Price" />
      <Bar isAnimationActive={false} dataKey="ask" name="" stackId="a" fill={barColors["asks"]} />
      <Bar isAnimationActive={false} dataKey="bid" unit="" stackId="a" fill={barColors["bids"]} />
    </BarChart>
  );
}