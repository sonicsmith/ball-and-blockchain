import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class About extends React.Component {
  render() {
    return (
      <div className="center-all">
        <h2>
          Create a permanent, immutable record of your love, on the
          blockchain.
        </h2>
        <div className="aboutText">
          <div>

            <p>Ball and Blockchain is a decentralised application running on the Ethereum network.<br />
              By entering in the details of you and your partner, you are able to make a permanent,
              immutable record of your partnership for a small payment of Ether.
              Once a Ball and Blockchain “marriage certificate“ is created, it cannot be destroyed.
              The certificate cannot be changed by the address holder, creators of Ball and Blockchain,
              or a even a third party.
            </p>
            <p>
              This record could be used to mark a real marriage, or as a replacement to conventional
              legal / religious marriage. It could be given as a present to a couple, or used as a way
              to mark a wedding anniversary.
              <div />
              The public address attached to the certificate can continue to be used as a functional
              ethereum address. It could also be used as the address wedding donations like a wishing well.
            </p>
            <div style={{ padding: 20 }}>
              <Link to="/create">CREATE NOW</Link>
            </div>

          </div>
        </div>
      </div >
    )
  }
}
