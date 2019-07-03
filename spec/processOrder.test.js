const process = require('../src/processOrder');

const order = {
  order: {
    id: 12345,
    customer: {},
    items: [
      {
        product_id: 1,
        quantity: 1,
      },
    ],
  },
};

const invoice = {
  invoice: {
    order_net: 0,
    order_vat: 0,
    order_gross: 0,
    items: [],
  },
};

describe('processOrder', () => {
  it('returns a skeleton invoice response', () => {
    expect(process(order)).toEqual(invoice);
  });
});
