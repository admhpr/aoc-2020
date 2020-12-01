const { readFileSync } = require("fs")

fs = require("fs")
const TARGET = 2020
const inputs = fs.readFileSync("../input.txt", "UTF-8")
const sortedNumbers = inputs
  .split(/\r?\n/)
  .map((v) => Number(v))
  .sort((a, b) => a - b)

function threeSum(numbers, target) {
  var result = []
  numbers.sort(function(a, b) {
    return a - b
  })
  for (const [i, n] of numbers.entries()) {
    let next = i + 1
    let last = numbers.length - 1
    // console.log("NEXT", next, "LAST", last, "CURRENT", i)
    let done = false
    while (next < last && !done) {
      const sum = numbers[next] + numbers[last] + n
      if (sum < target) {
        next++
      }
      if (sum > target) {
        last--
      }
      if (sum === target) {
        result = numbers[next] * numbers[last] * numbers[i]
        done = true
      }
    }
  }
  return result
}

console.log(threeSum(sortedNumbers, TARGET))
