const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const {ethers} = require("hardhat");
const {assert,expect} = require("chai");

describe("working",function(){
  async function deploy(){
    const [deployer] = await ethers.getSigners()
    const tokencontract = await ethers.getContractFactory("token")
    const token = await tokencontract.deploy()
    await token.deployed()
    const nftcontract = await ethers.getContractFactory("nft")
    const nft = await nftcontract.deploy(token.address)
    await nft.deployed()
    const approve = await token.approve(nft.address,token.totalSupply())
    await approve.wait()
    return {token,nft,deployer,approve}
  }

  it("should be able to mint token for 0.15 eth",async()=>{
    const {token,nft,deployer} = await loadFixture(deploy)
    const amount = ethers.utils.parseEther("0.15")
    const abletomint = await token.mint({value:amount })
    await abletomint.wait()
    expect(token.balanceOf(deployer.address), 31000000000000000000)
  })

  
  
  it("should be able to mint nft ",async()=>{
    const {token,nft,deployer,approve} = await loadFixture(deploy)
    const abletomint = await nft.safemint(deployer.address)
    await abletomint.wait()
    expect(nft.balanceOf(deployer.address),1)
  })

  it("should burn token to mint nft",async()=>{
    const {token,nft,deployer,approve} = await loadFixture(deploy)
    const abletomint = await nft.safemint(deployer.address)
    await abletomint.wait()
    expect(token.balanceOf(deployer.address),token.totalSupply()-3*10**18) 
  })

  


})