<template>
  <div id="app">

  </div>
</template>

<script lang="ts">
import atlasNodes from '@/assets/atlas/atlasNodes.json'
import atlasBackgroundSource from '@/assets/atlas/maps/AtlasBackground.png'
import mapBase from '@/assets/atlas/maps/Base16.png'
import uniqueMapList from '@/assets/atlas/maps/uniques/index.js'
import whiteTierMapList from '@/assets/atlas/maps/tier1-5/index.js'
import yellowTierMapList from '@/assets/atlas/maps/tier6-10/index.js'
import redTierMapList from '@/assets/atlas/maps/tier11-16/index.js'
import Konva from 'konva';
import { AtlasNode } from '@/mixins/atlasNode'

export default {
  data() {
    return {
      coordinatesScaleFactor: 4.1,
      atlasNodesMap: new Map<string, AtlasNode>()
    }
  },

  beforeCreate() {

  },

  created() {
    this.atlasNodesMap = new Map<string, AtlasNode>()
    atlasNodes.forEach(atlasNodeElement => {
      let atlasNode = new AtlasNode(atlasNodeElement.ID,
        atlasNodeElement.Linked,
        atlasNodeElement.MapTier,
        atlasNodeElement.LocX,
        atlasNodeElement.LocY,
        atlasNodeElement.Name,
        atlasNodeElement.Unique);
      this.atlasNodesMap.set(atlasNodeElement.ID, atlasNode)
    });
  },

  mounted() {
    let stage = new Konva.Stage({
      container: 'app',
      width: window.innerWidth,
      height: window.innerHeight,
      draggable: true
    });

    this.addBackgroundLayer(stage);

    let mapLayer = new Konva.Layer();
    let highlightLayer = new Konva.Layer();

    stage.add(mapLayer);

    let linksGroup = new Konva.Group();
    let mapBaseGroup = new Konva.Group();
    let mapNameGroup = new Konva.Group();
    let mapSymbolGroup = new Konva.Group();

    let tooltipText = this.getTooltipBaseText();
    let tooltipContainer = this.getTooltipContainer();
    let highlightRing = this.getHighlightRing()


    let drawnLinks: [number, number][] = [];
    this.atlasNodesMap.forEach((atlasNode: AtlasNode) => {
      let locX = this.getLocX(atlasNode)
      let locY = this.getLocY(atlasNode)
      let mapNodeName = atlasNode.Name.replace(/'|,|\s/g, '')

      this.addLinkToGroup(linksGroup, atlasNode, drawnLinks, this.atlasNodesMap)
      if (atlasNode.Unique) {
        this.addImageToGroup(mapSymbolGroup, uniqueMapList.get(mapNodeName) || "", locX, locY)
      } else {
        this.addImageToGroup(mapBaseGroup, mapBase, locX, locY);
        var mapNodeSource = ""
        if (this.isRedTier(atlasNode.getMapTierAsNumber())) {
          var mapNodeSource = redTierMapList.get(mapNodeName) || ""
        } else if (this.isYellowTier(atlasNode.getMapTierAsNumber())) {
          var mapNodeSource = yellowTierMapList.get(mapNodeName) || ""
        } else {
          // not red or yellow, has to be white
          var mapNodeSource = whiteTierMapList.get(mapNodeName) || ""
        }
        this.addImageToGroup(mapSymbolGroup, mapNodeSource, locX, locY)
      }
      this.addMapNameToGroup(mapNameGroup, atlasNode.Name, locX, locY);

      let mapHighlightArea = this.getHighlightArea(locX, locY);

      this.showTooltip(mapHighlightArea, highlightRing, tooltipText, tooltipContainer, atlasNode)

      this.hideTooltip(mapHighlightArea, highlightRing, tooltipText, tooltipContainer)

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

    this.handleZoom(stage)
  },

  methods: {

    getLocX(atlasNode: AtlasNode) {
      return atlasNode.getLocXAsNumber() * this.coordinatesScaleFactor
    },

    getLocY(atlasNode: AtlasNode) {
      return atlasNode.getLocYAsNumber() * this.coordinatesScaleFactor
    },

    addBackgroundLayer(stage: Konva.Stage) {
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
    },

    addImageToGroup(group: Konva.Group, imageSource: string, locX: number, locY: number) {
      let image = new Image()
      image.src = imageSource
      var konvaImage = new Konva.Image({
        image: image,
        x: locX,
        y: locY,
        scaleX: 0.4,
        scaleY: 0.4,
        offsetX: image.width / 2,
        offsetY: image.height / 2
      })
      image.onload = () => {
        group.add(konvaImage)
      }
    },

    addMapNameToGroup(group: Konva.Group, mapName: string, locX: number, locY: number) {
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
    },

    addLinkToGroup(group: Konva.Group, atlasNode: AtlasNode, drawnLinks: [number, number][], atlasNodesMap: Map<string, AtlasNode>) {
      var linkedNodeIds = atlasNode.getLinkedList()
      linkedNodeIds.forEach(linkedNodeId => {
        var linkedNode = atlasNodesMap.get(linkedNodeId)
        var atlasNodeId = atlasNode.getIdAsNumber()
        if (linkedNode != null) {
          var lineDrawn = false;
          var linkedNodeIdNumber = linkedNode.getIdAsNumber()
          drawnLinks.forEach(drawnLink => {
            if (drawnLink[0] == atlasNodeId && drawnLink[1] == linkedNodeIdNumber
              || drawnLink[0] == linkedNodeIdNumber && drawnLink[1] == atlasNodeId) {
              lineDrawn = true
            }
          });
          if (!lineDrawn) {
            var line = this.getLinkLine(atlasNode,linkedNode)
            group.add(line)
            drawnLinks.push([atlasNodeId, linkedNodeIdNumber])
          }
        }
      });
    },

    getLinkLine(sourceNode: AtlasNode, targetNode: AtlasNode){
      return new Konva.Line({
              points: [this.getLocX(sourceNode), this.getLocY(sourceNode), this.getLocX(targetNode), this.getLocY(targetNode)],
              stroke: 'black',
              strokeWidth: 2,
              lineJoin: 'round',
              dash: [20, 10],
              lineCap: 'round',
              tension: 0.5,
            });
    },

    handleZoom(stage: Konva.Stage) {
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
    },

    isYellowTier(mapTier: number) {
      return mapTier > 5 && mapTier < 11
    },

    isRedTier(mapTier: number) {
      return mapTier > 10
    },

    showTooltip(mapHighlightArea: Konva.Circle, highlightRing: Konva.Ring, tooltipText: Konva.Text, tooltipContainer: Konva.Rect, atlasNode: AtlasNode) {
      var locX = this.getLocX(atlasNode)
      var locY = this.getLocY(atlasNode)
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
    },

    hideTooltip(mapHighlightArea: Konva.Circle, highlightRing: Konva.Ring, tooltipText: Konva.Text, tooltipContainer: Konva.Rect) {
      mapHighlightArea.on('mouseout', function () {
        tooltipText.hide()
        tooltipContainer.hide()
        highlightRing.hide()
      })
    },
    
    getTooltipBaseText() {
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
    },

    getTooltipContainer() {
      return new Konva.Rect({
        stroke: '#555',
        strokeWidth: 5,
        fill: '#ddd',
        width: 300,
        height: this.getTooltipBaseText().height(),
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        shadowOpacity: 0.2,
        cornerRadius: 10,
        visible: false,
      })
    },

    getHighlightRing() {
      return new Konva.Ring({
        innerRadius: 30,
        outerRadius: 45,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4,
        visible: false,
      })
    },

    getHighlightArea(locX: number, locY: number) {
      return new Konva.Circle({
        x: locX,
        y: locY,
        stroke: 'black',
        strokeWidth: 4,
        radius: 35,
        opacity: 0
      })
    },
  }

}
</script>