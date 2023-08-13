// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";
import "./libraries/SafeMath.sol";

contract Company is Ownable {
  using SafeMath for uint256;   

  event DonationReceived(address indexed donor, uint256 value);
  event Withdraw(uint256 amount);

  uint256 public id;
  string public name;
  address payable public beneficiary;
  uint256 public totalFunds;
  uint256 public totalFundsCount;

  constructor(
    uint256 _id,
    string memory _name,
    address _custodian,
    address payable _beneficiary
  )
  {
    id = _id;
    name = _name;
    _transferOwnership(_custodian);
    beneficiary = _beneficiary;
  }

  // Set New Beneficiary of a Company
  function setBeneficiary(address payable _beneficiary) public onlyOwner {
    beneficiary = _beneficiary;
  }

  // Withdraw Function
  function withdraw() public onlyOwner {
    uint balance = address(this).balance;
    beneficiary.transfer(balance);

    emit Withdraw(balance);
  }

  receive() external payable {
     totalFunds = totalFunds.add(msg.value);
     totalFundsCount++;
  }
}