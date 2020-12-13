const { readFileSync } = require("fs")
const inputs = readFileSync("./input", "UTF-8").split(/\n/)

function timestampBuses(inputs) {
  const [t, buses] = inputs
  const busIds = buses
    .replace(/,/g, "\n")
    .split("\n")
    .map((n, i) => [parseInt(n), i])
    .filter(([n]) => !Number.isNaN(n))

  const [firstBus, ...restOfBuses] = busIds
  let timestamp = 0
  let incrementBy = firstBus[0]
  restOfBuses.forEach(([bus, minutesAfter]) => {
    while (true) {
      if ((timestamp + minutesAfter) % bus == 0) {
        debugger
        incrementBy *= bus
        break
      }
      timestamp += incrementBy
    }
  })
  console.log(timestamp)
}
function nearestBus(inputs) {
  const [t, buses] = inputs
  const busIds = buses
    .replace(/,x/g, "")
    .replace(/,/g, "\n")
    .split("\n")
    .map((n) => parseInt(n))
  const depart = parseInt(t)

  let time = depart
  let nextBus = busIds.find((bus) => time % bus === 0)

  while (!nextBus) {
    time++
    nextBus = busIds.find((bus) => time % bus === 0)
  }
  return (time - depart) * nextBus
}
function main(inputs) {
  const nextBus = nearestBus(inputs)
  console.log(nextBus)
  timestampBuses(inputs)
}
main(inputs)
