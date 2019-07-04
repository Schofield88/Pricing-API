// require filesystem module
const fs = require('fs');

function Pricer() {
  function getUnitPrice(element, pricing) {
    // this helper function extracts the price of each item from the pricing data
    const item = element;
    const pricingData = pricing;
    let unitPrice;

    pricingData.forEach((priceElement) => {
      if (priceElement.product_id === item.product_id) {
        unitPrice = priceElement.price;
      }
    });

    return unitPrice;
  }

  function price(itemsArray) {
    // assign the passed-in array of order items
    const items = itemsArray;
    // read the pricing.json file
    const rawPricingJson = fs.readFileSync('pricing.json');
    // parse the returned Buffer
    const pricingData = JSON.parse(rawPricingJson).prices;
    const vatData = JSON.parse(rawPricingJson).vat_bands;
    // remaps the array of order items it include the price
    const itemsWithPrice = items.map((item) => {
      const newEntry = {};
      newEntry.product_id = item.product_id;
      newEntry.quantity = item.quantity;
      // use the private helper function getUnitPrice() to recover the item's price
      newEntry.unit_price = getUnitPrice(item, pricingData);

      return newEntry;
    });

    return itemsWithPrice;
  }


  return Object.freeze({
    price,
  });
}

module.exports = Pricer;
