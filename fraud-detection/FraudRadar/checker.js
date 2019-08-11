const RULES = [
  [haveSameDealId, true],
  [haveSameCreditCard],
  [haveSameEmails, true],
  [haveSameAddresses, true]
]

function haveSameAddresses (a, b) {
  return a.city === b.city &&
    a.state === b.state &&
    a.street === b.street &&
    a.zipCode === b.zipCode
}

function haveSameCreditCard (a, b) {
  return a.creditCard === b.creditCard
}

function haveSameDealId (a, b) {
  return a.dealId === b.dealId
}

function haveSameEmails (a, b) {
  return a.email === b.email
}

function reducerCheckFrauds (fraudResults, currentOrder, index, orders) {
  for (const [index2, checkedOrder] of orders.entries()) {
    // We have check order against all previous ones, move to next one
    if (index < index2) break

    if (validateOrder(currentOrder, checkedOrder)) continue

    // Order is fraudulent, register and move to next one
    fraudResults.push(currentOrder)
    break
  }

  return fraudResults
}

function validateOrder (order, previous) {
  for (const [func, inverted] of RULES) {
    if (inverted ^ func(order, previous)) return true
  }
}

module.exports = function check (orders = []) {
  return orders.reduce(reducerCheckFrauds, [])
}
