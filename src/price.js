const fs = require('fs');

class Price {
  getUnitPrice(element, pricing) {
    const item = element;
    const pricingData = pricing.prices;

    const unitPrice = pricingData.find(prices => prices.product_id === item.product_id);

    return unitPrice.price;
  }

  getUnitVat(element, pricing) {
    const item = element;
    const pricingData = pricing;

    const priceStuffForThisOne = pricingData.prices.find(
      price => price.product_id === item.product_id,
    );
    const unitPrice = priceStuffForThisOne.price;
    const vatBand = priceStuffForThisOne.vat_band;
    const rate = pricingData.vat_bands[vatBand];
    const vat = Math.round(unitPrice * rate);

    return vat;
  }

  price(itemsArray) {
    const items = itemsArray;
    const rawPricingJson = fs.readFileSync('pricing.json');
    const pricingData = JSON.parse(rawPricingJson);
    // remaps the array of order items to include pricing data
    const itemsWithPrice = items.map((item) => {
      const newEntry = item;
      newEntry.unit_price = this.getUnitPrice(item, pricingData);
      newEntry.unit_vat = this.getUnitVat(item, pricingData);
      return newEntry;
    });

    return itemsWithPrice;
  }
}

module.exports = Price;
