import type {LocationQuery} from "vue-router";
import {FilterKeys} from "@/model/filterKeys";
import {useFilterStore} from "@/store/FilterStore";
import {useActiveFiltersStore} from "@/store/activeFiltersStore";

const filterStore = useFilterStore()
const activeFiltersStore = useActiveFiltersStore()
const handleUrlQueryFilters = (queryParams: LocationQuery) => {
    if (queryParams) {
        // activeFiltersStore.$reset()
        //------ Text Filters -------
        if (FilterKeys.FILTER_TEXT in queryParams && queryParams.filterText && String(queryParams.filterText).length > 0) {
            filterStore.SET_FILTER_TEXT(String(queryParams.filterText))
        }
        //---------------------------

        // ------ Map Filters -------
        if (FilterKeys.MAP_TIER in queryParams && queryParams.mapTier) {
            filterStore.SET_INCLUDE_MAP_TIER(true)
            const split = queryParams.mapTier.toString().split(',');
            filterStore.SET_MAP_TIER([Number(split[0]), Number(split[1])])
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.MAP_TIER)
        }
        if (FilterKeys.OPENNESS in queryParams && queryParams.openness) {
            filterStore.SET_INCLUDE_OPENNESS(true)
            const split = queryParams.openness.toString().split(',');
            filterStore.SET_OPENNESS([Number(split[0]), Number(split[1])])
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.OPENNESS)
        }
        if (FilterKeys.TRAVERSABILITY in queryParams && queryParams.traversability) {
            filterStore.SET_INCLUDE_TRAVERSABILITY(true)
            const split = queryParams.traversability.toString().split(',');
            filterStore.SET_TRAVERSABILITY([Number(split[0]), Number(split[1])])
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.TRAVERSABILITY)
        }
        if (FilterKeys.BACKTRACK_FACTOR in queryParams && queryParams.backtrackFactor) {
            filterStore.SET_INCLUDE_BACKTRACK_FACTOR(true)
            const split = queryParams.backtrackFactor.toString().split(',');
            filterStore.SET_BACKTRACK_FACTOR([Number(split[0]), Number(split[1])])
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.BACKTRACK_FACTOR)
        }
        if (FilterKeys.LINEARITY in queryParams && queryParams.linearity) {
            filterStore.SET_INCLUDE_LINEARITY(true)
            const split = queryParams.linearity.toString().split(',');
            filterStore.SET_LINEARITY([Number(split[0]), Number(split[1])])
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.LINEARITY)
        }
        if (FilterKeys.TERRAIN_SLOTS in queryParams && queryParams.terrainSlots) {
            filterStore.SET_INCLUDE_TERRAIN_SLOTS(true)
            const split = queryParams.terrainSlots.toString().split(',');
            filterStore.SET_TERRAIN_SLOTS([Number(split[0]), Number(split[1])])
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.TERRAIN_SLOTS)
        }
        if (FilterKeys.BASE_MOB_COUNT in queryParams && queryParams.baseMobCount) {
            filterStore.SET_INCLUDE_BASE_MOB_COUNT(true)
            const split = queryParams.baseMobCount.toString().split(',');
            filterStore.SET_BASE_MOB_COUNT([Number(split[0]), Number(split[1])])
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.BASE_MOB_COUNT)
        }
        if (FilterKeys.RUSHABLE_BOSS in queryParams && queryParams.rushableBoss) {
            filterStore.SET_RUSHABLE_BOSS(Boolean(queryParams.rushableBoss))
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_MAP_FILTERS(FilterKeys.RUSHABLE_BOSS)
        }
        //--------------------------

        //------ Boss Filters ------
        if (FilterKeys.NUMBER_OF_BOSSES in queryParams && queryParams.numberOfBosses) {
            filterStore.SET_INCLUDE_NUMBER_OF_BOSSES(true)
            const split = queryParams.numberOfBosses.toString().split(',');
            filterStore.SET_NUMBER_OF_BOSSES([Number(split[0]), Number(split[1])])
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.NUMBER_OF_BOSSES)
        }
        if (FilterKeys.EXCLUDE_PHASED_BOSSES in queryParams && queryParams.excludePhasedBosses) {
            filterStore.SET_EXCLUDE_PHASED_BOSSES(Boolean(queryParams.excludePhasedBosses))
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.EXCLUDE_PHASED_BOSSES)
        }
        if (FilterKeys.INCLUDE_SKIPPABLE_PHASES in queryParams && queryParams.includeSkippablePhases) {
            filterStore.SET_INCLUDE_SKIPPABLE_PHASES(Boolean(queryParams.includeSkippablePhases))
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SKIPPABLE_PHASES)
        }
        if (FilterKeys.INCLUDE_SPAWN_INTRO in queryParams && queryParams.includeSpawnIntro) {
            filterStore.SET_INCLUDE_SPAWN_INTRO(Boolean(queryParams.includeSpawnIntro))
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.INCLUDE_SPAWN_INTRO)
        }
        if (FilterKeys.EXCLUDE_SPAWNED_BOSSES in queryParams && queryParams.excludeSpawnedBosses) {
            filterStore.SET_EXCLUDE_SPAWNED_BOSSES(Boolean(queryParams.excludeSpawnedBosses))
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_BOSS_FILTERS(FilterKeys.EXCLUDE_SPAWNED_BOSSES)
        }
        //---------------------------

        //- Divination Card Filters -
        if (FilterKeys.MIN_DIVINATION_CARD_PRICE in queryParams && queryParams.minDivinationCardPrice) {
            filterStore.SET_MINIMUM_DIVINATION_CARD_PRICE(Number(queryParams.minDivinationCardPrice))
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_DIVINATION_CARD_FILTERS(FilterKeys.MIN_DIVINATION_CARD_PRICE)
        }
        if (FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE in queryParams && queryParams.minEffectiveDivinationCardValue) {
            filterStore.SET_MINIMUM_EFFECTIVE_DIVINATION_CARD_VALUE(Number(queryParams.minEffectiveDivinationCardValue))
            activeFiltersStore.ADD_FILTER_TO_ACTIVE_DIVINATION_CARD_FILTERS(FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE)
        }
        //---------------------------
    }
}

export default handleUrlQueryFilters