import React, { Component } from "react"
import ReactDOM from "react-dom"
import Web3 from "web3"
import { abi } from "../../build/contracts/MarriageCertificates.json"
import ViewCertificate from "./ViewCertificate"

const isValidAddress = (h) => {
  if (!h || h.length != 42) {
    return false
  }
  return true
}


const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default class CheckAddress extends React.Component {

  constructor() {
    super()
    console.log("Starting")
    this.state = {
      address: "",
      hasWeb3: false,
      result: null
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
      console.log("Can't find metamask")
    }
    const address = getParameterByName("address")
    if (address) {
      this.state.address = address
      this.findScreen()
    }
  }

  findScreen = () => {
    console.log("Checking address for:", this.state.address)
    if (this.contractInstance) {
      this.contractInstance.getCertificate(this.state.address, (err, result) => {
        if (!err) {
          this.setState({ result })
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
    const { result } = this.state
    return (
      <div className="center-all">
        <div>{"\u00a0"}</div>
        <div>{"\u00a0"}</div>
        {this.state.hasWeb3 ?
          (<div>
            {result && <ViewCertificate address={this.state.address} result={result} /> ||
              <div>
                <div>
                  <h3>Enter an address below to view a certificate if one exists</h3>
                </div>
                <div>
                  <span className="checkAddressContainer">
                    <input
                      className="checkAddressBox"
                      type="text"
                      placeholder="Enter Ethereum address here"
                      value={this.state.address}
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
              </div>}

          </div>) : (<div className="topMessage">
            Web3 plugin needed to access blockchain.
            We recommend using <a href="https://metamask.io/">Metamask</a>
          </div>)}
        <div>{"\u00a0"}</div>
        <div>{"\u00a0"}</div>
      </div>
    )
  }
}

ReactDOM.render(<CheckAddress />, document.querySelector("#react-element"))
