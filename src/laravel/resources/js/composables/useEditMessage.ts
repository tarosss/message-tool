import { ref } from 'vue'
import { deepCopy } from '../common/objectUtils'

export const useEditMessage = (subjectMessage: Message) => {
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
  const tempMessage = deepCopy<Message>(subjectMessage)
  const editedMessage = ref(tempMessage.message)
  const editedMentions = ref(tempMessage.mentions)

  return {
    definitions,
    toolBar,
    editedMessage,
    editedMentions,
  }
}
