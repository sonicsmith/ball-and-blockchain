import React, { Component } from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import styles from "../../css/styles.css"

const NUM_BODY_TYPES = 2

import PartnerImage from "./PartnerImage"

@observer
export default class EditablePartner extends React.Component {
  changeBodyType = direction => {
    return () => {
      const { partnerNumber, partnerBodyType } = this.props.partnerDetails
      const index = partnerNumber
      let newType = partnerBodyType[index] + direction
      if (newType < 0) {
        newType = NUM_BODY_TYPES - 1
      }
      if (newType > NUM_BODY_TYPES - 1) {
        newType = 0
      }
      partnerBodyType[index] = newType
    }
  }

  handleChangeName = index => {
    return event => {
      this.props.partnerDetails.partnerName[index] = event.target.value
    }
  }

  handleChangeHairColor = index => {
    return event => {
      this.props.partnerDetails.partnerHairColor[index] = event.target.value
    }
  }

  handleChangeSkinColor = index => {
    return event => {
      this.props.partnerDetails.partnerSkinColor[index] = event.target.value
    }
  }

  handleChangeClothesColor = index => {
    return event => {
      this.props.partnerDetails.partnerClothesColor[index] = event.target.value
    }
  }

  render() {
    const {
      partnerNumber,
      partnerName,
      partnerBodyType,
      partnerHairColor,
      partnerSkinColor,
      partnerClothesColor,
    } = this.props.partnerDetails
    return (
      <div className={styles.partnerDetailsContainer}>

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

        <div>Partner {partnerNumber + 1} hair color:</div>
        <div>
          <input
            type="color"
            value={partnerHairColor[partnerNumber]}
            onChange={this.handleChangeHairColor(partnerNumber)}
          />
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
