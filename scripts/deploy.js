const  {ethers} = require("hardhat")
const fs = require("fs");
const path = require("path")
async function main(){

  const [deployer] = await ethers.getSigners()
  const tokencontract = await ethers.getContractFactory("Token")
  const token = await tokencontract.deploy()
  await token.deployed()
  console.log(`Deployed contract to ${token.address}`)

  fs.writeFileSync(path.join(__dirname,"../build/token.json"),`{"contract address" : "${token.address}",`)
  const getTheAbi = () => {
  try {
    const dir = path.resolve(
      __dirname,
      "../artifacts/contracts/token.sol/Token.json"
    )
    const file = fs.readFileSync(dir, "utf8")
    const json = JSON.parse(file)
    const abi = json.abi
    //console.log(`abi`, abi)

    return  JSON.stringify(abi)
  } catch (e) {
    console.log(`e`, e)
  }
}
//getTheAbi()
fs.appendFileSync(path.join(__dirname,"../build/token.json"),`"abi" : ${await getTheAbi()}}`)


  const nftcontract = await ethers.getContractFactory("Nft")
  const nft = await nftcontract.deploy(token.address)
  await nft.deployed()
  console.log(`Deployed nftstake to ${nft.address}`)

  fs.writeFileSync(path.join(__dirname,"../build/nft.json"),`{"contract address" : "${nft.address}",`)
  const getTheAbi2 = async () => {
  try {
    const dir = path.resolve(
      __dirname,
      "../artifacts/contracts/nft.sol/Nft.json"
    )
    const file = fs.readFileSync(dir, "utf8")
    const json = JSON.parse(file)
    const abi = json.abi
    //console.log(`abi`, abi)

    return JSON.stringify(abi)
  } catch (e) {
    console.log(`e`, e)
  }
}
//await getTheAbi2()
fs.appendFileSync(path.join(__dirname,"../build/nft.json"),`"abi" : ${await getTheAbi2()}}`)


  console.log(await token.balanceOf(deployer.address))
  const amount = ethers.utils.parseEther("0.15")
  const abletomint = await token.mint({value:amount })
  await abletomint.wait()
  console.log(await token.balanceOf(deployer.address) )

  
}
main()

//console.log(process.cwd())
