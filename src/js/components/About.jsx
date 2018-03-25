import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class About extends React.Component {
  render() {
    return (
      <div className="center-all">
        <h2>
          Create a permanent, immutable record of your love, <div />
          on the blockchain.
        </h2>
        <div className="aboutText">
          <div>

            <p>Ball and Blockchain is a decentralised application running on the Ethereum network.<br />
              By entering in the details of you and your partner, you are able to make a permanent,
              immutable record of your partnership.
              Once a Ball and Blockchain “marriage certificate“ is created, it cannot be destroyed.
              The certificate cannot be changed by the address holder, creators of Ball and Blockchain,
              or a even a third party.
            </p>
            <p>
              This record could be used to mark a real marriage, or as a replacement to conventional
              legal / religious marriage. It could be given as a present to a couple, or used as a way
              to mark a wedding anniversary.
            </p>
            <p>
              The public address attached to the certificate can continue to be used as a functional
              ethereum address. It could even be used as the address for wedding donations like a wishing well.
            </p>
            <div>
              <span style={{ padding: 20 }}>
                <Link to="/create">CREATE NOW</Link>
              </span>
              <span style={{ padding: 20 }}>
                <Link to="/address/0x950a2D2076fC8c23FBCa1E2a9752D38e377a2a4c">SEE EXAMPLE</Link>
              </span>
            </div>

          </div>
        </div>
      </div >
    )
  }
}
