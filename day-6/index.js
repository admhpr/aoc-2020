const { readFileSync } = require("fs")
const inputs = readFileSync("./input", "UTF-8").split(/\r?\n/)

function group(inputs) {
  const groups = []
  let currentGroup = []
  for (const line of inputs) {
    if (line) {
      currentGroup.push(line)
    } else {
      groups.push(currentGroup)
      currentGroup = []
    }
  }
  groups.push(currentGroup)
  return groups
}
function countLetters(group) {
  const seen = []
  for (const ans of group) {
    console.log(ans)
    for (const letter of ans) {
      if (!seen.includes(letter)) {
        seen.push(letter)
      }
    }
  }
  let intersection = seen

  for (const ans of group) {
    intersection = intersection.filter((v) => [...ans].includes(v))
  }

  console.log(intersection)
  return intersection.length
}
function yesPerGroup(groups) {
  const yesPerGroup = []
  for (const group of groups) {
    yesPerGroup.push(countLetters(group))
  }
  return yesPerGroup.reduce((total, cur) => total + cur)
}
function main(inputs) {
  const groups = group(inputs)
  const partOne = yesPerGroup(groups)
  console.log(partOne)
}
main(inputs)
