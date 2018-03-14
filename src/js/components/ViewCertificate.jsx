import React, { Component } from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"



@observer
class ViewablePartner extends React.Component {

  render() {
    const partnerNumber = this.props.partnerNumber;
    const { partnerBodyType, partnerSkinColor, partnerClothesColor } = this.props.store;
    return (<div>
      O
    </div>
    )
  }
}


@observer
export default class ViewCertificate extends React.Component {

  render() {
    const { address, partnerName, timestamp, message } = this.props.store;
    return (<div>
      <h3>Certificate Address: {address}</h3>
      <div>
        <ViewablePartner partnerNumber={0} store={this.props.store} />
        <ViewablePartner partnerNumber={1} store={this.props.store} />
      </div>
      <h1>{partnerName[0]} {"&"} {partnerName[1]}</h1>
      Were at {timestamp}, Linux Epoch Time, forever inscribed on the blockchain with the value of {bid} ETH.
      <div>
        {message}
      </div>
    </div>
    )
  }
}
