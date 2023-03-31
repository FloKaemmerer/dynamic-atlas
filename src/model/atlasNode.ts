export class AtlasNode {
    ID: string
    Linked: string
    MapTier: string
    LocX: string
    LocY: string
    Name: string
    Unique: boolean
    DivinationCards: string[]
    Layout: number
    FilterTags: string[]
    Traversability: number
    NumberOfBosses: number
    AdditionalTags: string[]


    constructor(ID: string, Linked: string, MapTier: string, LocX: string, LocY: string, Name: string, Unique: boolean, DivinationCards: string[], Layout: number, FilterTags: string[], Traversability: number, NumberOfBosses: number, AdditionalTags: string[]) {
        this.ID = ID;
        this.Linked = Linked;
        this.MapTier = MapTier;
        this.LocX = LocX;
        this.LocY = LocY;
        this.Name = Name;
        this.Unique = Unique;
        this.DivinationCards = DivinationCards;
        this.Layout = Layout;
        this.FilterTags = FilterTags;
        this.Traversability = Traversability;
        this.NumberOfBosses = NumberOfBosses;
        this.AdditionalTags = AdditionalTags;
    }
}