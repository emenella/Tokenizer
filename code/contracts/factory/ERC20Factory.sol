pragma solidity ^0.8.19;

import '../ERC20.sol';
import "../Ownership.sol";

contract ERC20Factory is Ownership
{

    ERC20[] private listToken;
    
    constructor ()
    {
    }

    function createERC20(string memory name, string memory symbol, uint8 decimals, uint256 totalSupply) external onlyOwner()
    {
        ERC20 newToken = new ERC20(name, symbol, decimals, totalSupply);
        listToken.push(newToken);
    }

    function getToken(uint8 index) external view returns(address)
    {
        return address(listToken[index]);
    }
}