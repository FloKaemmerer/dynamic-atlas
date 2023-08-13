import emailjs from '@emailjs/browser'
import type { AtlasNode } from '@/model/atlasNode'
import type { DivinationCardImproveDto } from '@/model/dtos/divinationCardImproveDto'
import convertToAtlasNodeImproveDto from '@/composable/atlas-node-improve-dto-converter'
import type { AtlasNodeImproveDto } from '@/model/dtos/atlasNodeImproveDto'

async function send(atlasNodesToSend: AtlasNodeImproveDto[]) {
  const templatePrams: Record<string, string> = {
    atlasNode: JSON.stringify(atlasNodesToSend, null, '\t'),
    atlasNodeName: atlasNodesToSend.map(value => value.name).toString(),
  }
  let success = false
  await emailjs.send(`${import.meta.env.VITE_EMAILJS_SERVICE_ID}`,
        `${import.meta.env.VITE_EMAILJS_TEMPLATE_ID}`,
        templatePrams,
        `${import.meta.env.VITE_EMAILJS_PUBLIC_KEY}`)
    .then(() => {
      console.log('SUCCESS! ')
      success = true
    }).catch((res) => {
      console.log(`FAILURE! ${res}`)
      success = false
    })
  return success
}

function sliceNodesToSend(atlasNodesToSend: AtlasNodeImproveDto[]): Array<Array<AtlasNodeImproveDto>> {
  const slicedNodes: Array<Array<AtlasNodeImproveDto>> = new Array<Array<AtlasNodeImproveDto>>()
  const totalNumberOfAtlasNodesToSend = atlasNodesToSend.length
  const half = Number((totalNumberOfAtlasNodesToSend / 2).toFixed(0))
  slicedNodes.push(atlasNodesToSend.slice(0, half))
  slicedNodes.push(atlasNodesToSend.slice(half + 1, totalNumberOfAtlasNodesToSend))
  slicedNodes.forEach((value) => {
    const sizeInKb = getSizeInKb(value)
    if (sizeInKb >= 40) {
      sliceNodesToSend(value).forEach(value1 => slicedNodes.push(value1))
    }
  })
  return slicedNodes
}

function getSizeInKb(atlasNodesToSend: AtlasNodeImproveDto[]) {
  const b = JSON.stringify(atlasNodesToSend, null, '\t').concat(atlasNodesToSend.map(value => value.name).toString()).length * 2
  return Number((b / 1024).toFixed(2))
}

export async function sendAtlasNodes(atlasNodes: AtlasNode[]) {
  const atlasNodesToSend: AtlasNodeImproveDto[] = []
  atlasNodes.forEach((atlasNode) => {
    const divinationCardImproveDtos: DivinationCardImproveDto[] = []
    const divCardNames = getDivinationCardNames(atlasNode).split(',')
    divCardNames.forEach((cardName) => {
      const trimmedName = cardName.trim()
      if (trimmedName.length > 0) {
        divinationCardImproveDtos.push({
          name: trimmedName,
        })
      }
    })

    const atlasNodeImproveDto = convertToAtlasNodeImproveDto(atlasNode, divinationCardImproveDtos, atlasNode.additionalTags)
    atlasNodesToSend.push(atlasNodeImproveDto)
  })
  const kb = getSizeInKb(atlasNodesToSend)

  console.log(`Total Size of changed AtlasNodes: ${kb}KB`)
  // If   bigger 40kb, recursively slice until every List is sub 40kb
  let success = true
  if (kb > 40) {
    console.log('Payload to large, slicing into multiple messages')
    const slicedNodes: Array<Array<AtlasNodeImproveDto>> = sliceNodesToSend(atlasNodesToSend)
    console.log(`Total number of Messages to send: ${slicedNodes.length}`)
    for (let i = 0; i < slicedNodes.length; i++) {
      await send(slicedNodes[i])
        .then(res => success && res.valueOf())
        .catch(() => success = false)
    }
    if (success) {
      console.log('All messages successfully send!')
    }
  }
  else {
    send(atlasNodesToSend)
      .then(res => success && res.valueOf())
      .catch(() => success = false)
  }
  return success
}

function getDivinationCardNames(atlasNode: AtlasNode): string {
  let divinationCardNames = ''
  let first = true
  atlasNode.divinationCards.forEach((value) => {
    if (first) {
      divinationCardNames = divinationCardNames.concat(value.name)
      first = false
    }
    else {
      divinationCardNames = divinationCardNames.concat(`, ${value.name}`)
    }
  })
  return divinationCardNames
}

export async function sendAtlasNode(atlasNode: AtlasNode, additionalTags: string, divinationCardNames: string) {
  if (atlasNode) {
    const tags: string[] = []
    if (additionalTags) {
      const tagsSplits = additionalTags.split(',')
      tagsSplits.forEach((tag) => {
        const trimmed = tag.trim()
        if (trimmed.length > 0) {
          tags.push(trimmed)
        }
      })
    }

    const divinationCardImproveDtos: DivinationCardImproveDto[] = []
    if (divinationCardNames) {
      const divCardNames = divinationCardNames.split(',')
      divCardNames.forEach((cardName) => {
        const trimmedName = cardName.trim()
        if (trimmedName.length > 0) {
          divinationCardImproveDtos.push({
            name: trimmedName,
          })
        }
      })
    }

    const atlasNodeImproveDto = convertToAtlasNodeImproveDto(atlasNode, divinationCardImproveDtos, tags)
    const templatePrams: Record<string, string> = {
      atlasNode: JSON.stringify(atlasNodeImproveDto, null, '\t'),
      atlasNodeName: atlasNodeImproveDto.name,
    }

    return emailjs.send(`${import.meta.env.VITE_EMAILJS_SERVICE_ID}`,
            `${import.meta.env.VITE_EMAILJS_TEMPLATE_ID}`,
            templatePrams,
            `${import.meta.env.VITE_EMAILJS_PUBLIC_KEY}`)
      .then((result) => {
        return result
      }).catch((res) => {
        return res
      })
  }
}
