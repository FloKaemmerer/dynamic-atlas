import type {LocationQuery} from "vue-router";
import {FilterKeys} from "@/model/filterKeys";
import {useFilterStore} from "@/store/FilterStore";

const filterStore = useFilterStore()
const handleUrlQueryFilters = (queryParams: LocationQuery) => {
    if (queryParams) {
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
        }
        if (FilterKeys.OPENNESS in queryParams && queryParams.openness) {
            filterStore.SET_INCLUDE_OPENNESS(true)
            const split = queryParams.openness.toString().split(',');
            filterStore.SET_OPENNESS([Number(split[0]), Number(split[1])])
        }
        if (FilterKeys.TRAVERSABILITY in queryParams && queryParams.traversability) {
            filterStore.SET_INCLUDE_TRAVERSABILITY(true)
            const split = queryParams.traversability.toString().split(',');
            filterStore.SET_TRAVERSABILITY([Number(split[0]), Number(split[1])])
        }
        if (FilterKeys.BACKTRACK_FACTOR in queryParams && queryParams.backtrackFactor) {
            filterStore.SET_INCLUDE_BACKTRACK_FACTOR(true)
            const split = queryParams.backtrackFactor.toString().split(',');
            filterStore.SET_BACKTRACK_FACTOR([Number(split[0]), Number(split[1])])
        }
        if (FilterKeys.LINEARITY in queryParams && queryParams.linearity) {
            filterStore.SET_INCLUDE_LINEARITY(true)
            const split = queryParams.linearity.toString().split(',');
            filterStore.SET_LINEARITY([Number(split[0]), Number(split[1])])
        }
        if (FilterKeys.BASE_MOB_COUNT in queryParams && queryParams.baseMobCount) {
            filterStore.SET_INCLUDE_BASE_MOB_COUNT(true)
            const split = queryParams.baseMobCount.toString().split(',');
            filterStore.SET_BASE_MOB_COUNT([Number(split[0]), Number(split[1])])
        }
        if (FilterKeys.RUSHABLE_BOSS in queryParams && queryParams.rushableBoss) {
            filterStore.SET_RUSHABLE_BOSS(Boolean(queryParams.rushableBoss))
        }
        //--------------------------

        //------ Boss Filters ------
        if (FilterKeys.NUMBER_OF_BOSSES in queryParams && queryParams.numberOfBosses) {
            filterStore.SET_INCLUDE_NUMBER_OF_BOSSES(true)
            const split = queryParams.numberOfBosses.toString().split(',');
            filterStore.SET_NUMBER_OF_BOSSES([Number(split[0]), Number(split[1])])
        }
        if (FilterKeys.EXCLUDE_PHASED_BOSSES in queryParams && queryParams.excludePhasedBosses) {
            filterStore.SET_EXCLUDE_PHASED_BOSSES(Boolean(queryParams.excludePhasedBosses))
        }
        if (FilterKeys.INCLUDE_SKIPPABLE_PHASES in queryParams && queryParams.includeSkippablePhases) {
            filterStore.SET_INCLUDE_SKIPPABLE_PHASES(Boolean(queryParams.includeSkippablePhases))
        }
        if (FilterKeys.INCLUDE_SPAWN_INTRO in queryParams && queryParams.includeSpawnIntro) {
            filterStore.SET_INCLUDE_SPAWN_INTRO(Boolean(queryParams.includeSpawnIntro))
        }
        if (FilterKeys.EXCLUDE_SPAWNED_BOSSES in queryParams && queryParams.excludeSpawnedBosses) {
            filterStore.SET_EXCLUDE_SPAWNED_BOSSES(Boolean(queryParams.excludeSpawnedBosses))
        }
        //---------------------------

        //- Divination Card Filters -
        if (FilterKeys.MIN_DIVINATION_CARD_PRICE in queryParams && queryParams.minDivinationCardPrice) {
            filterStore.SET_MINIMUM_DIVINATION_CARD_PRICE(Number(queryParams.minDivinationCardPrice))
        }
        if (FilterKeys.MIN_EFFECTIVE_DIVINATION_CARD_VALUE in queryParams && queryParams.minEffectiveDivinationCardValue) {
            filterStore.SET_MINIMUM_EFFECTIVE_DIVINATION_CARD_VALUE(Number(queryParams.minEffectiveDivinationCardValue))
        }
        //---------------------------
    }
}

export default handleUrlQueryFilters