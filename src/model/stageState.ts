import type {Stage} from "konva/lib/Stage";

export interface StageState {
    stage?: Stage
    currentScale: number
    width: number
    height: number
    offsetX: number
    offsetY: number
}