import { useEffect, useRef, useCallback } from "react";
import * as _ from 'lodash';
import { useAPIWebsocket } from "hooks";
import MarketView from "components/MarketView";

const {log} = console;

const MainPage = () =>  {

     let wsChannel = useRef(null);
     const orderBook = useAPIWebsocket(wsChannel);

    const dataForChart = {
        asks: [],
        bids: []
    }

    if(orderBook !== null) {
        // dataForChart['asks'] = Object.keys(orderBook?.asksBook?.book?.list?.nodesByPrice);
        // dataForChart['bids'] = Object.keys(orderBook?.bidsBook?.book?.list?.nodesByPrice);
    }
     
    return(
            <MarketView data={dataForChart} />
    )


}

export default MainPage;
