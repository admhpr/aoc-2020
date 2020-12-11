const { readFileSync } = require("fs")
const inputs = readFileSync("./input-reduced", "UTF-8").split(/\n/)
function makeSeatingLayout(inputs) {
  const layout = new Map()
  for (const [rowIndex, row] of inputs.entries()) {
    const seats = row.split("")
    for (const [colIndex, seat] of seats.entries()) {
      if (seat !== ".") {
        layout.set(JSON.stringify([rowIndex, colIndex]), seat)
      }
    }
  }
  return layout
}
function statesAreEqual(prev, currentState) {
  let toTest
  if (prev.size !== currentState.size) {
    return false
  }
  for (var [key, v] of prev) {
    toTest = currentState.get(key)
    if (toTest !== v || (toTest === undefined && !currentState.has(key))) {
      return false
    }
  }
  return true
}
function totalOccupiedSeats(seats) {
  return seats.reduce((acc, cur) => (cur === "#" ? (acc += 1) : acc), 0)
}
function simulateSeating(layout) {
  let prevState = {}
  let currentState = layout
  while (!statesAreEqual(prevState, currentState)) {
    const newSeating = seatPeople(currentState)

    prevState = currentState
    currentState = newSeating
  }
  return totalOccupiedSeats([...currentState.values()])
}
function isInBounds(row, col, { maxX, maxY }) {
  return row >= 0 && col >= 0 && row <= maxX && col <= maxY
}
function getAdjacent([x, y], positions) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]
  const [maxX, maxY] = JSON.parse([positions[positions.length - 1]])
  let adjacent = directions.map(([dX, dY]) => {
    let nextRow = x + dX
    let nextCol = y + dY
    let distanceFrom = 1
    while (
      isInBounds(nextRow, nextCol, { maxX, maxY }) &&
      distanceFrom <= Number.MAX_SAFE_INTEGER
    ) {
      if (positions.includes(JSON.stringify([nextRow, nextCol]))) {
        return [nextRow, nextCol]
      }
      nextRow += dX
      nextCol += dY
      distanceFrom += 1
    }
    return false
  })
  return adjacent.filter(Boolean)
}
function seatPeople(layout) {
  const nextLayout = new Map()
  for (const [seat, seatValue] of layout.entries()) {
    const adjacentSeats = getAdjacent(JSON.parse(seat), [...layout.keys()])
    const adjacentSeatValues = []
    for (const adjacent of adjacentSeats) {
      let value = layout.get(JSON.stringify(adjacent))
      if (value) {
        adjacentSeatValues.push(value)
      }
    }

    const amountOccupied = totalOccupiedSeats(adjacentSeatValues)
    if (amountOccupied >= 5) {
      nextLayout.set(seat, "L")
    } else {
      nextLayout.set(seat, seatValue)
    }

    if (adjacentSeatValues.every((v) => v === "L")) {
      nextLayout.set(seat, "#")
    }
  }
  return nextLayout
}
function main(inputs) {
  const layout = makeSeatingLayout(inputs)
  const occupiedSeats = simulateSeating(layout)
  console.log(occupiedSeats)
}
main(inputs)
