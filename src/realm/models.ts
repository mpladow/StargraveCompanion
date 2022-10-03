import {ObjectSchema} from 'realm';

export const ActivationModifierSchema: Object = {
  name: 'ActivationModifier',
  embeded: true,
  properties: {
    _id: 'objectId',
    ModifierValue: 'int',
    Source: 'string'
  }
}

export const BackgroundSchema: ObjectSchema = {
  name: 'Background',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    Name: 'string',
    Description: 'string',
    PermStatModifiers: {
      type: 'list',
      objectType: 'StatModifier',
    },
    OptionalModifiers: {
      type: 'list',
      objectType: 'StatModifier',
    },
    MinSelectedModsRequired: 'int',
    DefaultPowers: {
      type: 'list',
      objectType: 'int'
    }
  },
};
export const CharacterSchema: ObjectSchema = {
  name: 'Character',
  embedded: true,
  properties: {
    _id: 'objectId',
    Name: 'string',
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
    SpecialistSlots: 'int'
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
export const EquipmentSchema: ObjectSchema = {
  name: 'Equipment',
  properties: {
    _id: 'objectId',
    EquipmentId: {
      type: 'int',
      indexed: true,
    },
    Name: 'string',
    Description: 'string',
    SpecialRules:'string?',
    GearSlots: 'int?'
  },
};

export const WeaponSchema: ObjectSchema = {
  name: 'Weapon',
  properties: {
    _id: 'objectId',
    EquipmentId: {
      type: 'int',
      indexed: true,
    },
    Name: 'string',
    Description: 'string',
    Range:'string?',
    SpecialRules:'string?',
    StatModifiers: {
      type: 'list',
      objectType: 'StatModifer'
    },
    GearSlots: 'int?'
  },
}
export const ArmourSchema: ObjectSchema = {
  name: 'Armour',
  properties: {
    _id: 'objectId',
    EquipmentId: {
      type: 'int',
      indexed: true,
    },
    Name: 'string',
    Description: 'string',
    SpecialRules:'string?',
    StatModifiers: {
      type: 'list',
      objectType: 'StatModifer'
    },
    GearSlots: 'int?'
  },
}


export const StatModifierSchema: ObjectSchema = {
  name: 'StatModifier',
  embedded: true,
  properties: {
    _id: 'objectId',
    Stat: 'string',
    ModifierValue: 'int',
    Source: 'string'
  },
};
export const StatSchema: ObjectSchema = {
  name: 'Stat',
  properties: {
    _id: 'objectId',
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
    Stats: {
      type: 'list',
      objectType: 'Stat',
    },
    StatModifiers: {
      type: 'list',
      objectType: 'StatModifier'
    }
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
    Activation: 'int',
    Stress: 'int',
    AdditionalInfo: 'string?',
    ActivationModifiers: {
      type: 'list',
      objectType: 'ActivationModifier'
    }
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
    Teams: {
      type: 'list',
      objectType: 'Team',
    },
  },
};
