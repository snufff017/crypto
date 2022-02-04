import { Asks } from "libs/Asks"
import { BaseBook } from "libs/BaseBook";
import { Bids } from "libs/Bids";

export const OrderBook = function(){
    var asks = new Asks();
    var bids = new Bids();
    this.asksBook = new BaseBook(asks)
    this.bidsBook = new BaseBook(bids)
}

OrderBook.prototype.replaceAskPrice = function(price, amount) {
    this.asksBook.replacePrice(price, amount)
};

OrderBook.prototype.buyPrice = function(amount, inverseCurrency) {
    return this.asksBook.calculateAmountAndCost(amount, inverseCurrency)
};

OrderBook.prototype.replaceBidPrice = function(price, amount) {
    this.bidsBook.replacePrice(price, amount)
};

OrderBook.prototype.sellPrice = function(amount, inverseCurrency) {
    return this.bidsBook.calculateAmountAndCost(amount, inverseCurrency)
};
