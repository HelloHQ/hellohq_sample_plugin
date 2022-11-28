import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";

let root = createRoot(document.getElementById("root") as HTMLElement);

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

function PortfolioOptimizer() {
  const [assets, setAssets] = useState(0);
  const [pVal, setPVal] = useState(0);
  const [prices, setPrices] = useState([]);
  const [weights, setWeights] = useState([]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Amount of Assets"
        onChange={(e: any) => {
          setAssets(e.target.value);
        }}
      />
      <Input
        type="text"
        placeholder="Portfolio Value"
        onChange={(e: any) => {
          setPVal(e.target.value);
        }}
      />
      <Input type="text" placeholder="Asset Prices" />
      <Button
        onClick={() => {
          
        }}
      >
        Add price
      </Button>
      <Input type="text" placeholder="Asset Weights" />
      <Button
        onClick={() => {
          
        }}
      >
        Add weight
      </Button>
      <Button
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
      </Button>
    </div>
  );
}

root.render(<PortfolioOptimizer></PortfolioOptimizer>);
