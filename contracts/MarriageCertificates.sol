pragma solidity ^0.4.10;

contract MarriageCertificates {

    struct CertificateStruct {
        uint256 value;
        string names;
        string partnerDetails;
        uint blockNumber;
        string message;
        bool exists;
    }

    mapping (address => CertificateStruct) public CertificateStructs;

    address private owner;
    uint256 private minimumCost = 1 finney;
    uint256 private maxHoldings = 200 finney;


    function MarriageCertificates(uint256 _minimumCost, uint256 _maxHoldings) public {
        owner = msg.sender;
        if (_minimumCost > 0) {
            minimumCost = _minimumCost;
        }
        if (_maxHoldings > 0) {
            maxHoldings = _maxHoldings;
        }
    }

    function createCertificate (
        string names,
        string partnerDetails,
        string message
    ) payable public {
        require(msg.value >= 1 finney);
        require(!CertificateStructs[msg.sender].exists);

        address key = msg.sender;

        CertificateStructs[key].value = msg.value;
        CertificateStructs[key].names = names;
        CertificateStructs[key].partnerDetails = partnerDetails;
        CertificateStructs[key].message = message;
        CertificateStructs[key].blockNumber = block.number;
        CertificateStructs[key].exists = true;

        address contractAddress = this;
        if (contractAddress.balance > maxHoldings) {
            owner.transfer(maxHoldings);
        }

    }

    function getCertificate (address key) public constant returns (uint256, string, string, string, uint) {
        if (CertificateStructs[key].exists) {
            return (
                CertificateStructs[key].value,
                CertificateStructs[key].names,
                CertificateStructs[key].partnerDetails,
                CertificateStructs[key].message,
                CertificateStructs[key].blockNumber
            );
        }
    }

    function() public payable {}
}