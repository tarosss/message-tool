declare type FetchMessage = {
  [channelId in string] : {
    [messageId in string]: Message
  }
}

declare type FetchUser = {
  [messageId in string]: User
}

declare type FetchStoreMessage = {
  message: string,
  userId: string,
  channelId: string,
  storage: 1 | 2,
  files?: File[],
}
