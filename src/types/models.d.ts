export interface BackgroundProps {
  _id: Realm.BSON.ObjectId;
  Name: string;
  Description: string;
  PermStatModifier: StatModifier[];
  OptionalModifiers: StatModifier[];
  MinSelectedModsRequired: number;
}
export interface StatModifierProps {
  _id: Realm.BSON.ObjectId;
  Stat: string;
  ModifierValue: number;
  IsIncrement: boolean;
}
