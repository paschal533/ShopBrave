// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";
import "./libraries/SafeMath.sol";

contract Fundraiser is Ownable {
  using SafeMath for uint256;   

  struct Donation {
    uint256 value;
    //uint256 conversionFactor;
    uint256 date;
  }

  struct allDonation {
    address donor;
    uint256 value;
    uint256 date;
  }
  
  mapping(address => Donation[]) private _donations;
  mapping(uint256 => allDonation[]) private _allDonations;

  event DonationReceived(address indexed donor, uint256 value);
  event Withdraw(uint256 amount);

  uint256 public id;
  string public name;
  string[] public images;
  string[] public categories;
  string public description;
  string public region;
  address payable public beneficiary;
  address public custodian;
  uint256 public totalDonations;
  uint256 public totalDonationsCount;
  uint256 public donationsCount;
  uint256 public goal;

  constructor(
    uint256 _id,
    string memory _name,
    string[] memory _images,
    string[] memory _categories,
    string memory _description,
    string memory _region,
    address payable _beneficiary,
    address _custodian,
    uint256 _goal
  )
  {
    id = _id;
    name = _name;
    images = _images;
    categories = _categories;
    description = _description;
    region = _region;
    beneficiary = _beneficiary;
    _transferOwnership(_custodian);
    goal = _goal;
  }

  // Set New Beneficiary of a fundraiser
  function setBeneficiary(address payable _beneficiary) public onlyOwner {
    beneficiary = _beneficiary;
  }

  function getImageUrls() public view returns(string[] memory){
    return images;
  }

  function getCategories() public view returns(string[] memory){
    return categories;
  }

  // Query My Donations count
  function myDonationsCount() public view returns(uint256) {
    return _donations[msg.sender].length;
  }

  // Query all Donations count
  function allDonationsCount() public view returns(uint256) {
    return _allDonations[id].length;
  }

  // Make a donation
  function donate() public payable {
    Donation memory donation = Donation({
      value: msg.value,
      date: block.timestamp
    });

    allDonation memory AllDonations = allDonation({
      donor: msg.sender,
      value: msg.value,
      date: block.timestamp
    });

    _donations[msg.sender].push(donation);
    _allDonations[id].push(AllDonations);
    totalDonations = totalDonations.add(msg.value);
    donationsCount = donationsCount + 1;
    totalDonationsCount = totalDonationsCount + 1;

    emit DonationReceived(msg.sender, msg.value);
  }

  // Query my donations
  function myDonations() public view returns(
    uint256[] memory values,
    uint256[] memory dates
  )
  {
    uint256 count = myDonationsCount();
    values = new uint256[](count);
    dates = new uint256[](count);

    for (uint256 i = 0; i < count; i++) {
      Donation storage donation = _donations[msg.sender][i];
      values[i] = donation.value;
      dates[i] = donation.date;
    }

    return (values, dates);
  }

  // Query all donations
  function allDonations() public view returns(
    address[] memory donors,
    uint256[] memory values,
    uint256[] memory dates
  )
  {
    uint256 count = allDonationsCount();
    donors = new address[](count);
    values = new uint256[](count);
    dates = new uint256[](count);

    for (uint256 i = 0; i < count; i++) {
      allDonation storage AllDonation = _allDonations[id][i];
      donors[i] = AllDonation.donor;
      values[i] = AllDonation.value;
      dates[i] = AllDonation.date;
    }

    return (donors, values, dates);
  }

  // Withdraw Function
  function withdraw() public onlyOwner {
    uint balance = address(this).balance;
    beneficiary.transfer(balance);

    emit Withdraw(balance);
  }

  receive() external payable {
    totalDonations = totalDonations.add(msg.value);
    donationsCount++;
  }
}