const Processor = require('../src/processor');

describe('Processor', () => {
  it('returns a full invoice response', (done) => {
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
          {
            product_id: 3,
            quantity: 1,
          },
        ],
      },
    };

    const invoice = {
      invoice: {
        order_net: 2099,
        order_vat: 120,
        order_gross: 2219,
        items: [
          {
            product_id: 1,
            quantity: 1,
            unit_price: 599,
            unit_vat: 120,
            sub_total: 599,
            sub_vat: 120,
          },
          {
            product_id: 2,
            quantity: 5,
            unit_price: 250,
            unit_vat: 0,
            sub_total: 1250,
            sub_vat: 0,
          },
          {
            product_id: 3,
            quantity: 1,
            unit_price: 250,
            unit_vat: 0,
            sub_total: 250,
            sub_vat: 0,
          },
        ],
      },
    };

    const processor = new Processor();
    expect(processor.process(order)).toEqual(invoice);
    done();
  });
});
