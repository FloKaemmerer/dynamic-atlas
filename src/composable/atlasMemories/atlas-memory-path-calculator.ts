import type {AtlasNode} from "@/model/atlasNode";
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import type {AtlasMemoryPath} from "@/model/atlasMemoryPath";
import type {AtlasMemoryNode} from "@/model/atlasMemoryNode";
import type {AtlasMemoryStep} from "@/model/atlasMemoryStep";
import {useAtlasMemoryNodeStore} from "@/store/AtlasMemoryNodeStores";

const atlasNodeStore = useAtlasNodeStore()
const atlasMemoryNodeStore = useAtlasMemoryNodeStore()

function mergeProbabilities(atlasMemoryPaths: AtlasMemoryPath[], tmpProbabilities: Map<string, number>) {
    atlasMemoryPaths.forEach(atlasMemoryPath => {
        atlasMemoryPath.atlasMemorySteps.forEach(atlasMemoryStep => {
            const totalTargetNodeProbability = tmpProbabilities.get(atlasMemoryStep.targetAtlasMemoryNode.nodeId);
            if (totalTargetNodeProbability && totalTargetNodeProbability > atlasMemoryStep.targetAtlasMemoryNode.probability) {
                atlasMemoryStep.targetAtlasMemoryNode.probability = totalTargetNodeProbability
            }

            const totalSourceNodeProbability = tmpProbabilities.get(atlasMemoryStep.sourceAtlasMemoryNode.nodeId);
            if (totalSourceNodeProbability && totalSourceNodeProbability > atlasMemoryStep.sourceAtlasMemoryNode.probability) {
                atlasMemoryStep.sourceAtlasMemoryNode.probability = totalSourceNodeProbability
            }
        })
    })
}

function removePathsTerminatingEarly(atlasMemoryPaths: AtlasMemoryPath[], numberOfSteps: number) {
    for (let i = atlasMemoryPaths.length - 1; i >= 0; i--) {
        const atlasMemorySteps = atlasMemoryPaths[i].atlasMemorySteps;
        if (atlasMemorySteps.length < numberOfSteps) {
            atlasMemoryPaths.splice(i, 1)
        }
    }
    return atlasMemoryPaths
}

function determineViableStepIds(atlasMemoryPaths: AtlasMemoryPath[]) {
    const viableStepId: string[] = []
    atlasMemoryPaths.forEach(atlasMemoryPath => {
        atlasMemoryPath.atlasMemorySteps.forEach(atlasMemoryStep => {
            if (!viableStepId.includes(atlasMemoryStep.stepId)) {
                viableStepId.push(atlasMemoryStep.stepId)
            }
        })
    })
    return viableStepId;
}

export function calculateAtlasMemoryPaths(sourceAtlasNode: AtlasNode, numberOfSteps: number) {
    // dry run to get viable node Ids
    const tmpAtlasMemoryPaths: AtlasMemoryPath[] = []
    calculatePathProbabilities(sourceAtlasNode, numberOfSteps, 1, new Map<string, number>(), tmpAtlasMemoryPaths, null, [])
    const viableStepIds: string[] = determineViableStepIds(removePathsTerminatingEarly(tmpAtlasMemoryPaths, numberOfSteps))

    //rerun calculation with viable node ids as filter...
    const tmpProbabilities = new Map<string, number>();
    const atlasMemoryPaths: AtlasMemoryPath[] = []
    calculatePathProbabilities(sourceAtlasNode, numberOfSteps, 1, tmpProbabilities, atlasMemoryPaths, null, viableStepIds)
    mergeProbabilities(atlasMemoryPaths, tmpProbabilities);
    console.log("Got " + atlasMemoryPaths.length + " possible Memory paths")
    atlasMemoryNodeStore.SET_ATLAS_MEMORY_PATHS(atlasMemoryPaths)
}

function addTotalProbability(candidates: Map<string, number>, atlasMemoryNodeId: string, probability: number) {
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
        containedInPath = containedInPath || value.sourceAtlasMemoryNode.nodeId == nodeId || value.targetAtlasMemoryNode.nodeId == nodeId
    })
    return containedInPath;
}

function isViableLowerTierNode(value: AtlasNode, sourceAtlasNode: AtlasNode, currentPath: AtlasMemoryPath | null, viableStepIds: string[]) {
    return value.active
        && !value.uniqueMap
        && value.mapTier < sourceAtlasNode.mapTier
        && !currentPathContainsNode(currentPath, value.id)
        && (viableStepIds.length == 0 || viableStepIds.includes(sourceAtlasNode.id + "-" + value.id));
}

function isViableHigherTierNode(value: AtlasNode, sourceAtlasNode: AtlasNode, currentPath: AtlasMemoryPath | null, viableStepIds: string[]) {
    return value.active
        && !value.uniqueMap
        && value.mapTier > sourceAtlasNode.mapTier
        && !currentPathContainsNode(currentPath, value.id)
        && (viableStepIds.length == 0 || viableStepIds.includes(sourceAtlasNode.id + "-" + value.id));
}

function getLinkedNodes(sourceAtlasNode: AtlasNode) {
    const candidateNodes = atlasNodeStore.atlasNodesMap;
    const linkedNodeIds = sourceAtlasNode.linked.split(',');

    const linkedNodes: AtlasNode[] = []
    linkedNodeIds.forEach(linkedNodeId => {
        const atlasNode = candidateNodes.get(linkedNodeId);
        if (atlasNode && atlasNode.id != sourceAtlasNode.id) {
            linkedNodes.push(atlasNode)
        }
    })
    return linkedNodes;
}

const calculatePathProbabilities = (sourceAtlasNode: AtlasNode,
                                    numberOfSteps: number,
                                    currentProbability: number,
                                    totalProbabilities: Map<string, number>,
                                    atlasMemoryPaths: AtlasMemoryPath[],
                                    currentPath: AtlasMemoryPath | null,
                                    viableStepIds: string[]) => {
    if (numberOfSteps > 0) {
        const sourceAtlasMemoryNode: AtlasMemoryNode = {
            nodeId: sourceAtlasNode.id,
            name: sourceAtlasNode.name,
            probability: currentProbability,
            tier: sourceAtlasNode.mapTier
        }
        const linkedNodes = getLinkedNodes(sourceAtlasNode);

        const viableHigherTierNodes: AtlasNode[] = []
        const viableLowerTierNodes: AtlasNode[] = []
        linkedNodes.filter(value => isViableHigherTierNode(value, sourceAtlasNode, currentPath, viableStepIds)).map(value => viableHigherTierNodes.push(value))
        linkedNodes.filter(value => isViableLowerTierNode(value, sourceAtlasNode, currentPath, viableStepIds)).map(value => viableLowerTierNodes.push(value))

        const numberOfHigherTierNodes = viableHigherTierNodes.length;
        if (numberOfHigherTierNodes > 0) {
            const stepProbability = 1 / numberOfHigherTierNodes;
            const tmpPath = JSON.parse(JSON.stringify(currentPath))
            for (let i = 0; i < viableHigherTierNodes.length; i++) {
                const higherTierNode = viableHigherTierNodes[i]
                const probability = stepProbability * currentProbability;
                addTotalProbability(totalProbabilities, higherTierNode.id, probability);
                const targetAtlasMemoryNode: AtlasMemoryNode = {
                    nodeId: higherTierNode.id,
                    name: higherTierNode.name,
                    probability: probability,
                    tier: higherTierNode.mapTier
                }
                const atlasMemoryStep: AtlasMemoryStep = {
                    sourceAtlasMemoryNode: sourceAtlasMemoryNode,
                    targetAtlasMemoryNode: targetAtlasMemoryNode,
                    stepProbability: stepProbability,
                    stepId: sourceAtlasMemoryNode.nodeId + "-" + targetAtlasMemoryNode.nodeId
                }
                if (i > 0 && currentPath) {
                    currentPath = tmpPath
                }
                if (currentPath) {
                    currentPath.atlasMemorySteps.push(atlasMemoryStep)
                    calculatePathProbabilities(higherTierNode, numberOfSteps - 1, probability, totalProbabilities, atlasMemoryPaths, currentPath, viableStepIds)
                    if (i > 0) {
                        atlasMemoryPaths.push(currentPath)
                    }
                } else {
                    const newPath = {atlasMemorySteps: [atlasMemoryStep]};
                    atlasMemoryPaths.push(newPath)
                    calculatePathProbabilities(higherTierNode, numberOfSteps - 1, probability, totalProbabilities, atlasMemoryPaths, newPath, viableStepIds)
                }
            }
        } else {
            const numberOfLowerTierNodes = viableLowerTierNodes.length;
            if (numberOfLowerTierNodes > 0) {
                const stepProbability = 1 / numberOfLowerTierNodes;
                const tmpPath = JSON.parse(JSON.stringify(currentPath))
                for (let i = 0; i < viableLowerTierNodes.length; i++) {
                    const lowerTierNode = viableLowerTierNodes[i]
                    const probability = stepProbability * currentProbability;
                    addTotalProbability(totalProbabilities, lowerTierNode.id, probability);
                    const targetAtlasMemoryNode: AtlasMemoryNode = {
                        nodeId: lowerTierNode.id,
                        name: lowerTierNode.name,
                        probability: probability,
                        tier: lowerTierNode.mapTier
                    }
                    const atlasMemoryStep: AtlasMemoryStep = {
                        sourceAtlasMemoryNode: sourceAtlasMemoryNode,
                        targetAtlasMemoryNode: targetAtlasMemoryNode,
                        stepProbability: stepProbability,
                        stepId: sourceAtlasMemoryNode.nodeId + "-" + targetAtlasMemoryNode.nodeId
                    }
                    if (i > 0 && currentPath) {
                        currentPath = tmpPath
                    }
                    if (currentPath) {
                        currentPath.atlasMemorySteps.push(atlasMemoryStep)
                        calculatePathProbabilities(lowerTierNode, numberOfSteps - 1, probability, totalProbabilities, atlasMemoryPaths, currentPath, viableStepIds)
                        if (i > 0) {
                            atlasMemoryPaths.push(currentPath)
                        }
                    } else {
                        const newPath = {atlasMemorySteps: [atlasMemoryStep]};
                        atlasMemoryPaths.push(newPath)
                        calculatePathProbabilities(lowerTierNode, numberOfSteps - 1, probability, totalProbabilities, atlasMemoryPaths, newPath, viableStepIds)
                    }
                }
            }
        }
    }
}