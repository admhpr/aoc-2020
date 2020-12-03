const { readFileSync } = require("fs")
const inputs = readFileSync("./input", "UTF-8").split(/\r?\n/)

function makeGrid(lines) {
  const grid = []
  for (const line of lines) {
    grid.push([...line])
  }
  return grid
}

function multiplyPaths(paths, course) {
  const [firstPath, ...rest] = paths
  let result = goSledding(firstPath, course)
  for (const path of rest) {
    result = result * goSledding(path, course)
  }
  return result
}

function goSledding(trajectory, course) {
  const { right, down } = trajectory
  let treeCount = 0
  let x = 0
  for (let row = 0; row < course.length; row += down) {
    if (course[row][x % course[row].length] == "#") {
      treeCount += 1
    }
    x += right
  }
  return treeCount
}

function main(inputs) {
  const grid = makeGrid(inputs)
  const paths = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ]
  const partOne = goSledding({ right: 3, down: 1 }, grid)
  const partTwo = multiplyPaths(paths, grid)
  console.log(partOne, partTwo)
}

main(inputs)
