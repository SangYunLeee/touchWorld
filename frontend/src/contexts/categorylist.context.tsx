import React, { createContext, Dispatch, useReducer } from "react";
import ICategoryListData from "../types/PostCategory";
import categorylistReducer, {DispatchType} from "../reducers/categorylist.reducer";

export const CategoriesContext = createContext<ICategoryListData[] | null>(null);
export const CategoriesDispatchContext = createContext<DispatchType | null>(null);

export function CategoriesProvider(props) {
  const [categories, dispatch] = useReducer(
    categorylistReducer,
    null
  );

  return (
    <CategoriesContext.Provider value={categories}>
      <CategoriesDispatchContext.Provider value={dispatch}>
        {props.children}
      </CategoriesDispatchContext.Provider>
    </CategoriesContext.Provider>
  );
}