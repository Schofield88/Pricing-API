// require filesystem module
const fs = require('fs');

function Price() {
  // this helper function extracts the price of each item from the pricing data
  function getUnitPrice(element, pricing) {
    const item = element;
    const pricingData = pricing;
    let unitPrice;
    // Iterate through the pricing data until the product IDs match, then pull
    // the price from that object
    pricingData.prices.forEach((priceElement) => {
      if (priceElement.product_id === item.product_id) {
        unitPrice = priceElement.price;
      }
    });

    return unitPrice;
  }

  function getUnitVat(element, pricing) {
    const item = element;
    const pricingData = pricing;
    let vat;
    // Iterate through the pricing data to find the right product id, then
    // use the VAT band from that object to get the VAT rate
    pricingData.prices.forEach((priceDataElement) => {
      if (priceDataElement.product_id === item.product_id) {
        const unitPrice = priceDataElement.price;
        const vatBand = priceDataElement.vat_band;
        const rate = pricingData.vat_bands[vatBand];
        vat = unitPrice * rate;
      }
    });
    // return the VAT figure rounded to the nearest penny
    return Math.round(vat);
  }

  function price(itemsArray) {
    // assign the passed-in array of order items
    const items = itemsArray;
    // read the pricing.json file
    const rawPricingJson = fs.readFileSync('pricing.json');
    // parse the returned Buffer
    const pricingData = JSON.parse(rawPricingJson);
    // remaps the array of order items to include pricing data
    const itemsWithPrice = items.map((item) => {
      const newEntry = item;
      // use the private helper function getUnitPrice() to recover the item's price
      newEntry.unit_price = getUnitPrice(item, pricingData);
      // use the private helper getUnitVat() to recover VAT data
      newEntry.unit_vat = getUnitVat(item, pricingData);
      return newEntry;
    });

    return itemsWithPrice;
  }


  return Object.freeze({
    price,
  });
}

module.exports = Price;
