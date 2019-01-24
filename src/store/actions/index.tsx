export enum ACTIONS {
  ADD_ADDRESS,
  DELETE_ADDRESS
}

export interface IActions {
  addAddress: (address: string) => void;
  deleteAddress: (id: string) => void;
}

export const addAddress = (address: string) => ({
  type: ACTIONS.ADD_ADDRESS,
  address
});

export const deleteAddress = (id: string) => ({
  type: ACTIONS.DELETE_ADDRESS,
  id
});
