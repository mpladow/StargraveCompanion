import {ObjectSchema} from 'realm';

export const EquipmentSchema: ObjectSchema = {
  name: 'Equipment',
  properties: {
    _id: 'objectId',
    EquipmentId: {
      type: 'int',
      indexed: true,
    },
    Name: 'string',
  },
};
export const BackgroundSchema: ObjectSchema = {
  name: 'Background',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    Name: 'string',
    Description: 'string',
    PermStatModifier: {
      type: 'list',
      objectType: 'StatModifier',
    },
    OptionalModifiers: {
      type: 'list',
      objectType: 'StatModifier',
    },
    MinSelectedModsRequired: 'int',
  },
};
export const StatModifierSchema: ObjectSchema = {
  name: 'StatModifier',
  embedded: true,
  properties: {
    _id: 'objectId',
    Stat: 'string',
    ModifierValue: 'int',
    IsIncrement: 'bool',
  },
};
export const StatSchema: ObjectSchema = {
  name: 'Stat',
  embedded: true,
  properties: {
    _id: 'objectId',
    StatId: 'int',
    Name: 'string',
    Value: 'int',
    Order: 'int',
    Modifiers: {
      type: 'list',
      objectType: 'StatModifier',
    },
  },
};
export const StatlineSchema: ObjectSchema = {
  name: 'StatLine',
  properties: {
    _id: 'objectId',
    StatLineId: 'int',
    Name: 'string',
    Stats: {
      type: 'list',
      objectType: 'Stat',
    },
  },
};
export const PowerSchema: ObjectSchema = {
  name: 'Power',
  properties: {
    _id: 'objectId',
    PowerId: {
      type: 'int',
      indexed: true,
    },
    Name: 'string',
    Description: 'string',
  },
};
export const CharacterSchema: ObjectSchema = {
  name: 'Character',
  embedded: true,
  properties: {
    _id: 'objectId',
    Name: 'string',
    CharacterId: {
      type: 'int',
      indexed: true,
    },
    IsCaptain: 'bool',
    Background: 'Background',
    Level: 'int',
    GearSlots: 'int',
    Equipment: {
      type: 'list',
      objectType: 'Equipment',
    },
    StatLine: 'StatLine',
    Powers: {
      type: 'list',
      objectType: 'Power',
    },
  },
};
export const TeamSchema: ObjectSchema = {
  name: 'Team',
  properties: {
    _id: 'objectId',
    TeamName: 'string',
    Credits: 'int',
    Experience: 'int',
    Description: 'string?',
    Captain: 'Character?',
    FirstMate: 'Character?',
    // Soldiers: {
    //   type: 'list',
    //   objectType: 'SoldierSchema',
    // },
    // Specialists: {
    //   type: 'list',
    //   objectType: 'SpecialistSchema',
    // },
  },
};
export const generateNewTeam = (name: string) => {
  return {
    _id: new Realm.BSON.ObjectId(),
    TeamName: name,
    Credits: 500,
    Experience: 0,
    Description: '',
  };
}

export const UsersSchema = {
  name: 'Users',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    UserId: {
      type: 'int',
      indexed: true,
    },
    FirstName: 'string',
    Surname: 'string',
    Teams: {
      type: 'list',
      objectType: 'Team',
    },
  },
};
