// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;


interface IERC20
{
    function name()                                                     external view returns (string memory);
    function symbol()                                                   external view returns (string memory);
    function decimals()                                                 external view returns (uint8);
    function totalSupply()                                              external view returns (uint256);
    function balanceOf(address _owner)                                  external view returns (uint256);
    function transfer(address _to, uint256 _anount)                     external      returns (bool);
    function transferFrom(address _from, address _to, uint256 _amount)  external      returns (bool);
    function approve(address _spender, uint256 _amount)                 external      returns (bool);
    function allowance(address _owner, address _spender)                external view returns (uint256);

    event Transfer(address indexed _from, address indexed _to, uint256 _amount);
    event Approve(address indexed _from, address indexed _spender, uint256 _amount);
    
    error ERC20InsufficientBalance(address from, uint256 fromBalance, uint amount);
    error ERC20InsufficientAllowance(address from, uint256 fromBalance, uint amount);
    error ERC20InvalidApprover(address addr);
    error ERC20InvalidSender(address addr);
}