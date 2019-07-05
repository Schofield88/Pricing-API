const Pricer = require('./pricer');

function Processor() {
  const price = new Pricer();

  function process(json) {
    const customer = {
      invoice: {
        order_net: 0,
        order_vat: 0,
        order_gross: 0,
        items: price.price(json.order.items),
      },
    };


    return customer;
  }

  return Object.freeze({
    process,
  });
}

module.exports = Processor;
