import { DoublyList } from "./DoublyList";

export const Asks = function () {
    this.list = new DoublyList();
}

Asks.prototype.getList = function() {
    return this.list
};

Asks.prototype.getNodePositionEndAt = function(node, price) {

    if(node.price === price){
        return [node.previous, node.next];
    }

    if(node.price < price) {
       return [node, null];
    }

    if(node.previous === null) {
        return [null, node];
    }

    if((node.price > price) && (node.previous.price < price)) {
        return [node.previous, node];
    }

    return this.getNodePositionEndAt(node.previous, price)
};

Asks.prototype.getNodePositionStartFrom = function(node, price) {

    if(node.price === price){
        return [node.previous, node.next];
    }

    if(node.price > price) {
       return [null, node];
    }

    if(node.next === null) {
        return [node, null];
    }

    if((node.price < price) && (node.next.price > price)) {
        return [node, node.next];
    }
    return this.getNodePositionStartFrom(node.next, price)
};

Asks.prototype.getCustomPosition = function(middlePrice, price) {

    if(middlePrice >= price) {
       return this.getNodePositionStartFrom(this.getList().head, price)
    }

    return this.getNodePositionEndAt(this.getList().tail, price)
};