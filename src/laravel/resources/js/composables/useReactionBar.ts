import { ref } from 'vue'

type Item = {
  name: string,
  icon: string,
  tip: string,
}

export const useReactionBar = () => {
  const reactions: Item[] = [
    {
      name: 'done',
      icon: 'done',
      tip: '確認しました',
    },
  ]

  const thread: Item = {
    name: 'thread',
    icon: 'comment',
    tip: 'スレッドで返信する',
  }

  return {
    reactions,
    thread,
  }
}
