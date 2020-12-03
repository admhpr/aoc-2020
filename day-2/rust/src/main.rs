// notes: https://jakedawkins.com/2020-04-16-unwrap-expect-rust/
use std::fs;

fn part_one(lines: &Vec<(i64, i64, char, &str)>) -> i64 {
    let mut letter_count = 0;

    for (lower, upper, letter, password) in lines {
        let mut count = 0;
        // https://doc.rust-lang.org/book/ch19-01-unsafe-rust.html?highlight=dereferenc#dereferencing-a-raw-pointer
        for c in password.chars() {
            if c == *letter {
                count += 1;
            }
        }
        letter_count += if lower <= &count && count <= *upper {
            1
        } else {
            0
        }
    }

    letter_count
}

fn part_two(lines: &Vec<(i64, i64, char, &str)>) -> i64 {
    let mut result = 0;

    for (lower, upper, letter, password) in lines {
        let lower_position = password.chars().collect::<Vec<_>>()[*lower as usize - 1];
        let upper_position = password.chars().collect::<Vec<_>>()[*upper as usize - 1];

        let is_in_lower = lower_position == *letter && upper_position != *letter;
        let is_in_upper = lower_position != *letter && upper_position == *letter;
        result += if is_in_lower || is_in_upper { 1 } else { 0 }
    }

    result
}
fn main() {
    let input = fs::read_to_string("../input").unwrap();
    let lines = input
        .split("\n")
        .map(|line| {
            let parts = line.split(" ").collect::<Vec<_>>();
            let low_high = parts[0]
                .split("-")
                .map(|n| n.parse::<i64>().unwrap())
                .collect::<Vec<_>>();
            let lower = low_high[0];
            let upper = low_high[1];
            let letter = parts[1].chars().next().unwrap();
            let password = parts[2];
            (lower, upper, letter, password)
        })
        .collect::<Vec<_>>();
    println!("part one: {}", part_one(&lines));
    println!("part two: {}", part_two(&lines));
}
