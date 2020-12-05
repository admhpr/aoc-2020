const { readFileSync } = require("fs")
const inputs = readFileSync("./input", "UTF-8").split(/\r?\n/)

function createRow(rows) {
  let max = 128
  let min = 0
  for (const row of rows) {
    if (row === "F") {
      max = (max + min) / 2
    }
    if (row === "B") {
      min = (max + min) / 2
    }
  }
  return min
}
function createColumn(column) {
  let max = 8
  let min = 0
  for (const seat of column) {
    if (seat === "L") {
      max = (max + min) / 2
    }
    if (seat === "R") {
      min = (max + min) / 2
    }
  }
  return min
}
function createSeat(pass) {
  const row = pass.slice(0, 7)
  const rowNumber = createRow(row)
  const column = pass.slice(7)
  const columnNumber = createColumn(column)
  return { row: rowNumber, col: columnNumber }
}
function sortSeatIdsDesc(inputs) {
  const otherSeatIds = inputs
    .map((pass) => createSeat(pass))
    .map(({ row, col }) => row * 8 + col)
  return otherSeatIds.sort((a, b) => b - a)
}

function findSeat(seatIds) {
  const min = seatIds[seatIds.length - 1]
  const max = seatIds[0]
  const allSeatIds = Array.from(Array(max - min), (_, i) => i + min)
  const seat = allSeatIds.filter((i) => !seatIds.includes(i))
  return seat[0]
}

function main(inputs) {
  const seatIds = sortSeatIdsDesc(inputs)
  console.log(`part one: ${seatIds[0]}`)
  const seat = findSeat(seatIds)
  console.log(`part two: ${seat}`)
}

main(inputs)
