import {defineStore} from "pinia";

interface State {
    filterText: string,
    includeMapTier: boolean,
    mapTier: number[],
    includeOpenness: boolean,
    openness: number[],
    includeTraversability: boolean,
    traversability: number[],
    includeBacktrackFactor: boolean,
    backtrackFactor: number[],
    includeLinearity: boolean,
    linearity: number[],
    includeBaseMobCount: boolean,
    baseMobCount: number[],
    rushableBoss: boolean,
    includeNumberOfBosses: boolean,
    numberOfBosses: number[],
    excludePhasedBosses: boolean,
    includeSkippablePhases: boolean,
    includeSpawnIntro: boolean,
    excludeSpawnedBosses: boolean,
    minDivinationCardPrice: number,
    minEffectiveDivinationCardValue: number,
}

export const useFilterStore = defineStore("filter", {
    state: (): State => {
        return {
            filterText: '',
            includeMapTier: false,
            mapTier: [1, 16],
            includeOpenness: false,
            openness: [0, 10],
            includeTraversability: false,
            traversability: [0, 10],
            includeBacktrackFactor: false,
            backtrackFactor: [0, 10],
            includeLinearity: false,
            linearity: [0, 10],
            includeBaseMobCount: false,
            baseMobCount: [0, 10],
            rushableBoss: false,
            includeNumberOfBosses: false,
            numberOfBosses: [0, 4],
            excludePhasedBosses: false,
            includeSkippablePhases: false,
            includeSpawnIntro: false,
            excludeSpawnedBosses: false,
            minDivinationCardPrice: 0,
            minEffectiveDivinationCardValue: 0,
        }
    },

    actions: {
        SET_FILTER_TEXT(filterText: string) {
            this.filterText = filterText
        },

        SET_INCLUDE_MAP_TIER(includeMapTier: boolean) {
            this.includeMapTier = includeMapTier
        },

        SET_MAP_TIER(mapTier: number[]) {
            this.mapTier = mapTier
        },

        SET_INCLUDE_OPENNESS(includeOpenness: boolean) {
            this.includeOpenness = includeOpenness
        },

        SET_OPENNESS(openness: number[]) {
            this.openness = openness;
        },

        SET_INCLUDE_TRAVERSABILITY(includeTraversability: boolean) {
            this.includeTraversability = includeTraversability
        },

        SET_TRAVERSABILITY(traversability: number[]) {
            this.traversability = traversability
        },

        SET_INCLUDE_BACKTRACK_FACTOR(includeBacktrackFactor: boolean) {
            this.includeBacktrackFactor = includeBacktrackFactor
        },

        SET_BACKTRACK_FACTOR(backtrackFactor: number[]) {
            this.backtrackFactor = backtrackFactor
        },

        SET_INCLUDE_LINEARITY(includeLinearity: boolean) {
            this.includeLinearity = includeLinearity
        },

        SET_LINEARITY(linearity: number[]) {
            this.linearity = linearity
        },

        SET_INCLUDE_BASE_MOB_COUNT(includeBaseMobCount: boolean) {
            this.includeBaseMobCount = includeBaseMobCount
        },

        SET_BASE_MOB_COUNT(baseMobCount: number[]) {
            this.baseMobCount = baseMobCount
        },

        SET_RUSHABLE_BOSS(rushableBoss: boolean) {
            this.rushableBoss = rushableBoss
        },

        SET_INCLUDE_NUMBER_OF_BOSSES(includeNumberOfBosses: boolean) {
            this.includeNumberOfBosses = includeNumberOfBosses
        },

        SET_NUMBER_OF_BOSSES(numberOfBosses: number[]) {
            this.numberOfBosses = numberOfBosses
        },

        SET_EXCLUDE_PHASED_BOSSES(excludePhasedBosses: boolean) {
            this.excludePhasedBosses = excludePhasedBosses
        },

        SET_INCLUDE_SKIPPABLE_PHASES(includeSkippablePhases: boolean) {
            this.includeSkippablePhases = includeSkippablePhases
        },

        SET_INCLUDE_SPAWN_INTRO(includeSpawnIntro: boolean) {
            this.includeSpawnIntro = includeSpawnIntro
        },

        SET_EXCLUDE_SPAWNED_BOSSES(excludeSpawnedBosses: boolean) {
            this.excludeSpawnedBosses = excludeSpawnedBosses
        },

        SET_MINIMUM_DIVINATION_CARD_PRICE(minDivinationCardPrice: number) {
            this.minDivinationCardPrice = minDivinationCardPrice
        },
        SET_MINIMUM_EFFECTIVE_DIVINATION_CARD_VALUE(minEffectiveDivinationCardValue: number) {
            this.minEffectiveDivinationCardValue = minEffectiveDivinationCardValue
        },
    }
})