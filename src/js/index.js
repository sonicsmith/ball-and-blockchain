import React from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom"

// import abi from "./../../build/contracts/MarriageCertificates.json"
import Main from "./components/Main"
import CheckAddress from "./components/CheckAddress"
import ViewCertificate from "./components/ViewCertificate"
import CreateCertificate from "./components/CreateCertificate"
import About from "./components/About"

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Link to="/">
              <h1>Ball and Blockchain</h1>
            </Link>
          </div>
        </Router>
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/about" component={About} />
            <Route exact path="/find" component={CheckAddress} />
            <Route exact path="/create" component={CreateCertificate} />
            <Route exact path="/address/:address" component={ViewCertificate} />
          </Switch>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#root"))

//
// {store.currentView === "main" &&
//   <Main store={store} />}
// {store.currentView === "view" &&
//   <ViewCertificate store={store} />}
// {store.currentView === "create" &&
//   <CreateCertificate store={store} />}
