
export const Node = function (price) {
    this.price = price;
    this.previous = null;
    this.next = null;
}

Node.prototype.updateNeighbors = function() {
    let nextNode = this.next
    let prevNode = this.previous

    if (prevNode !== null) {
        prevNode.next = this
    }
    if (nextNode !== null) {
        nextNode.previous = this
    }
};

Node.prototype.switchNeighborsOnRemoving = function() {
    let nextNode = this.next
    let prevNode = this.previous
    
    if (prevNode !== null) {
        prevNode.next = nextNode
    }
    if (nextNode !== null) {
        nextNode.previous = prevNode
    }
};
