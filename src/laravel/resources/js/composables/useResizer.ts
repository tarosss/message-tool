import { ref, computed, watchEffect, WatchStopHandle, watch } from 'vue'
import { useMouse } from '@vueuse/core'
import { useShowing } from '../store/showing'

export const useResizer = () => {
  const minWidth = 300
  const windowWidth = ref(window.innerWidth)
  const leftNav = ref<HTMLElement>()
  const show = ref<HTMLElement>()
  const thread = ref<HTMLElement>()
  const resizer1 = ref<HTMLElement>()
  const resizer2 = ref<HTMLElement>()
  const leftNavWidth = ref(minWidth)
  const threadWidth = ref(0)
  const resizerWidth = 5
  let unwatch1: WatchStopHandle
  let unwatch2: WatchStopHandle

  const { x } = useMouse()
  const { showThread } = useShowing()

  // eslint-disable-next-line arrow-body-style
  const style = computed(() => {
    return {
      'grid-template-columns': `${leftNavWidth.value}px ${resizerWidth}px 1fr ${resizerWidth}px  ${threadWidth.value}px`,
    }
  })
  const mouseDown1 = () => {
    unwatch1 = watchEffect(() => {
      if (x.value >= minWidth) {
        leftNavWidth.value = x.value
      }
    })
  }

  const mouseUp1 = () => {
    if (unwatch1 === undefined) {
      return
    }

    unwatch1()
  }

  const mouseDown2 = () => {
    unwatch2 = watchEffect(() => {
      const w = windowWidth.value - x.value
      if (w >= minWidth) {
        threadWidth.value = w
      }
    })
  }

  const mouseUp2 = () => {
    if (unwatch2 === undefined) {
      return
    }

    unwatch2()
  }

  const mouseUp = () => {
    mouseUp1()
    mouseUp2()
  }

  watch(showThread, () => {
    threadWidth.value = showThread ? minWidth : 0
  })

  // windowの検知
  const resizeWindow = () => {
    windowWidth.value = window.innerWidth
  }

  window.addEventListener('resize', resizeWindow)

  return {
    style,
    leftNav,
    show,
    thread,
    resizer1,
    resizer2,
    mouseDown1,
    mouseUp1,
    mouseDown2,
    mouseUp2,
    mouseUp,
  }
}
