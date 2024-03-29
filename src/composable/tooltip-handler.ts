import buildAtlasNodeTooltipText from "@/composable/atlas-node-tooltip-text-builder";
import type {AtlasNode} from "@/model/atlasNode";
import type Konva from "konva";
import {atlasNodeToPoint} from "@/composable/atlas-node-utils";

export function showTooltip(atlasNode: AtlasNode, tooltipText: Konva.Text, tooltipContainer: Konva.Rect) {
    const atlasNodePoint = atlasNodeToPoint(atlasNode, true)
    tooltipText.position({
        x: atlasNodePoint.x + 50,
        y: atlasNodePoint.y - 70
    })
    tooltipContainer.position({
        x: atlasNodePoint.x + 50,
        y: atlasNodePoint.y - 70
    })

    tooltipText.text(buildAtlasNodeTooltipText(atlasNode))
    tooltipContainer.height(tooltipText.height())

    tooltipText.show()
    tooltipContainer.show()
}

export function hideTooltip(tooltipText: Konva.Text, tooltipContainer: Konva.Rect) {
    tooltipText.hide()
    tooltipContainer.hide()
}