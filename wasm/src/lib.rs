use bytes::Bytes;
use http;
use serde::{Deserialize, Serialize};
use std::io::stdin;
use wasi_experimental_http;

// {
//     "assets": 3,
//     "assetsPrices": [
//       10,
//       25,
//       500
//     ],
//     "assetsWeights": [
//       0.05,
//       0.6,
//       0.35
//     ],
//     "portfolioValue": 10000
// }
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct RequestBody {
    pub assets: u32,
    #[serde(rename(serialize = "assetsPrices"))]
    pub assets_prices: Vec<u32>,
    #[serde(rename(serialize = "assetsWeights"))]
    pub assets_weights: Vec<f32>,
    #[serde(rename(serialize = "portfolioValue"))]
    pub portfolio_value: u32,
}

#[no_mangle]
pub extern "C" fn stdio() {
    // WASM host send data from `.wasm` module via stdin
    // let input: Input = serde_json::from_reader(stdin())
    //     .map_err(|e| {
    //         eprintln!("ser: {e}");
    //         e
    //     })
    //     .unwrap();

    // let serialized = serde_json::to_string(&output).map_err(|e| {
    //     eprintln!("de: {e}");
    //     e
    // }).unwrap();

    // println!("{serialized}");
}

#[no_mangle]
pub extern "C" fn construct_investable_portfolio() {
    let url = "https://api.portfoliooptimizer.io/v1/portfolio/construction/investable".to_string();
    let req = http::request::Builder::new()
        .method(http::Method::POST)
        .uri(&url)
        .header("Content-Type", "application/json");

    let body: RequestBody = match serde_json::from_reader(stdin()).map_err(|e| {
        eprintln!("ser: {e}");
        e
    }) {
        Ok(val) => val,
        Err(e) => {
            panic!("Read input failed: {}", e);
        }
    };

    let json_body = match serde_json::to_string(&body).map_err(|e| {
        eprintln!("de: {e}");
        e
    }) {
        Ok(val) => val,
        Err(e) => {
            panic!("Parse input to string failed: {}", e);
        }
    };

    println!("{}", &json_body);

    let b = Bytes::from(json_body);
    let req = req.body(Some(b)).unwrap();

    let mut res = wasi_experimental_http::request(req).expect("cannot make post request");

    let body = &res.body_read_all().unwrap();
    let str = std::str::from_utf8(body).unwrap().to_string();

    // println!("{:#?}", res.header_get("Content-Type".to_owned()));
    // println!("{:#?}", res.status_code);
    println!("{str}"); // `.wasm` module send data to host module via stdout
}
