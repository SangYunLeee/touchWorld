// eslint-disable-next-line
import { v4 as uuidv4 } from 'uuid';
import IPostCategory from "../types/PostCategory";
import{ Dispatch } from "react";

export enum ICategoryEnum {
  UPDATE,
  REMOVE_ALL
}

type Action =
  | { type: ICategoryEnum.UPDATE; list: IPostCategory[] }
  | { type: ICategoryEnum.REMOVE_ALL };

export type DispatchType = Dispatch<Action>;

const reducer = (state: IPostCategory[] | null, action : Action) => {
  switch (action.type) {
    case ICategoryEnum.UPDATE:
      return action.list;
    case ICategoryEnum.REMOVE_ALL:
      return null;
    default:
      return state;
  }
};
export default reducer;
