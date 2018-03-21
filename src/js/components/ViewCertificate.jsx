import React, { Component } from "react"
import Web3 from "web3"
import { abi } from "../../../build/contracts/MarriageCertificates.json"
import styles from "../../css/styles.css"

import ViewablePartner from "./ViewablePartner"
import PartnerImage from "./PartnerImage"

const isValidAddress = (h) => {
  if (!h || h.length != 42) {
    return false
  }
  return true
}

export default class ViewCertificate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      address: props.match.params.address,
      partnerName: ["", ""],
      partnerBodyType: [0, 0],
      partnerHairColor: ["#000000", "#000000"],
      partnerSkinColor: ["#000000", "#000000"],
      partnerClothesColor: ["#000000", "#000000"],
      message: "",
      blockNumber: 0,
      timestamp: 0,
      bid: 0,
      resultReturned: false
    }
    if (typeof web3 != "undefined") {
      console.log("Using web3 detected from external source")
      this.web3 = new Web3(web3.currentProvider)
      const myContract = this.web3.eth.contract(abi)
      this.contractInstance = myContract.at(
        "0xf346a2f4f7c727ded9092106046cabb436fc6efa"
      )
    }
    if (isValidAddress(this.state.address)) {
      this.contractInstance.getCertificate(this.state.address, (err, result) => {
        this.setState({ resultReturned: true })
        if (!err) {
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
          this.setState({
            bid: bid,
            partnerName: names.split("&"),
            partnerBodyType: bodyType,
            partnerHairColor: [
              `#${colors[1]}`,
              `#${colors[2]}`
            ],
            partnerSkinColor: [
              `#${colors[3]}`,
              `#${colors[4]}`
            ],
            partnerClothesColor: [
              `#${colors[5]}`,
              `#${colors[6]}`
            ],
            message: result[3],
            blockNumber: blockNumber,
          })
        } else {
          alert("ERROR: Accessing blockchain")
        }
      })
    }

  }


  render() {
    const {
      address,
      partnerName,
      partnerBodyType,
      partnerHairColor,
      partnerSkinColor,
      partnerClothesColor,
      timestamp,
      blockNumber,
      bid,
      message,
      resultReturned
    } = this.state
    const borderThickness = bid / 0.01
    let borderColor
    switch (bid) {
      case 0.01: borderColor = "#CD7F32"
        break;
      case 0.02: borderColor = "#C0C0C0"
        break;
      case 0.03: borderColor = "#D4AF37"
        break;
      default: borderColor = "#e5e4e2"
        break;
    }
    return (
      <div className="center-all" style={{ padding: 20 }}>
        <div className="certificateContainer" style={{ borderColor }}>
          <h3>Certificate Address: {address}</h3>
          {resultReturned && blockNumber != 0 ? (
            <div>
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
                were at {timestamp}, Unix epoch time, forever inscribed on block {blockNumber} of the
            Ethereum blockchain with the value of {bid} ETH.
            </div>
              <div>{message}</div>
            </div>
          ) :

            (<div>
              {resultReturned && blockNumber == 0 ? (<div>
                No certificate found
            </div>) : (<div>
                  {isValidAddress(address) ?
                    (<div>Searching blockchain for certificate...</div>) : (<div>Address not valid</div>)}
                </div>)}
            </div>)}

        </div>
      </div>
    )
  }
}
