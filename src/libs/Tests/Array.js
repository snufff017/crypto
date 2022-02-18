export const ArrayOrderBook = function(){
    this.asksBook = [];
    this.bidsBook = [];
}

ArrayOrderBook.prototype.replaceAskPrice = function(price, amount) {
    this.asksBook = replacePrice(this.asksBook, price, amount, function(node1, node2) {
        if (node1.price > node2.price) {
          return 1; }
        if (node1.price < node2.price) {
          return -1; }
        return 0;
    })
};

ArrayOrderBook.prototype.replaceBidPrice = function(price, amount) {
    this.bidsBook = replacePrice(this.bidsBook, price, amount, function(node1, node2) {
        if (node1.price > node2.price) {
          return -1; }
        if (node1.price < node2.price) {
          return 1; }
        return 0;
    })
};

ArrayOrderBook.prototype.buyPrice = function(amount, inverseCurrency) {
    return calculateAmountAndCost(this.asksBook, amount, inverseCurrency)
};

ArrayOrderBook.prototype.sellPrice = function(amount, inverseCurrency) {
    return calculateAmountAndCost(this.bidsBook, amount, inverseCurrency)
};

const calculateAmountAndCost = function(book, amount, inverseCurrency) {
    let cumulativeAmount = 0;
    let cumulativeCost = 0;

    for(let i = 0; i < book.lenght; i ++){
        let node = book[i]
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
            // если есть отстаток в ОБ (есть остаток после набранного объема)
        } else {

            // 
            let extraAmount = cumulativeAmount + itemAmount - amount
            let needAmount = itemAmount - extraAmount
            let needCost = needAmount * node.price

            if (inverseCurrency) {
                needCost = needAmount / node.price
            }
            cumulativeAmount = cumulativeAmount + needAmount
            cumulativeCost = cumulativeCost + needCost
            break;
        }
    }
    return [cumulativeAmount, cumulativeCost]
};

const replacePrice = (book, price, amount, sortFunc) => {   
    let found = false
    let newBook = []
    book.map((el) => {
        if (el.price === price) {
            found = true;
            if (amount !== 0.0) {
                let newNode = {
                    price: price,
                    amount: amount
                }
                newBook.push(newNode)
            }
        } else {
            newBook.push(el)
        }
    })

    if (!found) {
        let newNode = {
            price: price,
            amount: amount
        }
        newBook.push(newNode)
        newBook.sort(sortFunc) 
    }
    return newBook
}