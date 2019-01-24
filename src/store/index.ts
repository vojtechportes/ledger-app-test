import { createStore } from "redux";
import reducer from "./reducers/index";

export interface IStore {
  addresses: IStoreAddresses[];
}

export interface IStoreAddresses {
  id: string;
  address: string;
}

const store = createStore(reducer);

export default store;
