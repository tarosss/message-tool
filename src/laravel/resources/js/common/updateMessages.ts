import { deepCopy } from './objectUtils'
import { useMessages } from '../store/messages'
import { useShowing } from '../store/showing'
import { getFetch } from './fetches'
import { messageUpdateUrl } from '../consts/fetches'

export const addReaction = (
  { userId, token, reactionId, messageId }: { userId: string, token: string, reactionId: string, messageId: string },
) => {
  const { showing } = useShowing()


  const message = <Message>deepCopy(useMessages('message-' + showing.value).messages.value.get(messageId) as Message)

  if (message.reactions.hasOwnProperty(reactionId)) {
    if (message.reactions[reactionId].includes(userId)) {
      // すでに含まれている場合はなにもしない
      return
    }

    message.reactions[reactionId].push(userId)
  } else {
    message.reactions = {
      ...message.reactions,
      [reactionId]: [userId],
    }
  }

  getFetch({token: token})(messageUpdateUrl).post({
    data: [message],
  })
}
