const Price = require('./price');
const SubTotal = require('./subTotal');

class Items {
  constructor() {
    this.price = new Price();
    this.subTotal = new SubTotal();
  }

  buildItems(array) {
    // call the Price and SubTotal factory functions and collect the processed items array
    const itemsWithPrice = this.price.price(array);
    const itemsWithSubTotals = this.subTotal.calculate(itemsWithPrice);
    return itemsWithSubTotals;
  }
}
module.exports = Items;
