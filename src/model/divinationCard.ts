import type {ExplicitModifier} from "@/model/explicitModifier";

export interface DivinationCard {
    name: string

    chaosValue: number

    exaltedValue: number

    divineValue: number

    bossOnly: boolean

    stackSize: number

    flavourText: string

    explicitModifiers: ExplicitModifier[]

    artFilename: string
}