// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Company.sol";

contract CompanyFactory {
  Company[] private _companies;

  event CompanyCreated(Company indexed fundraiser, address indexed owner);
  event ProductBought(address companyAddress, uint256 amount, uint256 id);
  event ProductConfirmed(address companyAddress, uint256 amount, uint256 id);

  struct PendingProduct {
    uint256 productId;
    address payable companyAddress;
    address owner;
    uint256 value;
    bool confirmed;
  }

  mapping(uint256 => PendingProduct) private _pendingProducts;
  uint256 constant maxLimit = 20;

  uint256 public currentId;
  uint256 public currentProductId;

  function createCompany(
    string memory name,
    address payable beneficiary
  )
  public
  {
    Company company = new Company(
      currentId,
      name,
      msg.sender,
      beneficiary
    );
    _companies.push(company);
    currentId += 1;
    emit CompanyCreated(company, msg.sender);
  }

  //Buy a product
  function buyProduct(address payable companyAddress, uint256 amount) public payable returns(uint256) {
    require(msg.value >= amount, "not enoungh fund sent");
    currentProductId++;
    _pendingProducts[currentProductId].productId = currentProductId;
    _pendingProducts[currentProductId].companyAddress = companyAddress;
    _pendingProducts[currentProductId].value = amount;
    _pendingProducts[currentProductId].confirmed = false;
    _pendingProducts[currentProductId].owner = msg.sender;
    emit ProductBought(companyAddress, amount, currentId);
    return currentProductId;
  }

  //confirm a product received
  function confirmProduct(uint256 productId) public {
    require(currentProductId >= productId, "product Id not found");
    require(_pendingProducts[productId].owner == msg.sender, "Not the owner");
    require(_pendingProducts[productId].confirmed == false, "product has been confirmed");
    PendingProduct storage pendingProduct = _pendingProducts[productId];
    uint balance = pendingProduct.value;
    pendingProduct.companyAddress.call{value: balance}(
       abi.encodeWithSignature("foo(string,uint256)", "call foo", 123)
    );
     
    pendingProduct.confirmed = true;
    emit ProductConfirmed(pendingProduct.companyAddress, pendingProduct.value, pendingProduct.productId);
  }

  // Query the number of companies in our smart contract
  function companiesCount() public view returns(uint256) {
    return _companies.length;
  }

  // Query all companies in our smart contract
  function companys(uint256 limit, uint256 offset) 
    public 
    view
    returns(Company[] memory coll)
  {
    require(offset <= companiesCount(), "offset out of bounds");
    uint256 size = companiesCount() - offset;
    // size should not exceed the maxLimit
    size = size < limit ? size : limit;
    size = size < maxLimit ? size : maxLimit;
    coll = new Company[](size);

    for(uint256 i = 0; i < size; i++) {
      coll[i] = _companies[offset + i];
    }
    
    return coll;
  }

  receive() external payable { }
}