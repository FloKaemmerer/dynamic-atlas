import {useAtlasNodeStore} from "@/store/AtlasNodeStore";
import type {AtlasNode} from "@/model/atlasNode";


export const handleSearch = (searchText: string,
                             excludePhasedBosses: boolean,
                             numberOfBosses: number[],
                             minDivinationCardValue: number,
                             layout: number[],
                             traversability: number[]) => {
    const atlasNodeStore = useAtlasNodeStore();
    let result = [] as AtlasNode[]
    if (searchText || numberOfBosses[0] > -1 || excludePhasedBosses || minDivinationCardValue > 0 || layout[0] > -1 || traversability[0] > -1) {
        result = atlasNodeStore.atlasNodes.filter(value => value.active)

        //Filter by search Text
        if (searchText) {
            const regExp = new RegExp(searchText.toLowerCase());

            result = result.filter(atlasNode =>
                atlasNode.filterTags.some(e => regExp.test(e)))
            console.log("Filter by SearchText FilterTags:\n Name="+result.map(value => value.name) +", FitlerTags=" +result.map(value => value.filterTags)+"\n")
        }

        // Filter by Number of Bosses
        if (numberOfBosses[0] > -1) {
            result = result.filter(atlasNode => {
                return numberOfBosses[0] <= atlasNode.numberOfBosses && atlasNode.numberOfBosses <= numberOfBosses[1]
            })
            console.log("Filter By Number of Bosses: \n Name="+result.map(value => value.name) +", NumberOfBosses=" +result.map(value => value.numberOfBosses)+"\n" )
        }

        // Filter by phased Bosses
        if (excludePhasedBosses) {
            result = result.filter(atlasNode => {
                return !atlasNode.phasedBoss
            })
            console.log("Filter By Phased Boss: \n Name="+result.map(value => value.name) +", PhasedBoss=" +result.map(value => value.phasedBoss)+"\n" )
        }

        // Filter by Divination Card Value
        if (minDivinationCardValue > 0) {
            result = result.filter(atlasNode => {
                return atlasNode.highestValueDivinationCard.chaosValue && atlasNode.highestValueDivinationCard.chaosValue >= minDivinationCardValue
            })
            console.log("Filter By Divination Card Value: \n Name="+result.map(value => value.name) +", DivinationCardValue=" +result.map(value => value.highestValueDivinationCard.chaosValue)+"\n" )
        }

        // Filter by Layout
        if (layout[0] > -1) {
            result = result.filter(atlasNode => {
                return layout[0] <= atlasNode.layout && atlasNode.layout <= layout[1]
            })
            console.log("Filter By Layout: \n Name="+result.map(value => value.name) +", Layout=" +result.map(value => value.layout)+"\n" )
        }

        // Filter by traversability
        if (traversability[0] > -1) {
            result = result.filter(atlasNode => {
                console.log("Traversability: " + atlasNode.traversability + ", Min Number: " + traversability[0] + ", Max Number: " + traversability[1])
                return traversability[0] <= atlasNode.traversability && atlasNode.traversability <= traversability[1]
            })
            console.log("Filter By Traversability: \n Name="+result.map(value => value.name) +", Traversability=" +result.map(value => value.traversability)+"\n" )
        }
    }
    atlasNodeStore.SET_FILTERED_ATLAS_NODE_IDS(result)
}