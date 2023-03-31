<template>
  <v-container id="atlas">
  </v-container>
  <DetailsDrawer :drawer="false"/>
</template>

<script setup lang="ts">
import atlasBackgroundSource from '@/assets/atlas/maps/AtlasBackground.png'
import mapBase from '@/assets/atlas/maps/Base16.png'
import uniqueMapList from '@/assets/atlas/maps/uniques/index.js'
import whiteTierMapList from '@/assets/atlas/maps/tier1-5/index.js'
import yellowTierMapList from '@/assets/atlas/maps/tier6-10/index.js'
import redTierMapList from '@/assets/atlas/maps/tier11-16/index.js'
import Konva from 'konva';
import DetailsDrawer from '@/components/DetailsDrawer.vue'
import {onMounted, onUnmounted, ref} from 'vue'
import {useAtlasNodeStore} from '@/store/AtlasNodeStore'
import {useDetailsDrawerStore} from '@/store/DetailsDrawerStore';
import {AtlasNode} from "@/model/atlasNode";
import {handleZoom} from "@/composable/stage-zoom";

const coordinatesScaleFactor = ref<number>(4.1)
const atlasNodeStore = useAtlasNodeStore();
const detailsDrawerStore = useDetailsDrawerStore();

const filterHighlightLayer = new Konva.Layer()

function handleToggleDrawer(e: boolean) {
  detailsDrawerStore.SET_DRAWER(e)
}

const mounted = () => {
  let stage = new Konva.Stage({
    container: 'atlas',
    id: 'atlas-stage',
    width: window.innerWidth,
    height: window.innerHeight,
    scaleX: 0.46,
    scaleY: 0.46,
    draggable: true
  });

  let backgroundLayer = createBackgroundLayer();
  let mapLayer = new Konva.Layer();
  let highlightLayer = new Konva.Layer();

  stage.add(backgroundLayer)
  stage.add(filterHighlightLayer)
  stage.add(mapLayer);
  stage.add(highlightLayer)

  let linksGroup = new Konva.Group();
  let mapBaseGroup = new Konva.Group();
  let mapNameGroup = new Konva.Group();
  let mapSymbolGroup = new Konva.Group();
  let filterHighlightGroup = new Konva.Group();

  let tooltipText = getTooltipBaseText();
  let tooltipContainer = getTooltipContainer();

  let drawnLinks: [string, string][] = [];
  atlasNodeStore.atlasNodesMap.forEach((atlasNode: AtlasNode) => {
    let locX = getLocX(atlasNode)
    let locY = getLocY(atlasNode)
    let mapNodeName = atlasNode.Name.replace(/'|,|\s/g, '')

    addLinkToGroup(linksGroup, atlasNode, drawnLinks, atlasNodeStore.atlasNodesMap)
    if (atlasNode.Unique) {
      addImageToGroup(mapSymbolGroup, uniqueMapList.get(mapNodeName) || "", locX, locY)
    } else {
      addImageToGroup(mapBaseGroup, mapBase, locX, locY);
      let mapNodeSource: string
      if (isRedTier(atlasNode.MapTier)) {
        mapNodeSource = redTierMapList.get(mapNodeName) || ""
      } else if (isYellowTier(atlasNode.MapTier)) {
        mapNodeSource = yellowTierMapList.get(mapNodeName) || ""
      } else {
        // not red or yellow, has to be white
        mapNodeSource = whiteTierMapList.get(mapNodeName) || ""
      }
      addImageToGroup(mapSymbolGroup, mapNodeSource, locX, locY);
    }
    addMapNameToGroup(mapNameGroup, atlasNode.Name, locX, locY);

    let mapHighlightArea = getHighlightArea(locX, locY);
    mapHighlightArea.on('click', function () {
      handleToggleDrawer(true)
      atlasNodeStore.SET_SELECTED_ATLAS_NODE(atlasNode)
    })
    showTooltip(mapHighlightArea, tooltipText, tooltipContainer, atlasNode)

    hideTooltip(mapHighlightArea,  tooltipText, tooltipContainer)

    highlightLayer.add(mapHighlightArea)

    let filterHighlight = new Konva.Circle({
      id: atlasNode.ID,
      x: locX,
      y: locY,
      stroke: 'black',
      fill: 'red',
      strokeWidth: 4,
      radius: 35,
      opacity: 0,
    })
    filterHighlightGroup.add(filterHighlight)
  });

  mapLayer.add(linksGroup)
  mapLayer.add(mapBaseGroup)
  mapLayer.add(mapNameGroup)
  mapLayer.add(mapSymbolGroup)

  filterHighlightLayer.add(filterHighlightGroup)

  highlightLayer.add(tooltipContainer);
  highlightLayer.add(tooltipText);

  handleZoom(stage)
}

atlasNodeStore.$subscribe((mutation, state) => {
  console.log(state.filteredAtlasNodes)

  // hide all AtlasNodes not found in filter
  let atlasNodesToHide = atlasNodeStore.atlasNodes.filter((el) => !state.filteredAtlasNodes.includes(el));
  atlasNodesToHide.forEach(value => {
    let atlasNodesToHide = filterHighlightLayer.find('#' + value.ID) as Konva.Circle[];
    atlasNodesToHide[0].setAttr("opacity", 0)
  })
  //show all filtere AtlasNodes
  state.filteredAtlasNodes.forEach(value => {
    let atlasNodeToHighlight = filterHighlightLayer.find('#' + value.ID) as Konva.Circle[];
    atlasNodeToHighlight[0].setAttr("opacity", 1)
  })
})

function getLocX(atlasNode: AtlasNode) {
  return Number(atlasNode.LocX) * coordinatesScaleFactor.value
}

function getLocY(atlasNode: AtlasNode) {
  return Number(atlasNode.LocY) * coordinatesScaleFactor.value
}

function createBackgroundLayer(): Konva.Layer {
  let atlasBaseLayer = new Konva.Layer();
  let atlasBackgroundImage = new Image();
  atlasBackgroundImage.src = atlasBackgroundSource;
  let atlasBackgroundKonvaImage = new Konva.Image({
    image: atlasBackgroundImage,
  });
  atlasBackgroundImage.onload = function () {
    atlasBaseLayer.add(atlasBackgroundKonvaImage);
  };
  atlasBackgroundKonvaImage.on('click', function () {
    handleToggleDrawer(false)
  })
  return atlasBaseLayer
}

function addImageToGroup(group: Konva.Group, imageSource: string, locX: number, locY: number) {
  let image = new Image()
  image.src = imageSource
  let konvaImage = new Konva.Image({
    image: image,
    x: locX,
    y: locY,
    scaleX: 0.4,
    scaleY: 0.4,
  })
  image.onload = () => {
    konvaImage.offsetX(image.width / 2)
    konvaImage.offsetY(image.height / 2)
    group.add(konvaImage)
  }
}

function addMapNameToGroup(group: Konva.Group, mapName: string, locX: number, locY: number) {
  let mapNodeNameKonvaText = new Konva.Text({
    Text: mapName,
    x: locX,
    y: locY + 22,
    offsetX: mapName.length * 3.75,
    fontSize: 18,
    fontFamily: 'Arial',
    fill: 'black'
  })
  group.add(mapNodeNameKonvaText)
}

function addLinkToGroup(group: Konva.Group, atlasNode: AtlasNode, drawnLinks: [string, string][], atlasNodesMap: Map<string, AtlasNode>) {
  let linkedNodeIds = atlasNode.Linked.split(',');
  linkedNodeIds.forEach(linkedNodeId => {
    let linkedNode = atlasNodesMap.get(linkedNodeId)
    let atlasNodeId = atlasNode.ID
    if (linkedNode) {
      let lineDrawn = false;
      let linkedNodeId = linkedNode.ID
      drawnLinks.forEach(drawnLink => {
        if (drawnLink[0] === atlasNodeId && drawnLink[1] === linkedNodeId
            || drawnLink[0] === linkedNodeId && drawnLink[1] === atlasNodeId) {
          lineDrawn = true
        }
      });
      if (!lineDrawn) {
        let line = getLinkLine(atlasNode, linkedNode)
        group.add(line)
        drawnLinks.push([atlasNode.ID, linkedNodeId])
      }
    }
  });
}

function getLinkLine(sourceNode: AtlasNode, targetNode: AtlasNode) {
  return new Konva.Line({
    points: [getLocX(sourceNode), getLocY(sourceNode), getLocX(targetNode), getLocY(targetNode)],
    stroke: 'black',
    strokeWidth: 2,
    lineJoin: 'round',
    dash: [20, 10],
    lineCap: 'round',
    tension: 0.5,
  });
}

function isYellowTier(mapTier: string) {
  return Number(mapTier) > 5 && Number(mapTier) < 11
}

function isRedTier(mapTier: string) {
  return Number(mapTier) > 10
}

function showTooltip(mapHighlightArea: Konva.Circle, tooltipText: Konva.Text, tooltipContainer: Konva.Rect, atlasNode: AtlasNode) {
  let locX = getLocX(atlasNode)
  let locY = getLocY(atlasNode)
  mapHighlightArea.on('mousemove', function () {
    tooltipText.position({
      x: locX + 50,
      y: locY - 70
    })
    tooltipContainer.position({
      x: locX + 50,
      y: locY - 70
    })
    tooltipText.text(atlasNode.Name + "\n\n" + "Natural Maptier: " + atlasNode.MapTier + "\nSome useful Information about the Map. Like layout (open or close), some ratings, number of Bosses, noteable Divcards and so on.")
    tooltipContainer.height(tooltipText.height())


    tooltipText.show()
    tooltipContainer.show()
  })
}

function hideTooltip(mapHighlightArea: Konva.Circle,  tooltipText: Konva.Text, tooltipContainer: Konva.Rect) {
  mapHighlightArea.on('mouseout', function () {
    tooltipText.hide()
    tooltipContainer.hide()
  })
}

function getTooltipBaseText() {
  return new Konva.Text({
    text: "",
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#555',
    width: 300,
    padding: 20,
    align: 'center',
    visible: false,
  })
}

function getTooltipContainer() {
  return new Konva.Rect({
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 300,
    height: getTooltipBaseText().height(),
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
    visible: false,
  })
}

function getHighlightArea(locX: number, locY: number) {
  return new Konva.Circle({
    x: locX,
    y: locY,
    stroke: 'black',
    strokeWidth: 4,
    radius: 35,
    opacity: 0
  })
}

const handleWindowSizeChange = () => {
  console.log("window resized")
};

onMounted(() => {
  mounted()
  window.addEventListener("resize", handleWindowSizeChange);
  handleWindowSizeChange();
})

onUnmounted(() => {
  window.removeEventListener("resize", handleWindowSizeChange);
});
</script>
