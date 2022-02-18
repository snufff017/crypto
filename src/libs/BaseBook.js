import { AMOUNT_ZERO } from "libs/Consts";

export const BaseBook = function (book) {
    this.book = book
}

BaseBook.prototype.getNodePosition = function(price) {
    let doublyList = this.book.getList()
    if (doublyList.head === null && doublyList.tail === null) {
        return [null, null];
    }
    if (doublyList.head === null) {
        return this.book.getNodePositionEndAt(doublyList.tail, price)
    }
    if (doublyList.tail === null) {
        return this.book.getNodePositionStartFrom(doublyList.head, price)
    }
    let headPrice = doublyList.head.price
    let tailPrice = doublyList.tail.price
    let middlePrice = (headPrice + tailPrice) / 2
    return this.book.getCustomPosition(middlePrice, price)
};


BaseBook.prototype.replacePrice = function(price, amount) {
    let node = this.book.getList().makeOrGetNode(price)
    if (node.previous === null 
            && node.next === null 
            && amount !== AMOUNT_ZERO) {

                let position = this.getNodePosition(price)

        node.previous = position[0]
        node.next = position[1]
    }
    this.book.getList().updateNodeAmount(node, amount)
    this.book.getList().checkEnds(node)
};

BaseBook.prototype.calculateAmountAndCost = function(amount, inverseCurrency) {
    let cumulativeAmount = 0;
    let cumulativeCost = 0;

    let node = this.book.getList().head;
    while(node !== null){
        let cost = node.amount * node.price;

        let itemAmount = node.amount
        if (inverseCurrency) {
            let tempCost = cost
            cost = itemAmount
            itemAmount = tempCost
        }

        if((cumulativeAmount + itemAmount) <= amount){
            cumulativeAmount = cumulativeAmount + itemAmount
            cumulativeCost = cumulativeCost + cost
            if (cumulativeAmount == amount) {
                break
            }
        } else {
            let extraAmount = (cumulativeAmount + itemAmount) - amount
            let needAmount = itemAmount - extraAmount
            let needCost = needAmount * node.price
            if (inverseCurrency) {
                needCost = needAmount / node.price
            }
            cumulativeAmount = cumulativeAmount + needAmount
            cumulativeCost = cumulativeCost + needCost
            break
        }
        node = node.next
    }
    return [cumulativeAmount, cumulativeCost]
};