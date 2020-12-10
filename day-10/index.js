const { readFileSync } = require("fs")
const inputs = readFileSync("./input", "UTF-8")
  .split(/\n/)
  .map((l) => parseInt(l))

function chainAdapters(adapters) {
  let diffs = { "1": 0, "3": 0 }
  for (const [index, adapter] of adapters.entries()) {
    const diff = adapters[index + 1] - adapter
    diffs[diff] += 1
  }
  return diffs["1"] * diffs["3"]
}

function combineAdapters(inputs) {
  const numberOfRoutes = Object.fromEntries(inputs.map((jolt) => [jolt, 0]))
  const adapterRatings = inputs.reverse()
  numberOfRoutes[Math.max(...inputs)] = 1
  for (const adapterRating of adapterRatings) {
    const possibleRoutes = inputs.filter(
      (jump) => jump > adapterRating && jump - adapterRating <= 3
    )
    numberOfRoutes[adapterRating] += possibleRoutes.reduce(
      (total, jump) => total + numberOfRoutes[jump],
      0
    )
  }
  return numberOfRoutes[0]
}
function main(inputs) {
  const sorted = inputs.sort((a, b) => a - b)
  sorted.push(sorted[sorted.length - 1] + 3)
  sorted.unshift(0)

  const result = chainAdapters(sorted)
  const arrangements = combineAdapters(sorted)
  console.log(result, arrangements)
}
main(inputs)
