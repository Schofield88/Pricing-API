const Price = require('./price');
const SubTotal = require('./subTotal');

function Items() {
  price = new Price();
  subTotal = new SubTotal();

  function buildItems(array) {
    const itemsWithPrice = price.price(array);
    const itemsWithSubTotals = subTotal.calculate(itemsWithPrice);
    return itemsWithSubTotals;
  }

  return Object.freeze({
    buildItems,
  });
}

module.exports = Items;
