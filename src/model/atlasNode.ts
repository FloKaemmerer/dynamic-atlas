export class AtlasNode{
    ID!: string
    Linked!: string
    MapTier!: string
    LocX!: string
    LocY!: string
    Name!: string
    Unique!: boolean

    constructor(ID: string, Linked: string, MapTier: string, LocX: string, LocY: string, Name: string, Unique: boolean){
            this.ID = ID;
            this.Linked = Linked;
            this.MapTier = MapTier;
            this.LocX = LocX;
            this.LocY = LocY;
            this.Name = Name;
            this.Unique = Unique;
        }
}