<template>
  <v-main style="width: 100%" id="atlas"></v-main>
</template>


<script setup lang="ts">
import atlasBackgroundSource from '@/assets/atlas/maps/AtlasBackground.png'
import atlasMemorySource from '@/assets/atlas/memories/KiracMemoryItem.png'
import mapBase from '@/assets/atlas/maps/Base.png'
import uniqueMapList from '@/assets/atlas/maps/uniques/index.js'
import whiteTierMapList from '@/assets/atlas/maps/tier1-5/index.js'
import yellowTierMapList from '@/assets/atlas/maps/tier6-10/index.js'
import redTierMapList from '@/assets/atlas/maps/tier11-16/index.js'
import voidstoneList from '@/assets/atlas/voidstones/sources/index.js'
import Konva from 'konva';
import {onMounted} from 'vue'
import {useAtlasNodeStore} from '@/store/AtlasNodeStore'
import {useDetailsDrawerStore} from '@/store/DetailsDrawerStore';
import {useAtlasNodeOverlayStore} from "@/store/AtlasNodeOverlayStore";
import type {AtlasNode} from "@/model/atlasNode";
import {handleZoom} from "@/composable/stage-zoom";
import getOverlayColor from "@/composable/overlay-color-utils";
import type {StageState} from "@/model/stageState";
import {useDivinationCardOverlayStore} from "@/store/DivinationCardOverlayStore";
import calculateEffectiveMapTier from "@/composable/effective-map-tier-calculator";
import {useVoidStoneStore} from "@/store/voidStoneStore";
import type {Voidstone} from "@/model/voidstone";
import {useAtlasMemoryNodeStore} from "@/store/AtlasMemoryNodeStores";
import {calculateAtlasMemoryPaths} from "@/composable/atlasMemories/atlas-memory-path-calculator";
import {calculateAtlasMemoryLineCoordinates} from "@/composable/atlasMemories/atlas-memory-line-coordinates-calculator";
import {getTooltipContainer} from "@/composable/shapes/tooltip-container";
import {getTooltipBaseText} from "@/composable/shapes/tooltip-text";
import {
  decreaseAtlasMemorySteps,
  increaseAtlasMemorySteps
} from "@/composable/atlasMemories/atlas-memories-steps-handler";
import {drawVoidstoneReactiveArea} from "@/composable/voidstones/voidstone-reactive-area";
import {getRandomColor} from "@/composable/random-color";
import type {Point} from "@/model/point";
import {drawLinkLine} from "@/composable/shapes/atlas-node-link-line";
import {hideTooltip, showTooltip} from "@/composable/tooltip-handler";
import {getReactiveAtlasMemoriesArea} from "@/composable/atlasMemories/atlas-memories-reactive-area";
import {toggleAtlasMemoryMode} from "@/composable/atlasMemories/atlas-memories-mode-handler";
import {getReactiveNodeArea} from "@/composable/shapes/atlas-node-reactive-area";
import {handleAtlasNodeClicked} from "@/composable/atlas-node-click-handler";

const coordinatesScaleFactor = Number(`${import.meta.env.VITE_ATLAS_COORDINATES_SCALE_FACTOR}`)
const minHeight = Number(`${import.meta.env.VITE_MIN_ATLAS_CANVAS_HEIGHT}`)
const minWidth = Number(`${import.meta.env.VITE_MIN_ATLAS_CANVAS_WIDTH}`)

const atlasNodeStore = useAtlasNodeStore();
const detailsDrawerStore = useDetailsDrawerStore();
const atlasNodeOverlayStore = useAtlasNodeOverlayStore();
const divinationCardOverlayStore = useDivinationCardOverlayStore();
const voidStoneStore = useVoidStoneStore();
const atlasMemoryNodeStore = useAtlasMemoryNodeStore();

let state: StageState

let mapLayer = new Konva.Layer();
let reactiveLayer = new Konva.Layer();

const backgroundGroup = new Konva.Group();
const linksGroup = new Konva.Group();
const mapBaseGroup = new Konva.Group();
const mapNameGroup = new Konva.Group();
const mapSymbolGroup = new Konva.Group();
const tooltipGroup = new Konva.Group();
const overlayGroup = new Konva.Group();
const filterHighlightGroup = new Konva.Group();
const reactiveGroup = new Konva.Group();

const drawnLinks: [string, string][] = [];

//FIXME Refactor this abomination of a component


onMounted(() => {
  initAtlasCanvas()
})


const initAtlasCanvas = () => {
  initState();
  initCanvasStructure(this)
  initBackgroundImage();
  initVoidstoneSockets();
  initVoidstones()
  initAtlasMemories()

  let tooltipText = getTooltipBaseText();
  let tooltipContainer = getTooltipContainer(tooltipText.height());

  tooltipGroup.add(tooltipContainer);
  tooltipGroup.add(tooltipText);

  atlasNodeStore.atlasNodes.forEach((atlasNode: AtlasNode) => {
    initNodeLinksAndNames(atlasNode);
    initNodeImages(atlasNode);
    initReactiveArea(atlasNode, tooltipText, tooltipContainer);
  })
  handleZoom(state)
}

function initState() {
  state = {
    stage: undefined,
    currentScale: 1,
    height: minHeight,
    width: minWidth,
    offsetX: 175,
    offsetY: 65,
    lastCenter: undefined,
    lastDist: 0,
  }
}

function initCanvasStructure(pos: any) {
  Konva.hitOnDragEnabled = true;

  let stage = new Konva.Stage({
    container: 'atlas',
    id: 'atlas-stage',
    width: state.width,
    height: state.height,
    scaleX: state.currentScale,
    scaleY: state.currentScale,
    offsetX: state.offsetX,
    offsetY: state.offsetY,
    draggable: true,
    dragBoundFunc: dragBound.bind(pos)
  });

  state.stage = stage

  stage.add(mapLayer);
  stage.add(reactiveLayer)

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
  const backgroundImage = drawBackgroundImage();
  addDetailsDrawerCloseHandlerToImage(backgroundImage);
}

function initVoidstoneSockets() {
  const voidstoneSocketsSource = voidstoneList.get('voidstoneSockets');
  if (voidstoneSocketsSource) {
    let voidstoneSocketsImage = new Image();
    voidstoneSocketsImage.src = voidstoneSocketsSource;
    let voidstoneSocketsKonvaImage = new Konva.Image({
      id: "voidstone-sockets",
      image: voidstoneSocketsImage,
      x: 508.95 * coordinatesScaleFactor,
      y: 489.5 * coordinatesScaleFactor,
      scaleX: 0.54,
      scaleY: 0.54,
    });
    voidstoneSocketsImage.onload = function () {
      let image = backgroundGroup.findOne('#voidstone-sockets')
      if (image) {
        image.destroy()
      }
      voidstoneSocketsKonvaImage.offsetX(voidstoneSocketsImage.width / 2)
      voidstoneSocketsKonvaImage.offsetY(voidstoneSocketsImage.height / 2)
      mapBaseGroup.add(voidstoneSocketsKonvaImage);
    };
    drawVoidstoneSocketsText();
  }
}

function initVoidstones() {
  voidStoneStore.voidstones.forEach(voidstone => {
    drawVoidstone(voidstone)
    let voidstoneReactiveZone = drawVoidstoneReactiveArea(voidstone.locX * coordinatesScaleFactor, voidstone.locY * coordinatesScaleFactor);

    voidstoneReactiveZone.on('click tap', toggleVoidStone(voidstone))

    reactiveGroup.add(voidstoneReactiveZone)
  })
}

function initNodeLinksAndNames(atlasNode: AtlasNode) {
  const atlasNodePoint = toPoint(atlasNode)
  drawMapName(atlasNode.name, atlasNodePoint);
  drawLinksBetweenNodes(atlasNode)
}

function initNodeImages(atlasNode: AtlasNode) {
  const atlasNodePoint = toPoint(atlasNode)
  const cleanNodeName = atlasNode.name.replace(/'|,|\s/g, '')
  const effectiveMapTier = calculateEffectiveMapTier(atlasNode.mapTier);
  if (atlasNode.uniqueMap) {
    drawUniqueNode(cleanNodeName, atlasNodePoint);
  } else {
    addImageToGroup(mapBaseGroup, mapBase, atlasNodePoint);
    drawNormalNode(atlasNodePoint, effectiveMapTier, cleanNodeName);
  }
}

function toPoint(atlasNode: AtlasNode) {
  return {x: getScaledAtlasNodeLocX(atlasNode), y: getScaledAtlasNodeLocY(atlasNode)}
}

function initReactiveArea(atlasNode: AtlasNode, tooltipText: Konva.Text, tooltipContainer: Konva.Rect) {
  const atlasNodePoint = toPoint(atlasNode);
  let reactiveNodeArea = getReactiveNodeArea(atlasNodePoint);
  reactiveNodeArea.on('click tap', function () {
    handleAtlasNodeClicked(atlasNode)
  })

  reactiveNodeArea.on('mousemove', function () {
    showTooltip(atlasNode, tooltipText, tooltipContainer)
  })
  reactiveNodeArea.on('mouseout', function () {
    hideTooltip(tooltipText, tooltipContainer)
  })

  reactiveGroup.add(reactiveNodeArea)
}

function initAtlasMemories() {
  let atlasMemoriesImage = new Image();
  atlasMemoriesImage.src = atlasMemorySource;
  const atlasMemoriesPoint = {x: 506.95 * coordinatesScaleFactor, y: 420.5 * coordinatesScaleFactor}
  let atlasMemoriesKonvaImage = new Konva.Image({
    id: "atlas-memories",
    image: atlasMemoriesImage,
    x: atlasMemoriesPoint.x,
    y: atlasMemoriesPoint.y,
    scaleX: 0.54,
    scaleY: 0.54,
  });
  atlasMemoriesImage.onload = function () {
    let image = backgroundGroup.findOne('#atlas-memories')
    if (image) {
      image.destroy()
    }
    atlasMemoriesKonvaImage.offsetX(atlasMemoriesImage.width / 2)
    atlasMemoriesKonvaImage.offsetY(atlasMemoriesImage.height / 2)
    mapBaseGroup.add(atlasMemoriesKonvaImage);
  };
  const reactiveAtlasMemoriesArea = getReactiveAtlasMemoriesArea(atlasMemoriesPoint);
  reactiveGroup.add(reactiveAtlasMemoriesArea)
  reactiveAtlasMemoriesArea.on('click tap', toggleAtlasMemoryMode())

  drawAtlasMemoriesText(atlasMemoriesPoint)
}

function drawAtlasMemoriesText(atlasMemoriesPoint: Point) {
  const titleTextId = "atlas-memory-number-text";
  const oldTitleText = mapNameGroup.findOne('#' + titleTextId);
  if (oldTitleText) {
    oldTitleText.destroy()
  }
  const numberTextId = "atlas-memory-number-text";
  const oldNumberText = mapNameGroup.findOne('#' + numberTextId);
  if (oldNumberText) {
    oldNumberText.destroy()
  }
  const atlasMemoryTitleText = "Steps:";
  let atlasMemoryTitleKonvaText = new Konva.Text({
    id: titleTextId,
    Text: atlasMemoryTitleText,
    x: atlasMemoriesPoint.x,
    y: atlasMemoriesPoint.y + 25,
    offsetX: atlasMemoryTitleText.length * 3,
    fontSize: 12,
    fontFamily: 'Arial',
    fill: 'black',
    fontStyle: 'bold',
    shadowColor: 'white',
    shadowBlur: 10,
    shadowOffset: {x: 1, y: 1},
    shadowOpacity: 1,
  })
  const atlasMemoryNumberText = atlasMemoryNodeStore.numberOfMemorySteps + "";
  let atlasMemoryNumberKonvaText = new Konva.Text({
    id: numberTextId,
    Text: atlasMemoryNumberText,
    x: atlasMemoriesPoint.x - 10,
    y: atlasMemoriesPoint.y + 40,
    offsetX: atlasMemoryNumberText.length * 2,
    fontSize: 16,
    fontFamily: 'Arial',
    fill: 'black',
    fontStyle: 'bold',
    shadowColor: 'white',
    shadowBlur: 10,
    shadowOffset: {x: 1, y: 1},
    shadowOpacity: 1,
  })
  mapNameGroup.add(atlasMemoryTitleKonvaText)
  mapNameGroup.add(atlasMemoryNumberKonvaText)

  let triangleUp = new Konva.RegularPolygon({
    x: atlasMemoriesPoint.x + 5,
    y: atlasMemoriesPoint.y + 43,
    sides: 3,
    radius: 4,
    fill: 'black',
    stroke: 'white',
    strokeWidth: 2,
    lineJoin: 'round'
  });
  let triangleDown = new Konva.RegularPolygon({
    x: atlasMemoriesPoint.x + 5,
    y: atlasMemoriesPoint.y + 50,
    sides: 3,
    radius: 4,
    rotation: 180,
    fill: 'black',
    stroke: 'white',
    strokeWidth: 2,
    lineJoin: 'round'
  });
  mapNameGroup.add(triangleDown)
  mapNameGroup.add(triangleUp)

  let atlasMemoryStepNumberUpReactiveArea = new Konva.Rect({
    x: atlasMemoriesPoint.x,
    y: atlasMemoriesPoint.y + 37,
    fill: 'red',
    width: 10,
    height: 10,
    opacity: 0
  })
  let atlasMemoryStepNumberDownReactiveArea = new Konva.Rect({
    x: atlasMemoriesPoint.x,
    y: atlasMemoriesPoint.y + 47,
    fill: 'blue',
    width: 10,
    height: 10,
    opacity: 0
  })
  atlasMemoryStepNumberUpReactiveArea.on('click tap', increaseAtlasMemorySteps())
  atlasMemoryStepNumberDownReactiveArea.on('click tap', decreaseAtlasMemorySteps())
  reactiveGroup.add(atlasMemoryStepNumberUpReactiveArea)
  reactiveGroup.add(atlasMemoryStepNumberDownReactiveArea)
}

function handleToggleDrawer(e: boolean) {
  detailsDrawerStore.SET_DRAWER(e)
}

function getHandlerReactiveAreaClicked(atlasNode: AtlasNode) {
  return function () {
    if (atlasMemoryNodeStore.atlasMemoryModeEnabled) {
      calculateAtlasMemoryPaths(atlasNode, atlasMemoryNodeStore.numberOfMemorySteps)
    } else {
      handleToggleDrawer(true)
    }
    atlasNodeStore.SET_SELECTED_ATLAS_NODE(atlasNode)
  };
}

function addDetailsDrawerCloseHandlerToImage(konvaImage: Konva.Image) {
  konvaImage.on('click tap', function () {
    handleToggleDrawer(false)
  })
}

function drawNormalNode(point: Point, effectiveMapTier: number, cleanNodeName: string) {
  let mapNodeSource = whiteTierMapList.get(cleanNodeName) || ""
  if (isYellowTier(effectiveMapTier)) {
    mapNodeSource = yellowTierMapList.get(cleanNodeName) || ""
  } else if (isRedTier(effectiveMapTier)) {
    mapNodeSource = redTierMapList.get(cleanNodeName) || ""
  }
  addImageToGroup(mapSymbolGroup, mapNodeSource, point);
}

function drawUniqueNode(cleanNodeName: string, point: Point) {
  addImageToGroup(mapSymbolGroup, uniqueMapList.get(cleanNodeName) || "", point);
}

function toggleVoidStone(voidstoneToToggle: Voidstone) {
  return function () {
    voidStoneStore.TOGGLE_VOIDSTONE(voidstoneToToggle)
  }
}

function drawVoidstoneSocketsText() {
  const id = "voidstone-sockets-text";
  const oldText = mapNameGroup.findOne('#' + id);
  if (oldText) {
    oldText.destroy()
  }
  const voidstoneSocketsText = "Active Voidstones: " + voidStoneStore.numberOfSocketedVoidStones + "/4";
  let voidstonesSocketsKonvaText = new Konva.Text({
    id: id,
    Text: voidstoneSocketsText,
    x: 508.95 * coordinatesScaleFactor,
    y: (489.5 - 35) * coordinatesScaleFactor,
    offsetX: voidstoneSocketsText.length * 3,
    fontSize: 12,
    fontFamily: 'Arial',
    fill: 'black',
    fontStyle: 'bold',
    shadowColor: 'white',
    shadowBlur: 10,
    shadowOffset: {x: 1, y: 1},
    shadowOpacity: 1,
  })
  mapNameGroup.add(voidstonesSocketsKonvaText)
}

function drawVoidstone(voidstone: Voidstone) {
  const voidstoneSource = voidstoneList.get(voidstone.sourceName) || "";
  let voidstoneImage = new Image();
  voidstoneImage.src = voidstoneSource;
  let voidstoneKonvaImage = new Konva.Image({
    id: voidstone.id,
    image: voidstoneImage,
    x: voidstone.locX * coordinatesScaleFactor,
    y: voidstone.locY * coordinatesScaleFactor,
    scaleX: 0.20,
    scaleY: 0.20,
    opacity: 0
  });
  voidstoneImage.onload = function () {
    voidstoneKonvaImage.offsetX(voidstoneImage.width / 2)
    voidstoneKonvaImage.offsetY(voidstoneImage.height / 2)
    mapSymbolGroup.add(voidstoneKonvaImage);
  };
}

atlasNodeOverlayStore.$subscribe((mutation, state) => {
  // destroy previous overlay
  let allOverlayCircles = overlayGroup.find("Circle") as Konva.Circle[];
  allOverlayCircles.forEach(value => value.destroy())
  let allOverlayRects = overlayGroup.find("Rect") as Konva.Rect[];
  allOverlayRects.forEach(value => value.destroy())
  let allOverlayText = overlayGroup.find("Text") as Konva.Text[];
  allOverlayText.forEach(value => value.destroy())

  //show all overlay on all AtlasNodes
  state.overlayAtlasNodesMap.forEach((value: number, key: AtlasNode) => {
    const atlasNodePoint = toPoint(key)
    let overlayCircle = new Konva.Circle({
      id: key.id + "-circle",
      x: atlasNodePoint.x,
      y: atlasNodePoint.y,
      fill: getOverlayColor(value),
      radius: 20,
      opacity: 1,
    })
    overlayGroup.add(overlayCircle)

    let overlayRect = new Konva.Rect({
      id: key.id + "-rect",
      x: atlasNodePoint.x - 13,
      y: atlasNodePoint.y - 38,
      fill: getOverlayColor(value),
      width: 25,
      height: 25,
      cornerRadius: 5,
      opacity: 1,
    })
    overlayGroup.add(overlayRect)

    let overlayText = new Konva.Text({
      Text: value,
      x: atlasNodePoint.x - 3,
      y: atlasNodePoint.y - 32,
      offsetX: (value + "").length * 3.75,
      fontSize: 20,
      fontFamily: 'Arial',
      fontStyle: 'bold',
      fill: 'white',
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: {x: 1, y: 1},
      shadowOpacity: 1,
    })
    overlayGroup.add(overlayText)
  });
})

divinationCardOverlayStore.$subscribe((mutation, state) => {
  // destroy previous overlay
  let allOverlayCircles = overlayGroup.find("Circle") as Konva.Circle[];
  allOverlayCircles.forEach(value => value.destroy())
  let allOverlayRects = overlayGroup.find("Rect") as Konva.Rect[];
  allOverlayRects.forEach(value => value.destroy())
  let allOverlayText = overlayGroup.find("Text") as Konva.Text[];
  allOverlayText.forEach(value => value.destroy())

  //show all overlay on all AtlasNodes
  state.overlayDivinationCardsMap.forEach((value: string, key: AtlasNode) => {
    const atlasNodePoint = toPoint(key)
    let overlayCircle = new Konva.Circle({
      id: key.id + "-circle",
      x: atlasNodePoint.x,
      y: atlasNodePoint.y,
      fill: '#f6a676',
      radius: 20,
      opacity: 1,
    })
    overlayGroup.add(overlayCircle)

    let overlayRect = new Konva.Rect({
      id: key.id + "-rect",
      x: atlasNodePoint.x - 13,
      y: atlasNodePoint.y - 38,
      fill: '#f6a676',
      width: 25,
      height: 25,
      cornerRadius: 5,
      opacity: 1,
    })
    overlayGroup.add(overlayRect)

    let overlayText = new Konva.Text({
      Text: value,
      x: atlasNodePoint.x - 3,
      y: atlasNodePoint.y - 32,
      offsetX: value.length * 3.75,
      fontSize: 20,
      fontFamily: 'Arial',
      fontStyle: 'bold',
      fill: 'white',
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOffset: {x: 1, y: 1},
      shadowOpacity: 1,
    })
    overlayGroup.add(overlayText)
  });
})

atlasNodeStore.$subscribe((mutation, state) => {
  // destroy previous Highlights
  let allHighlights = filterHighlightGroup.find("Circle") as Konva.Circle[];
  allHighlights.forEach(value => value.destroy())

  //show all filtered AtlasNodes
  state.filteredAtlasNodes.forEach(value => {
    const atlasNodePoint = toPoint(value)
    let filterHighlight = new Konva.Circle({
      id: value.id,
      x: atlasNodePoint.x,
      y: atlasNodePoint.y,
      stroke: 'black',
      strokeWidth: 3,
      fill: 'red',
      blurRadius: 5,
      radius: 25,
      opacity: 1,
    })
    filterHighlight.cache()
    filterHighlight.filters([Konva.Filters.Blur]);
    filterHighlightGroup.add(filterHighlight)
  })
})

voidStoneStore.$subscribe((mutation, state) => {
  state.voidstones.forEach(voidstone => {
    let voidstoneImage = mapSymbolGroup.findOne('#' + voidstone.id)
    if (voidstone.active) {
      voidstoneImage.opacity(1)
    } else {
      voidstoneImage.opacity(0)
    }
  })

  atlasNodeStore.atlasNodes.forEach(atlasNode => {
    const atlasNodePoint = toPoint(atlasNode)
    const cleanNodeName = atlasNode.name.replace(/'|,|\s/g, '')
    const effectiveMapTier = calculateEffectiveMapTier(atlasNode.mapTier);
    if (!atlasNode.uniqueMap) {
      drawNormalNode(atlasNodePoint, effectiveMapTier, cleanNodeName);
    }
  })

  drawVoidstoneSocketsText()
})

atlasMemoryNodeStore.$subscribe((mutation, state) => {
  let allOverlayCircles = overlayGroup.find("Circle") as Konva.Circle[];
  allOverlayCircles.forEach(value => value.destroy())
  let allOverlayRects = overlayGroup.find("Rect") as Konva.Rect[];
  allOverlayRects.forEach(value => value.destroy())
  let allOverlayText = overlayGroup.find("Text") as Konva.Text[];
  allOverlayText.forEach(value => value.destroy())
  let allOverlayLines = overlayGroup.find("Line") as Konva.Line[];
  allOverlayLines.forEach(value => value.destroy())
  let atlasMemoriesPoint = {x: 506.95 * coordinatesScaleFactor, y: 420.5 * coordinatesScaleFactor};
  drawAtlasMemoriesText(atlasMemoriesPoint)
  if (state.atlasMemoryModeEnabled) {
    //Highlighting the AtlasMemories "Button"
    let atlasMemoriesHighlightArea = new Konva.Circle({
      id: "atlas-memories-circle",
      x: atlasMemoriesPoint.x,
      y: atlasMemoriesPoint.y,
      stroke: 'black',
      strokeWidth: 3,
      fill: 'yellow',
      blurRadius: 5,
      radius: 30,
      opacity: 1,
    })
    atlasMemoriesHighlightArea.cache()
    atlasMemoriesHighlightArea.filters([Konva.Filters.Blur]);
    overlayGroup.add(atlasMemoriesHighlightArea)

    const atlasMemoryPaths = state.atlasMemoryPaths;
    if (atlasMemoryPaths.length > 0) {
      // draw AtlasMemoryPaths in different colors
      const sourceAtlasMemoryNode = atlasMemoryPaths[0].atlasMemorySteps[0].sourceAtlasMemoryNode;
      const sourceNode = atlasNodeStore.atlasNodesMap.get(sourceAtlasMemoryNode.nodeId);
      const currentTargetAppearance = new Map<string, number>()
      for (let i = 0; i < atlasMemoryPaths.length; i++) {
        const atlasMemoryPath = atlasMemoryPaths[i];
        const pathColor = getRandomColor();
        for (let y = 0; y < atlasMemoryPath.atlasMemorySteps.length; y++) {
          let atlasMemoryStep = atlasMemoryPath.atlasMemorySteps[y];
          const sourceNode = atlasNodeStore.atlasNodesMap.get(atlasMemoryStep.sourceAtlasMemoryNode.nodeId);
          const targetNode = atlasNodeStore.atlasNodesMap.get(atlasMemoryStep.targetAtlasMemoryNode.nodeId);

          const key = atlasMemoryStep.sourceAtlasMemoryNode.nodeId + "-" + atlasMemoryStep.targetAtlasMemoryNode.nodeId;
          const previousNumberOfAppearance = currentTargetAppearance.get(key) || 0
          const currentNumberOfAppearance = previousNumberOfAppearance + 1;
          currentTargetAppearance.set(key, currentNumberOfAppearance)

          let moduloOffset = currentNumberOfAppearance % 2 === 0 ? -1 : 1
          let offset = (2 + currentNumberOfAppearance) * moduloOffset;
          if (sourceNode && targetNode) {
            const targetPoint = toPoint(targetNode)
            let {
              xSource,
              ySource,
              xTarget,
              yTarget
            } = calculateAtlasMemoryLineCoordinates(sourceNode, targetNode, offset);

            let overlayCircle = new Konva.Circle({
              id: targetNode.id + "-circle",
              x: targetPoint.x,
              y: targetPoint.y,
              fill: '#f6a676',
              radius: 20,
              opacity: 1,
            })
            overlayGroup.add(overlayCircle)

            let overlayRect = new Konva.Rect({
              id: targetNode.id + "-rect",
              x: targetPoint.x - 13,
              y: targetPoint.y - 38,
              fill: '#f6a676',
              width: 25,
              height: 25,
              cornerRadius: 5,
              opacity: 1,
            })
            overlayGroup.add(overlayRect)

            const text = (atlasMemoryStep.targetAtlasMemoryNode.probability * 100).toFixed(2) + "%";
            let overlayText = new Konva.Text({
              Text: text,
              x: targetPoint.x - 3,
              y: targetPoint.y - 32,
              offsetX: text.length * 3.75,
              fontSize: 14,
              fontFamily: 'Arial',
              fontStyle: 'bold',
              fill: 'white',
              shadowColor: 'black',
              shadowBlur: 10,
              shadowOffset: {x: 1, y: 1},
              shadowOpacity: 1,
            })
            overlayGroup.add(overlayText)

            let line = new Konva.Line({
              points: [xSource, ySource, xTarget, yTarget],
              id: targetNode.id + "-Line",
              stroke: pathColor,
              strokeWidth: 2,
              lineJoin: 'round',
              dash: [10, 5],
              lineCap: 'round',
            });
            overlayGroup.add(line)
          }
        }
      }

      if (sourceNode) {
        const sourcePoint = toPoint(sourceNode)
        let atlasMemoriesSourceHighlightArea = new Konva.Circle({
          id: sourceNode.id + "-circle",
          x: sourcePoint.x,
          y: sourcePoint.y,
          radius: 20,
          stroke: 'black',
          strokeWidth: 3,
          fill: 'yellow',
          blurRadius: 5,
          opacity: 1,
        })
        atlasMemoriesSourceHighlightArea.cache()
        atlasMemoriesSourceHighlightArea.filters([Konva.Filters.Blur]);
        overlayGroup.add(atlasMemoriesSourceHighlightArea)
      }
    }
  }
})

function getScaledAtlasNodeLocX(atlasNode: AtlasNode) {
  return Number(atlasNode.locX) * coordinatesScaleFactor
}

function getScaledAtlasNodeLocY(atlasNode: AtlasNode) {
  return Number(atlasNode.locY) * coordinatesScaleFactor
}

function drawBackgroundImage(): Konva.Image {
  let atlasBackgroundImage = new Image();
  atlasBackgroundImage.src = atlasBackgroundSource;
  let atlasBackgroundKonvaImage = new Konva.Image({
    id: "atlas-background",
    image: atlasBackgroundImage,
  });
  atlasBackgroundImage.onload = function () {
    let image = backgroundGroup.findOne('#atlas-background')
    if (image) {
      image.destroy()
    }
    backgroundGroup.add(atlasBackgroundKonvaImage);
  };

  return atlasBackgroundKonvaImage
}

function addImageToGroup(group: Konva.Group, imageSource: string, point: Point) {
  let image = new Image()
  image.src = imageSource
  let konvaImageId = (imageSource.split('\\').pop() || '').split('/').pop() || '';
  let konvaImage = new Konva.Image({
    id: konvaImageId,
    image: image,
    x: point.x,
    y: point.y,
    scaleX: 0.25,
    scaleY: 0.25,
  })
  const shape = group.findOne('#' + konvaImageId);
  if (shape) {
    shape.destroy();
  }
  image.onload = () => {
    konvaImage.offsetX(image.width / 2)
    konvaImage.offsetY(image.height / 2)
    group.add(konvaImage)
  }
}

function drawMapName(mapName: string, point: Point) {
  let mapNodeNameKonvaText = new Konva.Text({
    Text: mapName,
    x: point.x,
    y: point.y + 15,
    offsetX: mapName.length * 3.5,
    fontSize: 12,
    fontFamily: 'Arial',
    fill: 'black',
    fontStyle: 'bold',
    shadowColor: 'white',
    shadowBlur: 10,
    shadowOffset: {x: 1, y: 1},
    shadowOpacity: 1,
  })
  mapNameGroup.add(mapNodeNameKonvaText)
}

function drawLinksBetweenNodes(sourceAtlasNode: AtlasNode) {
  let candidateNodes = atlasNodeStore.atlasNodesMap
  let linkedNodeIds = sourceAtlasNode.linked.split(',');
  linkedNodeIds.forEach(linkedNodeId => {
    let linkedNode = candidateNodes.get(linkedNodeId)
    let atlasNodeId = sourceAtlasNode.id
    if (linkedNode) {
      let lineDrawn = false;
      let linkedNodeId = linkedNode.id
      drawnLinks.forEach(drawnLink => {
        if (drawnLink[0] === atlasNodeId && drawnLink[1] === linkedNodeId
            || drawnLink[0] === linkedNodeId && drawnLink[1] === atlasNodeId) {
          lineDrawn = true
        }
      });
      if (!lineDrawn) {
        let line = drawLinkLine(
            toPoint(sourceAtlasNode),
            toPoint(linkedNode))
        linksGroup.add(line)
        drawnLinks.push([sourceAtlasNode.id, linkedNodeId])
      }
    }
  });
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
    x: x,
    y: y
  }
}

</script>
