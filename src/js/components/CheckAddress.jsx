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
      address: ""
    }
    if (typeof web3 != "undefined") {
      console.log("Using web3 detected from external source")
      this.web3 = new Web3(web3.currentProvider)
      const myContract = this.web3.eth.contract(abi)
      this.contractInstance = myContract.at(
        "0xeb699b937100230b3e117eefc68f95fda598ded4"
      )
    }
  }

  findScreen = () => {
    console.log("Checking address for:", this.state.address)
    if (this.contractInstance) {
      this.contractInstance.getCertificate(this.state.address, (err, result) => {
        if (result == true) {
          window.location.href = `/address/${address}`
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
      <div>
        <div>
          Enter an address below to see if a certificate exists and view it
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Ethereum address here"
            value={this.props.address}
            onChange={this.handleChange}
            size="42"
          />
          <button type="button" onClick={this.findScreen} disabled={!isValidAddress(this.state.address)}>
            {isValidAddress(this.state.address) ? (<div>&#x1F50D;</div>) : (<div>/</div>)}
          </button>

        </div>
      </div>
    )
  }
}
