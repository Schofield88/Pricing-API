const processOrder = json => ({
  invoice: {
    order_net: 0,
    order_vat: 0,
    order_gross: 0,
    items: [],
  },
});

module.exports = processOrder;
