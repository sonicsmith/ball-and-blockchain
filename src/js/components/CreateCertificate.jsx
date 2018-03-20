import React, { Component } from "react"
import { observable, computed } from "mobx"
import { observer } from "mobx-react"
import Web3 from "web3"
import { abi } from "../../../build/contracts/MarriageCertificates.json"
import styles from "../../css/styles.css"

import EditablePartner from "./EditablePartner"

const MINIMUM_COST = 0.01

const views = {
  NO_WEB3: 0,
  NO_ADDRESS: 1,
  EDITING: 2,
  SENDING: 3,
  CREATED: 4,
  ERROR: 5,
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
  @observable bid = MINIMUM_COST
  @observable currentView = views.EDITING
  @observable transactionHash = 0

  @computed get transactionUrl() {
    return `https://ropsten.etherscan.io/tx/${this.transactionHash}`
    // return `https://etherscan.io/tx/${this.transactionHash}`
  }

  constructor() {
    super()
    if (typeof web3 != "undefined") {
      console.log("Using web3 detected from external source")
      this.web3 = new Web3(web3.currentProvider)
      const myContract = this.web3.eth.contract(abi)
      this.contractInstance = myContract.at(
        "0xf346a2f4f7c727ded9092106046cabb436fc6efa"
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
    this.message = event.target.value
  }

  handleChangeBid = event => {
    const bid = event.target.value
    if (bid >= MINIMUM_COST) {
      this.bid = bid
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
            <div className={styles.partnerContainer}>
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
            <div className={styles.editableMessage}>
              <textarea
                className="editableMessage"
                value={this.message}
                onChange={this.handleChangeMessage}
                placeholder="Optional Message"
                rows={3}
                cols={40}
              />
            </div>
            <div>
              Bid Value: (min {MINIMUM_COST})
            </div>
            <div className={styles.editableBidValue}>
              <input
                type="number"
                value={this.bid}
                onChange={this.handleChangeBid}
                placeholder={MINIMUM_COST}
                step={0.01}
              />ETH
        </div>
            <div>
              <button type="button" onClick={this.createCertificate}>
                CREATE
          </button>
            </div>
          </div>
          )}


        {this.currentView == views.NO_ADDRESS &&
          (<div>
            Cannot find address, are you logged in?
          </div>)}


        {this.currentView == views.SENDING &&
          (<div>
            Transaction being processed...
            <a href={this.transactionUrl}>Click here for progress</a>
          </div>)}


        {this.currentView == views.ERROR &&
          (<div>
            Certificate not created
          </div>)}


        {this.currentView == views.NO_WEB3 &&
          (<div>
            Web3 plugin needed to access blockchain.
            We recommend using <a href="https://metamask.io/">Metamask</a>
          </div>)}


        {this.currentView == views.CREATED &&
          (<div>
            Transaction successful, wait for processing:
          </div>)}

      </div>
    )
  }
}
