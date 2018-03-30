import React from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Switch, Route, NavLink } from "react-router-dom"

// import abi from "./../../build/contracts/MarriageCertificates.json"
import Main from "./components/Main"
import CheckAddress from "./components/CheckAddress"
import ViewCertificate from "./components/ViewCertificate"
import CreateCertificate from "./components/CreateCertificate"
import About from "./components/About"
import Contact from "./components/Contact"

class App extends React.Component {
  render() {
    return (
      <Router>
        <div style={{ position: "absolute", width: "99%", top: 0 }}>
          <nav className="gtco-nav sticky-banner" role="navigation">
            <div className="gtco-container">
              <div className="row">
                <div className="col-xs-12 text-center menu-1">
                  <ul>
                    <li>
                      <NavLink exact to="/" activeClassName="activeLink">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/create" activeClassName="activeLink">Create</NavLink>
                    </li>
                    <li>
                      <NavLink to="/find" activeClassName="activeLink">Find</NavLink>
                    </li>
                    <li>
                      <NavLink to="/about" activeClassName="activeLink">About</NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact" activeClassName="activeLink">Contact</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <Switch>
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/find" component={CheckAddress} />
            <Route exact path="/create" component={CreateCertificate} />
            <Route path="/address/:address" component={ViewCertificate} />
            <Route exact path="/" component={Main} />
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#root"))
