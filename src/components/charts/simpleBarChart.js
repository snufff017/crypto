import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar
  } from "recharts";

export const SimpleBarChart = (props) => {

  const {data} = props;


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
        <BarChart width={730} height={250} data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide/>
          <YAxis domain={[minValueScale, maxValueScale]}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="asks" fill="rgba(227,65,93,1.00)" isAnimationActive = {false} />
          <Bar dataKey="bids" fill="rgba(107,179,114,1.00)" isAnimationActive = {false} />
        </BarChart>
      </div>
    )
}