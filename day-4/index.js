const { readFileSync } = require("fs")
const inputs = readFileSync("./input", "UTF-8").split(/\r?\n/)

function isHeight(toCheck) {
  if (toCheck.includes("cm")) {
    return { height: toCheck.split("cm")[0], unit: "cm" }
  }
  if (toCheck.includes("in")) {
    return { height: toCheck.split("in")[0], unit: "in" }
  }
  return { height: false }
}
function inRange(toCheck, { min, max }) {
  return toCheck >= min && toCheck <= max
}
function isFour(value) {
  return value.length === 4
}
function isValid(passport, check) {
  for (const key of check) {
    if (Object.keys(passport).includes(key)) {
      const toCheck = passport[key]
      switch (key) {
        case "byr":
          if (
            !(
              isFour(toCheck) &&
              inRange(Number(toCheck), { min: 1920, max: 2002 })
            )
          ) {
            return false
          }
          continue
        case "iyr":
          if (
            !(
              isFour(toCheck) &&
              inRange(Number(toCheck), { min: 2010, max: 2022 })
            )
          ) {
            return false
          }
          continue
        case "eyr":
          if (
            !(
              isFour(toCheck) &&
              inRange(Number(toCheck), { min: 2020, max: 2030 })
            )
          ) {
            return false
          }
          continue
        case "hgt":
          const { height, unit } = isHeight(toCheck)
          let range = {}
          if (unit === "cm") {
            range = { min: 150, max: 193 }
          }
          if (unit === "in") {
            range = { min: 59, max: 76 }
          }
          if (!(height && inRange(Number(height), range))) {
            return false
          }
          continue
        case "hcl":
          if (!RegExp("#([0-9]|[a-f]){6}").test(toCheck)) {
            return false
          }
          continue
        case "ecl":
          if (
            !["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(toCheck)
          ) {
            return false
          }
          continue
        case "pid":
          if (toCheck.length !== 9) {
            return false
          }
          continue
      }
      continue
    } else {
      return false
    }
  }
  return true
}
function validatePassports(passports) {
  const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
  let validCount = 0
  for (passport of passports) {
    if (isValid(passport, required)) {
      validCount += 1
    }
  }
  return validCount
}
function normaliseData(inputs) {
  const passports = []
  let passport = {}
  for (const [i, values] of inputs.entries()) {
    if (values !== "") {
      const pairs = values.split(" ").map((v) => v.split(":"))
      for (const pair of pairs) {
        passport[pair[0]] = pair[1]
      }
      if (i === inputs.length - 1) {
        passports.push(passport)
      }
    } else {
      passports.push(passport)
      passport = {}
    }
  }
  return passports
}
function main(inputs) {
  const passports = normaliseData(inputs)
  const validPassportCount = validatePassports(passports)
  //   console.log(passports)
  console.log(validPassportCount)
}

main(inputs)
