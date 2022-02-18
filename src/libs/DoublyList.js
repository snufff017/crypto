import { Node } from "libs/Node";
import { AMOUNT_ZERO } from "libs/Consts";

export const DoublyList = function () {
    this._length = 0;
    this.head = null;
    this.tail = null;
    this.nodesByPrice = {};
}

// DoublyList.prototype.add = function(price, amount) {

//     let node = this.makeOrGetNode(price);

//     if (this._length) {

//         this.tail.next = node;
//         node.previous = this.tail;
//         this.tail = node;

//     } else {
//         this.head = node;
//         this.tail = node;
//     }

//     this.nodesByPrice[node?.price] = node;
//     this._length++;

//     return node;
// };

DoublyList.prototype.updateNodeAmount = function(node, amount) {
    node.amount = amount
    if (amount !== AMOUNT_ZERO) {
        node.updateNeighbors()
        this.nodesByPrice[node?.price] = node
        return
    }
    node.switchNeighborsOnRemoving()
    delete this.nodesByPrice[node.price]
    node = null
};

DoublyList.prototype.checkEnds = function(node) {
    if (node.amount === AMOUNT_ZERO) {
        if (this.head === node) {
            this.head = node.next
        }
        if (this.tail === node) {
            this.tail = node.previous
        }
        return
    }
    if (this.head === null) {
        this.head = node
        return
    }
    if (node.next === this.head) {
        this.head = node
        return
    }
    if ((this.tail === null) && (this.head !== node)) {
        this.tail = node
        return
    }
    if (node.previous === this.tail) {
        this.tail = node
    }
};

DoublyList.prototype.makeOrGetNode = function(price) {
    if (this.nodesByPrice[price]) { // todo fix condition
        return this.nodesByPrice[price];
    }
    let node = new Node(price);
    node.price = price
    return node
};
