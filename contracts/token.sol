// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
contract Token is ERC20{
    constructor() ERC20("TokenA", "ta") {
        _mint(msg.sender,30*10**18);
    }


    //fallback()external payable{}

    // receive() external payable{}

    function mint() public payable returns (bool) {
        require (msg.value == 0.15 ether ,"send exactly 0.15 eth");
        _mint(msg.sender,1*10**18);
        return true;
    }
     
    function burn (uint amount)public{
        _burn(msg.sender,amount);
    }


}