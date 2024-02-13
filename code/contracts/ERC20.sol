// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "./interfaces/IERC20.sol";


contract ERC20 is IERC20
{
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    uint256 private _totalSupply;

    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;


    constructor(string memory __name, string memory __symbol, uint8 __decimals, uint256 __totalSupply)
    {
        _name = __name;
        _symbol = __symbol;
        _decimals = __decimals;
        _totalSupply = __totalSupply;
        _balances[msg.sender] = __totalSupply;
    }

    function name() external view override returns (string memory)
    {
        return _name;
    }

    function symbol() external view override returns (string memory)
    {
        return _symbol;
    }

    function decimals() external view override returns (uint8)
    {
        return _decimals;
    }

    function totalSupply() external view override returns (uint256)
    {
        return _totalSupply;
    }

    function balanceOf(address _owner) external view override returns (uint256)
    {
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _amount) external returns (bool)
    {
        address owner = msg.sender;
        _transfer(owner, _to, _amount);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _amount) external returns (bool)
    {
        address spender = msg.sender;
        _spendAllowance(_from, spender, _amount);
        _transfer(_from, _to, _amount);
        return true;
    }

    function approve(address _spender, uint256 _amount) external returns (bool)
    {
        address owner = msg.sender;
        _approve(owner, _spender, _amount, true);
        emit Approve(owner, _spender, _amount);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256)
    {
        return _allowances[_owner][_spender];
    }

    function _update(address _from, address _to, uint256 _amount) internal
    {
        if (address(0) == _from)
        {
            _totalSupply += _amount;
        }
        else
        {
            uint fromBalance = _balances[_from];
            if (fromBalance < _amount)
            {
                revert ERC20InsufficientBalance(_from, fromBalance, _amount);
            }
            unchecked {
                // Overflow not possible: value <= fromBalance <= totalSupply.
                _balances[_from] = fromBalance - _amount;
            }
        }

        if (address(0) == _to)
        {
            _totalSupply -= _amount;
        }
        else
        {
            unchecked {
                _balances[_to] += _amount;
            }
        }
        emit Transfer(_from, _to, _amount);
    }

    function _approve(address owner, address spender, uint256 value, bool emitEvent) internal
    {
        if (owner == address(0))
        {
            revert ERC20InvalidApprover(address(0));
        }
        if (spender == address(0))
        {
            revert ERC20InvalidApprover(address(0));
        }
        _allowances[owner][spender] = value;
        if (emitEvent)
        {
            emit Approve(owner, spender, value);
        }
    }

    function _spendAllowance(address owner, address spender, uint256 value) internal
    {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max)
        {
            if (currentAllowance < value)
            {
                revert ERC20InsufficientAllowance(spender, currentAllowance, value);
            }
            unchecked {
                _approve(owner, spender, currentAllowance - value, false);
            }
        }
    }

    function _transfer(address from, address to, uint256 value) internal
    {
        if (from == address(0))
        {
            revert ERC20InvalidSender(address(0));
        }
        if (to == address(0))
        {
            revert ERC20InvalidSender(address(0));
        }
        _update(from, to, value);
    }

}