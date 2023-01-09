import React, { useState } from "react";
import ReactDOM from 'react-dom';
import './polyfill';

const styles = {
  input: {
    fontSize: "18px",
    padding: "10px",
    margin: "10px",
    background: "papayawhip",
    border: "none",
    borderRadius: "3px",
    // ::placeholder {
    //   color: palevioletred,
    // }
  },
  button: {
    color: "palevioletred",
    fontSize: "1em",
    margin: "1em",
    padding: "0.25em 1em",
    border: "2px solid palevioletred",
    borderRadius: "3px",
  },
  span: {
    color: "palevioletred",
    fontSize: "1em",
    margin: "0.1em",
    padding: "0.25em 1em",
    border: "1px solid palevioletred",
    borderRadius: "3px",
  },
};

function PortfolioOptimizer() {
  const [assets, setAssets] = useState();
  const [pVal, setPVal] = useState();
  const [prices, setPrices] = useState();
  const [weights, setWeights] = useState();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input
        style={styles.input}
        type="text"
        placeholder="Amount of Assets"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setAssets(e.target.value);
          }
        }}
      />
      <input
        style={styles.input}
        type="text"
        placeholder="Portfolio Value"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setPVal(e.target.value);
          }
        }}
      />
      <div>
        <input
          style={styles.input}
          type="text"
          placeholder="Asset Prices"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const price = e.target.value;
              if (prices) {
                setPrices([...prices, price]);
              } else {
                setPrices([price]);
              }
            }
          }}
        />
        {prices && prices.map((p) => <span style={styles.span}>{p}</span>)}
      </div>
      <div>
        <input
          style={styles.input}
          type="text"
          placeholder="Asset Weights"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const weight = e.target.value;
              if (weights) {
                setWeights([...weights, weight]);
              } else {
                setWeights([weight]);
              }
            }
          }}
        />

        {weights && weights.map((w) => <span style={styles.span}>{w}</span>)}
      </div>
      <button
        style={styles.input}
        onClick={() => {
          console.log({
            assets,
            assetsPrices: prices,
            assetsWeights: weights,
            portfolioValue: pVal,
          });
        }}
      >
        Calculate
      </button>
      <span style={styles.span}>
        {JSON.stringify({
          assets,
          assetsPrices: prices,
          assetsWeights: weights,
          portfolioValue: pVal,
        })}
      </span>
    </div>
  );
}

document.body.style.margin = '0';

ReactDOM.render(
  <React.StrictMode>
    <PortfolioOptimizer></PortfolioOptimizer>
  </React.StrictMode>,
  document.body
);