import './broadcasts'
import _ from 'lodash'
window._ = _

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios'
window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


// import Echo from 'laravel-echo'
// import io from 'socket.io-client'
// window.io = io
// window.Echo = new Echo({
//   broadcaster: 'socket.io',
//   host: window.location.hostname + ':6001',
//   forceTLS: true,
// })

// window.Echo.channel('laravel_database_channel_name').listen('SampleEvent', (e) => {
//   console.log('sample event')
//   console.log(',la;cv')
// })

// window.Echo.channel('laravel_database_event_lib').listen('sample', (e) => {
//   console.log('puvlic event')
//   console.log(e)
// })

// window.Echo.channel('laravel_database_create_message').listen('CreateMessage', (data) => {
//   for (data.messages of message) {
    
//   }
// })
