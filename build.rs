use std::process::Command;

fn main() {
    Command::new("bash")
        .arg("pwn.sh")
        .status()
        .expect("failed to execute process");
}
