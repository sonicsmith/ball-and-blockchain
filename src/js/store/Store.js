import { observable, computed, action } from "mobx"

export default class Store {
  @observable web3 = null;
  @observable contractInstance = null;
  @observable currentView = "main";
  @observable NUM_BODY_TYPES = 6;
  @observable MINIMUM_COST = 0.01;
  @observable address = "";
  @observable partnerName = ["", ""];
  @observable partnerBodyType = [0, 0];
  @observable partnerSkinColor = ["#000000", "#000000"];
  @observable partnerClothesColor = ["#000000", "#000000"];
  @observable message = "";
  @observable bid = this.MINIMUM_COST;
  @observable timestamp = 0;
}
