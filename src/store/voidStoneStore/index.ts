import {defineStore} from "pinia";
// @ts-ignore
import voidStones from "@/assets/atlas/voidstones/voidstones.json";
import type {Voidstone} from "@/model/voidstone";


interface State {
    voidstones: Voidstone[],
    numberOfSocketedVoidStones: number,
}

export const useVoidStoneStore = defineStore("void-stones", {
    state: (): State => ({
        voidstones: [],
        numberOfSocketedVoidStones: 0,
    }),

    actions: {
        INCREASE_NUMBER_OF_SOCKETED_VOID_STONES() {
            if (this.numberOfSocketedVoidStones < 4) {
                this.numberOfSocketedVoidStones++
            }
        },

        DECREASE_NUMBER_OF_SOCKETED_VOID_STONES() {
            if (this.numberOfSocketedVoidStones > 0) {
                this.numberOfSocketedVoidStones--
            }
        },

        TOGGLE_VOIDSTONE(voidstone: Voidstone) {
            const getvoidstonebyid = this.GET_VOID_STONE_BY_ID(voidstone.id);
            if (getvoidstonebyid) {
                getvoidstonebyid.active = !getvoidstonebyid.active
                if (getvoidstonebyid.active) {
                    this.INCREASE_NUMBER_OF_SOCKETED_VOID_STONES()
                } else {
                    this.DECREASE_NUMBER_OF_SOCKETED_VOID_STONES()
                }
            }
        },

        GET_VOID_STONE_BY_ID(id: string): Voidstone | undefined {
            return this.voidstones.find(value => value.id == id)
        },

        async setupVoidstoneData() {

            console.log("setting up Voidstone Data")

            voidStones.forEach(voidStoneElement => {
                const voidstone = voidStoneElement as Voidstone
                this.voidstones.push(voidstone)
            })
        }
    }
})