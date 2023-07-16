declare type MapMessage = {
  [messageId in string]: Message
}

declare type MapChannel = {
  [channelId in string]: Channel
}

declare type FetchMessage = {
  [channelId in string] : {
    [messageId in string] :Message
  }
}
