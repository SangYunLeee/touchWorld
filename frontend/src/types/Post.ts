export default class IPostData {
  constructor (obj: any) {
    if (obj) {
      Object.assign(this, obj)
    }
  }

  id?: any | null;
  title: string;
  description: string;
  author?: {
    id: string,
    username?: string
  };
  category?: {
    author?: string;
    title?: string;
  };
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