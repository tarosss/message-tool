export const useMessageEditor = () => {
  const send = () => {
  }

  const definitions = {
    send: {
      tip: '送信する',
      icon: 'send',
      handler: send,
    },
  }

  const toolBar = [
    ['bold', 'italic', 'strike', 'underline', 'quote', 'unordered', 'ordered', 'outdent', 'indent'],
    ['send'],
  ]
  return {
    definitions,
    toolBar,
  }
}
