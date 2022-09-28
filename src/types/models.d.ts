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
export interface TeamProps {
  _id: Realm.BSON.ObjectId;
  TeamName: string;
  Credits: number;
  Experience: number;
  Description?: string?,
  // Captain: 'Character',
  // FirstMate: 'Character?',
}
