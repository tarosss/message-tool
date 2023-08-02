import { Ref, ref } from 'vue'

export const useReactions = () => {
  const reactions: Ref<Map<string, Reaction>> = ref(new Map<string, Reaction>())

  const setReactions = ({ newReactions }: { newReactions: MapReactions }) => {
    reactions.value = new Map(Object.entries(newReactions))
  }

  return {
    reactions,
    setReactions,
  }
}
