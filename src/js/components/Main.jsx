import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <h3>
          Create a permanent, immutable record of your love, on the
          blockchain.
        </h3>
        <div>
          <Link to="/create">CREATE</Link>
        </div>
        <div>
          <Link to="/find">VIEW CERTIFICATE</Link>
        </div>
        <div>
          <Link to="/about">LEARN MORE</Link>
        </div>
      </div>
    )
  }
}
