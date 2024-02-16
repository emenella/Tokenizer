// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.23;

// SafeMath Library
// A library for safe arithmetic operations in Solidity.
// It includes safety checks that generate errors in the event of arithmetic overruns.
// Crucial for preventing vulnerabilities in smart contracts due to arithmetic errors.
library Math {

    /**
     * @dev Multiplies two numbers and returns the result.
     * Checks for overflow by ensuring that the result is consistent when divided by one of the operands.
     * If the first operand is 0, returns 0 immediately to avoid unnecessary calculations and possible errors.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        if (a == 0)
        {
            return 0;
        }
        c = a * b;
        assert(c / a == b);
        return c;
    }

    /**
     * @dev Divides one number by another and truncates the result to return an integer.
     * Solidity automatically checks division by zero, so this function does not include an explicit check for this.
     * Returns the quotient of the division.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Subtracts the second number from the first and returns the result.
     * Includes a check to ensure that the operation does not result in an underflow, i.e. that the subtractor is not greater than the minuend.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    /**
     * @dev Adds two numbers and returns the result.
     * Checks to ensure that the result is greater than or equal to one of the operands to prevent overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
        c = a + b;
        assert(c >= a);
        return c;
    }
}