import { IStoreAddresses } from "../../index";
import { ACTIONS } from "../../actions/index";

const defaultState: IStoreAddresses[] = [
  {id: "15482652631230x742d35Cc6634C0532925a3b844Bc454e4438f44e", address: "0xa910f92acdaf488fa6ef02174fb86208ad7722ba"},
  {id: "15482652631231x742d35Cc6634C0532925a3b844Bc454e4438f44e", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"},
  {id: "15482652631232x742d35Cc6634C0532925a3b844Bc454e4438f44e", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"},
  {id: "15482652631233x742d35Cc6634C0532925a3b844Bc454e4438f44e", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"},
  {id: "15482652631234x742d35Cc6634C0532925a3b844Bc454e4438f44e", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"}
];

// const defaultState = [];

const addresses = (state: IStoreAddresses[] = defaultState, action: any) => {
  switch (action.type) {
    case ACTIONS.ADD_ADDRESS:
      return [
        {
          id: new Date().getTime() + action.address,
          address: action.address
        },
        ...state
      ];
    case ACTIONS.DELETE_ADDRESS:
      return [...state.filter(item => item.id !== action.id)];
    default:
      return state;
  }
};

export default addresses;
