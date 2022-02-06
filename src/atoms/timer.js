import { useState, useEffect } from "react";
import styled from 'styled-components';
import moment from "moment";

const Time = styled.div`
    position: relative;
    text-align: center;
    margin: 0 0 12px 0;
    font-size: 12px;
    border: 1px dotted;
    padding: 16px 0;
`

export default function Timer() {

    const [currentTime, setCurrentTime] = useState(moment().format('hh:mm:ss'));

    useEffect(() => {
        const timer = setInterval(() => { 
            setCurrentTime(moment().format('hh:mm:ss'));
          }, 1000);
          return () => {
            clearInterval(timer);
          }
    }, [currentTime]);

    return(
        <Time>{currentTime}</Time>
    )

}