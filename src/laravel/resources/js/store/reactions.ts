import { Ref, ref } from 'vue'
import { defineStore } from 'pinia'

export const useReactions = defineStore('reactions', () => {
  const reactions: Ref<Map<string, Reaction>> = ref(new Map<string, Reaction>())
  const bars: Ref<string[]> = ref([])

  const setReactions = ({ newReactions }: { newReactions: MapReactions }) => {
    reactions.value = new Map(Object.entries(newReactions))

    bars.value = []
    for (const reaction of Object.values(newReactions)) {
      if (reaction.bar) {
        bars.value.push(reaction._id)
      }
    }
  }

  const getReaction = (reactionId: string) => reactions.value.get(reactionId) as Reaction

  return {
    reactions,
    bars,
    setReactions,
    getReaction,
  }
})
