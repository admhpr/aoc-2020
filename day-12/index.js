const { readFileSync } = require("fs")
const inputs = readFileSync("./input", "UTF-8").split(/\n/)
function rotate(rotation, degrees, ship) {
  let turn = degrees
  const rotations = {
    L: { E: "N", N: "W", W: "S", S: "E" },
    R: { E: "S", S: "W", W: "N", N: "E" },
  }
  while (turn > 0) {
    ship.direction = rotations[rotation][ship.direction]
    turn -= 90
  }
}
function getDistanceTravelled(inputs) {
  const ship = {
    x: 0,
    y: 0,
    direction: "E",
  }
  for (const instruction of inputs) {
    let action = [...instruction][0]
    const amount = parseInt([...instruction].slice(1).join(""))
    if (action === "N") {
      ship.y -= amount
    }
    if (action === "S") {
      ship.y += amount
    }
    if (action === "E") {
      ship.x += amount
    }
    if (action === "W") {
      ship.x -= amount
    }
    if (action === "L") {
      rotate(action, amount, ship)
    }
    if (action === "R") {
      rotate(action, amount, ship)
    }
    if (action === "F") {
      switch (ship.direction) {
        case "E":
          ship.x += amount
          break
        case "W":
          ship.x -= amount
          break
        case "N":
          ship.y -= amount
          break
        case "S":
          ship.y += amount
          break
      }
    }
  }
  return Math.abs(ship.x) + Math.abs(ship.y)
}
function rotateWaypoint(rotation, degrees, ship) {
  let turn = degrees
  while (turn > 0) {
    if (rotation === "R") {
      ship.waypoint = { x: -ship.waypoint.y, y: ship.waypoint.x }
    }
    if (rotation === "L") {
      ship.waypoint = { x: ship.waypoint.y, y: -ship.waypoint.x }
    }
    turn -= 90
  }
}
function getDistanceTravelledWithWaypoint(inputs) {
  const ship = {
    x: 0,
    y: 0,
    waypoint: {
      x: 10,
      y: -1,
    },
    direction: "E",
  }
  for (const instruction of inputs) {
    let action = [...instruction][0]
    const amount = parseInt([...instruction].slice(1).join(""))
    if (action === "N") {
      ship.waypoint.y -= amount
    }
    if (action === "S") {
      ship.waypoint.y += amount
    }
    if (action === "E") {
      ship.waypoint.x += amount
    }
    if (action === "W") {
      ship.waypoint.x -= amount
    }
    if (action === "L") {
      rotateWaypoint(action, amount, ship)
    }
    if (action === "R") {
      rotateWaypoint(action, amount, ship)
    }

    if (action === "F") {
      ship.y += amount * ship.waypoint.y
      ship.x += amount * ship.waypoint.x
    }
  }
  return Math.abs(ship.x) + Math.abs(ship.y)
}
function main(inputs) {
  const distanceTravelled = getDistanceTravelled(inputs)
  const distanceTravelledWithWaypoint = getDistanceTravelledWithWaypoint(inputs)
  console.log("distance", distanceTravelled)
  console.log("distance with waypoint", distanceTravelledWithWaypoint)
}
main(inputs)
