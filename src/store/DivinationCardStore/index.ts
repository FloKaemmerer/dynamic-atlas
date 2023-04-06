import {defineStore} from "pinia";
import type { DivinationCard } from "@/model/divinationCard";

interface State {
    divinationCards: DivinationCard[];

    divinationCard: DivinationCard | null;
}

export const useDivinationCardStore = defineStore("divination-card", {
    state: (): State => ({
        divinationCards: [],
        divinationCard: null,
    }),
    actions:{

    }
});