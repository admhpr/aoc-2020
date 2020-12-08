const { readFileSync } = require("fs")
const inputs = readFileSync("./input", "UTF-8").split(/\n/)

function checkBootCode(inputs) {
  const seenPostions = new Set()
  let currentPosition = 0
  let accumulator = 0
  while (true) {
    if ([...seenPostions].includes(currentPosition)) {
      console.log(accumulator)
      break
    }
    seenPostions.add(currentPosition)
    let [instruction, v] = inputs[currentPosition].split(" ")
    let value = parseInt(v)
    switch (instruction) {
      case "jmp":
        currentPosition += value
        continue
      case "acc":
        accumulator += value
      case "nop":
    }
    currentPosition += 1
  }
}

function fixBootCode(inputs) {
  const seenPostions = new Set()
  let currentPosition = 0
  let accumulator = 0
  while (true) {
    if (currentPosition === inputs.length) {
      return accumulator
    }
    if ([...seenPostions].includes(currentPosition)) {
      return false
    }
    seenPostions.add(currentPosition)
    let [instruction, v] = inputs[currentPosition].split(" ")
    let value = parseInt(v)
    switch (instruction) {
      case "jmp":
        currentPosition += value
        continue
      case "acc":
        accumulator += value
      case "nop":
    }
    currentPosition += 1
  }
}
function main(inputs) {
  // checkBootCode(inputs)
  for (const [i, _] of inputs.entries()) {
    const alteredProgram = [...inputs]
    let [instruction] = alteredProgram[i].split(" ")
    let alt = ""
    if (instruction === "jmp") {
      alt = alteredProgram[i].replace("jmp", "nop")
    }
    if (instruction === "nop") {
      alt = alteredProgram[i].replace("nop", "jmp")
    }
    if (alt.length) {
      alteredProgram[i] = alt
    }
    const fixed = fixBootCode(alteredProgram)
    if (fixed) {
      console.log(fixed)
    }
  }
}
main(inputs)
