const {readFile} = require('fs').promises

const MAPPING_STATES = {
  ca: 'california',
  il: 'illinois',
  ny: 'new york'
}

const MAPPING_STREETS = {
  'rd.': 'road',
  'st.': 'street'
}

function filterEmptyLines (line) {
  return line
}

function normalizeCity (city = '') {
  return city.toLowerCase()
}

function normalizeEmail (email = '') {
  let [username, hostname] = email.toLowerCase().split('@')

  username = username.replace('.', '').split('+')[0]

  return `${username}@${hostname}`
}

function normalizeState (state = '') {
  state = state.toLowerCase()

  return MAPPING_STATES[state] || state
}

function normalizeStreet (street = '') {
  street = street.toLowerCase()

  return MAPPING_STREETS[street] || street
}

function parseOrder (line) {
  const [orderId, dealId, email, street, city, state, zipCode, creditCard] =
    line.split(',')

  return {
    city: normalizeCity(city),
    creditCard,
    dealId: Number(dealId),
    email: normalizeEmail(email),
    orderId: Number(orderId),
    state: normalizeState(state),
    street: normalizeStreet(street),
    zipCode
  }
}

function trimLine (line) {
  return line.trim()
}

module.exports = function parse (filePath) {
  return readFile(filePath, 'utf8')
    .then(function (fileContent) {
      return fileContent
        .split('\n')
        .map(trimLine)
        .filter(filterEmptyLines)
        .map(parseOrder)
    })
}
