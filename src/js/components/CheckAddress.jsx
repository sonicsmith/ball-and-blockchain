import React, { Component } from "react"
import Web3 from "web3"
import { abi } from "../../../build/contracts/MarriageCertificates.json"

const isValidAddress = (h) => {
  if (!h || h.length != 42) {
    return false
  }
  return true
}

export default class CheckAddress extends React.Component {

  constructor() {
    super()
    this.state = {
      address: "",
      hasWeb3: false
    }
    if (typeof web3 != "undefined") {
      console.log("Using web3 detected from external source")
      this.web3 = new Web3(web3.currentProvider)
      const myContract = this.web3.eth.contract(abi)
      this.contractInstance = myContract.at(
        "0x0facaadd39bec3526405c8d783546faf9de09ee8"
      )
      this.state.hasWeb3 = true
    } else {

    }
  }

  findScreen = () => {
    console.log("Checking address for:", this.state.address)
    if (this.contractInstance) {
      this.contractInstance.getCertificate(this.state.address, (err, result) => {
        if (!err) {
          window.location.href = `#/address/${this.state.address}`
        } else {
          alert("No certificate found for address")
        }
      })
    } else {
      alert("Can't connect to server")
    }
  }

  handleChange = event => {
    this.setState({ address: event.target.value })
  }

  render() {
    return (
      <div className="center-all">
        {this.state.hasWeb3 ?
          (<div>
            <div>
              <h3>Enter an address below to view a certificate if one exists</h3>
            </div>
            <div>
              <span className="checkAddressContainer">
                <input
                  className="checkAddressBox"
                  type="text"
                  placeholder="Enter Ethereum address here"
                  value={this.props.address}
                  onChange={this.handleChange}
                  size="42"
                />
              </span>
              <span className="checkAddressButtonContainer">
                <button
                  className="checkAddressButton"
                  type="button"
                  onClick={this.findScreen}
                  disabled={!isValidAddress(this.state.address)}>
                  &#x1F50D;
              </button>
              </span>
            </div>
          </div>) : (<div className="topMessage">
            Web3 plugin needed to access blockchain.
            We recommend using <a href="https://metamask.io/">Metamask</a>
          </div>)}
      </div>
    )
  }
}
