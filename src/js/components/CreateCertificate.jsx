import React, { Component } from "react"
import { observable, computed } from "mobx"
import { observer } from "mobx-react"
import Web3 from "web3"
import { abi } from "../../../build/contracts/MarriageCertificates.json"
import styles from "../../css/styles.css"

import EditablePartner from "./EditablePartner"

const certificateTypeNames = [
  "Bronze", "Silver", "Gold", "Platinum"
]

const views = {
  NO_WEB3: 0,
  NO_ADDRESS: 1,
  EDITING: 2,
  SENDING: 3,
  ERROR: 4,
}


const getRandomColor = () => {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

@observer
export default class CreateCertificate extends React.Component {
  @observable address = ""
  @observable partnerName = ["", ""]
  @observable partnerBodyType = [0, 1]
  @observable partnerHairColor = ["#000000", "#000000"]
  @observable partnerSkinColor = ["#ffe0aa", "#a0824e"]
  @observable partnerClothesColor = ["#000000", "#fff0e2"]
  @observable message = ""
  @observable currentView = views.EDITING
  @observable transactionHash = 0
  @observable certificateType = 0
  @computed get bid() { return (this.certificateType + 1) * 0.01 }

  @computed get transactionUrl() {
    // return `https://ropsten.etherscan.io/tx/${this.transactionHash}`
    return `https://etherscan.io/tx/${this.transactionHash}`
  }

  constructor() {
    super()
    if (typeof web3 != "undefined") {
      console.log("Using web3 detected from external source")
      this.web3 = new Web3(web3.currentProvider)
      const myContract = this.web3.eth.contract(abi)
      this.contractInstance = myContract.at(
        "0x0facaadd39bec3526405c8d783546faf9de09ee8"
      )
    } else {
      this.currentView = views.NO_WEB3
    }
  }

  createCertificate = () => {
    if (!web3 || !web3.eth.accounts[0]) {
      alert("No ethereum address detected. Are you logged in?")
      return
    }
    const partnerNames = `${this.partnerName[0]}&${this.partnerName[1]}`
    const partnerDetails = [
      this.partnerBodyType[0],
      this.partnerBodyType[1],
      this.partnerHairColor[0],
      this.partnerHairColor[1],
      this.partnerSkinColor[0],
      this.partnerSkinColor[1],
      this.partnerClothesColor[0],
      this.partnerClothesColor[1],
    ]

    console.log("trying to create:", partnerNames)
    console.log(partnerDetails.join(""))
    this.contractInstance.createCertificate(
      partnerNames,
      partnerDetails.join(""),
      this.message,
      {
        gas: 300000,
        from: this.web3.eth.accounts[0],
        value: this.web3.toWei(this.bid, "ether"),
      },
      (err, result) => {
        if (!err) {
          this.transactionHash = result
          this.currentView = views.SENDING
        } else {
          this.currentView = views.ERROR
        }
      }
    )
  }

  handleChangeMessage = event => {
    if (this.message.length < 256) {
      this.message = event.target.value
    } else {
      this.message = this.message.substr(0, 255)
    }
  }

  handleChangeBid = event => {
    const bid = event.target.value
    if (bid >= MINIMUM_COST) {
      this.bid = bid
    }
  }

  changeCertificateType = direction => {
    return () => {
      let newType = this.certificateType + direction
      if (newType >= 0 && newType < certificateTypeNames.length) {
        this.certificateType = newType
      }
    }
  }

  render() {
    const {
      partnerName,
      partnerBodyType,
      partnerHairColor,
      partnerSkinColor,
      partnerClothesColor,
    } = this
    // Handle no address existing
    return (
      <div className="center-all">
        {this.currentView == views.EDITING &&
          (<div>
            <h3>Enter details of your certificate below:</h3>
            <div className="partnerContainer">
              <EditablePartner
                partnerDetails={{
                  partnerNumber: 0,
                  partnerName,
                  partnerBodyType,
                  partnerHairColor,
                  partnerSkinColor,
                  partnerClothesColor,
                }}
              />
              <EditablePartner
                partnerDetails={{
                  partnerNumber: 1,
                  partnerName,
                  partnerBodyType,
                  partnerHairColor,
                  partnerSkinColor,
                  partnerClothesColor,
                }}
              />
            </div>
            <div className="editableMessage">
              <textarea
                value={this.message}
                onChange={this.handleChangeMessage}
                placeholder="Optional Message"
                rows={3}
                cols={40}
              />
            </div>
            <div className="editableBidValueContainer">
              Certificate type: {certificateTypeNames[this.certificateType]}
              <span className="changeCertTypeButtons">
                <button onClick={this.changeCertificateType(-1)}>{"<"}</button>
                <button onClick={this.changeCertificateType(+1)}>{">"}</button>
              </span>
            </div>
            <div>
              Cost: {this.bid} ETH
            </div>
            <div className="createButton">
              <button type="button" onClick={this.createCertificate}>
                CREATE
              </button>
            </div>
          </div>
          )}


        {this.currentView == views.NO_ADDRESS &&
          (<div className="topMessage">
            Cannot find address, are you logged in?
          </div>)}


        {this.currentView == views.SENDING &&
          (<div className="topMessage">
            <div>Transaction being processed...</div>
            <div><a href={this.transactionUrl}>Click here for progress</a></div>
          </div>)}


        {this.currentView == views.ERROR &&
          (<div className="topMessage">
            Certificate not created. Your account has not been charged.
          </div>)}


        {this.currentView == views.NO_WEB3 &&
          (<div className="topMessage">
            Web3 plugin needed to access blockchain.
            We recommend using <a href="https://metamask.io/">Metamask</a>
          </div>)}

      </div>
    )
  }
}
