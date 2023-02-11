const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

let button = document.querySelector("button");
let input = document.querySelector("input");
let balance = document.querySelector(".balance");

button.addEventListener("click", async () => {
  let bal = await web3.eth.getBalance(input.value);
  balance.innerText = `${bal} Wei`;
  console.log(bal);
  input.value = "";
});
