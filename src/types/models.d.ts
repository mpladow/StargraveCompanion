import {Stats} from '../common/enums';

export interface ActivationModifier {
  _id: Realm.BSON.ObjectId;
  ModifierValue: number;
  Source: 'string';
}
export interface BackgroundProps {
  _id: Realm.BSON.ObjectId;
  Name: string;
  Description: string;
  PermStatModifiers: StatModifierProps[];
  OptionalModifiers: StatModifierProps[];
  MinSelectedModsRequired: number;
  DefaultPowers: number[];
}
export interface StatModifierProps {
  _id: Realm.BSON.ObjectId;
  Stat: string;
  ModifierValue: number;
  Source: string;
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
  StatLine: StatLineProps;
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
  WeaponId: number;
  Description?: string;
  Range?: string,
  SpecialRules?: string;
  StatModifiers?: StatModifierProps[];
  GearSlots: number?;
}
export interface ArmourProps {
  _id: Realm.BSON.ObjectId;
  Name: string;
  ArmourId: number;
  Description?: string;
  SpecialRules?: string;
  StatModifiers?: StatModifierProps[];
  GearSlots: number?;
}

export interface StatlineProps {
  _id: Realm.BSON.ObjectId;
  Stats: StatProps[];
  StatModifiers: StatModifierProps[];
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
  AdditionalInfo?: string?;
  ActivationModifiers?: ActivationModifier[];
  IsCorePower: boolean;
}
