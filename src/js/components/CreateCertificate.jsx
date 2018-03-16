import React, { Component } from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import Web3 from "web3"

import EditablePartner from "./EditablePartner"

const MINIMUM_COST = 0.01

@observer
export default class CreateCertificate extends React.Component {
  @observable address = ""
  @observable partnerName = ["", ""]
  @observable partnerBodyType = [0, 0]
  @observable partnerSkinColor = ["#000000", "#000000"]
  @observable partnerClothesColor = ["#000000", "#000000"]
  @observable message = ""
  @observable bid = this.MINIMUM_COST

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

  createCertificate = () => {
    const {
      web3,
      contractInstance,
      partnerName,
      partnerBodyType,
      partnerSkinColor,
      partnerClothesColor,
      message,
      bid,
    } = this

    if (!web3 || web3.eth.accounts[0]) {
      alert("No ethereum address detected. Are you logged in?")
      return
    }

    const partnerNames = `${partnerName[0]}&${partnerName[1]}`
    const getPartnerDetails = () => {
      return [
        partnerBodyType[0],
        0, //partnerSkinColor[0],
        0, //partnerClothesColor[0],
        partnerBodyType[1],
        0, //partnerSkinColor[1],
        0, //partnerClothesColor[1],
      ]
    }
    console.log("trying to create...")
    contractInstance.createCertificate(
      partnerNames,
      getPartnerDetails(),
      message,
      {
        gas: 300000,
        from: web3.eth.accounts[0],
        value: web3.toWei(bid, "ether"),
      },
      (err, result) => {
        console.log("Err:", err)
        console.log("Result:", err)
      }
    )
  }

  handleChangeMessage = event => {
    event.preventDefault()
    this.props.store.message = event.target.value
  }

  handleChangeBid = event => {
    event.preventDefault()
    this.props.store.bid = event.target.value
  }

  render() {
    const {
      web3,
      message,
      bid,
      partnerName,
      partnerBodyType,
      partnerSkinColor,
      partnerClothesColor,
    } = this

    const address =
      web3 && web3.eth.accounts[0]
        ? web3.eth.accounts[0]
        : "[no address detected]"
    return (
      <div>
        <div>Ethereum address:</div>
        <div>{address}</div>

        <EditablePartner
          partnerNumber={0}
          partnerDetails={{
            partnerName,
            partnerBodyType,
            partnerSkinColor,
            partnerClothesColor,
          }}
        />
        <EditablePartner
          partnerNumber={1}
          partnerDetails={{
            partnerName,
            partnerBodyType,
            partnerSkinColor,
            partnerClothesColor,
          }}
        />

        <div>Optional message:</div>
        <div>
          <input
            type="textarea"
            value={message}
            onChange={this.handleChangeMessage}
          />
        </div>

        <div>Price: (minimum {this.MINIMUM_COST})</div>
        <div>
          <input
            type="number"
            value={bid}
            onChange={this.handleChangeBid}
            placeholder={this.MINIMUM_COST}
          />ETH
        </div>

        <div>
          <button type="button" onClick={this.createCertificate}>
            CREATE
          </button>
        </div>
      </div>
    )
  }
}
