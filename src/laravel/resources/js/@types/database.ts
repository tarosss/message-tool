declare type User = {
  _id: string,
  user_name: string,
  display_name: string,
  email: string,
  icon: string | undefined,
  default_icon_color: string,
  default_icon_background_color: string,
  bookmarks: [],
}

declare type MessageReactions = {
  [reactionId in string]: string[]
}

declare type Message = {
  _id: string,
  message: string,
  storage: string,
  user_id: string,
  channel_id: string,
  reactions?: MessageReactions,
  thread: string[],
  thread_message_id?: string,
  files: string[],
  mentions: string[],
  created_at: string,
  updated_at?: string,
}

declare type Draft = Omit<Message, '_id' | 'files'> & {
  _id?: string,
  draft_key: string,
  files: {
    [originalFileName in string]: DraftFile
  },
  thread_message_id?: string,
}

/**
 * draft状態のファイルの記録
 */
declare type DraftFile = {
  _id?: string,
  original_file_name: string,
  file_name?: string,
  sended: 0 | 1,
  file?: File,
  created_at: string,
  updated_at?: string,
}

/**
 * filesテーブル
 */
declare type MessageFile = {
  _id: string,
  original_file_name: string,
  file_name: string,
  mime_type: string,
  user_id: string,
  channel_id: string,
  message_id: string,
  created_at: string,
  updated_at: string,
}

declare type Channel = {
  _id: string,
  channel_type: 1 | 2 | 3,
  channel_name: string,
  users: string[],
  topic: string | undefined,
  description: string | undefined,
  create_user: string,
  created_at: string,
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
