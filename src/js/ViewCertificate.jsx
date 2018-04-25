import React, { Component } from "react"
import ReactDOM from "react-dom"
import Web3 from "web3"
import { abi } from "../../build/contracts/MarriageCertificates.json"
import styles from "../css/styles.css"

import ViewablePartner from "./ViewablePartner"
import PartnerImage from "./PartnerImage"


export default class ViewCertificate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      partnerName: ["", ""],
      partnerBodyType: [0, 0],
      partnerHairColor: ["#000000", "#000000"],
      partnerSkinColor: ["#000000", "#000000"],
      partnerClothesColor: ["#000000", "#000000"],
      message: "",
      blockNumber: 0,
      timestamp: 0,
      bid: 0,
    }

    if (typeof web3 != "undefined") {
      console.log("Using web3 detected from external source")
      this.web3 = new Web3(web3.currentProvider)
    }

    const { result } = this.props

    const bid = this.web3.fromWei(result[0].toNumber(), "ether")
    const names = result[1]
    const nameSplitIndex = names.indexOf("&")
    let partnerDetails = result[2]
    const bodyType = [
      partnerDetails.charAt(0),
      partnerDetails.charAt(1)
    ]
    const colors = partnerDetails.split("#")
    const blockNumber = result[4].toNumber()
    const timeStamp = web3.eth.getBlock(blockNumber, (err, result) => {
      if (!err) {
        this.setState({ timestamp: result.timestamp })
      }
    })
    this.state.bid = bid
    this.state.partnerName = names.split("&")
    this.state.partnerBodyType = bodyType
    this.state.partnerHairColor = [
      `#${colors[1]}`,
      `#${colors[2]}`
    ]
    this.state.partnerSkinColor = [
      `#${colors[3]}`,
      `#${colors[4]}`
    ]
    this.state.partnerClothesColor = [
      `#${colors[5]}`,
      `#${colors[6]}`
    ]
    this.state.message = result[3]
    this.state.blockNumber = blockNumber
  }

  render() {
    const {
      partnerName,
      partnerBodyType,
      partnerHairColor,
      partnerSkinColor,
      partnerClothesColor,
      timestamp,
      blockNumber,
      bid,
      message
    } = this.state

    let borderColor
    switch (bid) {
      case "0.01": borderColor = "#CD7F32"
        break;
      case "0.02": borderColor = "#C0C0C0"
        break;
      case "0.03": borderColor = "#D4AF37"
        break;
      default: borderColor = "#dddddd"
        break;
    }

    return (
      <div className="center-all" style={{ padding: 20 }}>
        <div className="certificateContainer" style={{ borderColor }}>
          <h3>Certificate Address: {this.props.address}</h3>
          <div>
            <PartnerImage partnerDetails={{
              partnerNumber: 0,
              partnerName,
              partnerBodyType,
              partnerHairColor,
              partnerSkinColor,
              partnerClothesColor,
            }} />
            <PartnerImage partnerDetails={{
              partnerNumber: 1,
              partnerName,
              partnerBodyType,
              partnerHairColor,
              partnerSkinColor,
              partnerClothesColor,
            }} />
          </div>
          <h1>
            {partnerName[0]} {"&"} {partnerName[1]}
          </h1>
          <div>
            <div>were at {timestamp}, Unix epoch time, forever inscribed on block {blockNumber}</div>
            <div>of the Ethereum blockchain with the value of {bid} ETH.</div>
          </div>
          <div className="viewableMessage">{message}</div>
        </div>
      </div>
    )
  }
}