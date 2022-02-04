import { DoublyList } from "./DoublyList";

export const Bids = function () {
    this.list = new DoublyList();
}

Bids.prototype.getList = function() {
    return this.list
};

Bids.prototype.getNodePositionEndAt = function(node, price) {

    // одинак
    if(node.price === price){
        return [node.previous, node.next];
    }

    if(node.price > price) {
       return [node, null];
    }

    // одинак
    if(node.previous === null) {
        return [null, node];
    }

    if((node.price <= price) && (node.previous.price > price)) {
        return [node.previous, node];
    }

    return this.getNodePositionEndAt(node.previous, price) 
};

Bids.prototype.getNodePositionStartFrom = function(node, price) {

    // одинак
    if(node.price === price){
        return [node.previous, node.next];
    }

    if(node.price < price) {
       return [null, node];
    }

    // одинак
    if(node.next === null) {
        return [node, null];
    }

    if((node.price > price) && (node.next.price < price)) {
        return [node, node.next];
    }
    return this.getNodePositionStartFrom(node.next, price)
};

Bids.prototype.getCustomPosition = function(middlePrice, price) {

    if(middlePrice <= price) {
       return this.getNodePositionStartFrom(this.getList().head, price)
    }

    return this.getNodePositionEndAt(this.getList().tail, price)
};