import React, { Component } from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"

@observer
export default class ViewablePartner extends React.Component {
  render() {
    const partnerNumber = this.props.partnerNumber
    const {
      partnerBodyType,
      partnerSkinColor,
      partnerClothesColor,
    } = this.props.partnerDetails
    return <div>O</div>
  }
}
