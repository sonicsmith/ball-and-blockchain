import React, { Component } from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import Web3 from "web3"
import { abi } from "../../../build/contracts/MarriageCertificates.json"
import styles from "../../css/styles.css"

import EditablePartner from "./EditablePartner"

const MINIMUM_COST = 0.01

const views = {
  NO_ADDRESS: 0,
  EDITING: 1,
  SENDING: 2,
  ERROR: 3,
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
  @observable partnerBodyType = [0, 0]
  @observable partnerHairColor = ["#000000", "#000000"]
  @observable partnerSkinColor = ["#000000", "#000000"]
  @observable partnerClothesColor = ["#000000", "#000000"]
  @observable message = ""
  @observable bid = MINIMUM_COST
  @observable sendingData = false
  @observable currentView = views.EDITING

  constructor() {
    super()
    if (typeof web3 != "undefined") {
      console.log("Using web3 detected from external source")
      this.web3 = new Web3(web3.currentProvider)
      const myContract = this.web3.eth.contract(abi)
      this.contractInstance = myContract.at(
        "0xf346a2f4f7c727ded9092106046cabb436fc6efa"
      )
      // this.address = web3.eth.accounts[0]
    } else {
      console.log("No web3")
    }
    for (let i = 0; i < 2; i++) {
      this.partnerBodyType[i] = Math.floor(Math.random() * 2)
      this.partnerHairColor[i] = getRandomColor()
      this.partnerSkinColor[i] = getRandomColor()
      this.partnerClothesColor[i] = getRandomColor()
    }
  }

  createCertificate = () => {
    sendingData = true
    const {
      web3,
      contractInstance,
      partnerName,
      partnerBodyType,
      partnerHairColor,
      partnerSkinColor,
      partnerClothesColor,
      message,
      bid,
    } = this

    // if (!web3 || !web3.eth.accounts[0]) {
    //   alert("No ethereum address detected. Are you logged in?")
    //   return
    // }
    const partnerNames = `${partnerName[0]}&${partnerName[1]}`
    const getPartnerDetails = () => {
      return [
        partnerBodyType[0],
        partnerBodyType[1],
        partnerHairColor[0],
        partnerHairColor[1],
        partnerSkinColor[0],
        partnerSkinColor[1],
        partnerClothesColor[0],
        partnerClothesColor[1],
      ]
    }
    console.log("trying to create:", partnerNames)
    contractInstance.createCertificate(
      partnerNames,
      getPartnerDetails().join(""),
      message,
      {
        gas: 300000,
        from: web3.eth.accounts[0],
        value: web3.toWei(bid, "ether"),
      },
      (err, result) => {
        sendingData = false
        if (!err) {
          window.location.href = `/#/address/${web3.eth.accounts[0]}`
        }
      }
    )
  }

  handleChangeMessage = event => {
    this.message = event.target.value
  }

  handleChangeBid = event => {
    this.bid = event.target.value
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
      <div>

        {this.currentView == views.NO_ADDRESS &&
          (<div>
            Cannot find address, are you logged in?
          </div>)}


        {this.currentView == views.EDITING &&
          (<div>
            {/* <div>Ethereum address:</div>
            <div>{this.address}</div> */}
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
            <div>Optional message:</div>
            <div>
              <textarea
                value={this.message}
                onChange={this.handleChangeMessage}
                placeholder="E.g. Immutible love forever"
                rows={4}
              />
            </div>
            <div>Price: (minimum {MINIMUM_COST})</div>
            <div>
              <input
                type="number"
                value={this.bid}
                onChange={this.handleChangeBid}
                placeholder={MINIMUM_COST}
              />ETH
        </div>
            <div>
              <button type="button" onClick={this.createCertificate}>
                CREATE
          </button>
            </div>
          </div>
          )}


        {this.currentView == views.SENDING &&
          (<div>
            Sending Data...
          </div>)}


        {this.currentView == views.ERROR &&
          (<div>
            Certificate not created
          </div>)}

      </div>
    )
  }
}
