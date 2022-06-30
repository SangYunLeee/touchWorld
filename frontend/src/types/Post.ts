export default interface IPostData {
  id?: any | null,
  title: string,
  description: string,
  author?: {
    id: string,
    name?: string
  },
  category?: string
}
