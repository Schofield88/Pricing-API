const fs = require('fs');

class Price {
  getUnitPriceAndVat(element, pricing) {
    const item = element;
    const pricingData = pricing;

    const itemPricingInfo = pricingData.prices.find(price => price.product_id === item.product_id);
    const unitPrice = itemPricingInfo.price;

    const vatBand = itemPricingInfo.vat_band;
    const rate = pricingData.vat_bands[vatBand];
    const vat = Math.round(unitPrice * rate);

    return { vat, unitPrice };
  }

  price(itemsArray) {
    const items = itemsArray;
    const rawPricingJson = fs.readFileSync('pricing.json');
    const pricingData = JSON.parse(rawPricingJson);

    // remaps the array of order items to include pricing data
    const itemsWithPrice = items.map((item) => {
      const newEntry = item;
      const unitPriceAndVat = this.getUnitPriceAndVat(item, pricingData);
      newEntry.unit_price = unitPriceAndVat.unitPrice;
      newEntry.unit_vat = unitPriceAndVat.vat;
      return newEntry;
    });

    return itemsWithPrice;
  }
}

module.exports = Price;
