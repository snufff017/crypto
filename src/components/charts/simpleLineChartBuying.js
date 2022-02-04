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

export const SimpleLineChartBuying = (props) => {

  const {buying, scale} = props.data;

    return (
      <div>
        <LineChart
          width={500}
          height={300}
          data={buying}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" fontSize='12px' />
          <YAxis fontSize='14px'
          type="number"
          //domain={[33000, 34000]}
           domain={[scale.start, scale.finish]}
          />
          <Tooltip />
          <Legend />

          <Line
          type="monotone"
          dataKey="price"
          stroke="#82ca9d"
          isAnimationActive = {false}
          />
        </LineChart>
      </div>
    )
}