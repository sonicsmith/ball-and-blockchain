import React, { Component } from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"

@observer
export default class CheckAddress extends React.Component {
  @observable address

  constructor() {
    super()
    if (typeof web3 != "undefined") {
      console.log("Using web3 detected from external source")
      this.web3 = new Web3(web3.currentProvider)
      const myContract = this.web3.eth.contract(abi.abi)
      this.contractInstance = myContract.at(
        "0x68bfc43672ba4f9d22cccd22b0ca33b674717e9b"
      )
    }
  }

  findScreen = () => {
    const { contractInstance, address } = this
    contractInstance.getCertificate(address, (err, result) => {
      if (result == true) {
        window.location.href = `/address/${address}`
      } else {
        alert("No certificate found for address")
      }
    })
  }

  handleChange = event => {
    event.preventDefault()
    this.address = event.target.value
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
            value={this.address}
            onChange={this.handleChangeMessage}
          />
          <button type="button" onClick={this.findScreen}>
            &#x1F50D;
          </button>
        </div>
      </div>
    )
  }
}
