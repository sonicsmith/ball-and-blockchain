import React, { Component } from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"

@observer
export default class Main extends React.Component {

  findScreen = () => {
    const { contractInstance, address, currentView } = this.props.store;
    contractInstance.getCertificate(address, (err, result) => {
      if (result == true) {
        console.log(result);
        this.props.store.currentView = "view";
      } else {
        alert("No certificate found for address")
      }
    });
  }

  createScreen = () => {
    this.props.store.currentView = "create";
  }

  render() {
    return (<div>
      <h3>Create a permanent, immutable record of your marriage, on the blockchain.</h3>
      <div>
        <input type="text" placeholder="Enter Ethereum address here" />
        <button type="button" onClick={this.findScreen}>&#x1F50D;</button>
      </div>
      <div>
        enter an address above to see a certificate, or click below to create a new certificate
      </div>
      <div>
        <button type="button" onClick={this.createScreen}>CREATE</button>
      </div>
    </div>
    )
  }
}
