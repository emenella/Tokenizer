pragma solidity ^0.8.19;

import "./interfaces/IERC173.sol";

contract Ownership is IERC173 {

    address private _owner;

    constructor() {
        _owner = msg.sender;
    }

    modifier onlyOwner()
    {
        require(msg.sender == _owner, "Ownership Assertion: Caller of the function is not the owner.");
        _;
    }

    function transferOwnership(address newOwner) external onlyOwner()
    {
        _owner = newOwner;
        emit OwnershipTransferred(msg.sender, newOwner);
    }

    function owner() view external returns(address)
    {
        return _owner;
    }

}