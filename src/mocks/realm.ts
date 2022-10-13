import {ModSource} from '../common/enums';
import {
  ActivationModifier,
  ArmourProps,
  BackgroundProps,
  EquipmentProps,
  PowerProps,
  StatModifierProps,
  WeaponProps,
} from '../types/models';
export const ArmourMOCK: ArmourProps[] = [
  {
    _id: new Realm.BSON.ObjectID(),
    Name: 'Light Armour',
    ArmourId: 1,
    GearSlots: 1,
  },
  {
    _id: new Realm.BSON.ObjectID(),
    Name: 'Heavy Armour',
    ArmourId: 2,
    GearSlots: 1,
    StatModifiers: [
      {
        _id: new Realm.BSON.ObjectID(),
        Stat: 'Move',
        ModifierValue: -1,
        Source: 'Armour',
      },
    ],
  },
  {
    _id: new Realm.BSON.ObjectID(),
    Name: 'Combat Armour',
    ArmourId: 3,
    GearSlots: 2,
    StatModifiers: [
      {
        _id: new Realm.BSON.ObjectID(),
        Stat: 'Move',
        ModifierValue: -1,
        Source: 'Armour',
      },
    ],
    SpecialRules:
      '50cr upkeep fee. Includes hand pistol, pistol, and filter mask.',
  },
];
export const WeaponsMOCK: WeaponProps[] = [
  {
    _id: new Realm.BSON.ObjectID(),
    Name: 'Knife',
    WeaponId: 1,
    GearSlots: 1,
    StatModifiers: [
      {
        _id: new Realm.BSON.ObjectID(),
        Stat: 'Fight',
        ModifierValue: -1,
        Source: 'Weapon',
      } as StatModifierProps,
    ],
  },
  {
    _id: new Realm.BSON.ObjectID(),
    Name: 'Hand Weapon',
    WeaponId: 2,
    GearSlots: 1,
  },
  {
    _id: new Realm.BSON.ObjectID(),
    Name: 'Pistol',
    WeaponId: 3,
    Range: '10',
    GearSlots: 1,
    StatModifiers: [
      {
        _id: new Realm.BSON.ObjectID(),
        Stat: 'Fight',
        ModifierValue: -1,
        Source: 'Weapon',
      } as StatModifierProps,
    ],
  },
  {
    _id: new Realm.BSON.ObjectID(),
    Name: 'Carbine',
    WeaponId: 4,
    Range: '24',
    GearSlots: 2,
  },
  {
    _id: new Realm.BSON.ObjectID(),
    Name: 'Unarmed',
    WeaponId: 5,

    GearSlots: 0,
    StatModifiers: [
      {
        _id: new Realm.BSON.ObjectID(),
        Stat: 'Fight',
        ModifierValue: -2,
        Source: 'Weapon',
      } as StatModifierProps,
    ],
  },
  {
    _id: new Realm.BSON.ObjectID(),
    Name: 'Shotgun',
    WeaponId: 6,
    GearSlots: 2,
    StatModifiers: [
      {
        _id: new Realm.BSON.ObjectID(),
        Stat: 'Damage',
        ModifierValue: +1,
        Source: 'Weapon',
      } as StatModifierProps,
    ],
  },
];

export const PowersMOCK: PowerProps[] = [
  {
    _id: new Realm.BSON.ObjectID(),
    PowerId: 1,
    Name: 'Adrenaline Surge',
    Description: `This figure immediately gains an additional action during this activation, and an additional action in their next activation as well.`,
    Activation: 12,
    Stress: 2,
    AdditionalInfo: 'Self Only',
    IsCorePower: false,
    // ActivationModifiers: [{} as ActivationModifier],
  },

  {
    _id: new Realm.BSON.ObjectID(),
    PowerId: 2,
    Name: 'Antigravity Projection',
    Description: `The target figure gains the Levitate attribute (page 156) for the rest of the game.`,
    Activation: 10,
    Stress: 0,
    AdditionalInfo: 'Line of Sight',
    IsCorePower: false,

    // ActivationModifiers: [],
  },
  {
    _id: new Realm.BSON.ObjectID(),
    PowerId: 3,
    Name: 'Armour Plates',
    Description: `The figure gains +2 Armour. This power may not be used if the figure is already wearing combat armour. This power can be used Out of Game (B), in which case the activating figure starts the game at -2 Damage to represent the Strain.`,
    Activation: 12,
    Stress: 2,
    AdditionalInfo: 'Self Only or Out of Game',
    IsCorePower: false,

  },
  {
    _id: new Realm.BSON.ObjectID(),
    PowerId: 8,
    Name: 'Camouflage',
    Description: `No figure may draw line of sight to this figure if it is more than 12” away. In addition, it gains +2 Fight when rolling against Shooting attacks from pistol, carbine, shotgun, or rapid-fire attacks. This power is cancelled if the figure becomes stunned.`,
    Activation: 10,
    Stress: 2,
    AdditionalInfo: 'Self Only',
    IsCorePower: false,

  },
  {
    _id: new Realm.BSON.ObjectID(),
    PowerId: 18,
    Name: 'Fling',
    Description: `This power can be used in two ways. The activator may use it while standing within 1” of a member of their crew, in which case they may immediately move that crewmember 6” in any direction, including up. However, the figure that was moved is immediately stunned. Alternatively, it can be used while in combat against a specific enemy figure. The target figure must make an immediate Fight Roll (TN16). If it fails, the activator may move the target figure up to 6” in any horizontal direction. The figure takes no Damage (unless there is another reason it would, such as falling), but is stunned. This power may not be used on any figure that has the Large attribute.`,
    Activation: 8,
    Stress: 1,
    AdditionalInfo: 'Self Only or Touch',
    IsCorePower: false,

  },
];
export const BackgroundBiomorphMOCK: BackgroundProps = {
  _id: new Realm.BSON.ObjectID(),
  Name: 'Biomorph',
  Description: `When the old empires fell, so did their laws limiting 'genetic enhancement'. A few scientists seized this opportunity to engage in radical experimentation. This involved both the genetic manipulation of naturally born individuals and the creation of wholly new 'tank-born' individuals. In either case, those that survived these experiments often had unique abilities to control their own bodies, such as realigning their skeletal structure, growing new limbs, changing their skin tones, or even growing additional organs to deal with toxic substances or alien environments. Unfortunately, many biomorphs were also left psychically scarred by their modifications. While the worst of these tend to destroy themselves quickly, almost all carry some form of phobia, psychosis, or other mental impairment. Depending on the abilities of a biomorph, they tend to dress in loose, or very stretchy outfits, or have specialized suits of armour made that take into account their abilities. More than any other background, biomorphs tend to form independent crews because they are on the run - either from those that created them or want to do further experiments on them, or to escape the consequences of some crime (often unintended)`,
  PermStatModifiers: [
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Health',
      ModifierValue: 1,
      Source: ModSource.Background.toString(),
    } as StatModifierProps,
  ],
  OptionalModifiers: [
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Move',
      ModifierValue: 1,
      Source: ModSource.OptionalBackgroundMod.toString(),
    } as StatModifierProps,
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Fight',
      ModifierValue: 1,
      Source: ModSource.OptionalBackgroundMod.toString(),
    } as StatModifierProps,
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Shoot',
      ModifierValue: 1,
      Source: ModSource.OptionalBackgroundMod.toString(),
    } as StatModifierProps,
  ],
  MinSelectedModsRequired: 2,
  DefaultPowers: [1, 2, 3, 8, 18],
};

export const BackgroundCyborgMOCK: BackgroundProps = {
  _id: new Realm.BSON.ObjectID(),
  Name: 'Cyborg',
  Description: `A fusion of man and machine, cyborgs have been a constant, if rare, feature of every war for the past several centuries. Specialist cyborgs have been created to ful- fil nearly every military role including infiltration, stealth, reconnaissance, or just 
  straight-up combat. Despite their obvious advantages, cyborgs are rarely cost effective and thus were never produced in great numbers. With the end of the Last War, many cyborgs attempted to 'retire', but most found 
  that it requires huge sums of money to keep their bodies working. For that reason, many have gone into business for themselves, working as mercenaries, bounty 
  hunters, private investigators, or retrieval specialists. 
  Cyborgs vary greatly in appearance. Some are indistinguishable from humans, 
  some look like humans with obvious robotic parts, and a few look completely ro- 
  botic and only feature a human brain or nervous system.`,
  PermStatModifiers: [
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Health',
      ModifierValue: 1,
      Source: ModSource.Background.toString(),
    } as StatModifierProps,
  ],
  OptionalModifiers: [
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Move',
      ModifierValue: 1,
      Source: ModSource.OptionalBackgroundMod.toString(),
    } as StatModifierProps,
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Fight',
      ModifierValue: 1,
      Source: ModSource.OptionalBackgroundMod.toString(),
    } as StatModifierProps,
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Shoot',
      ModifierValue: 1,
      Source: ModSource.OptionalBackgroundMod.toString(),
    } as StatModifierProps,
  ],
  MinSelectedModsRequired: 2,
  DefaultPowers: [8, 18],
};
