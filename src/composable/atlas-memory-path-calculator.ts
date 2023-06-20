import type {AtlasNode} from "@/model/atlasNode";
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import type {AtlasMemoryPath} from "@/model/atlasMemoryPath";
import type {AtlasMemoryNode} from "@/model/atlasMemoryNode";
import type {AtlasMemoryStep} from "@/model/atlasMemoryStep";

const atlasNodeStore = useAtlasNodeStore()

function addCandidate(candidates: Map<string, number>, atlasMemoryNodeId: string, probability: number) {
    if (candidates.has(atlasMemoryNodeId)) {
        const oldProbability = candidates.get(atlasMemoryNodeId) || 0;
        const probabilitySum = oldProbability + probability;
        candidates.set(atlasMemoryNodeId, probabilitySum)
    } else {
        candidates.set(atlasMemoryNodeId, probability)
    }
}

function currentPathContainsNode(currentPath: AtlasMemoryPath | null, nodeId: string) {
    if (currentPath == null) {
        return false
    }
    let containedInPath = false
    currentPath.atlasMemorySteps.forEach(value => {
        containedInPath = value.sourceAtlasMemoryNode.nodeId == nodeId || value.targetAtlasMemoryNode.nodeId == nodeId
    })
    return containedInPath;
}

function isLowerTierNodeViable(value: AtlasNode, sourceAtlasNode: AtlasNode, currentPath: AtlasMemoryPath | null) {
    return value.active && !value.uniqueMap && value.mapTier < sourceAtlasNode.mapTier && !currentPathContainsNode(currentPath, value.id);
}

function isViableHigherTierNode(value: AtlasNode, sourceAtlasNode: AtlasNode, currentPath: AtlasMemoryPath | null) {
    return value.active && !value.uniqueMap && value.mapTier > sourceAtlasNode.mapTier && !currentPathContainsNode(currentPath, value.id);
}

export const calculatePathProbabilities = (sourceAtlasNode: AtlasNode, numberOfSteps: number, currentProbability: number, candidates: Map<string, number>, atlasMemoryPaths: AtlasMemoryPath[], currentPath: AtlasMemoryPath | null) => {
    if (numberOfSteps > 0) {
        console.log("Current source: " + sourceAtlasNode.name + " current Path: " + JSON.stringify(currentPath))
        const sourceAtlasMemoryNode: AtlasMemoryNode = {
            nodeId: sourceAtlasNode.id,
            name: sourceAtlasNode.name,
            probability: currentProbability,
            tier: sourceAtlasNode.mapTier
        }

        const candidateNodes = atlasNodeStore.atlasNodesMap;
        const linkedNodeIds = sourceAtlasNode.linked.split(',');

        const linkedNodes: AtlasNode[] = []
        linkedNodeIds.forEach(linkedNodeId => {
            const atlasNode = candidateNodes.get(linkedNodeId);
            if (atlasNode && atlasNode.id != sourceAtlasNode.id) {
                linkedNodes.push(atlasNode)
            }
        })

        const higherTierNodes: AtlasNode[] = []
        linkedNodes.filter(value => isViableHigherTierNode(value, sourceAtlasNode, currentPath)).map(value => higherTierNodes.push(value))

        const numberOfHigherTierNodes = higherTierNodes.length;
        console.log("Number of higher Tier Nodes: " + numberOfHigherTierNodes + " on source: " + sourceAtlasNode.name)
        if (numberOfHigherTierNodes > 0) {
            const stepProbability = 1 / numberOfHigherTierNodes;
            const tmpPath = JSON.parse(JSON.stringify(currentPath))
            for (let i = 0; i < higherTierNodes.length; i++) {
                if (i > 0 && currentPath) {
                    currentPath = tmpPath
                }
                const higherTierNode = higherTierNodes[i]
                const probability = stepProbability * currentProbability;
                const targetAtlasMemoryNode: AtlasMemoryNode = {
                    nodeId: higherTierNode.id,
                    name: higherTierNode.name,
                    probability: probability,
                    tier: higherTierNode.mapTier
                }
                const atlasMemoryStep: AtlasMemoryStep = {
                    sourceAtlasMemoryNode: sourceAtlasMemoryNode,
                    targetAtlasMemoryNode: targetAtlasMemoryNode,
                    stepProbability: stepProbability
                }
                if (currentPath) {
                    currentPath.atlasMemorySteps.push(atlasMemoryStep)
                    addCandidate(candidates, higherTierNode.id, probability);
                    calculatePathProbabilities(higherTierNode, numberOfSteps - 1, probability, candidates, atlasMemoryPaths, currentPath)
                    if (i > 0) {
                        atlasMemoryPaths.push(currentPath)
                    }
                } else {
                    const newPath = {atlasMemorySteps: [atlasMemoryStep]};
                    atlasMemoryPaths.push(newPath)
                    addCandidate(candidates, higherTierNode.id, probability);
                    calculatePathProbabilities(higherTierNode, numberOfSteps - 1, probability, candidates, atlasMemoryPaths, newPath)
                }
            }
        } else {
            const lowerTierNodes: AtlasNode[] = []
            linkedNodes.filter(value => isLowerTierNodeViable(value, sourceAtlasNode, currentPath)).map(value => lowerTierNodes.push(value))
            const numberOfLowerTierNodes = lowerTierNodes.length;
            if (numberOfLowerTierNodes > 0) {
                const stepProbability = 1 / numberOfLowerTierNodes;
                const tmpPath = JSON.parse(JSON.stringify(currentPath))
                for (let i = 0; i < lowerTierNodes.length; i++) {
                    if (i > 0 && currentPath) {
                        currentPath = tmpPath
                    }
                    const lowerTierNode = lowerTierNodes[i]
                    const probability = stepProbability * currentProbability;
                    const targetAtlasMemoryNode: AtlasMemoryNode = {
                        nodeId: lowerTierNode.id,
                        name: lowerTierNode.name,
                        probability: probability,
                        tier: lowerTierNode.mapTier
                    }
                    const atlasMemoryStep: AtlasMemoryStep = {
                        sourceAtlasMemoryNode: sourceAtlasMemoryNode,
                        targetAtlasMemoryNode: targetAtlasMemoryNode,
                        stepProbability: stepProbability
                    }
                    if (currentPath) {
                        currentPath.atlasMemorySteps.push(atlasMemoryStep)
                        addCandidate(candidates, lowerTierNode.id, probability);
                        calculatePathProbabilities(lowerTierNode, numberOfSteps - 1, probability, candidates, atlasMemoryPaths, currentPath)
                        if (i > 0) {
                            atlasMemoryPaths.push(currentPath)
                        }
                    } else {
                        const newPath = {atlasMemorySteps: [atlasMemoryStep]};
                        atlasMemoryPaths.push(newPath)
                        addCandidate(candidates, lowerTierNode.id, probability);
                        calculatePathProbabilities(lowerTierNode, numberOfSteps - 1, probability, candidates, atlasMemoryPaths, newPath)
                    }
                }
            }
        }
    }
}