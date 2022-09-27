export interface Background {
    _id: Realm.BSON.ObjectId,
    Name: string,
    PermStatModifier: StatModifier[],
    OptionalModifiers: StatModifier[],
    MinSelectedModsRequired: number
}
export interface StatModifier {
    _id: Realm.BSON.ObjectId,
    Stat: string,
    ModifierValue: number,
    IsIncrement: boolean,
}