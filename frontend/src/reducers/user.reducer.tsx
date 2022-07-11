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
