declare type FetchMessage = {
  [channelId in string] : {
    [messageId in string]: Message
  }
}


declare type FetchUser = {
  [messageId in string]: User
}
