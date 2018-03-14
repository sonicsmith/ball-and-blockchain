import React from "react"
import ReactDOM from "react-dom";
import Web3 from "web3";
import DevTools from "mobx-react-devtools"
import { observer, Provider } from "mobx-react"

import abi from "./../../build/contracts/MarriageCertificates.json";
import Store from "./store/Store";
import Main from "./components/Main";
import ViewCertificate from "./components/ViewCertificate";
import CreateCertificate from "./components/CreateCertificate";

const store = new Store()

@observer
class App extends React.Component {
  //
  constructor() {
    super();
    if (typeof web3 != "undefined") {
      console.log("Using web3 detected from external source");
      store.web3 = new Web3(web3.currentProvider);
      const myContract = store.web3.eth.contract(abi.abi);
      store.contractInstance = myContract.at(
        "0x68bfc43672ba4f9d22cccd22b0ca33b674717e9b"
      );
    }
  }

  home = () => {
    store.currentView = "main"
  }

  render() {
    return (
      <div>
        <div onClick={this.home}><h1>Ball and Blockchain</h1></div>
        {store.currentView === "main" &&
          <Main store={store} />}
        {store.currentView === "view" &&
          <ViewCertificate store={store} />}
        {store.currentView === "create" &&
          <CreateCertificate store={store} />}
      </div>);
  }

}

ReactDOM.render(<App />, document.querySelector("#root"));