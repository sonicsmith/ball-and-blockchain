pragma solidity ^0.4.10;

contract MarriageCertificates {

    struct CertificateStruct {
        uint256 value;
        string names;
        bytes32[6] partnerDetails;
        uint blockNumber;
        string message;
        bool exists;
    }

    mapping (address => CertificateStruct) public CertificateStructs;

    address[] private keys;
    address private owner;
    uint256 private minimumCost = 1 finney;
    uint256 private maxHoldings = 500 finney;


    function MarriageCertificates(uint256 _minimumCost, uint256 _maxHoldings) public {
        owner = msg.sender;
        if (_minimumCost > 0) {
            minimumCost = _minimumCost;
        }
        if (_maxHoldings > 0) {
            maxHoldings = _maxHoldings;
        }
    }

    function getCertificateKeys() public constant returns (address[]) {
        return keys;
    }

    function createCertificate (
        string names,
        bytes32[6] partnerDetails,
        string message
    ) payable public {
        require(msg.value >= 1 finney);
        require(partnerDetails.length == 6);
        require(!CertificateStructs[msg.sender].exists);
        address key = msg.sender;

        CertificateStructs[key].value = msg.value;
        CertificateStructs[key].names = names;
        CertificateStructs[key].partnerDetails[0] = partnerDetails[0];
        CertificateStructs[key].partnerDetails[1] = partnerDetails[1];
        CertificateStructs[key].partnerDetails[2] = partnerDetails[2];
        CertificateStructs[key].partnerDetails[3] = partnerDetails[3];
        CertificateStructs[key].partnerDetails[4] = partnerDetails[4];
        CertificateStructs[key].partnerDetails[5] = partnerDetails[5];
        CertificateStructs[key].message = message;
        CertificateStructs[key].blockNumber = block.number;
        CertificateStructs[key].exists = true;
        keys.push(key);

        address contractAddress = this;
        if (contractAddress.balance > maxHoldings) {
            owner.transfer(maxHoldings);
        }

    }

    function getCertificate (address key) public constant returns (uint256, string, bytes32[6], string, uint) {
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