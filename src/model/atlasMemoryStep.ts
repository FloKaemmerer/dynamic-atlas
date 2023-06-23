import type {AtlasMemoryNode} from "@/model/atlasMemoryNode";

export interface AtlasMemoryStep {
    sourceAtlasMemoryNode: AtlasMemoryNode
    targetAtlasMemoryNode: AtlasMemoryNode
    stepProbability: number
    stepId: string
}