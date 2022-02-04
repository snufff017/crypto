
export const Node = function (price) {
    this.price = price;
    this.previous = null;
    this.next = null;
}

Node.prototype.updateNeighbors = function() {
    var nextNode = this.next
    var prevNode = this.previous

    if (prevNode !== null) {
        prevNode.next = this
    }
    if (nextNode !== null) {
        nextNode.previous = this
    }
};

Node.prototype.switchNeighborsOnRemoving = function() {
    var nextNode = this.next
    var prevNode = this.previous
    
    if (prevNode !== null) {
        prevNode.next = nextNode
    }
    if (nextNode !== null) {
        nextNode.previous = prevNode
    }
};
