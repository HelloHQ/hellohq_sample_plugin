use http;
use wasi_experimental_http;
use std::io::stdin;
use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Input {
    pub name: String,
    pub num: i32,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Output {
    pub names: Vec<String>,
}

#[no_mangle]
pub extern "C" fn stdio() {
    // WASM host send data from `.wasm` module via stdin
    let input: Input = serde_json::from_reader(stdin()).map_err(|e| {
        eprintln!("ser: {e}");
        e
    }).unwrap();
    let names: Vec<String> = (0..input.num).map(|_idx| input.name.clone()).collect();

    let output = Output { names };
    let serialized = serde_json::to_string(&output).map_err(|e| {
        eprintln!("de: {e}");
        e
    }).unwrap();

    println!("{serialized}");

}

#[no_mangle]
pub extern "C" fn get() {
    let url = "https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_54ee232e3aaf4c99bf78979da2bcd0b6".to_string();
    let req = http::request::Builder::new().uri(&url).body(None).unwrap();
    let mut res = wasi_experimental_http::request(req).expect("cannot make get request");

    let body = &res.body_read_all().unwrap();
    let str = std::str::from_utf8(body).unwrap().to_string();

    // println!("{:#?}", res.header_get("Content-Type".to_owned()));
    // println!("{:#?}", res.status_code);
    println!("{str}"); // `.wasm` module send data to host module via stdout
}