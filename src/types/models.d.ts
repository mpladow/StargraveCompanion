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
  Description?: string?;
  Captain: CharacterProps?;
  FirstMate: CharacterProps?;
  SpecialistSlots: number;
}

export interface CharacterProps {
  _id: Realm.BSON.ObjectId;
  Name: string;
  IsCaptain: boolean;
  Background: BackgroundProps;
  Level: number;
  GearSlots: number;
  Equipment: EquipmentProps[];
  StatLine: StatLineProps[];
  Powers: PowerProps[];
}

export interface EquipmentProps {
  _id: Realm.BSON.ObjectId;
  Name: string;
  Description: string;
  SpecialRules?: string;
  GearSlots: number?;
}
export interface WeaponProps {
  _id: Realm.BSON.ObjectId;
  Name: string;
  Description: string;
  SpecialRules?: string;
  StatModifiers?: StatModifierProps[];
  GearSlots: number?;
}
export interface ArmourProps {
  _id: Realm.BSON.ObjectId;
  Name: string;
  Description: string;
  SpecialRules?: string;
  StatModifiers?: StatModifierProps[];
  GearSlots: number?;
}

export interface StatlineProps {
  _id: Realm.BSON.ObjectId;
  Name: string;
  Stats: StatProps[];

}

export interface StatProps {
  _id: Realm.BSON.ObjectId;
  Name: string;
  Value: number;
  Order: number;
}
export interface PowerProps {
  _id: Realm.BSON.ObjectId;
  PowerId: number;
  Name: string;
  Description: string;
  Activation: number;
  Stress: number;
}
