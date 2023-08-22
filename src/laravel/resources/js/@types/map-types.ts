declare type MapUsers = {
  [userId in string]: User
}

declare type MapMessage = {
  [messageId in string]: Message
}

declare type MapDraft = {
  [messageId in string]: Draft
}

declare type MapChannel = {
  [channelId in string]: Channel
}

declare type MapReactions = {
  [reactionId in string]: Reaction
}

declare type MapFile = {
  [fileId in string]: MessageFile
}
