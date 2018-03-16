import React, { Component } from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"

const NUM_BODY_TYPES = 6

import PartnerImage from "./PartnerImage"

@observer
export default class EditablePartner extends React.Component {
  changeBodyType = direction => {
    return () => {
      const index = this.props.partnerNumber
      const newType =
        this.props.partnerDetails.partnerBodyType[index] + direction
      if (newType >= 0 && newType <= NUM_BODY_TYPES) {
        this.props.partnerDetails.partnerBodyType[index] = newType
      }
    }
  }

  handleChangeName = index => {
    return event => {
      event.preventDefault()
      this.props.partnerDetails.partnerName[index] = event.target.value
    }
  }

  handleChangeSkinColor = index => {
    return event => {
      event.preventDefault()
      this.props.partnerDetails.partnerSkinColor[index] = event.target.value
    }
  }

  handleChangeClothesColor = index => {
    return event => {
      event.preventDefault()
      this.props.partnerDetails.partnerClothesColor[index] = event.target.value
    }
  }

  render() {
    const partnerNumber = this.props.partnerNumber
    const {
      partnerName,
      partnerBodyType,
      partnerSkinColor,
      partnerClothesColor,
    } = this.props.partnerDetails
    return (
      <div>
        <div>Partner {partnerNumber + 1} name:</div>
        <div>
          <input
            type="text"
            value={partnerName[partnerNumber]}
            onChange={this.handleChangeName(partnerNumber)}
          />
        </div>

        <PartnerImage partnerDetails={this.props.partnerDetails} />

        <div>
          Partner {partnerNumber + 1} body type:{" "}
          {partnerBodyType[partnerNumber]}
        </div>
        <div>
          <button onClick={this.changeBodyType(-1)}>{"<"}</button>
          <button onClick={this.changeBodyType(+1)}>{">"}</button>
        </div>

        <div>Partner {partnerNumber + 1} skin color:</div>
        <div>
          <input
            type="color"
            value={partnerSkinColor[partnerNumber]}
            onChange={this.handleChangeSkinColor(partnerNumber)}
          />
        </div>

        <div>Partner {partnerNumber + 1} clothes color:</div>
        <div>
          <input
            type="color"
            value={partnerClothesColor[partnerNumber]}
            onChange={this.handleChangeClothesColor(partnerNumber)}
          />
        </div>
      </div>
    )
  }
}
