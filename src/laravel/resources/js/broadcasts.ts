import Echo from 'laravel-echo'
import io from 'socket.io-client'
import { useMessages } from './store/messages'

window.io = io
window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: window.location.hostname + ':6001',
  forceTLS: true,
})

window.Echo.channel('laravel_database_channel_name').listen('SampleEvent', (e) => {
  console.log('sample event')
  console.log(',la;cv')
})

window.Echo.channel('laravel_database_event_lib').listen('sample', (e) => {
  console.log('puvlic event')
  console.log(e)
})

window.Echo.channel('laravel_database_create_message').listen('CreateMessage', (data) => {
  for (const message  of data.messages as Message[]) {
    useMessages('message-' + message.channel_id).pushMessage({ newMessage: message })
  }
})
