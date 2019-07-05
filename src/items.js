const Price = require('./pricer');
const SubTotal = require('./subTotal');

function Items() {
  price = new Price();
  subTotal = new SubTotal();

  function populateItems(array) {
    const itemsWithPrice = price.price(array);
    const itemsWithSubTotals = subTotal.calculate(itemsWithPrice);
    return itemsWithSubTotals;
  }

  return Object.freeze({
    populateItems,
  });
}

module.exports = Items;
