const Processor = require('../src/processor');

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

describe('processor', () => {
  it('returns a skeleton invoice response', () => {
    const processor = new Processor();
    expect(processor.process(order)).toEqual(invoice);
  });
});
