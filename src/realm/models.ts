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
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    EquipmentId: {
        type: 'int',
        indexed: true
    },
    Name: 'string',
  },
};
export const Background: ObjectSchema = {
  name: 'Background',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    Name: 'string',
    PermStatModifier: {
      type: 'list',
      objectType: 'StatModifier',
    },
    SelectedModifiers: {
      type: 'list',
      objectType: 'StatModifier',
    },
  },
};
export const StatModifier: ObjectSchema = {
  name: 'StatModifier',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    Stat: 'string',
    ModifierValue: 'number',
    IsIncrement: 'boolean',
  },
};
export const Stat: ObjectSchema = {
  name: 'Stat',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    StatId: 'number',
    Name: 'string',
    Value: 'number',
    Order: 'number',
    Modifiers: {
      type: 'list',
      objectType: 'StatModifier',
    },
  },
};
export const Statline: ObjectSchema = {
  name: 'Stat',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    StatLineId: 'number',
    Name: 'string',
    Stats: {
      type: 'list',
      objectType: 'Stat',
    },
  },
};
export const Power: ObjectSchema = {
  name: 'Power',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    PowerId: {
      type: 'int',
      indexed: true,
    },
    Name: 'string',
    Description: 'string'
  },
};
export const CharacterSchema: ObjectSchema = {
  name: 'Character',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    Name: 'string',
    CharacterId: {
      type: 'int',
      indexed: true,
    },
    IsCaptain: 'boolean',
    Background: 'Background',
    Level: 'number',
    GearSlots: 'number',
    Equipment: {
      type: 'list',
      objectType: 'Equipment',
    },
    StatLine: 'Statline',
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
    Credits: 'number',
    Experience: 'number',
    Descriptions: 'string',
    Captain: 'Character?',
    FirstMate: 'Character?',
    Soldiers: {
      type: 'list',
      objectType: 'Soldier',
    },
    Specialists: {
      type: 'list',
      objectType: 'Specialist',
    },
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
