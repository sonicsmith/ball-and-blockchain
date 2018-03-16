import React, { Component } from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"

import ViewablePartner from "./ViewablePartner"

@observer
export default class ViewCertificate extends React.Component {
  @observable address = ""
  @observable partnerName = ["", ""]
  @observable partnerBodyType = [0, 0]
  @observable partnerSkinColor = ["#000000", "#000000"]
  @observable partnerClothesColor = ["#000000", "#000000"]
  @observable message = ""
  @observable timestamp = 0
  @observable bid = 0

  constructor(props) {
    super(props)
    console.log(props.match.params)
    this.address = props.match.params.address
  }

  render() {
    const {
      address,
      partnerName,
      partnerBodyType,
      partnerSkinColor,
      partnerClothesColor,
      timestamp,
      bid,
      message,
    } = this
    return (
      <div>
        <h3>Certificate Address: {address}</h3>
        {timestamp != 0 ? (
          <div>
            <div>
              <ViewablePartner
                partnerNumber={0}
                partnerDetails={{
                  partnerName,
                  partnerBodyType,
                  partnerSkinColor,
                  partnerClothesColor,
                }}
              />
              <ViewablePartner
                partnerNumber={1}
                partnerDetails={{
                  partnerName,
                  partnerBodyType,
                  partnerSkinColor,
                  partnerClothesColor,
                }}
              />
            </div>
            <h1>
              {partnerName[0]} {"&"} {partnerName[1]}
            </h1>
            were at {timestamp}, Linux Epoch Time, forever inscribed on the
            blockchain with the value of {bid} ETH.
            <div>{message}</div>
          </div>
        ) : (
          <div>Searching blockchain for address...</div>
        )}
      </div>
    )
  }
}
