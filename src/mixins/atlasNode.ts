export class AtlasNode{
    ID: string
    Linked: string
    MapTier: string
    LocX: string
    LocY: string
    Name: string
    Unique: boolean

    constructor(ID: string, Linked: string, MapTier: string, LocX: string, LocY: string, Name: string, Unique: boolean){
            this.ID = ID;
            this.Linked = Linked;
            this.MapTier = MapTier;
            this.LocX = LocX;
            this.LocY = LocY;
            this.Name = Name;
            this.Unique = Unique;
        }

    getLinkedList(): Array<string> {
        const linkedNodes = new Array<string>()
        const ids = this.Linked.replace(/[|/]/g,'')
        const splittedIds = ids.split(',')
        splittedIds.forEach(s => linkedNodes.push(s))
        return linkedNodes;
    }
}