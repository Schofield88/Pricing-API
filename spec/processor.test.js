const Processor = require('../src/processor');

describe('processor', () => {
  it('returns a invoice response with unit price', () => {
    const order = {
      order: {
        id: 12345,
        customer: {},
        items: [
          {
            product_id: 1,
            quantity: 1,
          },
          {
            product_id: 2,
            quantity: 5,
          },
        ],
      },
    };

    const invoice = {
      invoice: {
        order_net: 0,
        order_vat: 0,
        order_gross: 0,
        items: [
          {
            product_id: 1,
            quantity: 1,
            unit_price: 599,
            unit_vat: 120,
          },
          {
            product_id: 2,
            quantity: 5,
            unit_price: 250,
            unit_vat: 0,
          },
        ],
      },
    };

    const processor = new Processor();
    expect(processor.process(order)).toEqual(invoice);
  });
});
