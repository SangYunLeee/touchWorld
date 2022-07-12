import IUser from "./User";
export default class IComment {
  constructor (obj: any) {
    if (obj) {
      Object.assign(this, obj)
    }
  }
  id: string;
  text: string;
  author: IUser;
  createdAt?: string;
  updatedAt?: string;
  localTime(): string {
    if (this.createdAt) {
      return new Date(this.createdAt!).toLocaleDateString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    } else {
      return "";
    }
  };
}