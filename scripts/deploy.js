const {ethers} = require("hardhat")

async function main(){

  const [deployer] = await ethers.getSigners()
  const tokencontract = await ethers.getContractFactory("token")
  const token = await tokencontract.deploy()
  await token.deployed()
  console.log(`Deployed contract to ${token.address}`)

  const nftcontract = await ethers.getContractFactory("nft")
  const nft = await nftcontract.deploy(token.address)
  await nft.deployed()
  console.log(`Deployed nftstake to ${nft.address}`)


  console.log(await token.balanceOf(deployer.address))
  const amount = ethers.utils.parseEther("0.15")
  const abletomint = await token.mint({value:amount })
  await abletomint.wait()
  console.log(await token.balanceOf(deployer.address) )

  
}
main()