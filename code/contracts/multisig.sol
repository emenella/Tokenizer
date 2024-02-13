// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

contract Multisig 
{
    event Deposit(address indexed sender, uint amount, uint balance);
    event SubmitTransaction(
        address indexed sender,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);

    address[] public owners;
    mapping(address => bool) public isOwner;
    uint public numConfirmationRequired;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmation;
    }

    mapping(uint => mapping(address => bool)) public isConfirmed;
    Transaction[] public transactions;
    
    modifier onlyOwner() {
        require(isOwner[msg.sender], "You are not owner");
        _;
    }

    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    modifier notConfirmed(uint _txIdex)
    {
        require(!isConfirmed[_txIdex][msg.sender], "tx already confirm");
    }

    constructor(address[] memory _owner, uint _numConfirmationRequired)
    {
        require(_owner.lentgh > 0, "owner is required");
        require(_numConfirmationRequired > 0 && _numConfirmationRequired <= _owner.length,"invald number of required confirmations");

        for (uint i = 0; i < _owner.length; i++)
        {
            address owner = _owner[i];

            require(owner != address(0), "address null");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }
        numConfirmationRequired = _numConfirmationRequired;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTransation(
        address _to,
        uint _value,
        bytes memory _data) public onlyOwner {
        uint txIndex = transactions.length;

        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                numConfirmation: 0
            })
        );
        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }

    function confirmTransaction(uint _txIndex) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(transaction.numConfirmation >= numConfirmationRequired, "cannot execute");

        transaction.executed = true;

        (bool succes,) = transaction.to.call{value: transaction.value}(transaction.data);
        require(succes, "tx failed");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }
}