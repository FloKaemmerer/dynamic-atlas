import {defineStore} from "pinia";


interface State {
    drawer: boolean
}

export const useFilterDrawerStore = defineStore("filter-drawer", {
    state: (): State => ({
        drawer: true
    }),

    actions: {
        SET_DRAWER(drawer: boolean) {
            this.drawer = drawer;
        }
    }
})