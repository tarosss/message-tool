import {createStore} from 'vuex'

export const useStores = createStore({
    state() {
        return { 
            name: '原神',
            version: '2.6',
            gacha: 0,
        }
    },
    mutations: {
        addOne(state) {
            state.gacha++
        },
        addTen(state, num) {
            state.gacha += num
        }
    }
})