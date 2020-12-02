const { readFileSync } = require("fs")
const inputs = readFileSync("../input.txt", "UTF-8").split(/\r?\n/)

const valid = []
// part 1
function countLetters({ policy: { lower, upper }, password, letterToFind }) {
  let counter = 0
  const letters = password.split("")
  for (const letter of letters.entries()) {
    if (letter === letterToFind) {
      counter += 1
    }
  }
  return counter > 0
}
function isValidPassword(ruleSet) {
  const [rule, letterRule, password] = ruleSet.split(" ")
  const [letter] = letterRule.split(":")
  const [lower, upper] = rule.split("-")
  //   const args = {
  //     policy: { lower, upper },
  //     password,
  //     letterToFind: letter,
  //   }
  //   const letterCount = countLetters(args)
  const isInLower = password[lower - 1] === letter
  const isInUpper = password[upper - 1] === letter
  return (isInLower && !isInUpper) || (!isInLower && isInUpper)
}
function main(rules) {
  for (const ruleSet of rules) {
    if (isValidPassword(ruleSet)) {
      valid.push(ruleSet)
    }
  }
}

main(inputs)
console.log(valid.length)
