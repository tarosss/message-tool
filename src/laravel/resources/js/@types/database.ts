declare type User = {
  _id: string,
  user_name: string,
  display_name: string,
  email: string,
}

declare type Message = {
  _id: string,
  message: string,
  storage: string,
  userId: string,
  createdAt: string,
  updatedAt: string,
}

declare type Channel = {
  _id: string,
  channel_type: number,
  channel_name: string,
  created_at: string,
  create_user: string,
}