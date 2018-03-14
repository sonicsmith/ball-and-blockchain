import React, { Component } from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"


@observer
class EditablePartner extends React.Component {

  changeBodyType = (direction) => {
    return () => {
      const index = this.props.partnerNumber;
      const newType = this.props.store.partnerBodyType[index] + direction;
      if (newType >= 0 && newType <= this.props.store.NUM_BODY_TYPES) {
        this.props.store.partnerBodyType[index] = newType;
      }
    }
  }

  handleChangeName = (index) => {
    return (event) => {
      event.preventDefault();
      this.props.store.partnerName[index] = event.target.value;
    }
  }

  handleChangeSkinColor = (index) => {
    return (event) => {
      event.preventDefault();
      this.props.store.partnerSkinColor[index] = event.target.value;
    }
  }

  handleChangeClothesColor = (index) => {
    return (event) => {
      event.preventDefault();
      this.props.store.partnerClothesColor[index] = event.target.value;
    }
  }

  render() {
    const partnerNumber = this.props.partnerNumber;
    const { partnerName, partnerBodyType, partnerSkinColor, partnerClothesColor } = this.props.store;
    return (<div>
      <div>
        Partner {partnerNumber + 1} name:
      </div>
      <div>
        <input type="text" value={partnerName[partnerNumber]} onChange={this.handleChangeName(partnerNumber)} />
      </div>

      <div>
        Partner {partnerNumber + 1} body type: {partnerBodyType[partnerNumber]}
      </div>
      <div>
        <button onClick={this.changeBodyType(-1)}>{"<"}</button>
        <button onClick={this.changeBodyType(+1)}>{">"}</button>
      </div>

      <div>
        Partner {partnerNumber + 1} skin color:
      </div>
      <div>
        <input type="color" value={partnerSkinColor[partnerNumber]} onChange={this.handleChangeSkinColor(partnerNumber)} />
      </div>

      <div>
        Partner {partnerNumber + 1} clothes color:
      </div>
      <div>
        <input type="color" value={partnerClothesColor[partnerNumber]} onChange={this.handleChangeClothesColor(partnerNumber)} />
      </div>
    </div>
    )
  }
}


@observer
export default class CreateCertificate extends React.Component {

  createCertificate = () => {
    const {
      web3,
      contractInstance,
      partnerName,
      partnerBodyType,
      partnerSkinColor,
      partnerClothesColor,
      message,
      bid
    } = this.props.store;

    if (!web3.eth.accounts[0]) {
      alert("No ethereum address detected. Are you logged in?");
      return;
    }

    const partnerNames = `${partnerName[0]}&${partnerName[1]}`;
    const getPartnerDetails = () => {
      return [
        partnerBodyType[0],
        0,//partnerSkinColor[0],
        0,//partnerClothesColor[0],
        partnerBodyType[1],
        0,//partnerSkinColor[1],
        0,//partnerClothesColor[1],
      ]
    };
    console.log("trying to create...");
    contractInstance.createCertificate(
      partnerNames,
      getPartnerDetails(),
      message,
      {
        gas: 300000,
        from: web3.eth.accounts[0],
        value: web3.toWei(bid, "ether")
      },
      (err, result) => {
        console.log("Err:", err);
        console.log("Result:", err);
      }
    );
  }


  handleChangeMessage = (event) => {
    event.preventDefault();
    this.props.store.message = event.target.value;
  }

  handleChangeBid = (event) => {
    event.preventDefault();
    this.props.store.bid = event.target.value;
  }

  render() {
    const { web3, message, bid } = this.props.store;
    const address = web3.eth.accounts[0] ? web3.eth.accounts[0] : "[no address detected]";
    return (<div>
      <div>
        Ethereum address:
      </div>
      <div>
        {address}
      </div>

      <EditablePartner partnerNumber={0} store={this.props.store} />
      <EditablePartner partnerNumber={1} store={this.props.store} />

      <div>
        Optional message:
      </div>
      <div>
        <input type="textarea" value={message} onChange={this.handleChangeMessage} />
      </div>

      <div>
        Price: (minimum {this.props.store.MINIMUM_COST})
      </div>
      <div>
        <input type="number" value={bid} onChange={this.handleChangeBid} placeholder={this.props.store.MINIMUM_COST} />ETH
      </div>

      <div>
        <button type="button" onClick={this.createCertificate}>CREATE</button>
      </div>
    </div>
    )
  }
}

