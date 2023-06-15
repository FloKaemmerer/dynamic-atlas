import {defineStore} from "pinia";


interface State {
    numberOfSocketedVoidStones: number
}

export const useVoidStoneStore = defineStore("void-stones", {
    state: (): State => ({
        numberOfSocketedVoidStones: 0
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
        }
    }
})