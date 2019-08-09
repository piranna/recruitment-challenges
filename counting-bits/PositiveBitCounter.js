function Count (input) {
  if(!Number.isInteger(input)) throw SyntaxError('`input` must be an Integer')
  if(input < 0) throw RangeError('Negative numbers are not supported')

  const result = new Array(1)

  let total = 0

  for(let index = 0; input; index++, input >>= 1)
    if(input & 1)
    {
      total++
      result.push(index)
    }

  result[0] = total

  return result
}

module.exports = { Count }
