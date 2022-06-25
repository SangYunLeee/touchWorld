import React, { createContext } from "react";
import { useLocalStorageReducer } from "../hook/useLocalStorageReducer";
import todoReducer from "../reducers/user.reducer.js";
const defaultTodos = [
  { id: 1, task: "Mow the lawn using goats", completed: false },
  { id: 2, task: "Release lady bugs into garden", completed: true }
];
export const UserContext = createContext();
export const DispatchContext = createContext();

export function TodosProvider(props) {
  const [user, dispatch] = useLocalStorageReducer(
    "user",
    defaultTodos,
    todoReducer
  );
  return (
    <UserContext.Provider value={user}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </UserContext.Provider>
  );
}
