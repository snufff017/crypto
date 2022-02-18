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

const barColors = {"asks": "#1f77b4", "bids": "#ff7f0e"}

const data = [
  {
    amt: 40031.8,
    bid: 40031.8,
    name: 40031.8,
    tooltip: 40031.8
  }
];


export const OrderBookDepthChartTest = (props) => {
  let fullBook = [];

  const currentOrderBook = useSelector(state => state.orderBook.orderBookList);

  const [showedFullBook, setShowedFullBook] = useState(fullBook);
  useEffect(() => {
      
      let tempFullBook = [];
      if (currentOrderBook !== null) {
        let bid = currentOrderBook.bidsBook.book.list.head
        let amount = 0
        while (bid !== null) {
          amount += bid.amount
          const newRow = {
            name: bid.price,
            tooltip: bid.price,
            bid: amount,
            price: bid.price
          }
          tempFullBook.unshift(newRow)
          bid = bid.next
        }


        let ask = currentOrderBook.asksBook.book.list.tail
        amount = 0
        while (ask !== null) {
          amount += ask.amount
          const newRow = {
            name: ask.price,
            tooltip: ask.price,
            ask: amount,
            price: ask.price
          }
          tempFullBook.push(newRow)
          ask = ask.previous
        }
      }

      setShowedFullBook(tempFullBook)
 }, [currentOrderBook]);


  return (
    <BarChart
      width={800}
      height={300}
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
      <Bar isAnimationActive={false} dataKey="ask" name="" stackId="a" fill={barColors["bids"]} />
      <Bar isAnimationActive={false} dataKey="bid" unit="" stackId="a" fill={barColors["asks"]} />
    </BarChart>
  );
}