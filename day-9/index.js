const { readFileSync } = require("fs")
const inputs = readFileSync("./input", "UTF-8")
  .split(/\n/)
  .map((l) => parseInt(l))
const PREAMBLE = 25
function checkSum(number, options) {
  for (const option of options) {
    if (options.includes(number - option)) {
      return true
    }
  }
  return false
}
function findNumber(inputs) {
  for (const [index, number] of inputs.entries()) {
    if (index > PREAMBLE - 1) {
      let position = index - PREAMBLE
      const toCheck = inputs.filter((_, i) => i < index && i >= position)
      if (!checkSum(number, toCheck)) {
        return number
      }
    }
  }
}

function findSum(inputs, target) {
  let total = 0
  let sumParts = []
  for (const number of inputs) {
    total += number
    sumParts.push(total)
    for (const [index, part] of sumParts.entries()) {
      let check = index + 2
      while (check < sumParts.length && sumParts[check] - part <= target) {
        if (sumParts[check] - part === target) {
          const parts = inputs.slice(index, check)
          return Math.max(...parts) + Math.min(...parts)
        }
        check += 1
      }
    }
  }
}
function main(inputs) {
  const target = findNumber(inputs)
  const sum = findSum(inputs, target)
  console.log(target, sum)
}
main(inputs)
