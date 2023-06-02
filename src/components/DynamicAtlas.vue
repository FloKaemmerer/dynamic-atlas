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
import {useAtlasNodeOverlayStore} from "@/store/AtlasNodeOverlayStore";
import type {AtlasNode} from "@/model/atlasNode";
import {handleZoom} from "@/composable/stage-zoom";
import DetailsDrawer from "@/components/details_drawer/DetailsDrawer.vue";
import FilterDrawer from "@/components/filter_drawer/FilterDrawer.vue";
import getOverlayColor from "@/composable/overlay-color-utils";
import type {StageState} from "@/model/stageState";
import buildAtlasNodeTooltipText from "@/composable/atlas-node-tooltip-text-builder";
import {useDivinationCardOverlayStore} from "@/store/DivinationCardOverlayStore";

const coordinatesScaleFactor = 1.925
const minHeight = 937
const minWidth = 1920

const atlasNodeStore = useAtlasNodeStore();
const detailsDrawerStore = useDetailsDrawerStore();
const atlasNodeOverlayStore = useAtlasNodeOverlayStore();
const divinationCardOverlayStore = useDivinationCardOverlayStore();

const backgroundGroup = new Konva.Group();
const linksGroup = new Konva.Group();
const mapBaseGroup = new Konva.Group();
const mapNameGroup = new Konva.Group();
const mapSymbolGroup = new Konva.Group();
const tooltipGroup = new Konva.Group();
const overlayGroup = new Konva.Group();
const filterHighlightGroup = new Konva.Group();
const reactiveGroup = new Konva.Group();

let state: StageState

//FIXME Refactor this abomination of a component

function handleToggleDrawer(e: boolean) {
    detailsDrawerStore.SET_DRAWER(e)
}

function getHandlerReactiveAreaClicked(atlasNode: AtlasNode) {
    return function () {
        handleToggleDrawer(true)
        atlasNodeStore.SET_SELECTED_ATLAS_NODE(atlasNode)
    };
}

const mounted = () => {
    state = {
        stage: undefined,
        currentScale: 1,
        height: minHeight,
        width: minWidth,
        offsetX: 175,
        offsetY: 65,
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
        draggable: true,
        dragBoundFunc: dragBound.bind(this)

    });

    state.stage = stage

    createBackgroundImage();
    let mapLayer = new Konva.Layer();
    let reactiveLayer = new Konva.Layer();

    stage.add(mapLayer);
    stage.add(reactiveLayer)

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

            let reactiveNodeArea = getHighlightArea(locX, locY);
            reactiveNodeArea.on('click', getHandlerReactiveAreaClicked(atlasNode))
            reactiveNodeArea.on('touchend', getHandlerReactiveAreaClicked(atlasNode))
            showTooltip(reactiveNodeArea, tooltipText, tooltipContainer, atlasNode)

            hideTooltip(reactiveNodeArea, tooltipText, tooltipContainer)

            reactiveGroup.add(reactiveNodeArea)
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

    reactiveLayer.add(reactiveGroup)

    handleZoom(state)
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
        let overlayCircle = new Konva.Circle({
            id: key.id + "-circle",
            x: getScaledAtlasNodeLocX(key),
            y: getScaledAtlasNodeLocY(key),
            fill: getOverlayColor(value),
            radius: 20,
            opacity: 1,
        })
        overlayGroup.add(overlayCircle)

        let overlayRect = new Konva.Rect({
            id: key.id + "-rect",
            x: getScaledAtlasNodeLocX(key) - 13,
            y: getScaledAtlasNodeLocY(key) - 38,
            fill: getOverlayColor(value),
            width: 25,
            height: 25,
            cornerRadius: 5,
            opacity: 1,
        })
        overlayGroup.add(overlayRect)

        let overlayText = new Konva.Text({
            Text: value,
            x: getScaledAtlasNodeLocX(key) - 3,
            y: getScaledAtlasNodeLocY(key) - 32,
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
    state.overlayDivinationCardsMap.forEach((value: number, key: AtlasNode) => {
        let overlayCircle = new Konva.Circle({
            id: key.id + "-circle",
            x: getScaledAtlasNodeLocX(key),
            y: getScaledAtlasNodeLocY(key),
            fill: '#f6a676',
            radius: 20,
            opacity: 1,
        })
        overlayGroup.add(overlayCircle)

        let overlayRect = new Konva.Rect({
            id: key.id + "-rect",
            x: getScaledAtlasNodeLocX(key) - 13,
            y: getScaledAtlasNodeLocY(key) - 38,
            fill: '#f6a676',
            width: 25,
            height: 25,
            cornerRadius: 5,
            opacity: 1,
        })
        overlayGroup.add(overlayRect)

        let overlayText = new Konva.Text({
            Text: (value * 100).toFixed(3) + "%",
            x: getScaledAtlasNodeLocX(key) - 3,
            y: getScaledAtlasNodeLocY(key) - 32,
            offsetX: ((value * 100).toFixed(3) + "%").length * 3.75,
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

    //show all filtere AtlasNodes
    state.filteredAtlasNodes.forEach(value => {

        let filterHighlight = new Konva.Circle({
            id: value.id,
            x: getScaledAtlasNodeLocX(value),
            y: getScaledAtlasNodeLocY(value),
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
    atlasBackgroundKonvaImage.on('touchend', function () {
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
        scaleX: 0.25,
        scaleY: 0.25,
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
        y: locY + 15,
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
        strokeWidth: 1,
        lineJoin: 'round',
        dash: [10, 5],
        lineCap: 'round',
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
        tooltipText.text(buildAtlasNodeTooltipText(atlasNode))
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
        fontSize: 15,
        fontFamily: 'Calibri',
        fill: '#555',
        width: 250,
        padding: 20,
        align: 'left',
        visible: false,
    })
}

function getTooltipContainer() {
    return new Konva.Rect({
        stroke: '#555',
        strokeWidth: 5,
        fill: '#ddd',
        width: 250,
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
        radius: 20,
        opacity: 0
    })
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

onMounted(() => {
    mounted()
})
</script>
