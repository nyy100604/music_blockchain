// alert("Check if Metamask is unlocked");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
// console.log(web3);

let adrress = document.querySelector(".address");
let balance = document.querySelector(".balance");
let name = document.querySelector(".name");
let ipfsHash = document.querySelector(".ipfsHash");
let button = document.querySelector("button");
let hash = document.querySelector(".hash");

let adrr;
async function AB() {
  adrr = await web3.eth.getCoinbase();
  adrress.innerText = adrr;
  let bal = await web3.eth.getBalance(adrr);
  balance.innerText = bal + " wei";
}
AB();

let conAddr = "0x5c890ca478Be3273548c527300b42d35aa47816D";
let abi = [
  { inputs: [], stateMutability: "payable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "string", name: "name", type: "string" },
      { indexed: false, internalType: "string", name: "url", type: "string" },
      {
        indexed: false,
        internalType: "uint256",
        name: "money",
        type: "uint256",
      },
    ],
    name: "storeMusic",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "origin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value2",
        type: "uint256",
      },
    ],
    name: "transferOriginAddress",
    type: "event",
  },
  {
    inputs: [{ internalType: "string", name: "name", type: "string" }],
    name: "downloadMusic",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "musicManage",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "musicToaddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "ipfsHash", type: "string" },
    ],
    name: "uploadMusic",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

let contract = new web3.eth.Contract(abi, conAddr);

button.addEventListener("click", () => {
  alert("上傳一首歌需要20000 Wei");
  console.log(name.value);
  console.log(ipfsHash.value);
  contract.methods
    .uploadMusic(name.value, ipfsHash.value)
    .send({ from: adrr, value: 20000 }, function (error, transactionHash) {
      console.log(`https://rinkeby.etherscan.io/tx/${transactionHash}`);
      if (!transactionHash) {
        return;
      }
      hash.setAttribute(
        "href",
        `https://rinkeby.etherscan.io/tx/${transactionHash}`
      );
      hash.innerText = "To etherscan";
      name.value = "";
      ipfsHash.value = "";
    });
});
