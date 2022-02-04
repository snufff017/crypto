//import useStore from "hooks";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import moment from "moment";
import { setSortedAsksOrderBook, setSortedBidsOrderBook } from "toolkitRedux/orderBookSlice";
//import { useParams } from 'react-router-dom';

const Wrap = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 88px;
    margin-top: 36px;
`
const Time = styled.div`
    position: relative;
    text-align: center;
    margin: 0 0 12px 0;
    font-size: 12px;
    border: 1px dotted;
    padding: 16px 0;
`

const Content = styled.div`
    position: relative;
    display: flex;
   // flex-direction: column;
    > div {
        width: 100%;
    }
`
const Block = styled.div`
    position: relative;
    margin: 0 0 24px 0;
`
const Header = styled.div`
    position: relative;
    margin: 0 0 18px 0;
`

const Row = styled.div`
    position: relative;
    display: flex;
    margin: 0 24px 4px 0;
    color: ${(props) => (props.type === 'ASKS' ? 'rgba(234,13,63,1)' : 'rgba(28,107,59,1)')};
    font-size: 12px;
`
const Col = styled.div`
    position: relative;
    margin: 0 12px 0 0;
    min-width: 80px;
    &:last-child {
        margin: 0;
    }
`
export default function OrderBookView() {

    const dispatch = useDispatch();

    const currentOrderBook = useSelector(state => state.orderBook.data);
    const sortedAsks = useSelector(state => state.orderBook.asksSorted);
    const sortedBids = useSelector(state => state.orderBook.bidsSorted);

    const [currentTime, setCurrentTime] = useState(moment().format('hh:mm:ss'));

    useEffect(() => {
        if(currentOrderBook !== null){
            dispatch(setSortedAsksOrderBook(currentOrderBook.asksBook.book.list));
            dispatch(setSortedBidsOrderBook(currentOrderBook.bidsBook.book.list));
        }
        
    }, [currentOrderBook]);
  
    useEffect(() => {
        const timer = setInterval(() => { 
            setCurrentTime(moment().format('hh:mm:ss'));
          }, 1000);
          return () => {
            clearInterval(timer);
          }
    }, [currentTime]);


    const renderColumn = (list, typeData) => {
        let row = list.head
        let rows = [];
        
        while (row && row !== null) {
            rows.push(<Row type={typeData}>
                <Col>{row.price}</Col>                       
                <Col>{row.amount}</Col>
            </Row>);
            row = row.next
        }

        return (
            <Block>
                <Header>{typeData}</Header>
                {rows}
            </Block>
        )
    }

 //   console.log('currentOrderBook', currentOrderBook)

    return(
        <Wrap>
            <Time>{currentTime}</Time>
            <Content>
                {renderColumn(sortedAsks, 'ASKS')}
                {renderColumn(sortedBids, 'BIDS')}
            </Content>
        </Wrap>
        
    )
}