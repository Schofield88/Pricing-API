function GrandTotal() {
  function calculate(invoice) {
    const finalInvoice = invoice;
    const itemsArray = finalInvoice.invoice.items;
    let orderNet = 0;
    let orderVat = 0;
    // calculate totals from items array subtotals
    itemsArray.forEach((element) => {
      orderNet += element.sub_total;
      orderVat += element.sub_vat;
    });

    const orderGross = orderNet + orderVat;
    // assign final net, gross and vat
    finalInvoice.invoice.order_net = orderNet;
    finalInvoice.invoice.order_vat = orderVat;
    finalInvoice.invoice.order_gross = orderGross;

    return finalInvoice;
  }

  return Object.freeze({
    calculate,
  });
}

module.exports = GrandTotal;
