import type {AtlasNode} from "@/model/atlasNode";
import {useAtlasNodeStore} from "@/store/AtlasNodeStore";

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

export const calculatePathProbabilities = (sourceAtlasNode: AtlasNode, numberOfSteps: number, currentProbability: number, candidates: Map<string, number>) => {
    if (numberOfSteps > 0) {
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
        linkedNodes.filter(value => value.active && !value.uniqueMap && value.mapTier > sourceAtlasNode.mapTier).map(value => higherTierNodes.push(value))

        const numberOfHigherTierNodes = higherTierNodes.length;
        if (numberOfHigherTierNodes > 0) {
            higherTierNodes.forEach(value => {
                const probability = (1 / numberOfHigherTierNodes) * currentProbability;
                addCandidate(candidates, value.id, probability);
                calculatePathProbabilities(value, numberOfSteps - 1, probability, candidates)
            })
        } else {
            const lowerTierNodes: AtlasNode[] = []
            linkedNodes.filter(value => value.active && !value.uniqueMap && value.mapTier < sourceAtlasNode.mapTier).map(value => lowerTierNodes.push(value))
            const numberOfLowerTierNodes = lowerTierNodes.length;
            if (numberOfLowerTierNodes > 0) {
                lowerTierNodes.forEach(value => {
                    const probability = (1 / numberOfLowerTierNodes) * currentProbability;

                    addCandidate(candidates, value.id, probability);
                    calculatePathProbabilities(value, numberOfSteps - 1, probability, candidates)
                })
            }
        }
    }
}