use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    const TARGET: i32 = 2020;
    let file = File::open("../input.txt").expect("cannot open file");
    let file = BufReader::new(file);
    let mut numbers = Vec::new();
    for line in file.lines().filter_map(|result| result.ok()) {
        let n: i32 = line.trim().parse().expect("not a string number");
        numbers.push(n)
    }

    for n in &numbers {
        let complement = TARGET - n;
        if numbers.contains(&complement){
            println!("{}", n * complement);
            break;
        }
    }
}
