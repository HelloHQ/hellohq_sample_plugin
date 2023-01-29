import { MethodCallHandlerResponse } from "@hellohq/sdk";
webf.methodChannel.addMethodCallHandler("callFromJs", (args) => {
  const resp: MethodCallHandlerResponse = {
    fnName: "construct_investable_portfolio",
    serializedInput: args[0],
  };
  return resp;
});

const assetsInput = document.getElementById("assets-input") as HTMLInputElement;
const pvalInput = document.getElementById("pval-input") as HTMLInputElement;
const pricesInput = document.getElementById("prices-input") as HTMLInputElement;
const pricesList = document.getElementById("prices-list") as HTMLInputElement;
const weightsInput = document.getElementById(
  "weights-input"
) as HTMLInputElement;
const weightsList = document.getElementById("weights-list") as HTMLInputElement;
const calculateButton = document.getElementById(
  "calculate-button"
) as HTMLInputElement;
const results = document.getElementById("results") as HTMLInputElement;
const nativeResults = document.getElementById(
  "native-results"
) as HTMLInputElement;

let assets;
let pVal;
let prices: number[] = [];
let weights: number[] = [];

const showResults = () => {
  results.innerHTML = JSON.stringify({
    assets,
    assetsPrices: prices,
    assetsWeights: weights,
    portfolioValue: pVal,
  });
};

assetsInput?.addEventListener("change", (e) => {
  assets = Number.parseFloat(assetsInput.value);
  showResults();
});

pvalInput?.addEventListener("change", (e) => {
  pVal = Number.parseFloat(pvalInput.value);
  showResults();
});

pricesInput?.addEventListener("change", (e) => {
  const price = pricesInput.value;
  prices.push(Number.parseFloat(price));
  const span = document.createElement("span");
  span.textContent = price;
  pricesList.appendChild(span);
  showResults();
});

weightsInput?.addEventListener("change", (e) => {
  const weight = weightsInput.value;
  weights.push(Number.parseFloat(weight));
  const span = document.createElement("span");
  span.textContent = weight;
  weightsList.appendChild(span);
  showResults();
});

calculateButton?.addEventListener("click", async () => {
  let result = await webf.methodChannel.invokeMethod(
    "callFromJs",
    JSON.stringify({
      assets,
      assets_prices: prices,
      assets_weights: weights,
      portfolio_value: pVal,
    })
  );

  nativeResults.innerHTML = JSON.stringify(result);
});
