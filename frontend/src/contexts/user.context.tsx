import React, { createContext, Dispatch } from "react";
import IUserInfoData from "../types/User";
import { useLocalStorageReducer } from "../hook/useLocalStorageReducer";
import userInfoReducer from "../reducers/user.reducer";

export const UserContext = createContext<IUserInfoData | null>(null);
export const UserDispatchContext = createContext<Dispatch<any> | null>(null);

export function UserInfoProvider(props) {
  const [user, dispatch] = useLocalStorageReducer(
    "user",
    undefined,
    userInfoReducer
  );
  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {props.children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
