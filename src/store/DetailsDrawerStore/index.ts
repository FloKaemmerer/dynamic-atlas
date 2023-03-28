import { defineStore } from "pinia";


interface State {
    drawer: boolean
}

export const useDetailsDrawerStore = defineStore("details-drawer",{
    state: (): State => ({
        drawer: false
    }),

    actions: {
        SET_DRAWER(drawer: boolean){
            this.drawer = drawer;
        }
    }
})