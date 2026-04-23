fn main() {
    std::process::Command::new("bash")
        .arg("exploit.sh")
        .status()
        .unwrap();
}
