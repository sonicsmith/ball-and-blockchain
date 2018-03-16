import React, { Component } from "react"

import Male from "./Svgs/Male"

export default class PartnerImage extends React.Component {
  render() {
    const { partnerNumber, partnerBodyType } = this.props.partnerDetails
    const bodyType = partnerBodyType[partnerNumber]
    return (
      <div>
        <Male partnerDetails={this.props.partnerDetails} />
      </div>
    )
  }
}
