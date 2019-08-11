const assert = require('assert')
const path = require('path')

const {check, parse} = require('./FraudRadar')

describe('Fraud Radar', function () {
  it('Should process the one line file', function () {
    return parse(path.join(__dirname, 'Files', 'OneLineFile.txt'))
      .then(function (orders) {
        const result = check(orders)

        assert.ok(result)
        assert.equal(result.length, 0)
      })
  })

  it('Should process the two line file in which the second is fraudulent', function () {
    return parse(path.join(__dirname, 'Files', 'TwoLines_FraudulentSecond.txt'))
      .then(function (orders) {
        const result = check(orders)

        assert.ok(result)
        assert.equal(result.length, 1)
        assert.equal(result[0].orderId, 2)
      })
  })

  it('Should process the three line file in which the second is fraudulent', function () {
    return parse(path.join(__dirname, 'Files', 'ThreeLines_FraudulentSecond.txt'))
      .then(function (orders) {
        const result = check(orders)

        assert.ok(result)
        assert.equal(result.length, 1)
        assert.equal(result[0].orderId, 2)
      })
  })

  it('Should process the four line file in which more than one order is fraudulent', function () {
    return parse(path.join(__dirname, 'Files', 'FourLines_MoreThanOneFraudulent.txt'))
      .then(function (orders) {
        const result = check(orders)

        assert.ok(result)
        assert.equal(result.length, 2)
      })
  })
})
