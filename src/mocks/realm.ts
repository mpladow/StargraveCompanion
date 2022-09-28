import {BackgroundProps, StatModifierProps} from '../types/models';

export const BackgroundBiomorphMOCK: BackgroundProps = {
  _id: new Realm.BSON.ObjectID(),
  Name: 'Biomorph',
  Description: `When the old empires fell, so did their laws limiting 'genetic enhancement'. A few 
  scientists seized this opportunity to engage in radical experimentation. This in- 
  volved both the genetic manipulation of naturally born individuals and the creation 
  of wholly new 'tank-born' individuals. In either case, those that survived these 
  experiments often had unique abilities to control their own bodies, such as realign- 
  ing their skeletal structure, growing new limbs, changing their skin tones, or even 
  growing additional organs to deal with toxic substances or alien environments. Un- 
  fortunately, many biomorphs were also left psychically scarred by their modifi- 
  cations. While the worst of these tend to destroy themselves quickly, almost all 
  carry some form of phobia, psychosis, or other mental impairment. 
  Depending on the abilities of a biomorph, they tend to dress in loose, or very 
  stretchy outfits, or have specialized suits of armour made that take into account 
  their abilities. More than any other background, biomorphs tend to form inde- 
  pendent crews because they are on the run - either from those that created them or 
  want to do further experiments on them, or to escape the consequences of some 
  crime (often unintended)`,
  PermStatModifier: [
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Health',
      ModifierValue: 1,
      IsIncrement: true,
    } as StatModifierProps,
  ],
  OptionalModifiers: [
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Move',
      ModifierValue: 1,
      IsIncrement: true,
    } as StatModifierProps,
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Fight',
      ModifierValue: 1,
      IsIncrement: true,
    } as StatModifierProps,
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Shoot',
      ModifierValue: 1,
      IsIncrement: true,
    } as StatModifierProps,
  ],
  MinSelectedModsRequired: 2,
};

export const BackgroundCyborgMOCK: BackgroundProps = {
  _id: new Realm.BSON.ObjectID(),
  Name: 'Cyborg',
  Description: `A fusion of man and machine, cyborgs have been a constant, if rare, feature of 
  every war for the past several centuries. Specialist cyborgs have been created to ful- 
  fil nearly every military role including infiltration, stealth, reconnaissance, or just 
  straight-up combat. Despite their obvious advantages, cyborgs are rarely cost effec- 
  tive and thus were never produced in great numbers. 
  With the end of the Last War, many cyborgs attempted to 'retire', but most found 
  that it requires huge sums of money to keep their bodies working. For that reason, 
  many have gone into business for themselves, working as mercenaries, bounty 
  hunters, private investigators, or retrieval specialists. 
  Cyborgs vary greatly in appearance. Some are indistinguishable from humans, 
  some look like humans with obvious robotic parts, and a few look completely ro- 
  botic and only feature a human brain or nervous system.`,
  PermStatModifier: [
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Health',
      ModifierValue: 1,
      IsIncrement: true,
    } as StatModifierProps,
  ],
  OptionalModifiers: [
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Move',
      ModifierValue: 1,
      IsIncrement: true,
    } as StatModifierProps,
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Fight',
      ModifierValue: 1,
      IsIncrement: true,
    } as StatModifierProps,
    {
      _id: new Realm.BSON.ObjectID(),
      Stat: 'Shoot',
      ModifierValue: 1,
      IsIncrement: true,
    } as StatModifierProps,
  ],
  MinSelectedModsRequired: 2,
};
