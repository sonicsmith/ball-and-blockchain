import React, { Component } from "react"

import Male from "./Svgs/Male"
import Female from "./Svgs/Female"

export default class PartnerImage extends React.Component {
  render() {
    const { partnerNumber, partnerBodyType } = this.props.partnerDetails
    const bodyType = partnerBodyType[partnerNumber]
    return (
      <span>
        {bodyType == 0 &&
          <Male partnerDetails={this.props.partnerDetails} />}
        {bodyType == 1 &&
          <Female partnerDetails={this.props.partnerDetails} />}
      </span>
    )
  }
}
