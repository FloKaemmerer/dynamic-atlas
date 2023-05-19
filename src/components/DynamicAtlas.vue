<template>
    <FilterDrawer/>
    <v-main style="width: 100%" id="atlas">
    </v-main>
    <DetailsDrawer :drawer="false"/>
</template>


<script setup lang="ts">
import atlasBackgroundSource from '@/assets/atlas/maps/AtlasBackground.png'
import mapBase from '@/assets/atlas/maps/Base.png'
import uniqueMapList from '@/assets/atlas/maps/uniques/index.js'
import whiteTierMapList from '@/assets/atlas/maps/tier1-5/index.js'
import yellowTierMapList from '@/assets/atlas/maps/tier6-10/index.js'
import redTierMapList from '@/assets/atlas/maps/tier11-16/index.js'
import Konva from 'konva';
import {onMounted} from 'vue'
import {useAtlasNodeStore} from '@/store/AtlasNodeStore'
import {useDetailsDrawerStore} from '@/store/DetailsDrawerStore';
import {useOverlayStore} from "@/store/OverlayStore";
import type {AtlasNode} from "@/model/atlasNode";
import {handleZoom} from "@/composable/stage-zoom";
import DetailsDrawer from "@/components/DetailsDrawer.vue";
import FilterDrawer from "@/components/FilterDrawer.vue";
import getOverlayColor from "@/composable/overlay-color-utils";
import type {StageState} from "@/model/stageState";

const coordinatesScaleFactor = 4.1
const minHeight = 937
const minWidth = 1920

const atlasNodeStore = useAtlasNodeStore();
const detailsDrawerStore = useDetailsDrawerStore();
const overlayStore = useOverlayStore();

const backgroundGroup = new Konva.Group();
const linksGroup = new Konva.Group();
const mapBaseGroup = new Konva.Group();
const mapNameGroup = new Konva.Group();
const mapSymbolGroup = new Konva.Group();
const tooltipGroup = new Konva.Group();
const overlayGroup = new Konva.Group();
const filterHighlightGroup = new Konva.Group();
const highlightGroup = new Konva.Group();

let state: StageState

function handleToggleDrawer(e: boolean) {
    detailsDrawerStore.SET_DRAWER(e)
}

const mounted = () => {
    state = {
        stage: undefined,
        currentScale: 0.46,
        height: minHeight,
        width: minWidth,
        offsetX: 350,
        offsetY: 150,
    }

    let stage = new Konva.Stage({
        container: 'atlas',
        id: 'atlas-stage',
        width: state.width,
        height: state.height,
        scaleX: state.currentScale,
        scaleY: state.currentScale,
        offsetX: state.offsetX,
        offsetY: state.offsetY,

    });

    state.stage = stage

    createBackgroundImage();
    let mapLayer = new Konva.Layer({
        draggable: true,
        dragBoundFunc: dragBound.bind(this)
    });

    stage.add(mapLayer);

    let tooltipText = getTooltipBaseText();
    let tooltipContainer = getTooltipContainer();

    tooltipGroup.add(tooltipContainer);
    tooltipGroup.add(tooltipText);

    let drawnLinks: [string, string][] = [];
    atlasNodeStore.atlasNodes.forEach((atlasNode: AtlasNode) => {
        if (atlasNode.active) {
            let locX = getScaledAtlasNodeLocX(atlasNode)
            let locY = getScaledAtlasNodeLocY(atlasNode)
            let mapNodeName = atlasNode.name.replace(/'|,|\s/g, '')

            addLinkToGroup(linksGroup, atlasNode, drawnLinks, atlasNodeStore.atlasNodesMap)
            if (atlasNode.uniqueMap) {
                addImageToGroup(mapSymbolGroup, uniqueMapList.get(mapNodeName) || "", locX, locY)
            } else {
                addImageToGroup(mapBaseGroup, mapBase, locX, locY);
                let mapNodeSource: string
                if (isRedTier(atlasNode.mapTier)) {
                    mapNodeSource = redTierMapList.get(mapNodeName) || ""
                } else if (isYellowTier(atlasNode.mapTier)) {
                    mapNodeSource = yellowTierMapList.get(mapNodeName) || ""
                } else {
                    // not red or yellow, has to be white
                    mapNodeSource = whiteTierMapList.get(mapNodeName) || ""
                }
                addImageToGroup(mapSymbolGroup, mapNodeSource, locX, locY);
            }
            addMapNameToGroup(mapNameGroup, atlasNode.name, locX, locY);

            let mapHighlightArea = getHighlightArea(locX, locY);
            mapHighlightArea.on('click', function () {
                handleToggleDrawer(true)
                atlasNodeStore.SET_SELECTED_ATLAS_NODE(atlasNode)
            })
            showTooltip(mapHighlightArea, tooltipText, tooltipContainer, atlasNode)

            hideTooltip(mapHighlightArea, tooltipText, tooltipContainer)

            highlightGroup.add(mapHighlightArea)
        }
    });

    mapLayer.add(backgroundGroup)
    mapLayer.add(linksGroup)
    mapLayer.add(filterHighlightGroup)
    mapLayer.add(overlayGroup)
    mapLayer.add(mapBaseGroup)
    mapLayer.add(mapNameGroup)
    mapLayer.add(mapSymbolGroup)
    mapLayer.add(tooltipGroup)

    mapLayer.add(highlightGroup)

    handleZoom(state)
}

overlayStore.$subscribe((mutation, state) => {
    // destroy previous overlay
    let allOverlayCircles = overlayGroup.find("Circle") as Konva.Circle[];
    allOverlayCircles.forEach(value => value.destroy())
    let allOverlayRects = overlayGroup.find("Rect") as Konva.Rect[];
    allOverlayRects.forEach(value => value.destroy())
    let allOverlayText = overlayGroup.find("Text") as Konva.Text[];
    allOverlayText.forEach(value => value.destroy())

    //show all overlay on all AtlasNodes
    state.overlayNodesMap.forEach((value: number, key: AtlasNode) => {
        let overlayCircle = new Konva.Circle({
            id: key.id + "-circle",
            x: getScaledAtlasNodeLocX(key),
            y: getScaledAtlasNodeLocY(key),
            fill: getOverlayColor(value),
            radius: 35,
            opacity: 1,
        })
        overlayGroup.add(overlayCircle)

        let overlayRect = new Konva.Rect({
            id: key.id + "-rect",
            x: getScaledAtlasNodeLocX(key) - 25,
            y: getScaledAtlasNodeLocY(key) - 60,
            fill: getOverlayColor(value),
            width: 50,
            height: 50,
            cornerRadius: 10,
            opacity: 1,
        })
        overlayGroup.add(overlayRect)

        let overlayText = new Konva.Text({
            Text: value,
            x: getScaledAtlasNodeLocX(key) - 5,
            y: getScaledAtlasNodeLocY(key) - 55,
            offsetX: (value + "").length * 3.75,
            fontSize: 30,
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
    console.log(state.filteredAtlasNodes)

    // destroy previous Highlights
    let allHighlights = filterHighlightGroup.find("Circle") as Konva.Circle[];
    allHighlights.forEach(value => value.destroy())

    //show all filtere AtlasNodes
    state.filteredAtlasNodes.forEach(value => {

        let filterHighlight = new Konva.Circle({
            id: value.id,
            x: getScaledAtlasNodeLocX(value),
            y: getScaledAtlasNodeLocY(value),
            stroke: 'black',
            fill: 'red',
            strokeWidth: 4,
            radius: 35,
            opacity: 1,
        })
        filterHighlightGroup.add(filterHighlight)
    })
})

function getScaledAtlasNodeLocX(atlasNode: AtlasNode) {
    return Number(atlasNode.locX) * coordinatesScaleFactor
}

function getScaledAtlasNodeLocY(atlasNode: AtlasNode) {
    return Number(atlasNode.locY) * coordinatesScaleFactor
}

function createBackgroundImage() {
    let atlasBackgroundImage = new Image();
    atlasBackgroundImage.src = atlasBackgroundSource;
    let atlasBackgroundKonvaImage = new Konva.Image({
        image: atlasBackgroundImage,
    });
    atlasBackgroundImage.onload = function () {
        backgroundGroup.add(atlasBackgroundKonvaImage);
    };
    atlasBackgroundKonvaImage.on('click', function () {
        handleToggleDrawer(false)
    })
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
        offsetX: mapName.length * 5,
        fontSize: 25,
        fontFamily: 'Arial',
        fill: 'black',
        fontStyle: 'bold',
        shadowColor: 'white',
        shadowBlur: 10,
        shadowOffset: {x: 1, y: 1},
        shadowOpacity: 1,
    })
    group.add(mapNodeNameKonvaText)
}

function addLinkToGroup(group: Konva.Group, atlasNode: AtlasNode, drawnLinks: [string, string][], atlasNodesMap: Map<string, AtlasNode>) {
    let linkedNodeIds = atlasNode.linked.split(',');
    linkedNodeIds.forEach(linkedNodeId => {
        let linkedNode = atlasNodesMap.get(linkedNodeId)
        let atlasNodeId = atlasNode.id
        if (linkedNode && linkedNode.active) {
            let lineDrawn = false;
            let linkedNodeId = linkedNode.id
            drawnLinks.forEach(drawnLink => {
                if (drawnLink[0] === atlasNodeId && drawnLink[1] === linkedNodeId
                    || drawnLink[0] === linkedNodeId && drawnLink[1] === atlasNodeId) {
                    lineDrawn = true
                }
            });
            if (!lineDrawn) {
                let line = getLinkLine(atlasNode, linkedNode)
                group.add(line)
                drawnLinks.push([atlasNode.id, linkedNodeId])
            }
        }
    });
}

function getLinkLine(sourceNode: AtlasNode, targetNode: AtlasNode) {
    return new Konva.Line({
        points: [getScaledAtlasNodeLocX(sourceNode), getScaledAtlasNodeLocY(sourceNode), getScaledAtlasNodeLocX(targetNode), getScaledAtlasNodeLocY(targetNode)],
        stroke: 'black',
        strokeWidth: 2,
        lineJoin: 'round',
        dash: [20, 10],
        lineCap: 'round',
        tension: 0.5,
    });
}

function isYellowTier(mapTier: number) {
    return mapTier > 5 && mapTier < 11
}

function isRedTier(mapTier: number) {
    return mapTier > 10
}

function showTooltip(mapHighlightArea: Konva.Circle, tooltipText: Konva.Text, tooltipContainer: Konva.Rect, atlasNode: AtlasNode) {
    let locX = getScaledAtlasNodeLocX(atlasNode)
    let locY = getScaledAtlasNodeLocY(atlasNode)
    mapHighlightArea.on('mousemove', function () {
        tooltipText.position({
            x: locX + 50,
            y: locY - 70
        })
        tooltipContainer.position({
            x: locX + 50,
            y: locY - 70
        })
        tooltipText.text(atlasNode.name + "\n\n" + "Natural Tier: " + atlasNode.mapTier + "\nSome useful Information about the Map. Like layout (open or close), some ratings, number of Bosses, noteable Divcards and so on.")
        tooltipContainer.height(tooltipText.height())


        tooltipText.show()
        tooltipContainer.show()
    })
}

function hideTooltip(mapHighlightArea: Konva.Circle, tooltipText: Konva.Text, tooltipContainer: Konva.Rect) {
    mapHighlightArea.on('mouseout', function () {
        tooltipText.hide()
        tooltipContainer.hide()
    })
}

function getTooltipBaseText() {
    return new Konva.Text({
        text: "",
        fontSize: 35,
        fontFamily: 'Calibri',
        fill: '#555',
        width: 400,
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
        width: 400,
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

function dragBound(pos: any) {
    // This limits how much you can drag the image
    // TODO: somehow make this dynamic based on loaded image size
    let x = minWidth
    let y = minHeight
    if (state.stage) {
        x = Math.max(Math.min(pos.x, 800), -state.width * state.currentScale)
        y = Math.max(Math.min(pos.y, 500), -state.height * state.currentScale)
    }

    return {
        x: x,
        y: y
    }
}

onMounted(() => {
    mounted()
})
</script>
