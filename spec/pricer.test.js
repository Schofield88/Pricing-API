const Pricer = require('../src/pricer');

describe('Pricer', () => {
  it('adds the pricing data to the array', () => {
    const pricer = new Pricer();
    const items = [
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
    ];
    const itemsWithPrice = [
      {
        product_id: 1,
        quantity: 1,
        unit_price: 599,
      },
      {
        product_id: 2,
        quantity: 5,
        unit_price: 250,
      },
      {
        product_id: 3,
        quantity: 1,
        unit_price: 250,
      },
    ];

    expect(pricer.price(items)).toEqual(itemsWithPrice);
  });
});
