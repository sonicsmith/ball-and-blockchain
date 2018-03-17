import React, { Component } from "react"
import Web3 from "web3"
import { abi } from "../../../build/contracts/MarriageCertificates.json"

import ViewablePartner from "./ViewablePartner"
import PartnerImage from "./PartnerImage"

const weiInEth = 1000000000000000000

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
    console.log(this.state.address)
    if (isValidAddress(this.state.address)) {
      this.contractInstance.getCertificate(this.state.address, (err, result) => {
        console.log(result)
        if (err) {
          //
          alert("ERROR: Accessing blockchain")
          return
        }
        this.setState({ resultReturned: true })
        if (result != null) {
          // uint256, string, string, string, uint
          const bid = result[0]
          const names = result[1]
          const nameSplitIndex = names.indexOf("&")
          let partnerDetails = result[2]
          const bodyType = [
            partnerDetails.charAt(0),
            partnerDetails.charAt(1)
          ]
          partnerDetails = partnerDetails.substr(2)
          const colors = partnerDetails.split("#")
          const blockNumber = result[4].c[0]
          const timeStamp = web3.eth.getBlock(blockNumber, (err, result) => {
            if (!err) {
              this.setState({ timestamp: result.timestamp })
            }
          })

          this.setState({
            bid: bid / weiInEth,
            partnerName: names.split("&"),
            partnerBodyType: bodyType,
            partnerHairColor: [
              `#${colors[0]}`,
              `#${colors[1]}`
            ],
            partnerSkinColor: [
              `#${colors[2]}`,
              `#${colors[3]}`
            ],
            partnerClothesColor: [
              `#${colors[4]}`,
              `#${colors[5]}`
            ],
            message: result[3],
            blockNumber: blockNumber,
          })
          console.log(colors)
        } else {

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
    return (
      <div>
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
            were at {timestamp}, Linux Epoch Time, forever inscribed on block {blockNumber} of the
            blockchain with the value of {bid} ETH.
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
    )
  }
}
