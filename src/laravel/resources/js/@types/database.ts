declare type User = {
  _id: string,
  user_name: string,
  display_name: string,
  email: string,
}

declare type MessageReactions = {
  [reactionId in string]: string[],
}
declare type Message = {
  _id: string,
  message: string,
  storage: string,
  user_id: string,
  channel_id: string,
  reactions: MessageReactions,
  thread: string[],
  isThread?: number,
  created_at: string,
  updated_at: string,
}

declare type Channel = {
  _id: string,
  channel_type: number,
  channel_name: string,
  created_at: string,
  create_user: string,
}

declare type Reaction = {
  _id: string,
  reaction_name: string,
  reaction_kinds: any[],
  icon_path: string,
  create_user: string,
  bar: number,
  created_at: string
}
