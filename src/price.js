const fs = require('fs');

class Price {
  getUnitPrice(element, pricing) {
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

  getUnitVat(element, pricing) {
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

  price(itemsArray) {
    const items = itemsArray;
    const rawPricingJson = fs.readFileSync('pricing.json');
    const pricingData = JSON.parse(rawPricingJson);
    // remaps the array of order items to include pricing data
    const itemsWithPrice = items.map((item) => {
      const newEntry = item;
      // use the private helper function getUnitPrice() to recover the item's price
      newEntry.unit_price = this.getUnitPrice(item, pricingData);
      // use the private helper getUnitVat() to recover VAT data
      newEntry.unit_vat = this.getUnitVat(item, pricingData);
      return newEntry;
    });

    return itemsWithPrice;
  }
}

module.exports = Price;
