import { onUpdated, inject, computed, onMounted, ref, watchEffect } from 'vue'
import { useUsers } from '../store/users';
import { useChannels } from '../store/channels'
import { useMessages } from '../store/messages';
import { useShowing } from '../store/showing';
import { useScrollIntoViewOnce } from './useScrollIntoViewOnce'
import { CHANNEL_TYPE_MEMO, CHANNEL_TYPE_NORMAL } from '../consts/channel';

export const useShowChannel = (channel: Channel) => {
  const logingUserId = inject('logging-user-id', '')
  const { showing, setShowingThread } = useShowing()
  const { users } = useUsers()
  const { getDisplayChannelName } = useChannels()
  const { htmlElement, bottom } = useScrollIntoViewOnce()

  const { messages, messageIdsByDay } = useMessages(`message-${channel._id}`)
  const isNormalChannel = (() => channel.channel_type === CHANNEL_TYPE_NORMAL)()
  const isMemo = (() => channel.channel_type === CHANNEL_TYPE_MEMO)()

  const displayChannelName = (() => {
    const d = getDisplayChannelName(channel)
    if (isMemo) {
      return `${d} (自分用)`
    }
    return d
  })()

  /** チャンネルを作成したユーザの表示名 */
  const channelCreateUserDisplayName = (() => {
    if (channel.create_user === logingUserId) {
      return 'あなた'
    }

    return `${String(users.value.get(logingUserId)?.display_name)}さん`
  })()

  /** ユーザがクリックされたときに右にプロフィールを表示する */
  const showProfile = () => {
    setShowingThread(true)
  }

  /** デフォルトで一番下を表示する */
  onUpdated(() => {
    if (channel._id === showing.value) {
      // 表示中のものだけ実行する
      bottom()
    }
  })

  return {
    messages,
    messageIdsByDay,
    displayChannelName,
    htmlElement,
    channelCreateUserDisplayName,
    isNormalChannel,
    isMemo,
    showProfile,
  }
}
