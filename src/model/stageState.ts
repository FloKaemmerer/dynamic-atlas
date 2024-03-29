import type {Stage} from "konva/lib/Stage";
import type {Point} from "@/model/point";

export interface StageState {
    stage?: Stage
    currentScale: number
    width: number
    height: number
    offsetX: number
    offsetY: number
    lastCenter?: Point
    lastDist: number
}