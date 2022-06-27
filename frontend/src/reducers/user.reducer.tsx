import { v4 as uuidv4 } from 'uuid';
import IUserData from "../types/User";

const reducer = (state: IUserData, action) => {
  switch (action.type) {
    case "UPDATE":
      return {...state, ...action, type: null };
    case "LOGOUT":
      return undefined;
    default:
      return state;
  }
};
export default reducer;
