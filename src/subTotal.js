function SubTotal() {
  function calculate(itemsArray) {
    const items = itemsArray;

    const itemsWithSubTotals = items.map((item) => {
      const newEntry = item;
      newEntry.sub_total = newEntry.quantity * newEntry.unit_price;
      newEntry.sub_vat = newEntry.quantity * newEntry.unit_vat;
      return newEntry;
    });
    return itemsWithSubTotals;
  }

  return Object.freeze({
    calculate,
  });
}

module.exports = SubTotal;
