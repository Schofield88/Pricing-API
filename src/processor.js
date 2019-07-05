const Items = require('./items');
const GrandTotal = require('./grandTotal');

function Processor() {
  const items = new Items();
  const grandTotal = new GrandTotal();

  function process(json) {
    // grab the items array
    const myJson = json.order.items;
    // build the invoice skeleton
    const customer = {
      invoice: {
        order_net: 0,
        order_vat: 0,
        order_gross: 0,
        items: [],
      },
    };
    // build the full items array
    const itemsArray = items.buildItems(myJson);
    // assign the items array to the invoice
    customer.invoice.items = itemsArray;
    // calculate and assign the three order totals to complete the response
    const final = grandTotal.calculate(customer);
    return final;
  }

  return Object.freeze({
    process,
  });
}

module.exports = Processor;
