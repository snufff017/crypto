import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";

export const SimpleLineChart = (props) => {

  const {data} = props;

  //console.log('dataInitital', data)

  let minValueScale = data?.['bids'][0];
  let maxValueScale = data?.['asks'][0];

  const transformedData = [];

   data['asks'].map((item) => {

    const obj = {
      asks: parseInt(item),
      name: '',
      bids: null,
    };
    transformedData.push(obj)
  })
  //console.log('minValueScale', minValueScale)
  //console.log('maxValueScale', maxValueScale)

  data['bids'].map((item, index) => {

    const obj = {
      bids: item,
      name: '',
      asks: null,
    };

    if(transformedData[index]) {
      transformedData[index]['bids'] = parseInt(item)
    } else {
      transformedData.push(obj)
    }
    
  })

    return (
      <div>
        <LineChart
          width={500}
          height={300}
          data={transformedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis  hide/>
          <YAxis 
          type="number"
          domain={[minValueScale, maxValueScale]}
          />
          <Tooltip />
          <Legend />
          <Line
          type="monotone"
          dataKey="bids"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          isAnimationActive = {false}
          />
          <Line
          type="monotone"
          dataKey="asks"
          stroke="#82ca9d"
          isAnimationActive = {false}
          />
        </LineChart>
      </div>
    )
}