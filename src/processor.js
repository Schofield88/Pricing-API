const Items = require('./items');
const GrandTotal = require('./grandTotal');

function Processor() {
  const items = new Items();
  const grandTotal = new GrandTotal();

  function process(json) {
    const myJson = json;
    const customer = {
      invoice: {
        order_net: 0,
        order_vat: 0,
        order_gross: 0,
        items: [],
      },
    };

    const itemsArray = items.buildItems(myJson.order.items);
    customer.invoice.items = itemsArray;
    const final = grandTotal.calculate(customer);

    return final;
  }

  return Object.freeze({
    process,
  });
}

module.exports = Processor;
