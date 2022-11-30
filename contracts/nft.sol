// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface ITokenA {
    function burn(uint amount) external;
}


contract Nft is ERC721URIStorage {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint public amount;
    IERC20 public tok;

    constructor(IERC20 _tok) ERC721("mynft", "NFT") {
        amount = 3;
        tok = _tok;
        //_mint(msg.sender,30);
    }

    
    function safemint(address to) public returns (bool) {
        require(checkadd(to), "it is a contract");
        require(tok.balanceOf(msg.sender) >= amount, "send more");
        tok.transferFrom(msg.sender, address(this), amount);
        ITokenA(address(tok)).burn(amount);
        _mint(to, _tokenIds.current());
        _tokenIds.increment();
        return true;
    }

    function checkadd(address to) public view returns (bool) {
        uint codelength;
        assembly {
            codelength := extcodesize(to)
        }
        return codelength == 0 ? true : false;
    }


    //fallback() external payable {}
    //receive() external payable{}
}



