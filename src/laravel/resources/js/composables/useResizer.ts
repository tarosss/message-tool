import { Ref, ref, computed, watchEffect, WatchStopHandle } from 'vue'
import { useResizeObserver, useMouse } from '@vueuse/core'
import { isNumber } from '../common/assertions'

export const useResizer = () => {
  const minWidth = 300
  const leftNav = ref<HTMLElement>()
  const show = ref<HTMLElement>()
  const rightNav = ref<HTMLElement>()
  const resizer1 = ref<HTMLElement>()
  const resizer2 = ref<HTMLElement>()
  const leftNavWidth = ref(minWidth)
  const rightNavWidth = ref(0)
  const resizerWidth = 5

  const { x } = useMouse()
  let unwatch: WatchStopHandle

  const mouseDown1 = () => {
    unwatch = watchEffect(() => {
      if (x.value >= minWidth) {
        leftNavWidth.value = x.value
      }
    })
  }

  // eslint-disable-next-line arrow-body-style
  const style = computed(() => {
    return {
      'grid-template-columns': `${leftNavWidth.value}px ${resizerWidth}px 1fr ${resizerWidth}px  ${rightNavWidth.value}`,
    }
  })

  const mouseUp1 = () => {
    if (unwatch === undefined) {
      return
    }

    unwatch()
  }

  return {
    style,
    leftNav,
    show,
    rightNav,
    resizer1,
    resizer2,
    mouseDown1,
    mouseUp1,
  }
}
