import { ref, inject } from 'vue'
import { useMessages } from '../store/messages'
import { deepCopy } from '../common/objectUtils'
import { fetchUpdateMessage } from '../common/fetches'

export const useEditMessage = (subjectMessage: Message) => {
  const token = inject('token', '')
  const { updateMessage } = useMessages(`message-${subjectMessage.channel_id}`)
  const tempMessage = deepCopy<Message>(subjectMessage)
  const editedMessage = ref(tempMessage.message)
  const editedMentions = ref(tempMessage.mentions)

  const sendMessage = () => {
    const body = JSON.stringify({
      _id: subjectMessage._id,
      message: editedMessage.value,
      mentions: editedMentions.value,
    })

    fetchUpdateMessage({ token, body })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }

        return res.json()
      })
    //   .then((res) => res.message as Message)
    //   .then((message) => {
    //     updateMessage({ updatedMessage: message })
    //   })
      .catch((e) => {
        console.error(e)
      })
  }

  const setShowMentions = () => {

  }

  // quasorのせってい
  const definitions = {
    send: {
      tip: '送信する',
      icon: 'send',
      handler: sendMessage,
    },
    mention: {
      tip: 'メンション',
      icon: 'alternate_email',
      handler: setShowMentions,
    },
  }

  const toolBar = [
    ['bold', 'italic', 'strike', 'underline', 'quote', 'unordered', 'ordered', 'outdent', 'indent', 'mention'],
    ['send'],
  ]
  return {
    definitions,
    toolBar,
    editedMessage,
    editedMentions,
  }
}
