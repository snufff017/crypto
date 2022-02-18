import {  useEffect, useCallback } from "react";
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import { setSortedAsksAndBidsOrderBook } from "redux/orderBookSlice";
import Timer from "atoms/timer";

const Wrap = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 88px;
    margin-top: 23px;
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

    const currentOrderBook = useSelector(state => state.orderBook.orderBookList);
    const sortedAsks = useSelector(state => state.orderBook.asksSorted);
    const sortedBids = useSelector(state => state.orderBook.bidsSorted);
  
    useEffect(() => {
       //  console.log('113', currentOrderBook)
        if(currentOrderBook !== null && Object.keys(currentOrderBook.asksBook).length){

        let payload = {
            asks: currentOrderBook.asksBook.book.list,
            bids: currentOrderBook.bidsBook.book.list
        }
        dispatch(setSortedAsksAndBidsOrderBook(payload))
        }
        
    }, [currentOrderBook]);
  

    const renderColumn = useCallback(
        (list, typeData) => {
            let row = list.head
            let rows = [];
            let index = 1;
    
            while (row && row !== null) {
                index++;
                rows.push(<Row type={typeData} key={index}>
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
        },
       []
    )

    return(
        <Wrap>
            <Timer />
            <Content>
                {renderColumn(sortedAsks, 'ASKS')}
                {renderColumn(sortedBids, 'BIDS')}
            </Content>
        </Wrap>
        
    )
}