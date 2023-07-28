<script setup lang="ts">
import Konva from 'konva'
import { onMounted } from 'vue'
import atlasBackgroundSource from '@/assets/atlas/maps/AtlasBackground.png'
import atlasMemorySource from '@/assets/atlas/memories/KiracMemoryItem.png'
import mapBase from '@/assets/atlas/maps/Base.png'
import uniqueMapList from '@/assets/atlas/maps/uniques/index.js'
import whiteTierMapList from '@/assets/atlas/maps/tier1-5/index.js'
import yellowTierMapList from '@/assets/atlas/maps/tier6-10/index.js'
import redTierMapList from '@/assets/atlas/maps/tier11-16/index.js'
import voidstoneList from '@/assets/atlas/voidstones/sources/index.js'
import { useAtlasNodeStore } from '@/store/AtlasNodeStore'
import { useDetailsDrawerStore } from '@/store/DetailsDrawerStore'
import { useAtlasNodeOverlayStore } from '@/store/AtlasNodeOverlayStore'
import type { AtlasNode } from '@/model/atlasNode'
import { handleZoom } from '@/composable/stage-zoom'
import type { StageState } from '@/model/stageState'
import { useDivinationCardOverlayStore } from '@/store/DivinationCardOverlayStore'
import calculateEffectiveMapTier from '@/composable/effective-map-tier-calculator'
import { useVoidStoneStore } from '@/store/voidStoneStore'
import type { Voidstone } from '@/model/voidstone'
import { useAtlasMemoryNodeStore } from '@/store/AtlasMemoryNodeStores'
import { calculateAtlasMemoryLineCoordinates } from '@/composable/atlasMemories/atlas-memory-line-coordinates-calculator'
import { getTooltipContainer } from '@/composable/shapes/tooltip-container'
import { getTooltipBaseText } from '@/composable/shapes/tooltip-text'
import {
  decreaseAtlasMemorySteps,
  increaseAtlasMemorySteps,
} from '@/composable/atlasMemories/atlas-memories-steps-handler'
import { drawVoidstoneReactiveArea } from '@/composable/voidstones/voidstone-reactive-area'
import { getRandomColor } from '@/composable/random-color'
import type { Point } from '@/model/point'
import { hideTooltip, showTooltip } from '@/composable/tooltip-handler'
import { getReactiveAtlasMemoriesArea } from '@/composable/atlasMemories/atlas-memories-reactive-area'
import { toggleAtlasMemoryMode } from '@/composable/atlasMemories/atlas-memories-mode-handler'
import { getReactiveNodeArea } from '@/composable/shapes/atlas-node-reactive-area'
import { handleAtlasNodeClicked } from '@/composable/atlas-node-click-handler'
import {
  getAtlasMemoryStepsDownReactiveArea,
  getAtlasMemoryStepsDownShape,
  getAtlasMemoryStepsUpReactiveArea,
  getAtlasMemoryStepsUpShape,
  getAtlasMemoryTitleText,
} from '@/composable/atlasMemories/atlas-memories-steps-number-shapes'
import { atlasMemoriesCanvasPoint } from '@/composable/atlasMemories/atlas-memories-canvas-point'
import { voidstoneCanvasPoint } from '@/composable/voidstones/voidstone-canvas-point'
import { getNumberOfActiveVoidstonesText } from '@/composable/voidstones/voidstone-shapes'
import { getOverlayCircle, getOverlayRect, getOverlayText } from '@/composable/shapes/atlas-node-overlay'
import { getAtlasNodeName } from '@/composable/shapes/atlas-node-name'
import { getFilterHighlight } from '@/composable/shapes/atlas-node-filter-highlight'
import { getLinkLine } from '@/composable/shapes/atlas-node-link-line'
import { getAtlasNodeImage } from '@/composable/shapes/atlas-node-image'
import { getAtlasMemoriesButtonHighlightArea } from '@/composable/atlasMemories/atlas-memories-button-highlight-area'
import { getAtlasMemoriesOverlayText } from '@/composable/atlasMemories/atlas-memories-overlay-text'
import { getVoidStoneSocketKonvaImage } from '@/composable/voidstones/voidstone-socket-area'
import { atlasNodeToPoint, locsToPoint } from '@/composable/atlas-node-utils'
import { getAtlasMemoriesKonvaImage } from '@/composable/atlasMemories/atlas-memories-gutton-image'
import { getVoiodStoneKonvaImage } from '@/composable/voidstones/voidstone-image'
import { getAtlasMemoriesSourceHighlightArea } from '@/composable/atlasMemories/atlas-memories-source-highlight-area'
import { getAtlasMemoryLine } from '@/composable/atlasMemories/atlas-memory-line'

const minHeight = Number(`${import.meta.env.VITE_MIN_ATLAS_CANVAS_HEIGHT}`)
const minWidth = Number(`${import.meta.env.VITE_MIN_ATLAS_CANVAS_WIDTH}`)

const atlasNodeStore = useAtlasNodeStore()
const detailsDrawerStore = useDetailsDrawerStore()
const atlasNodeOverlayStore = useAtlasNodeOverlayStore()
const divinationCardOverlayStore = useDivinationCardOverlayStore()
const voidStoneStore = useVoidStoneStore()
const atlasMemoryNodeStore = useAtlasMemoryNodeStore()

let state: StageState

const mapLayer = new Konva.Layer()
const reactiveLayer = new Konva.Layer()

const backgroundGroup = new Konva.Group()
const linksGroup = new Konva.Group()
const mapBaseGroup = new Konva.Group()
const mapNameGroup = new Konva.Group()
const mapSymbolGroup = new Konva.Group()
const tooltipGroup = new Konva.Group()
const overlayGroup = new Konva.Group()
const filterHighlightGroup = new Konva.Group()
const reactiveGroup = new Konva.Group()

const drawnLinks: [string, string][] = []

// FIXME Refactor this abomination of a component

onMounted(() => {
  initAtlasCanvas()
})

function initAtlasCanvas() {
  initState()
  initCanvasStructure(this)
  initBackgroundImage()
  initVoidstoneSockets()
  initVoidstones()
  initAtlasMemories()

  const tooltipText = getTooltipBaseText()
  const tooltipContainer = getTooltipContainer(tooltipText.height())

  tooltipGroup.add(tooltipContainer)
  tooltipGroup.add(tooltipText)

  atlasNodeStore.atlasNodes.forEach((atlasNode: AtlasNode) => {
    initAtlasNodeNames(atlasNode)
    initNodeLinks(atlasNode)
    initNodeHighlight(atlasNode)
    initNodeImages(atlasNode)
    initReactiveArea(atlasNode, tooltipText, tooltipContainer)
  })
  handleZoom(state)
}

function initState() {
  state = {
    stage: undefined,
    currentScale: 0.85,
    height: minHeight,
    width: minWidth,
    offsetX: 125,
    offsetY: 90,
    lastCenter: undefined,
    lastDist: 0,
  }
}

function initCanvasStructure(pos: any) {
  Konva.hitOnDragEnabled = true

  state.stage = new Konva.Stage({
    container: 'atlas',
    id: 'atlas-stage',
    width: state.width,
    height: state.height,
    scaleX: state.currentScale,
    scaleY: state.currentScale,
    offsetX: state.offsetX,
    offsetY: state.offsetY,
    draggable: true,
    dragBoundFunc: dragBound.bind(pos),
  })

  state.stage.add(mapLayer)
  state.stage.add(reactiveLayer)

  mapLayer.add(backgroundGroup)
  mapLayer.add(linksGroup)
  mapLayer.add(filterHighlightGroup)
  mapLayer.add(overlayGroup)
  mapLayer.add(mapBaseGroup)
  mapLayer.add(mapNameGroup)
  mapLayer.add(mapSymbolGroup)
  mapLayer.add(tooltipGroup)

  reactiveLayer.add(reactiveGroup)
}

function initBackgroundImage() {
  const backgroundImage = drawBackgroundImage()
  addDetailsDrawerCloseHandlerToImage(backgroundImage)
}

function initVoidstoneSockets() {
  const voidstoneSocketsSource = voidstoneList.get('voidstoneSockets')
  if (voidstoneSocketsSource) {
    const voidstoneSocketsImage = new Image()
    voidstoneSocketsImage.src = voidstoneSocketsSource
    const voidstoneSocketsKonvaImage = getVoidStoneSocketKonvaImage(voidstoneSocketsImage)
    voidstoneSocketsImage.onload = function () {
      const image = backgroundGroup.findOne('#voidstone-sockets')
      if (image) {
        image.destroy()
      }
      voidstoneSocketsKonvaImage.offsetX(voidstoneSocketsImage.width / 2)
      voidstoneSocketsKonvaImage.offsetY(voidstoneSocketsImage.height / 2)
      mapBaseGroup.add(voidstoneSocketsKonvaImage)
    }
    drawVoidstoneSocketsText(voidstoneCanvasPoint)
  }
}

function initVoidstones() {
  voidStoneStore.voidstones.forEach((voidstone) => {
    drawVoidstone(voidstone)
    const voidstoneReactiveZone = drawVoidstoneReactiveArea(locsToPoint(voidstone.locX, voidstone.locY, true))

    voidstoneReactiveZone.on('click tap', toggleVoidStone(voidstone))

    reactiveGroup.add(voidstoneReactiveZone)
  })
}

function initNodeLinks(atlasNode: AtlasNode) {
  drawLinksBetweenNodes(atlasNode)
}

function initAtlasNodeNames(atlasNode: AtlasNode) {
  drawMapName(atlasNode.name, atlasNodeToPoint(atlasNode, true))
}

function initNodeHighlight(atlasNode: AtlasNode) {
  const atlasNodePoint = atlasNodeToPoint(atlasNode, true)
  const filterHighlight = getFilterHighlight(atlasNode.id, atlasNodePoint)
  filterHighlight.cache()
  filterHighlight.filters([Konva.Filters.Blur])
  filterHighlightGroup.add(filterHighlight)
}

function initNodeImages(atlasNode: AtlasNode) {
  const atlasNodePoint = atlasNodeToPoint(atlasNode, true)
  const cleanNodeName = atlasNode.name.replace(/'|,|\s/g, '')
  const effectiveMapTier = calculateEffectiveMapTier(atlasNode.mapTier)
  if (atlasNode.uniqueMap) {
    drawUniqueNode(cleanNodeName, atlasNodePoint)
  }
  else {
    drawAtlasNodeImage(mapBaseGroup, mapBase, atlasNodePoint)
    drawNormalNode(atlasNodePoint, effectiveMapTier, cleanNodeName)
  }
}

function initReactiveArea(atlasNode: AtlasNode, tooltipText: Konva.Text, tooltipContainer: Konva.Rect) {
  const atlasNodePoint = atlasNodeToPoint(atlasNode, true)
  const reactiveNodeArea = getReactiveNodeArea(atlasNodePoint)
  reactiveNodeArea.on('click tap', () => {
    handleAtlasNodeClicked(atlasNode)
  })

  reactiveNodeArea.on('mousemove', () => {
    showTooltip(atlasNode, tooltipText, tooltipContainer)
  })
  reactiveNodeArea.on('mouseout', () => {
    hideTooltip(tooltipText, tooltipContainer)
  })

  reactiveGroup.add(reactiveNodeArea)
}

function initAtlasMemories() {
  const atlasMemoriesImage = new Image()
  atlasMemoriesImage.src = atlasMemorySource
  const atlasMemoriesKonvaImage = getAtlasMemoriesKonvaImage(atlasMemoriesImage)
  atlasMemoriesImage.onload = function () {
    const image = backgroundGroup.findOne('#atlas-memories')
    if (image) {
      image.destroy()
    }
    atlasMemoriesKonvaImage.offsetX(atlasMemoriesImage.width / 2)
    atlasMemoriesKonvaImage.offsetY(atlasMemoriesImage.height / 2)
    mapBaseGroup.add(atlasMemoriesKonvaImage)
  }
  const reactiveAtlasMemoriesArea = getReactiveAtlasMemoriesArea(atlasMemoriesCanvasPoint)
  reactiveGroup.add(reactiveAtlasMemoriesArea)
  reactiveAtlasMemoriesArea.on('click tap', toggleAtlasMemoryMode())

  const triangleUp = getAtlasMemoryStepsUpShape(atlasMemoriesCanvasPoint)
  const triangleDown = getAtlasMemoryStepsDownShape(atlasMemoriesCanvasPoint)
  mapNameGroup.add(triangleDown)
  mapNameGroup.add(triangleUp)

  const atlasMemoryStepNumberUpReactiveArea = getAtlasMemoryStepsUpReactiveArea(atlasMemoriesCanvasPoint)
  const atlasMemoryStepNumberDownReactiveArea = getAtlasMemoryStepsDownReactiveArea(atlasMemoriesCanvasPoint)
  atlasMemoryStepNumberUpReactiveArea.on('click tap', increaseAtlasMemorySteps())
  atlasMemoryStepNumberDownReactiveArea.on('click tap', decreaseAtlasMemorySteps())
  reactiveGroup.add(atlasMemoryStepNumberUpReactiveArea)
  reactiveGroup.add(atlasMemoryStepNumberDownReactiveArea)

  drawAtlasMemoriesNumberOfStepsText(atlasMemoriesCanvasPoint)
}

function drawAtlasMemoriesNumberOfStepsText(atlasMemoriesPoint: Point) {
  const atlasMemoryTitleKonvaText = getAtlasMemoryTitleText(atlasMemoriesPoint)
  const oldTitleText = mapNameGroup.findOne(`#${atlasMemoryTitleKonvaText.getAttr('id')}`)
  if (oldTitleText) {
    oldTitleText.destroy()
  }

  mapNameGroup.add(atlasMemoryTitleKonvaText)
}

function handleToggleDrawer(e: boolean) {
  detailsDrawerStore.SET_DRAWER(e)
}

function addDetailsDrawerCloseHandlerToImage(konvaImage: Konva.Image) {
  konvaImage.on('click tap', () => {
    handleToggleDrawer(false)
  })
}

function drawNormalNode(point: Point, effectiveMapTier: number, cleanNodeName: string) {
  let mapNodeSource = whiteTierMapList.get(cleanNodeName) || ''
  if (isYellowTier(effectiveMapTier)) {
    mapNodeSource = yellowTierMapList.get(cleanNodeName) || ''
  }
  else if (isRedTier(effectiveMapTier)) {
    mapNodeSource = redTierMapList.get(cleanNodeName) || ''
  }
  drawAtlasNodeImage(mapSymbolGroup, mapNodeSource, point)
}

function drawUniqueNode(cleanNodeName: string, point: Point) {
  drawAtlasNodeImage(mapSymbolGroup, uniqueMapList.get(cleanNodeName) || '', point)
}

function toggleVoidStone(voidstoneToToggle: Voidstone) {
  return function () {
    voidStoneStore.TOGGLE_VOIDSTONE(voidstoneToToggle)
  }
}

function drawVoidstoneSocketsText(voidstoneCanvasPoint: Point) {
  const voidstonesSocketsKonvaText = getNumberOfActiveVoidstonesText(voidstoneCanvasPoint)
  const oldText = mapNameGroup.findOne(`#${voidstonesSocketsKonvaText.getAttr('id')}`)
  if (oldText) {
    oldText.destroy()
  }
  mapNameGroup.add(voidstonesSocketsKonvaText)
}

function drawVoidstone(voidstone: Voidstone) {
  const voidstoneSource = voidstoneList.get(voidstone.sourceName) || ''
  const voidstoneImage = new Image()
  voidstoneImage.src = voidstoneSource
  const voidstoneKonvaImage = getVoiodStoneKonvaImage(voidstone.id, locsToPoint(voidstone.locX, voidstone.locY, true), voidstoneImage)
  voidstoneImage.onload = function () {
    voidstoneKonvaImage.offsetX(voidstoneImage.width / 2)
    voidstoneKonvaImage.offsetY(voidstoneImage.height / 2)
    mapSymbolGroup.add(voidstoneKonvaImage)
  }
}

function clearOverlayGroup() {
  const allOverlayCircles = overlayGroup.find('Circle') as Konva.Circle[]
  allOverlayCircles.forEach(value => value.destroy())
  const allOverlayRects = overlayGroup.find('Rect') as Konva.Rect[]
  allOverlayRects.forEach(value => value.destroy())
  const allOverlayText = overlayGroup.find('Text') as Konva.Text[]
  allOverlayText.forEach(value => value.destroy())
  const allOverlayLines = overlayGroup.find('Line') as Konva.Line[]
  allOverlayLines.forEach(value => value.destroy())
}

atlasNodeOverlayStore.$subscribe((mutation, state) => {
  // destroy previous overlay
  clearOverlayGroup()

  // show all overlay on all AtlasNodes
  state.overlayAtlasNodesMap.forEach((value: number, key: AtlasNode) => {
    const atlasNodePoint = atlasNodeToPoint(key, true)
    const id = key.id
    const overlayCircle = getOverlayCircle(id, atlasNodePoint, value)
    const overlayRect = getOverlayRect(id, atlasNodePoint, value)
    const overlayText = getOverlayText(String(value), atlasNodePoint)

    overlayGroup.add(overlayCircle)
    overlayGroup.add(overlayRect)
    overlayGroup.add(overlayText)
  })
})

divinationCardOverlayStore.$subscribe((mutation, state) => {
  // destroy previous overlay
  clearOverlayGroup()

  // show all overlay on all AtlasNodes
  state.overlayDivinationCardsMap.forEach((value: string, key: AtlasNode) => {
    const atlasNodePoint = atlasNodeToPoint(key, true)
    const divinationCardOverlayColorValue = 11
    const id = key.id

    const overlayCircle = getOverlayCircle(id, atlasNodePoint, divinationCardOverlayColorValue)
    const overlayRect = getOverlayRect(id, atlasNodePoint, divinationCardOverlayColorValue)
    const overlayText = getOverlayText(value, atlasNodePoint)

    overlayGroup.add(overlayCircle)
    overlayGroup.add(overlayRect)
    overlayGroup.add(overlayText)
  })
})

atlasNodeStore.$subscribe((mutation, state) => {
  // destroy previous Highlights
  const allHighlights = filterHighlightGroup.find('Circle') as Konva.Circle[]
  allHighlights.forEach(value => value.opacity(0))

  // show all filtered AtlasNodes
  state.filteredAtlasNodes.forEach((value) => {
    const nodeHighlight = filterHighlightGroup.findOne(`#${value.id}`)
    if (nodeHighlight) {
      nodeHighlight.opacity(1)
    }
  })
})

voidStoneStore.$subscribe((mutation, state) => {
  state.voidstones.forEach((voidstone) => {
    const voidstoneImage = mapSymbolGroup.findOne(`#${voidstone.id}`)
    if (voidstone.active) {
      voidstoneImage.opacity(1)
    }
    else {
      voidstoneImage.opacity(0)
    }
  })

  atlasNodeStore.atlasNodes.forEach((atlasNode) => {
    const atlasNodePoint = atlasNodeToPoint(atlasNode, true)
    const cleanNodeName = atlasNode.name.replace(/'|,|\s/g, '')
    const effectiveMapTier = calculateEffectiveMapTier(atlasNode.mapTier)
    if (!atlasNode.uniqueMap) {
      drawNormalNode(atlasNodePoint, effectiveMapTier, cleanNodeName)
    }
  })

  drawVoidstoneSocketsText(voidstoneCanvasPoint)
})

atlasMemoryNodeStore.$subscribe((mutation, state) => {
  clearOverlayGroup()
  drawAtlasMemoriesNumberOfStepsText(atlasMemoriesCanvasPoint)
  if (state.atlasMemoryModeEnabled) {
    // Highlighting the AtlasMemories "Button"
    const atlasMemoriesButtonHighlightArea = getAtlasMemoriesButtonHighlightArea()
    overlayGroup.add(atlasMemoriesButtonHighlightArea)

    const atlasMemoryPaths = state.atlasMemoryPaths
    if (atlasMemoryPaths.length > 0) {
      // draw AtlasMemoryPaths in different colors
      const sourceAtlasMemoryNode = atlasMemoryPaths[0].atlasMemorySteps[0].sourceAtlasMemoryNode
      const sourceNode = atlasNodeStore.atlasNodesMap.get(sourceAtlasMemoryNode.nodeId)
      const currentTargetAppearance = new Map<string, number>()
      for (let i = 0; i < atlasMemoryPaths.length; i++) {
        const atlasMemoryPath = atlasMemoryPaths[i]
        const pathColor = getRandomColor()
        for (let y = 0; y < atlasMemoryPath.atlasMemorySteps.length; y++) {
          const atlasMemoryStep = atlasMemoryPath.atlasMemorySteps[y]
          const sourceNode = atlasNodeStore.atlasNodesMap.get(atlasMemoryStep.sourceAtlasMemoryNode.nodeId)
          const targetNode = atlasNodeStore.atlasNodesMap.get(atlasMemoryStep.targetAtlasMemoryNode.nodeId)

          const key = `${atlasMemoryStep.sourceAtlasMemoryNode.nodeId}-${atlasMemoryStep.targetAtlasMemoryNode.nodeId}`
          const previousNumberOfAppearance = currentTargetAppearance.get(key) || 0
          const currentNumberOfAppearance = previousNumberOfAppearance + 1
          currentTargetAppearance.set(key, currentNumberOfAppearance)

          const moduloOffset = currentNumberOfAppearance % 2 === 0 ? -1 : 1
          const offset = (2 + currentNumberOfAppearance) * moduloOffset
          if (sourceNode && targetNode) {
            const targetPoint = atlasNodeToPoint(targetNode, true)
            const atlasMemoryLineCoordinates = calculateAtlasMemoryLineCoordinates(sourceNode, targetNode, offset)

            const overlayCircle = getOverlayCircle(`${targetNode.id}-circle`, targetPoint, 11)
            const overlayRect = getOverlayRect(`${targetNode.id}-rect`, targetPoint, 11)

            const text = `${(atlasMemoryStep.targetAtlasMemoryNode.probability * 100).toFixed(2)}%`

            const overlayText = getAtlasMemoriesOverlayText(text, targetPoint)
            const line = getAtlasMemoryLine(atlasMemoryLineCoordinates, targetNode.id, pathColor)
            overlayGroup.add(overlayCircle)
            overlayGroup.add(overlayRect)
            overlayGroup.add(overlayText)
            overlayGroup.add(line)
          }
        }
      }

      if (sourceNode) {
        const sourcePoint = atlasNodeToPoint(sourceNode, true)
        const atlasMemoriesSourceHighlightArea = getAtlasMemoriesSourceHighlightArea(sourceNode.id, sourcePoint)
        atlasMemoriesSourceHighlightArea.cache()
        atlasMemoriesSourceHighlightArea.filters([Konva.Filters.Blur])
        overlayGroup.add(atlasMemoriesSourceHighlightArea)
      }
    }
  }
})

function drawBackgroundImage(): Konva.Image {
  const atlasBackgroundImage = new Image()
  atlasBackgroundImage.src = atlasBackgroundSource
  const atlasBackgroundKonvaImage = new Konva.Image({
    id: 'atlas-background',
    image: atlasBackgroundImage,
  })
  atlasBackgroundImage.onload = function () {
    const image = backgroundGroup.findOne('#atlas-background')
    if (image) {
      image.destroy()
    }
    backgroundGroup.add(atlasBackgroundKonvaImage)
  }

  return atlasBackgroundKonvaImage
}

function drawAtlasNodeImage(group: Konva.Group, imageSource: string, point: Point) {
  const image = new Image()
  image.src = imageSource
  const konvaImageId = (imageSource.split('\\').pop() || '').split('/').pop() || ''
  const konvaImage = getAtlasNodeImage(konvaImageId, image, point)
  const shape = group.findOne(`#${konvaImageId}`)
  if (shape) {
    shape.destroy()
  }
  image.onload = function () {
    konvaImage.offsetX(image.width / 2)
    konvaImage.offsetY(image.height / 2)
    group.add(konvaImage)
  }
}

function drawMapName(mapName: string, point: Point) {
  const mapNodeNameKonvaText = getAtlasNodeName(mapName, point)
  mapNameGroup.add(mapNodeNameKonvaText)
}

function drawLinksBetweenNodes(sourceAtlasNode: AtlasNode) {
  const links = getLinks(sourceAtlasNode)
  links.forEach(link => linksGroup.add(link))
}

function getLinks(sourceAtlasNode: AtlasNode) {
  const links = new Array<Konva.Line>()
  const candidateNodes = atlasNodeStore.atlasNodesMap
  const linkedNodeIds = sourceAtlasNode.linked.split(',')
  linkedNodeIds.forEach((linkedNodeId) => {
    const linkedNode = candidateNodes.get(linkedNodeId)
    const atlasNodeId = sourceAtlasNode.id
    if (linkedNode) {
      let lineDrawn = false
      const linkedNodeId = linkedNode.id
      drawnLinks.forEach((drawnLink) => {
        if ((drawnLink[0] === atlasNodeId && drawnLink[1] === linkedNodeId)
            || (drawnLink[0] === linkedNodeId && drawnLink[1] === atlasNodeId)) {
          lineDrawn = true
        }
      })
      if (!lineDrawn) {
        const line = getLinkLine(
          atlasNodeToPoint(sourceAtlasNode, true),
          atlasNodeToPoint(linkedNode, true))
        links.push(line)
        drawnLinks.push([sourceAtlasNode.id, linkedNodeId])
      }
    }
  })
  return links
}

function isYellowTier(mapTier: number) {
  return mapTier > 5 && mapTier < 11
}

function isRedTier(mapTier: number) {
  return mapTier > 10
}

function dragBound(pos: any) {
  let x = minWidth
  let y = minHeight
  if (state.stage) {
    x = Math.max(Math.min(pos.x, 800), -state.width * state.currentScale * 1.5 + window.innerWidth)
    y = Math.max(Math.min(pos.y, 500), -state.height * state.currentScale * 1.5 + window.innerHeight)
  }

  return {
    x,
    y,
  }
}
</script>

<template>
  <v-main id="atlas" style="width: 100%" />
</template>
