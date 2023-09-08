import Echo from 'laravel-echo'
import io from 'socket.io-client'
import { useUsers } from './store/users'
import { useChannels } from './store/channels'
import { useMessages } from './store/messages'
import { useFiles } from './store/files'

window.io = io
window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: window.location.hostname + ':6001',
  forceTLS: true,
})

window.Echo.channel('laravel_database_create_message').listen('CreateMessage', (data) => {
  for (const message  of data.messages as Message[]) {
    const { pushMessage } = useMessages('message-' + message.channel_id)
    pushMessage({ newMessage: message })
  }
  console.log(data)
  const { pushFile } = useFiles()
  for (const file  of data.files as MessageFile[]) {
    pushFile({ newFile: file })
  }
})

window.Echo.channel('laravel_database_update_message').listen('UpdateMessage', (data) => {
  console.log(data)
  for (const message  of data.messages as Message[]) {
    useMessages('message-' + message.channel_id).updateMessage({ updatedMessage: message })
  }
})

window.Echo.channel('laravel_database_create_file').listen('CreateFile', (data) => {
  for (const message  of data.messages as MessageFile[]) {
    const { messages, pushMessage } = useMessages('message-' + message.channel_id)
    pushMessage({ newMessage: message })
  }
})

window.Echo.channel('laravel_database_create_channel').listen('CreateChannel', (data) => {
  const { pushChannel } = useChannels()
  for (const channel of data.channels as Channel[]) {
    pushChannel({ newChannel: channel })
  }
})

window.Echo.channel('laravel_database_update_channel').listen('UpdateChannel', (data) => {
  const { channels } = useChannels()
  for (const channel of data.channels as Channel[]) {
    channels.value.set(channel._id, channel)
  }
})

window.Echo.channel('laravel_database_create_user').listen('CreateUser', (data) => {
  const { users } = useUsers()
  for (const user of data.users as User[]) {
    users.value.set(user._id, user)
  }
})

window.Echo.channel('laravel_database_update_user').listen('CreateUser', (data) => {
  const { users } = useUsers()
  for (const user of data.users as User[]) {
    users.value.set(user._id, user)
  }
})

