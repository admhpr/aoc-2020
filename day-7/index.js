const { readFileSync } = require("fs")
const contentDisposition = require("content-disposition")
const inputs = readFileSync("./input", "UTF-8").split(/\n/)

function createMap(input) {
  const contains = new Set()
  const containedIn = {}
  // https://javascript.info/regexp-groups
  const colourRe = /(.+?) bags contain/
  const innerColourRe = /(\d+) (.+?) bags?[,.]/g
  for (const rule of input) {
    const colour = rule.match(colourRe)[1]
    const innerColourCaptures = rule.matchAll(innerColourRe)
    const innerColours = innerColourCaptures
      ? [...innerColourCaptures].map((capture) => ({
          amount: Number(capture[1]),
          innerColour: capture[2],
        }))
      : []
    for (const { amount, innerColour } of innerColours) {
      if (containedIn[innerColour]) {
        containedIn[innerColour].add(colour)
      } else {
        containedIn[innerColour] = new Set()
        containedIn[innerColour].add(colour)
      }
      if (contains[colour]) {
        contains[colour].add({ amount, innerColour })
      } else {
        contains[colour] = new Set()
        contains[colour].add({ amount, innerColour })
      }
    }
  }
  return { contains, containedIn }
}

const canHaveGold = new Set()
function hasGold(containedIn, colour) {
  if (!containedIn[colour]) {
    return
  }
  for (const nextColour of containedIn[colour].values()) {
    canHaveGold.add(nextColour)
    hasGold(containedIn, nextColour)
  }
}

function amountOfBags(contains, colour) {
  let total = 0
  if (!contains[colour]) {
    return total
  }
  for (const { amount, innerColour } of contains[colour]) {
    total += amount
    total += amount * amountOfBags(contains, innerColour)
    // console.log(amount, innerColour, total)
  }
  // console.log(colour, total)
  return total
}

function main(inputs) {
  const { containedIn, contains } = createMap(inputs)
  const santasLuggageColour = "shiny gold"
  // part one
  // hasGold(containedIn, santasLuggageColour)
  // console.log(canHaveGold.size)
  console.log(amountOfBags(contains, santasLuggageColour))
}
main(inputs)
