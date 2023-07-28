import type { AtlasNode } from '@/model/atlasNode'
import { useAtlasNodeStore } from '@/store/AtlasNodeStore'
import type { AtlasMemoryPath } from '@/model/atlasMemoryPath'
import type { AtlasMemoryNode } from '@/model/atlasMemoryNode'
import type { AtlasMemoryStep } from '@/model/atlasMemoryStep'
import { useAtlasMemoryNodeStore } from '@/store/AtlasMemoryNodeStores'

const atlasNodeStore = useAtlasNodeStore()
const atlasMemoryNodeStore = useAtlasMemoryNodeStore()

export function calculateAtlasMemoryPaths(sourceAtlasNode: AtlasNode, numberOfSteps: number) {
  // dry run to get viable node Ids
  const tmpAtlasMemoryPaths: AtlasMemoryPath[] = []
  const initialProbabilities = new Map<string, number>()
  calculatePathProbabilities(sourceAtlasNode, numberOfSteps, 1, initialProbabilities, tmpAtlasMemoryPaths, null, [])
  const viableAtlasMemoryPaths = removePathsTerminatingEarly(tmpAtlasMemoryPaths, numberOfSteps)
  if (tmpAtlasMemoryPaths.length === viableAtlasMemoryPaths.length) {
    // If no Paths have been removed we can return the initial Paths
    mergeProbabilities(viableAtlasMemoryPaths, initialProbabilities)
    console.log(`Got ${viableAtlasMemoryPaths.length} possible Memory paths`)
    for (let i = 0; i < viableAtlasMemoryPaths.length; i++) {
      console.log(`Viable Path: ${getPrintablePath(viableAtlasMemoryPaths[i])}`)
    }
    atlasMemoryNodeStore.SET_ATLAS_MEMORY_PATHS(viableAtlasMemoryPaths)
  }
  else {
    // if some paths terminate early we must rerun the calculation with viable node ids as filter...
    const viableStepIds: string[] = determineViableStepIds(viableAtlasMemoryPaths)
    console.log(`ViableStepIds: ${viableStepIds}`)
    const tmpProbabilities = new Map<string, number>()
    const atlasMemoryPaths: AtlasMemoryPath[] = []
    calculatePathProbabilities(sourceAtlasNode, numberOfSteps, 1, tmpProbabilities, atlasMemoryPaths, null, viableStepIds)
    mergeProbabilities(atlasMemoryPaths, tmpProbabilities)
    console.log(`Got ${atlasMemoryPaths.length} possible Memory paths:`)
    for (let i = 0; i < viableAtlasMemoryPaths.length; i++) {
      console.log(`Viable Path: ${getPrintablePath(viableAtlasMemoryPaths[i])}`)
    }
    atlasMemoryNodeStore.SET_ATLAS_MEMORY_PATHS(atlasMemoryPaths)
  }
}

function mergeProbabilities(atlasMemoryPaths: AtlasMemoryPath[], tmpProbabilities: Map<string, number>) {
  atlasMemoryPaths.forEach((atlasMemoryPath) => {
    atlasMemoryPath.atlasMemorySteps.forEach((atlasMemoryStep) => {
      const totalTargetNodeProbability = tmpProbabilities.get(atlasMemoryStep.targetAtlasMemoryNode.nodeId)
      if (totalTargetNodeProbability && totalTargetNodeProbability > atlasMemoryStep.targetAtlasMemoryNode.probability) {
        atlasMemoryStep.targetAtlasMemoryNode.probability = totalTargetNodeProbability
      }

      const totalSourceNodeProbability = tmpProbabilities.get(atlasMemoryStep.sourceAtlasMemoryNode.nodeId)
      if (totalSourceNodeProbability && totalSourceNodeProbability > atlasMemoryStep.sourceAtlasMemoryNode.probability) {
        atlasMemoryStep.sourceAtlasMemoryNode.probability = totalSourceNodeProbability
      }
    })
  })
}

function getPrintablePath(atlasMemoryPath: AtlasMemoryPath) {
  const atlasMemorySteps = atlasMemoryPath.atlasMemorySteps
  let path = ''
  for (let j = 0; j < atlasMemorySteps.length; j++) {
    if (j === 0) {
      path = path.concat(`${atlasMemorySteps[j].sourceAtlasMemoryNode.name}-${atlasMemorySteps[j].targetAtlasMemoryNode.name}`)
    }
    else {
      path = path.concat(`-${atlasMemorySteps[j].targetAtlasMemoryNode.name}`)
    }
  }
  return path
}

function removePathsTerminatingEarly(atlasMemoryPaths: AtlasMemoryPath[], numberOfSteps: number) {
  const removedPaths: AtlasMemoryPath[] = []
  for (let i = atlasMemoryPaths.length - 1; i >= 0; i--) {
    const atlasMemorySteps = atlasMemoryPaths[i].atlasMemorySteps
    if (atlasMemorySteps.length < numberOfSteps) {
      removedPaths.push(atlasMemoryPaths[i])
      atlasMemoryPaths.splice(i, 1)
    }
  }
  console.log(`Removed ${removedPaths.length} Paths terminating early`)
  for (let i = 0; i < removedPaths.length; i++) {
    const atlasMemoryPath = removedPaths[i]
    console.log(`Removed Path: ${getPrintablePath(atlasMemoryPath)}`)
  }
  return atlasMemoryPaths
}

function determineViableStepIds(atlasMemoryPaths: AtlasMemoryPath[]) {
  const viableStepId: string[] = []
  atlasMemoryPaths.forEach((atlasMemoryPath) => {
    atlasMemoryPath.atlasMemorySteps.forEach((atlasMemoryStep) => {
      if (!viableStepId.includes(atlasMemoryStep.stepId)) {
        viableStepId.push(atlasMemoryStep.stepId)
      }
    })
  })
  return viableStepId
}

function addTotalProbability(candidates: Map<string, number>, atlasMemoryNodeId: string, probability: number) {
  if (candidates.has(atlasMemoryNodeId)) {
    const oldProbability = candidates.get(atlasMemoryNodeId) || 0
    const probabilitySum = oldProbability + probability
    candidates.set(atlasMemoryNodeId, probabilitySum)
  }
  else {
    candidates.set(atlasMemoryNodeId, probability)
  }
}

function currentPathContainsNode(currentPath: AtlasMemoryPath | null, nodeId: string) {
  if (currentPath == null) {
    return false
  }
  let containedInPath = false
  currentPath.atlasMemorySteps.forEach((value) => {
    containedInPath = containedInPath || value.sourceAtlasMemoryNode.nodeId == nodeId || value.targetAtlasMemoryNode.nodeId == nodeId
  })
  return containedInPath
}

function isViableLowerTierNode(value: AtlasNode, sourceAtlasNode: AtlasNode, currentPath: AtlasMemoryPath | null, viableStepIds: string[]) {
  return value.active
        && !value.uniqueMap
        && value.mapTier < sourceAtlasNode.mapTier
        && !currentPathContainsNode(currentPath, value.id)
        && (viableStepIds.length == 0 || viableStepIds.includes(`${sourceAtlasNode.id}-${value.id}`))
}

function isViableHigherTierNode(value: AtlasNode, sourceAtlasNode: AtlasNode, currentPath: AtlasMemoryPath | null, viableStepIds: string[]) {
  return value.active
        && !value.uniqueMap
        && value.mapTier > sourceAtlasNode.mapTier
        && !currentPathContainsNode(currentPath, value.id)
        && (viableStepIds.length == 0 || viableStepIds.includes(`${sourceAtlasNode.id}-${value.id}`))
}

function getLinkedNodes(sourceAtlasNode: AtlasNode) {
  const candidateNodes = atlasNodeStore.atlasNodesMap
  const linkedNodeIds = sourceAtlasNode.linked.split(',')

  const linkedNodes: AtlasNode[] = []
  linkedNodeIds.forEach((linkedNodeId) => {
    const atlasNode = candidateNodes.get(linkedNodeId)
    if (atlasNode && atlasNode.id != sourceAtlasNode.id) {
      linkedNodes.push(atlasNode)
    }
  })
  return linkedNodes
}

function calculatePathProbabilities(sourceAtlasNode: AtlasNode,
  numberOfSteps: number,
  currentProbability: number,
  totalProbabilities: Map<string, number>,
  atlasMemoryPaths: AtlasMemoryPath[],
  currentPath: AtlasMemoryPath | null,
  viableStepIds: string[]) {
  if (numberOfSteps > 0) {
    const sourceAtlasMemoryNode: AtlasMemoryNode = {
      nodeId: sourceAtlasNode.id,
      name: sourceAtlasNode.name,
      probability: currentProbability,
      tier: sourceAtlasNode.mapTier,
    }
    const linkedNodes = getLinkedNodes(sourceAtlasNode)

    const viableHigherTierNodes: AtlasNode[] = []
    const viableLowerTierNodes: AtlasNode[] = []
    linkedNodes.filter(value => isViableHigherTierNode(value, sourceAtlasNode, currentPath, viableStepIds)).map(value => viableHigherTierNodes.push(value))
    linkedNodes.filter(value => isViableLowerTierNode(value, sourceAtlasNode, currentPath, viableStepIds)).map(value => viableLowerTierNodes.push(value))

    const numberOfHigherTierNodes = viableHigherTierNodes.length
    if (numberOfHigherTierNodes > 0) {
      // We need to create separate clones for each Linked Node
      // if we reuse a variable it will leak into the recursive runs.
      const tmpPaths: AtlasMemoryPath[] = []
      for (let i = 0; i < numberOfHigherTierNodes; i++) {
        tmpPaths.push(JSON.parse(JSON.stringify(currentPath)))
      }

      const stepProbability = 1 / numberOfHigherTierNodes
      for (let i = 0; i < viableHigherTierNodes.length; i++) {
        const higherTierNode = viableHigherTierNodes[i]
        const probability = stepProbability * currentProbability
        addTotalProbability(totalProbabilities, higherTierNode.id, probability)
        const targetAtlasMemoryNode: AtlasMemoryNode = {
          nodeId: higherTierNode.id,
          name: higherTierNode.name,
          probability,
          tier: higherTierNode.mapTier,
        }
        const atlasMemoryStep: AtlasMemoryStep = {
          sourceAtlasMemoryNode,
          targetAtlasMemoryNode,
          stepProbability,
          stepId: `${sourceAtlasMemoryNode.nodeId}-${targetAtlasMemoryNode.nodeId}`,
        }
        if (i > 0 && currentPath) {
          currentPath = tmpPaths[i]
        }
        if (currentPath) {
          currentPath.atlasMemorySteps.push(atlasMemoryStep)
          calculatePathProbabilities(higherTierNode, numberOfSteps - 1, probability, totalProbabilities, atlasMemoryPaths, currentPath, viableStepIds)
          if (i > 0) {
            atlasMemoryPaths.push(currentPath)
          }
        }
        else {
          const newPath = { atlasMemorySteps: [atlasMemoryStep] }
          atlasMemoryPaths.push(newPath)
          calculatePathProbabilities(higherTierNode, numberOfSteps - 1, probability, totalProbabilities, atlasMemoryPaths, newPath, viableStepIds)
        }
      }
    }
    else {
      const numberOfLowerTierNodes = viableLowerTierNodes.length
      if (numberOfLowerTierNodes > 0) {
        const stepProbability = 1 / numberOfLowerTierNodes
        const tmpPath = JSON.parse(JSON.stringify(currentPath))
        for (let i = 0; i < viableLowerTierNodes.length; i++) {
          const lowerTierNode = viableLowerTierNodes[i]
          const probability = stepProbability * currentProbability
          addTotalProbability(totalProbabilities, lowerTierNode.id, probability)
          const targetAtlasMemoryNode: AtlasMemoryNode = {
            nodeId: lowerTierNode.id,
            name: lowerTierNode.name,
            probability,
            tier: lowerTierNode.mapTier,
          }
          const atlasMemoryStep: AtlasMemoryStep = {
            sourceAtlasMemoryNode,
            targetAtlasMemoryNode,
            stepProbability,
            stepId: `${sourceAtlasMemoryNode.nodeId}-${targetAtlasMemoryNode.nodeId}`,
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
          }
          else {
            const newPath = { atlasMemorySteps: [atlasMemoryStep] }
            atlasMemoryPaths.push(newPath)
            calculatePathProbabilities(lowerTierNode, numberOfSteps - 1, probability, totalProbabilities, atlasMemoryPaths, newPath, viableStepIds)
          }
        }
      }
    }
  }
}
