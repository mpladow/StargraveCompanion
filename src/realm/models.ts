import {ObjectSchema} from 'realm';

export const TasksSchema = {
  name: 'Task',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    Text: 'string',
    Status: 'string?',
  },
};
export const Equipment: ObjectSchema = {
  name: 'Equipment',
  embedded: true,
  properties: {
    _id: 'objectId',
    EquipmentId: {
      type: 'int',
      indexed: true,
    },
    Name: 'string',
  },
};
export const Background: ObjectSchema = {
  name: 'Background',
  primaryKey: '_id',
  // embedded: true,
  properties: {
    _id: 'objectId',
    Name: 'string',
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
export const StatModifier: ObjectSchema = {
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
  embedded: true,
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
export const Power: ObjectSchema = {
  name: 'Power',
  embedded: true,
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
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    TeamId: {
      type: 'int',
      indexed: true,
    },
    TeamName: 'string',
    Credits: 'int',
    Experience: 'int',
    Descriptions: 'string',
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
  },
};
