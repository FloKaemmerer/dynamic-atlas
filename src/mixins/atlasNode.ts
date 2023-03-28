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

    getIdAsNumber(): number {
        return Number(this.ID)
    }

    getMapTierAsNumber(): number{
        return Number(this.MapTier)
    }

    getLocXAsNumber(): number{
        return Number(this.LocX)
    }

    getLocYAsNumber(): number {
        return Number(this.LocY)
    }

    getLinkedAsNumberArray(): Array<number> {
        let linkedNodes = new Array<number>
        var ids = this.Linked.replace(/[|/]/g,'')
        var splittedIds = ids.split(',')
        splittedIds.forEach(s => linkedNodes.push(Number(s)))
        return linkedNodes;
    }

    getLinkedList(): Array<string> {
        let linkedNodes = new Array<string>
        var ids = this.Linked.replace(/[|/]/g,'')
        var splittedIds = ids.split(',')
        splittedIds.forEach(s => linkedNodes.push(s))
        return linkedNodes;
    }
}