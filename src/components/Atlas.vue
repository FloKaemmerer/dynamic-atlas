<template>
  <v-container id="atlas">
  </v-container>
  <DetailsDrawer :drawer="false"/>
</template>
  
<script setup lang="ts">
import atlasNodes from '@/assets/atlas/atlasNodes.json'
import atlasBackgroundSource from '@/assets/atlas/maps/AtlasBackground.png'
import mapBase from '@/assets/atlas/maps/Base16.png'
import uniqueMapList from '@/assets/atlas/maps/uniques/index.js'
import whiteTierMapList from '@/assets/atlas/maps/tier1-5/index.js'
import yellowTierMapList from '@/assets/atlas/maps/tier6-10/index.js'
import redTierMapList from '@/assets/atlas/maps/tier11-16/index.js'
import Konva from 'konva';
import { AtlasNode } from '@/mixins/atlasNode'
import DetailsDrawer from '@/components/DetailsDrawer.vue'
import { onMounted, ref } from 'vue'
import { useAtlasNodeStore } from '@/store/AtlasNodeStore'
import { useDetailsDrawerStore } from '@/store/DetailsDrawerStore';

const coordinatesScaleFactor = ref<number>(4.1)
const atlasNodesMap = ref<Map<string, AtlasNode>>(new Map)
const atlasNodeStore = useAtlasNodeStore();
const detailsDrawerStore = useDetailsDrawerStore();

function handleToggleDrawer(e: boolean) {
  detailsDrawerStore.SET_DRAWER(e)
}

const mounted = () => {
  atlasNodesMap.value = new Map<string, AtlasNode>()
  var atlasNodeList = atlasNodes as Array<AtlasNode>
    atlasNodeStore.SET_ATLAS_NODES(atlasNodeList)
    console.log(atlasNodeList)
  atlasNodes.forEach(atlasNodeElement => {
    let atlasNode = new AtlasNode(atlasNodeElement.ID,
      atlasNodeElement.Linked,
      atlasNodeElement.MapTier,
      atlasNodeElement.LocX,
      atlasNodeElement.LocY,
      atlasNodeElement.Name,
      atlasNodeElement.Unique);
    atlasNodesMap.value.set(atlasNodeElement.ID, atlasNode)
  });
  let stage = new Konva.Stage({
    container: 'atlas',
    width: window.innerWidth,
    height: window.innerHeight,
    scaleX: 0.46,
    scaleY: 0.46,
    draggable: true
  });

  addBackgroundLayer(stage);

  let mapLayer = new Konva.Layer();
  let highlightLayer = new Konva.Layer();

  stage.add(mapLayer);

  let linksGroup = new Konva.Group();
  let mapBaseGroup = new Konva.Group();
  let mapNameGroup = new Konva.Group();
  let mapSymbolGroup = new Konva.Group();

  let tooltipText = getTooltipBaseText();
  let tooltipContainer = getTooltipContainer();
  let highlightRing = getHighlightRing()


  let drawnLinks: [string, string][] = [];
  atlasNodesMap.value.forEach((atlasNode: AtlasNode) => {
    let locX = getLocX(atlasNode)
    let locY = getLocY(atlasNode)
    let mapNodeName = atlasNode.Name.replace(/'|,|\s/g, '')

    addLinkToGroup(linksGroup, atlasNode, drawnLinks, atlasNodesMap.value)
    if (atlasNode.Unique) {
      addImageToGroup(mapSymbolGroup, uniqueMapList.get(mapNodeName) || "", locX, locY)
    } else {
      addImageToGroup(mapBaseGroup, mapBase, locX, locY);
      var mapNodeSource = ""
      if (isRedTier(atlasNode.MapTier)) {
        var mapNodeSource = redTierMapList.get(mapNodeName) || ""
      } else if (isYellowTier(atlasNode.MapTier)) {
        var mapNodeSource = yellowTierMapList.get(mapNodeName) || ""
      } else {
        // not red or yellow, has to be white
        var mapNodeSource = whiteTierMapList.get(mapNodeName) || ""
      }
      addImageToGroup(mapSymbolGroup, mapNodeSource, locX, locY)
    }
    addMapNameToGroup(mapNameGroup, atlasNode.Name, locX, locY);

    let mapHighlightArea = getHighlightArea(locX, locY);
    mapHighlightArea.on('click', function () {
      handleToggleDrawer(true)
      atlasNodeStore.SET_SELECTED_ATALAS_NODE(atlasNode)
    })
    showTooltip(mapHighlightArea, highlightRing, tooltipText, tooltipContainer, atlasNode)

    hideTooltip(mapHighlightArea, highlightRing, tooltipText, tooltipContainer)

    highlightLayer.add(mapHighlightArea)
  });

  mapLayer.add(linksGroup)
  mapLayer.add(mapBaseGroup)
  mapLayer.add(mapNameGroup)
  mapLayer.add(mapSymbolGroup)

  highlightLayer.add(highlightRing);
  highlightLayer.add(tooltipContainer);
  highlightLayer.add(tooltipText);

  stage.add(highlightLayer)

  handleZoom(stage)
}

function getLocX(atlasNode: AtlasNode) {
  return Number(atlasNode.LocX) * coordinatesScaleFactor.value
}

function getLocY(atlasNode: AtlasNode) {
  return Number(atlasNode.LocY) * coordinatesScaleFactor.value
}

function addBackgroundLayer(stage: Konva.Stage) {
  var atlasBaseLayer = new Konva.Layer();
  stage.add(atlasBaseLayer);
  atlasBaseLayer.moveToBottom
  var atlasBackgroundImage = new Image();
  atlasBackgroundImage.src = atlasBackgroundSource;
  var atlasBackgroundKonvaImage = new Konva.Image({
    image: atlasBackgroundImage,
  });
  atlasBackgroundImage.onload = function () {
    atlasBaseLayer.add(atlasBackgroundKonvaImage);
  };
  atlasBackgroundKonvaImage.on('click', function () {
    handleToggleDrawer(false)
  })

}

function addImageToGroup(group: Konva.Group, imageSource: string, locX: number, locY: number) {
  let image = new Image()
  image.src = imageSource
  var konvaImage = new Konva.Image({
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
  var mapNodeNameKonvaText = new Konva.Text({
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
  var linkedNodeIds = atlasNode.getLinkedList()
  linkedNodeIds.forEach(linkedNodeId => {
    var linkedNode = atlasNodesMap.get(linkedNodeId)
    var atlasNodeId = atlasNode.ID
    if (linkedNode != null) {
      var lineDrawn = false;
      var linkedNodeIdNumber = linkedNode.ID
      drawnLinks.forEach(drawnLink => {
        if (drawnLink[0] === atlasNodeId && drawnLink[1] === linkedNodeIdNumber
          || drawnLink[0] === linkedNodeIdNumber && drawnLink[1] === atlasNodeId) {
          lineDrawn = true
        }
      });
      if (!lineDrawn) {
        var line = getLinkLine(atlasNode, linkedNode)
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

function handleZoom(stage: Konva.Stage) {
  var scaleBy = 1.2;
  stage.on('wheel', (e) => {
    // stop default scrolling
    e.evt.preventDefault();

    var oldScale = stage.scaleX();
    var pointer = stage.getPointerPosition();
    if (pointer != null) {
      var mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      // how to scale? Zoom in? Or zoom out?
      let direction = e.evt.deltaY > 0 ? -1 : 1;

      // when we zoom on trackpad, e.evt.ctrlKey is true
      // in that case lets revert direction
      if (e.evt.ctrlKey) {
        direction = -direction;
      }

      var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      stage.scale({ x: newScale, y: newScale });

      var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      stage.position(newPos);
    }
  });
}

function isYellowTier(mapTier: string) {
  return Number(mapTier) > 5 && Number(mapTier) < 11
}

function isRedTier(mapTier: string) {
  return Number(mapTier) > 10
}

function showTooltip(mapHighlightArea: Konva.Circle, highlightRing: Konva.Ring, tooltipText: Konva.Text, tooltipContainer: Konva.Rect, atlasNode: AtlasNode) {
  var locX = getLocX(atlasNode)
  var locY = getLocY(atlasNode)
  mapHighlightArea.on('mousemove', function () {
    highlightRing.position({
      x: locX,
      y: locY
    })
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


    highlightRing.show()
    tooltipText.show()
    tooltipContainer.show()
  })
}

function hideTooltip(mapHighlightArea: Konva.Circle, highlightRing: Konva.Ring, tooltipText: Konva.Text, tooltipContainer: Konva.Rect) {
  mapHighlightArea.on('mouseout', function () {
    tooltipText.hide()
    tooltipContainer.hide()
    highlightRing.hide()
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

function getHighlightRing() {
  return new Konva.Ring({
    innerRadius: 30,
    outerRadius: 45,
    fill: 'yellow',
    stroke: 'black',
    strokeWidth: 4,
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


onMounted(mounted)
</script>
