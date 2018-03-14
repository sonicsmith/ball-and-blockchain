var MarriageCertificates = artifacts.require("./MarriageCertificates.sol");

module.exports = function (deployer) {
  deployer.deploy(MarriageCertificates);
};