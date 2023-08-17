import { useClipboard } from '@vueuse/core'

const { copy } = useClipboard({
  legacy: true,
})
async function copyToClipBoard(value: string) {
  await copy(value)
}
export default copyToClipBoard
