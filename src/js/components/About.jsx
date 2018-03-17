import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h3>
          Create a permanent, immutable record of your love, on the
          blockchain.
        </h3>
        <div>
          Ball and Blockchain is a decentralised application running on the Ethereum network.
          By entering in the details of you and your partner, you are able to make a permanent,
          immutable record of your partnership for a small payment of Ether.
          Once a Ball and Blockchain “marriage certificate“ is created, it cannot be destroyed.
          The certificate cannot be changed by the address holder, creators of Ball and Blockchain,
          or a even a third party.
          If the bid that the couple puts on the certificate purchase is the highest for the day,
          that day will be reserved on an online calendar as their day. This day is up for grabs
          each year if a bid is higher than the previous bid for that day.
          This record could be used to mark a real marriage, or as a replacement to conventional
          legal / religious marriage. It could be given as a present to a couple, or used as a way
          to mark a wedding anniversary.
          The public address used to attach the certificate to can continue to be used as a functional
          ethereum address. It could also be used as the address wedding donations like a wishing well.
          Or the characters from the address could be inscribed onto the wedding ring.
        </div>
        <div>
          <Link to="/create">CREATE</Link>
        </div>
      </div>
    )
  }
}
