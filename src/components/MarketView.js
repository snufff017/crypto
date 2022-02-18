// rgb(0 0 0)

import styled from 'styled-components'
import { SimpleBarChart } from './charts/simpleBarChart'
import { SimpleLineChart } from './charts/simpleLineChart';
import { OrderBookDepthChart } from './charts/orderBookDepthChart';
import UserPanel from './userPanel';
import {useDispatch, useSelector} from 'react-redux';
import OrderBookView from './OrderBookView';
import {  useEffect, useState } from "react";

const Layout = styled.div`
    min-height: 320px;
   // background: rgb(0 0 0);

    user-select: none;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`
const Body = styled.div`
    display: flex;
    flex: 1 1 auto;
  //  flex-direction: column;
`

const Content = styled.div`
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    max-width: 600px;
`

const SideBar = styled.div`
    position: relative;
    display: flex;
  //  flex: 1 1 auto;
    flex-direction: column;
`


 const MarketView = ({data}) => {


    return (
        <Layout>
            <Body>
                <Content>
                <UserPanel />
                    <OrderBookDepthChart /> 

                </Content>
               
                <SideBar>
                   
                    <OrderBookView ></OrderBookView>
                </SideBar>
            </Body>
        </Layout>
    )
}

export default MarketView;