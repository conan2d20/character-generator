import { HomeLand } from './homelands';
import { Skill, SkillsHelper } from './skills';
import { Source } from './sources';

export enum ItemType {
  Weapon,
  Armor,
  Shield,
  Other,
}

export enum ArmorType {
  HeavyClothing,
  LightArmor,
  HeavyArmor,
  VeryHeavyArmor,
}

export enum WeaponType {
  Sword,
  Knife,
  Cudgel,
  Axe,
  Flexible,
  Polearm,
  Missile,
  Hidden,
  Exotic,
}

export enum WeaponSize {
  None,
  OneHanded,
  TwoHanded,
  Unbalanced,
  Unwieldy,
}

export interface IArmorProperties {
  armorType: ArmorType;
  head: number;
  arms: number;
  torso: number;
  legs: number;
  qualities: string[];
}

export interface IWeaponProperties {
  weaponType: WeaponType;
  qualities: string[];
  range: string;
  size: WeaponSize;
  damage: number;
}

class Item {
  listName: string;
  sheetName: string;
  type: ItemType;
  properties: any;

  constructor(listName: string, sheetName: string, type: ItemType, properties: any) {
    this.listName = listName;
    this.sheetName = sheetName;
    this.type = type;
    this.properties = properties;
  }
}

export class Equipment {
  private _armor: Item[] = [
    new Item('Helmet (Armor 3: Head; Heavy)', 'Helmet', ItemType.Armor, {
      head: 3,
      arms: 0,
      torso: 0,
      legs: 0,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Heavy'],
    }),
    new Item('Coif (Armor 3: Head; Heavy)', 'Coif', ItemType.Armor, {
      head: 3,
      arms: 0,
      torso: 0,
      legs: 0,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Heavy'],
    }),
    new Item(
      'Padded gambeson and trousers (Armor 1: Torso/Arms/Legs)',
      'Padded gambeson and trousers',
      ItemType.Armor,
      {
        head: 0,
        arms: 1,
        torso: 1,
        legs: 1,
        armorType: ArmorType.HeavyClothing,
        qualities: [''],
      }
    ),
    new Item('Mail vest (Armor 3: Torso; Noisy)', 'Mail vest', ItemType.Armor, {
      head: 0,
      arms: 0,
      torso: 3,
      legs: 0,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Noisy'],
    }),
    new Item('Brigandine vest and trousers (Armor 2: Torso/Legs)', 'Brigandine vest and trousers', ItemType.Armor, {
      head: 0,
      arms: 0,
      torso: 2,
      legs: 2,
      armorType: ArmorType.LightArmor,
      qualities: [''],
    }),
    new Item('Full suit of brigandine (Armor 2: Torso/Arms/Legs)', 'Full suit of brigandine', ItemType.Armor, {
      head: 0,
      arms: 2,
      torso: 2,
      legs: 2,
      armorType: ArmorType.LightArmor,
      qualities: [''],
    }),
    new Item(
      'Mail vest (Armor 3: Torso; Noisy) and a helmet (Armor 3: Head; Heavy)',
      'Mail vest and helmet',
      ItemType.Armor,
      {
        head: 3,
        arms: 0,
        torso: 3,
        legs: 0,
        armorType: ArmorType.HeavyArmor,
        qualities: ['Noisy', 'Heavy'],
      }
    ),
    new Item('Ragged furs (Armor 1: Torso/Arms/Legs)', 'Ragged furs', ItemType.Armor, {
      head: 0,
      arms: 1,
      torso: 1,
      legs: 1,
      armorType: ArmorType.HeavyClothing,
      qualities: [''],
    }),
    new Item('Suit of mail armor (Armor 3: all locations; Noisy)', 'Suit of mail armor', ItemType.Armor, {
      head: 3,
      arms: 3,
      torso: 3,
      legs: 3,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Noisy'],
    }),
    new Item(
      'Brigandine long coat (Armor 2: Torso/Arms/Legs) with helmet (Armor 3: Head; Heavy)',
      'Brigandine long coat with helmet',
      ItemType.Armor,
      {
        head: 3,
        arms: 2,
        torso: 2,
        legs: 2,
        armorType: ArmorType.LightArmor,
        qualities: [''],
      }
    ),
    new Item('Heavy clothing (Armor 1: Torso/Arms/Legs)', 'Heavy clothing', ItemType.Armor, {
      head: 0,
      arms: 1,
      torso: 1,
      legs: 1,
      armorType: ArmorType.HeavyClothing,
      qualities: [''],
    }),
    new Item('Mail shirt (Armor 3: Torso/Arms; Noisy)', 'Mail shirt', ItemType.Armor, {
      head: 0,
      arms: 3,
      torso: 3,
      legs: 0,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Noisy'],
    }),
    new Item('Padded jerkin (Armor 1: Torso/Arms)', 'Padded jerkin', ItemType.Armor, {
      head: 0,
      arms: 1,
      torso: 1,
      legs: 0,
      armorType: ArmorType.HeavyClothing,
      qualities: [''],
    }),
    new Item('Padded tunic (Armor 1: Torso/Arms)', 'Padded tunic', ItemType.Armor, {
      head: 0,
      arms: 1,
      torso: 1,
      legs: 0,
      armorType: ArmorType.HeavyClothing,
      qualities: [''],
    }),
    new Item('Brigandine jacket (Armor 2: Torso/Arms)', 'Brigandine jacket', ItemType.Armor, {
      head: 0,
      arms: 2,
      torso: 2,
      legs: 0,
      armorType: ArmorType.LightArmor,
      qualities: [''],
    }),
    new Item('Toughened leather jacket (Armor 1: Torso/Arms)', 'Toughened leather jacket', ItemType.Armor, {
      head: 0,
      arms: 1,
      torso: 1,
      legs: 0,
      armorType: ArmorType.LightArmor,
      qualities: [''],
    }),
    new Item('Heavy cape (Armor 1: Torso/Legs)', 'Heavy cape', ItemType.Armor, {
      head: 0,
      arms: 0,
      torso: 1,
      legs: 1,
      armorType: ArmorType.HeavyClothing,
      qualities: [''],
    }),
    new Item(
      'Heavy clothing and brigandine vest (Armor 3: Torso)',
      'Heavy clothing and brigandine vest',
      ItemType.Armor,
      {
        head: 0,
        arms: 0,
        torso: 3,
        legs: 0,
        armorType: ArmorType.LightArmor,
        qualities: [''],
      }
    ),
    new Item(
      'Warm hooded cloak and leather cloaks and furs (Armor: 1; Torso/Arms/Legs)',
      'Warm hooded cloak and leather cloaks and furs',
      ItemType.Armor,
      {
        head: 0,
        arms: 1,
        torso: 1,
        legs: 1,
        armorType: ArmorType.LightArmor,
        qualities: [''],
      }
    ),
    new Item('Scale hauberk with helm (Armor 3: Torso/Head)', 'Scale hauberk with helm', ItemType.Armor, {
      head: 3,
      arms: 0,
      torso: 3,
      legs: 0,
      armorType: ArmorType.HeavyArmor,
      qualities: [''],
    }),
    new Item('Mail coat and helmet (Armor 3: Arms/Torso/Legs/Head; Heavy)', 'Mail coat and helmet', ItemType.Armor, {
      head: 3,
      arms: 3,
      torso: 3,
      legs: 3,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Heavy'],
    }),
    new Item('Mail hauberk with coif (Armor 3: Head/Arms/Torso; Heavy)', 'Mail hauberk with coif', ItemType.Armor, {
      head: 3,
      arms: 3,
      torso: 3,
      legs: 0,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Heavy'],
    }),
    new Item(
      'Brigandine vest (Armor 2: Torso) and helmet (Armor 3: Head; Heavy)',
      'Brigandine vest and helmet',
      ItemType.Armor,
      {
        head: 3,
        arms: 0,
        torso: 2,
        legs: 0,
        armorType: ArmorType.LightArmor,
        qualities: ['Heavy'],
      }
    ),
    new Item('Heavy Hauberk (Armor 3: Torso/Arms/Legs; Heavy)', 'Heavy Hauberk', ItemType.Armor, {
      head: 0,
      arms: 3,
      torso: 3,
      legs: 3,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Heavy'],
    }),
    new Item('Heavy Coat (Armor 3: Torso/Arms/Legs; Noisy)', 'Heavy Coat', ItemType.Armor, {
      head: 0,
      arms: 3,
      torso: 3,
      legs: 3,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Heavy'],
    }),
    new Item('Heavy Vest (Armor 3: Torso; Heavy)', 'Heavy Vest', ItemType.Armor, {
      head: 0,
      arms: 0,
      torso: 3,
      legs: 0,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Heavy'],
    }),
    new Item('Heavy Shirt (Armor 3: Torso/Arms; Noisy)', 'Heavy Shirt', ItemType.Armor, {
      head: 0,
      arms: 3,
      torso: 3,
      legs: 0,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Noisy'],
    }),
    new Item('Heavy Sleeves (Armor 3: Arms; Noisy)', 'Heavy Sleeves', ItemType.Armor, {
      head: 0,
      arms: 3,
      torso: 0,
      legs: 0,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Noisy'],
    }),
    new Item('Heavy Leggings (Armor 3: Legs; Noisy)', 'Heavy Leggings', ItemType.Armor, {
      head: 0,
      arms: 0,
      torso: 0,
      legs: 3,
      armorType: ArmorType.HeavyArmor,
      qualities: ['Noisy'],
    }),
    new Item('Buff Coat (Armor 1: Torso/Arms)', 'Buff Coat', ItemType.Armor, {
      head: 0,
      arms: 1,
      torso: 1,
      legs: 0,
      armorType: ArmorType.HeavyClothing,
      qualities: [],
    }),
    new Item('Buckskins (Armor 1: Arms/Legs/Torso)', 'Buckskins', ItemType.Armor, {
      head: 0,
      arms: 1,
      torso: 1,
      legs: 1,
      armorType: ArmorType.LightArmor,
      qualities: [],
    }),
    new Item('Brigandine hauberk (Armor 2: Arms/Torso)', 'Brigandine hauberk', ItemType.Armor, {
      head: 0,
      arms: 2,
      torso: 2,
      legs: 0,
      armorType: ArmorType.LightArmor,
      qualities: [],
    }),
    new Item('Armored breastplate(Armor 4: Torso) and helmet(Armor 3: Head)', 'Armored breastplate', ItemType.Armor, {
      head: 3,
      arms: 0,
      torso: 4,
      legs: 0,
      armorType: ArmorType.HeavyArmor,
      qualities: [],
    }),
    new Item('Leather hauberk (Armor 2: Torso/Arms)', 'Leather hauberk', ItemType.Armor, {
      head: 0,
      arms: 2,
      torso: 2,
      legs: 0,
      armorType: ArmorType.LightArmor,
      qualities: [],
    }),
    new Item('Full suit of plate armor (Armor 4: all locations)', 'Full suit of plate armor', ItemType.Armor, {
      head: 4,
      arms: 4,
      torso: 4,
      legs: 4,
      armorType: ArmorType.HeavyArmor,
      qualities: [],
    }),
    new Item('Light battle harness (Armor 2: Torso; Armor: 1 Limbs)', 'Light battle harness', ItemType.Armor, {
      head: 0,
      arms: 1,
      torso: 2,
      legs: 1,
      armorType: ArmorType.LightArmor,
      qualities: ['Fragile'],
    }),
    new Item('Heavy battle harness (Armor 2: Torso/Limbs)', 'Heavy battle harness', ItemType.Armor, {
      head: 0,
      arms: 2,
      torso: 2,
      legs: 2,
      armorType: ArmorType.LightArmor,
      qualities: ['Fragile'],
    }),
    new Item('Sea Leather (Armor 2: Torso/Limbs)', 'Sea Leather', ItemType.Armor, {
      head: 0,
      arms: 2,
      torso: 2,
      legs: 2,
      armorType: ArmorType.LightArmor,
      qualities: [],
    }),
  ];

  private _weapons: Item[] = [
    new Item('Broadsword', 'Broadsword', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Parry'],
      range: '2',
      size: WeaponSize.Unbalanced,
      damage: 5,
    }),
    new Item('Cutlass', 'Cutlass', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Vic1'],
      range: '2',
      size: WeaponSize.Unbalanced,
      damage: 4,
    }),
    new Item('Scimitar', 'Scimitar', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Cav1', 'Parry'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Saber', 'Saber', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Cav1', 'Parry'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Shortsword', 'Shortsword', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Parry'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 4,
    }),
    new Item('Sword', 'Sword', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Parry'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 4,
    }),
    new Item('Tulwar', 'Tulwar', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Cav1', 'Parry'],
      range: '2',
      size: WeaponSize.Unbalanced,
      damage: 4,
    }),
    new Item('Two-handed sword', 'Two-handed sword', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Vic1'],
      range: '3',
      size: WeaponSize.TwoHanded,
      damage: 5,
    }),
    new Item('Dueling Sword', 'Dueling Sword', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Parry', 'Unf1'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Katar', 'Katar', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Parry', 'Unf1'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Dagger', 'Dagger', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid1', 'Parry', 'Thr', 'Unf1'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Dirk', 'Dirk', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid1', 'Parry', 'Thr', 'Unf1'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Poniard', 'Poniard', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid1', 'Parry', 'Thr', 'Unf1'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Knife', 'Knife', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid1', 'Imp', 'Unf1'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Rusty Knife', 'Rusty Knife', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid1', 'Imp', 'Unf1'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Primitive Knife', 'Primitive Knife', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid1', 'Imp', 'Unf1', 'Fragile'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 2,
    }),
    new Item('Bone Knife', 'Bone Knife', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid1', 'Imp', 'Fragile 2'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 2,
    }),
    new Item('Stone Knife', 'Stone Knife', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid 1', 'Imp 1', 'Fragile 1'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 2,
    }),
    new Item('Ghanata Knife', 'Ghanata Knife', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid1', 'Vic1'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Yuetshi Knife', 'Yuetshi Knife', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid1', 'Int'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Zhaibar Knife', 'Zhaibar Knife', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Unf2'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 4,
    }),
    new Item('Throwing Knife', 'Throwing Knife', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid1', 'Volley'],
      range: 'C',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Club', 'Club', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Stun', 'Knock'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Primitive Club', 'Primitive Club', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Stun', 'Knock', 'Fragile'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 2,
    }),
    new Item('Farming Flail', 'Farming Flail', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Imp', 'Knock', 'Pcng1'],
      range: '2',
      size: WeaponSize.TwoHanded,
      damage: 4,
    }),
    new Item('Military Flail', 'Military Flail', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Knock', 'Pcng1'],
      range: '2',
      size: WeaponSize.Unbalanced,
      damage: 4,
    }),
    new Item('Great Hammer', 'Great Hammer', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Imp', 'Knock', 'Stun'],
      range: '2',
      size: WeaponSize.TwoHanded,
      damage: 4,
    }),
    new Item('Mace', 'Mace', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Knock', 'Stun', 'Pcng1'],
      range: '2',
      size: WeaponSize.Unbalanced,
      damage: 3,
    }),
    new Item('Maul', 'Maul', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Knock', 'Stun'],
      range: '2',
      size: WeaponSize.TwoHanded,
      damage: 5,
    }),
    new Item('Morning Star', 'Morning Star', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Vic1'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item("Horseman's Pick", "Horseman's Pick", ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Vic1'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Pickaxe', 'Pickaxe', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Imp', 'Vic1'],
      range: '2',
      size: WeaponSize.TwoHanded,
      damage: 5,
    }),
    new Item('Sap', 'Sap', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Hid1', 'Stun', 'Unf1'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Sharpened Rock', 'Sharpened Rock', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: [''],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 0,
    }),
    new Item('Staff', 'Staff', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Knock'],
      range: '2/3',
      size: WeaponSize.TwoHanded,
      damage: 4,
    }),
    new Item('Warhammer', 'Warhammer', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Knock', 'Vic1'],
      range: '2',
      size: WeaponSize.Unbalanced,
      damage: 4,
    }),
    new Item('Throwing Axe', 'Throwing Axe', ItemType.Weapon, {
      weaponType: WeaponType.Axe,
      qualities: ['Thr', 'Vic1'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Wood Axe', 'Wood Axe', ItemType.Weapon, {
      weaponType: WeaponType.Axe,
      qualities: ['Int', 'Vic1'],
      range: '2',
      size: WeaponSize.TwoHanded,
      damage: 4,
    }),
    new Item('Battleaxe', 'Battleaxe', ItemType.Weapon, {
      weaponType: WeaponType.Axe,
      qualities: ['Int', 'Vic1'],
      range: '2',
      size: WeaponSize.Unbalanced,
      damage: 4,
    }),
    new Item('Hatchet', 'Hatchet', ItemType.Weapon, {
      weaponType: WeaponType.Axe,
      qualities: ['Vic1'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 4,
    }),
    new Item('Stone Axe', 'Stone Axe', ItemType.Weapon, {
      weaponType: WeaponType.Axe,
      qualities: ['Vicious 1', 'Fragile 2'],
      range: '2',
      size: WeaponSize.Unbalanced,
      damage: 3,
    }),
    new Item('Poleaxe', 'Poleaxe', ItemType.Weapon, {
      weaponType: WeaponType.Axe,
      qualities: ['Int', 'Pcng1', 'Vic1'],
      range: '3',
      size: WeaponSize.TwoHanded,
      damage: 4,
    }),
    new Item('Halberd', 'Halberd', ItemType.Weapon, {
      weaponType: WeaponType.Axe,
      qualities: ['Int', 'Pcng1', 'Vic1'],
      range: '3',
      size: WeaponSize.TwoHanded,
      damage: 4,
    }),
    new Item('Chain', 'Chain', ItemType.Weapon, {
      weaponType: WeaponType.Flexible,
      qualities: ['Grpl', 'Imp', 'Knock', 'Vic1'],
      range: '3',
      size: WeaponSize.Unbalanced,
      damage: 3,
    }),
    new Item('Net', 'Net', ItemType.Weapon, {
      weaponType: WeaponType.Flexible,
      qualities: ['Grpl', 'NonL', 'Parry', 'Thr'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Whip', 'Whip', ItemType.Weapon, {
      weaponType: WeaponType.Flexible,
      qualities: ['Fear2', 'Grpl'],
      range: '3',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Garrote', 'Garrote', ItemType.Weapon, {
      weaponType: WeaponType.Flexible,
      qualities: ['Grpl', 'Hid2', 'Unf3'],
      range: '1',
      size: WeaponSize.TwoHanded,
      damage: 2,
    }),
    new Item('Spear', 'Spear', ItemType.Weapon, {
      weaponType: WeaponType.Polearm,
      qualities: ['Pcng1'],
      range: '3',
      size: WeaponSize.Unbalanced,
      damage: 4,
    }),
    new Item('Javelin', 'Javelin', ItemType.Weapon, {
      weaponType: WeaponType.Polearm,
      qualities: ['Frag', 'Pcng1', 'Thr(M)'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Lance', 'Lance', ItemType.Weapon, {
      weaponType: WeaponType.Polearm,
      qualities: ['Cav2', 'Frag'],
      range: '3',
      size: WeaponSize.Unbalanced,
      damage: 4,
    }),
    new Item('Pike', 'Pike', ItemType.Weapon, {
      weaponType: WeaponType.Polearm,
      qualities: ['Pcng2'],
      range: '4',
      size: WeaponSize.Unwieldy,
      damage: 4,
    }),
    new Item('Polearm', 'Polearm', ItemType.Weapon, {
      weaponType: WeaponType.Polearm,
      qualities: ['Knock', 'Vic1'],
      range: '3',
      size: WeaponSize.TwoHanded,
      damage: 4,
    }),
    new Item('Arbalest', 'Arbalest', ItemType.Weapon, {
      weaponType: WeaponType.Missile,
      qualities: ['Unf1', 'Vic1'],
      range: 'M',
      size: WeaponSize.TwoHanded,
      damage: 5,
    }),
    new Item('Hunting Bow', 'Hunting Bow', ItemType.Weapon, {
      weaponType: WeaponType.Missile,
      qualities: ['Volley'],
      range: 'C',
      size: WeaponSize.TwoHanded,
      damage: 3,
    }),
    new Item('Hunting Bow (1 load of arrows)', 'Hunting Bow', ItemType.Weapon, {
      weaponType: WeaponType.Missile,
      qualities: ['Volley'],
      range: 'C',
      size: WeaponSize.TwoHanded,
      damage: 3,
    }),
    new Item('Hyrkanian Horse Bow', 'Hyrkanian Horse Bow', ItemType.Weapon, {
      weaponType: WeaponType.Missile,
      qualities: ['Volley'],
      range: 'C',
      size: WeaponSize.TwoHanded,
      damage: 3,
    }),
    new Item('Shemite Bow', 'Shemite Bow', ItemType.Weapon, {
      weaponType: WeaponType.Missile,
      qualities: ['Pcng1', 'Volley'],
      range: 'L',
      size: WeaponSize.TwoHanded,
      damage: 3,
    }),
    new Item('Crossbow', 'Crossbow', ItemType.Weapon, {
      weaponType: WeaponType.Missile,
      qualities: ['Unf1', 'Volley'],
      range: 'M',
      size: WeaponSize.Unbalanced,
      damage: 3,
    }),
    new Item('Bossonian Longbow', 'Bossonian Longbow', ItemType.Weapon, {
      weaponType: WeaponType.Missile,
      qualities: ['Pcng1', 'Volley'],
      range: 'M',
      size: WeaponSize.TwoHanded,
      damage: 5,
    }),
    new Item('Stygian Short Bow', 'Stygian Short Bow', ItemType.Weapon, {
      weaponType: WeaponType.Missile,
      qualities: ['Volley'],
      range: 'C',
      size: WeaponSize.TwoHanded,
      damage: 3,
    }),
    new Item('Sling', 'Sling', ItemType.Weapon, {
      weaponType: WeaponType.Missile,
      qualities: ['Stun', 'Volley'],
      range: 'M',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Blowgun Dart', 'Blowgun Dart', ItemType.Weapon, {
      weaponType: WeaponType.Hidden,
      qualities: ['Frag', 'Hid1', 'NonL'],
      range: 'C',
      size: WeaponSize.OneHanded,
      damage: 1,
    }),
    new Item('Poison Thorn', 'Poison Thorn', ItemType.Weapon, {
      weaponType: WeaponType.Hidden,
      qualities: ['Frag', 'Hid1', 'NonL'],
      range: 'C',
      size: WeaponSize.OneHanded,
      damage: 1,
    }),
    new Item('Boot Blade', 'Boot Blade', ItemType.Weapon, {
      weaponType: WeaponType.Hidden,
      qualities: ['Hid1', 'Pers'],
      range: '1',
      size: WeaponSize.None,
      damage: 2,
    }),
    new Item('Caltrops', 'Caltrops', ItemType.Weapon, {
      weaponType: WeaponType.Hidden,
      qualities: ['Hid1', 'Pcng2', 'Thr'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 2,
    }),
    new Item('Clay Pot Grenade', 'Clay Pot Grenade', ItemType.Weapon, {
      weaponType: WeaponType.Hidden,
      qualities: ['Hid1', 'Spr2', 'Thr'],
      range: 'C',
      size: WeaponSize.OneHanded,
      damage: 1,
    }),
    new Item('Needle Ring', 'Needle Ring', ItemType.Weapon, {
      weaponType: WeaponType.Hidden,
      qualities: ['Hid1', 'Pcng3'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 1,
    }),
    new Item('Push Dagger', 'Push Dagger', ItemType.Weapon, {
      weaponType: WeaponType.Hidden,
      qualities: ['Frag', 'Hid2', 'Vic1'],
      range: '1',
      size: WeaponSize.None,
      damage: 3,
    }),
    new Item('Thumb Blade', 'Thumb Blade', ItemType.Weapon, {
      weaponType: WeaponType.Hidden,
      qualities: ['Frag', 'Hid3', 'Unf2'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 2,
    }),
    new Item('Great Axe', 'Great Axe', ItemType.Weapon, {
      weaponType: WeaponType.Axe,
      qualities: ['Int', 'Knock', 'Vic1'],
      range: '',
      size: WeaponSize.TwoHanded,
      damage: 4,
    }),
    new Item('Seax', 'Seax', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid1', 'Parry', 'Unf2'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Barbed Spear', 'Barbed Spear', ItemType.Weapon, {
      weaponType: WeaponType.Polearm,
      qualities: ['Vic1'],
      range: '',
      size: WeaponSize.Unbalanced,
      damage: 3,
    }),
    new Item('Boar Spear', 'Boar Spear', ItemType.Weapon, {
      weaponType: WeaponType.Polearm,
      qualities: ['Grappl', 'Pcng1'],
      range: '',
      size: WeaponSize.TwoHanded,
      damage: 3,
    }),
    new Item('Hewing Spear', 'Hewing Spear', ItemType.Weapon, {
      weaponType: WeaponType.Polearm,
      qualities: ['Vic1'],
      range: '',
      size: WeaponSize.TwoHanded,
      damage: 4,
    }),
    new Item('Mancatcher', 'Mancatcher', ItemType.Weapon, {
      weaponType: WeaponType.Exotic,
      qualities: ['Grappl', 'Knock', 'NonL'],
      range: '',
      size: WeaponSize.TwoHanded,
      damage: 0,
    }),
    new Item('Repeating Crossbow', 'Repeating Crossbow', ItemType.Weapon, {
      weaponType: WeaponType.Exotic,
      qualities: ['Volley', 'Vic1'],
      range: '',
      size: WeaponSize.TwoHanded,
      damage: 0,
    }),
    new Item('Sword-breaker', 'Sword-breaker', ItemType.Weapon, {
      weaponType: WeaponType.Exotic,
      qualities: ['Parry', 'Disarm'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 4,
    }),
    new Item('Boarding Axe', 'Boarding Axe', ItemType.Weapon, {
      weaponType: WeaponType.Axe,
      qualities: ['Intense', 'Pcng1'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Belaying Pin', 'Belaying Pin', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Impr', 'NonL'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 2,
    }),
    new Item('Gaff', 'Gaff', ItemType.Weapon, {
      weaponType: WeaponType.Polearm,
      qualities: ['Impr', 'Vic1'],
      range: '',
      size: WeaponSize.TwoHanded,
      damage: 3,
    }),
    new Item('Boarding Pike', 'Boarding Pike', ItemType.Weapon, {
      weaponType: WeaponType.Polearm,
      qualities: ['Pcng1', 'Vic1'],
      range: '',
      size: WeaponSize.TwoHanded,
      damage: 4,
    }),
    new Item('Two-handed Scimitar', 'Two-handed Scimitar', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Intense', 'Vic1'],
      range: '',
      size: WeaponSize.TwoHanded,
      damage: 4,
    }),
    new Item('Marlin Spike', 'Marlin Spike', ItemType.Weapon, {
      weaponType: WeaponType.Cudgel,
      qualities: ['Impr', 'Stun'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Cherkess Knife', 'Cherkess Knife', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Hid1', 'Pcng1', 'Unf1'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item("Executioner's Sword", "Executioner's Sword", ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Intense', 'Fragile', 'Vic1'],
      range: '',
      size: WeaponSize.TwoHanded,
      damage: 5,
    }),
    new Item('Nagaika', 'Nagaika', ItemType.Weapon, {
      weaponType: WeaponType.Flexible,
      qualities: ['Fear1', 'NonL'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 2,
    }),
    new Item('Antler Horn Knife', 'Antler Horn Knife', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Paired (Vic1)', 'Parrying'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Tiger Claws', 'Tiger Claws', ItemType.Weapon, {
      weaponType: WeaponType.Exotic,
      qualities: ['Hide1', 'Subtle', 'Vic1'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Bichuwa Dagger', 'Bichuwa Dagger', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Parrying'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 4,
    }),
    new Item('Dao', 'Dao', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Vic1'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Hook Sword', 'Hook Sword', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Paired (Parrying, R2/3)', 'Knockdown'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Jian', 'Jian', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Parrying'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 4,
    }),
    new Item('Krabi', 'Krabi', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Parrying'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 4,
    }),
    new Item('Khukri', 'Khukri', ItemType.Weapon, {
      weaponType: WeaponType.Knife,
      qualities: ['Piercing 1'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Maratha', 'Maratha', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Piercing 1', 'Unforgiving 1'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 4,
    }),
    new Item('Fighting Fan', 'Fighting Fan', ItemType.Weapon, {
      weaponType: WeaponType.Exotic,
      qualities: ['Hidden 1', 'Parrying', 'Stun'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 2,
    }),
    new Item('Urumi', 'Urumi', ItemType.Weapon, {
      weaponType: WeaponType.Flexible,
      qualities: ['Backlash 1', 'Fearsome 1', 'Spread 1'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Wind and Fire Wheels', 'Wind and Fire Wheels', ItemType.Weapon, {
      weaponType: WeaponType.Exotic,
      qualities: ['Paired (Piercing 1)', 'Parrying'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Khopesh', 'Khopesh', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Intense', 'Vicious 2'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 4,
    }),
    new Item('Valusian Longsword', 'Valusian Longsword', ItemType.Weapon, {
      weaponType: WeaponType.Sword,
      qualities: ['Parrying', 'Piercing 1'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 4,
    }),
  ];

  private _shields: Item[] = [
    new Item('Buckler', 'Buckler', ItemType.Shield, {
      qualities: ['Parry', 'Stun'],
      range: '1',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Shield', 'Shield', ItemType.Shield, {
      qualities: ['Knock', 'Shld2'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 2,
    }),
    new Item('Large Shield', 'Large Shield', ItemType.Shield, {
      qualities: ['Knock', 'Shld2'],
      range: '2',
      size: WeaponSize.OneHanded,
      damage: 2,
    }),
    new Item('Tower Shield', 'Tower Shield', ItemType.Shield, {
      qualities: ['Knock', 'Shld4'],
      range: '2',
      size: WeaponSize.Unbalanced,
      damage: 2,
    }),
    new Item('Spiked Shield', 'Spiked Shield', ItemType.Shield, {
      qualities: ['Knock', 'Unf1'],
      range: '',
      size: WeaponSize.Unbalanced,
      damage: 3,
    }),
    new Item('Horned Shield', 'Horned Shield', ItemType.Shield, {
      qualities: ['Shield 2'],
      range: '',
      size: WeaponSize.OneHanded,
      damage: 3,
    }),
    new Item('Great Shield', 'Great Shield', ItemType.Shield, {
      qualities: ['Knock', 'Non-L', 'Shield 5'],
      range: '',
      size: WeaponSize.TwoHanded,
      damage: 2,
    }),
  ];

  private _kits: { [skill: number]: string } = {
    [Skill.Alchemy]: "Field Laboratory (Alchemy)|Alchemical Reagent|Alchemical Test Kit|Poisoner's Ring",
    [Skill.Animal_Handling]: "Handler's Kit/Bridle/Tack|Rewards|Falconry Gear",
    [Skill.Athletics]: 'Climbing Gear|Spikes|Grappling Hook',
    [Skill.Command]: "Captain's Finery",
    [Skill.Counsel]: 'Calming Herbs and Perfumes',
    [Skill.Craft]: 'Coal|Crafting Tool Kit',
    [Skill.Healing]: "Healer's Bag|Ligation Kit|Medicine",
    [Skill.Lore]: "Cartographer's Kit",
    [Skill.Observation]: 'Great Spyglass|Small Spyglass',
    [Skill.Persuade]: "Torturer's Tools",
    [Skill.Sailing]: 'Sun Stone|Signal Rocket',
    [Skill.Society]: 'Tea Set|Courtly garb|Musical Instrument|Signet Ring',
    [Skill.Sorcery]: 'Sorcerous Garb and Talismans|Rune Pole|Rune Stave|Rune Stones|Crystal Ball',
    [Skill.Stealth]:
      'Makeup and Scent Oils|Appropriate clothing for disguises|Wardrobe of appropriate clothing for disguises',
    [Skill.Survival]: 'Day Bag for region|Survival Provisions|Astrolabe|Fishing Gear|Lodestone|Nautical Charts|Tent',
    [Skill.Thievery]: "Thieves' Kit|Poisoner's Ring",
  };

  private _belongings: string[] = [
    'Rough hammered jewelery',
    'Tribal/ritual/prestige tattoos and/or piercings',
    'A solid, well-crafted armband made of copper or silver',
    'An ancient piece of jewelery, its surface covered in verdigris',
    "An ornate symbol of your father's faith",
    'A small leather sack containing hair of a loved one, or fragments of their garment',
    'A small leather scroll case containing a parchment, upon which is writ a family secret',
    'A ring made of semiprecious stone',
    'A necklace of animal teeth or bones',
    'A small mummified body part, such as an ear or finger',
    'A magnificent drinking horn with metal cup',
    'A small bag of polished pieces of amber',
    'A piece of polished crystal that makes letter seem larger',
    'A small rune stone on a leather thong',
    'The manacles you wore for a brief time',
    'A short rune stave, carved with a blessing',
    'An arm-ring like a coiled serpent, made of pure silver',
    'A small totem staff with the gods of your village carved upon it',
    'A coin of ancient Valusia, stamped with the face of savage king',
    'A small icon of a god from a far-away land, made from jade or ivory',
    'A jade ring taken from an Eastern foe',
    'A small pouch of yellow lotus, saved for a special occasion',
    'A small wooden carving of a home with small figures of your parents and siblings inside',
    'A fine set of cutlery, silver with obsidian inside',
    'A fingerbone belonging to a former sage, saint, priest, mentor or teacher',
    'A beautifully painted icon, wrapped in oilcloth',
    'A book bound in tattooed human skin',
    'A chalice once used in cult ceremonies',
    'A medallion containing the secret words of your faith',
    'A short staff with a symbolic miniature effigy atop it',
    'A fragile ritual dagger, bright with a bejewelled hilt',
    'A series of scrolls containing religious teachings',
    'A figurine displaying a famous scene from a religious text',
    'A fragment of cloth which a god is supposed to have touched',
    'The whip once used against you, now claimed',
    "A signet ring. One day you'll find out whose mark is on it",
    'A small animal you claimed in a raid',
    "A good luck totem or charm. The person you took it from wasn't lucky in the end",
    'A branding iron',
    'A snake-headed walking stick',
    'Brass pots and pans',
    'An ivory ball painted like an eye',
    "A piece of a ship's spar. Oddly, you found it in the desert",
    'A choker collar with a silver ring, as if from a valued slave or beast',
    'A small beautifully shaped horse amulet of unknown origin',
    'A handheld mirror, which while crudely made, seems to be unbreakable',
    'A set of ivory dice whose number dots do not resemble any known numeric system',
    'The religious icon which your mother wore',
    'The eye-patch you took from the first person you killed',
    'The faded cloth fragment of a tapestry, depicting a king and a god in discussion',
    'A small, impossibly smooth stone with three etched white horizontal lines',
    'A desiccated, dried-up finger, taken from a dead wizard, said to ward against the evil eye',
    'A map containing a route to a forgotten citadel, deep within the mountains',
    'A letter of introduction to one of the most venerated scholars of the age',
    'Signet ring',
    'An old but valuable diadem',
    'Cloak pin made of gold',
    'A book of peerage',
    'Suit of Plate',
    "Your ancestor's pipe",
    'Amulet',
    'Land deed',
    'The glass eye of a forebear',
    'A fine steed from a far-off land',
  ];

  private _garments: string[] = [
    'A patched and practical gambeson',
    'Simple undyed cloth, worn in the fashion of your people',
    'Cheap fabrics, richly dyed in the fashion of the nearest town or city',
    'Long, flowing dress or robes, embroidered with coarse thread in additional patterns',
    'Furs and pelts sewn with threads of a quality befitting your station',
    'Deerskin leggings and a heavy hooded cloak',
    'Simple black trousers with a long-sleeved tunic',
    "Light cloth covered by a tradesman's leather apron",
    'Sandals and tunic befitting a servant',
    'Naked as modesty will allow you',
    'A thick wool cloak, trimmed with white fox-fur',
    'A hooded mantle, with gilt thread at the edge',
    'A brilliant scarlet cloak, made in the dreaming west',
    'A long dress or robe with a motifs at the seams',
    'A slouch-brimmed hat',
    'Thick woolen garments and high-strapped sandals',
    'A thick shagreen belt with a golden boss for a buckle',
    'A thick woolen kilt, a rough tunic, and sandals',
    'A long leather tunic, that once had riveted scales',
    'Tattered and stained garments, stolen from a dead man',
    'A pair of silken slippers looted from the dead',
    'A fur-lined cloak',
    'A pair of snake-skinned gloves stitched with gold thread',
    'A long, wide scarf in an ornate pattern, now since faded, useful as a sash or turban',
    'A thick woolen kilt, a rough tunic, and sandals',
    'A set of hard-wearing travelling clothes with a religious emblem on the back',
    'A hooded ceremonial robe',
    'A set of monastic robes, made of sackcloth and extremely itchy',
    'A pair of leather boots and a leather jerkin of religious significance',
    'A steel gauntlet which belonged to a religious hero, along with thick, warm wool trousers and a shirt',
    'Thin, woven garments with leather sandals',
    'A dyed cloak, adorned with ornate designs and filigree',
    'Stamped leather tunic with ancient lettering decorating its edge',
    'The robes of a priest, taken from his tomb and musty with the scent of the place',
    'Fine silken clothes, far too beautiful for you',
    'Silken shoes with painted toes, taken from a merchant',
    'A thick cloak made from the hide of an eastern beast, mottled in spots and strangely colored to western eyes',
    'A veil of fine silk, so wispy as to be almost transparent',
    "A silken robe inlaid with what a scholar told you are 'dragons' woven in gold",
    'A khaffiyeh of fine white linen, almost blindingly clean',
    'A pair of fur-lined boots',
    'Fine pantaloons, like those worn in Iranistan',
    'A sleeveless abba, perhaps for some formal occasion or court',
    'A fine Bakhariot belt of worked leather',
    'A spired Turanian helmet, chased with gold',
    'A thin woolen jerking, made in the traditional style of your village',
    'A wide-brimmed hat',
    "A coarse monk's robe",
    "A beggar's rags, stained with drink and vomit",
    'The bloody shawl of a butcher',
    'Thick leather boots which leave unmistakable footprints behind',
    'A grubby travel cloak which smells of rain and blood',
    'Horse-hide britches which are prone to shrinking slightly in poor weather conditions',
    "An executioner's hooded cloak, with hidden pockets sewn in",
    'A Vendhyan lunghi',
    'Fine fur cloak',
    'Silken pantaloons',
    'Hoisery',
    'Plumed cap',
    'Jerkin with a family crest',
    'Well-made boots',
    'An opulent cape',
    'Curled-toe shoes',
    'A fine dress',
    'A battered crown',
  ];

  private _provenanceWeapons: string[] = [
    'Knife',
    'Sword',
    'Saber',
    'Broadsword',
    'War Pick',
    'Spear',
    'Broad-headed Axe',
    'Length of Chain',
    'Sharpened Rock',
    'Whip',
    'Shortsword',
    'Hatchet',
    'Battleaxe',
    'Great Hammer',
    'Great Axe',
    'Spear',
    'Broken Shield',
    'Piece of Sharpened Horn',
    'Dagger',
    'Hunting Bow',
    'Tulwar',
    'Bearded Axe',
    'Katar',
    'Iron Spike',
    'Scimitar',
    'Yetshi Knife',
    'Cherkess Dagger',
    'Large Shield',
    'Lance',
    'Crossbow',
    'Two-handed sword',
    'Fine steed',
    'Hunting dog',
    'Shield',
  ];

  private _provenances: string[] = [
    "Your former master's...",
    'A small but heavy...',
    "A knight's...",
    '...battered from years of use',
    'A simple..., humble yet servicable',
    '...engraved with prayers and oaths',
    '...ripped from the hands of a brigand you slew',
    '...freshly forged and tested true',
    '...still stained in places with the blood of those it has slain',
    '...decorated with polished stones',
    "Your chieftain's...",
    'A hoof-hilted...',
    'An Atlantean...',
    'A bronze...',
    '..., the head or blade made of meteoric iron',
    '...that gives off an almost musical note when it strikes',
    '...carved with runes of inscrutable meaning',
    '...forged by dwarves, say the legends',
    '...broken or notched, but still servicable',
    '...stolen from a barrow',
    "Your friend's..., they died in battle. Better you take it then some stranger!",
    '..., bronze handle inlaid with silver.',
    'Acheronian..., if only you could read the sigils.',
    '...made in Hyrkanian fashion.',
    '..., once belonging to a Northener, its owner died well.',
    '..., you still bear the scar its owner gave you.',
    '...given by a friend you saved in battle.',
    '...; A madman claims a Pictish legend once wielded it.',
    '...emblazoned with a coiled serpent eatings its own tail.',
    '...of a strange Vendhyan design.',
    '...with which a now-dead foe stabbed you.',
    '...by which you have the scar dealt by a bolt from this trophy.',
    '..., a gift from a fallen dog-brother.',
    '..., forged of a strange, mottled metal.',
    '...found on the shores of the Vilayet.',
    '...that gives off a strange whistle when swung through the air.',
    '...carved with runes of inscrutable meaning.',
    '...forged by serpent-men, its former owner claimed.',
    '..., broken or notched but still servicable.',
    '...issued by your former military unit and used in war.',
    '..., a gift from your Mentor.',
    '..., the weapon that slew your family.',
    "..., your share of your first raid's bounty",
    '..., made of unknown metal.',
    '..., created from old farm tools.',
    '... inscribed with the name of a legendary thief.',
    '..., a small fragment missing from the tip.',
    '..., the handle has a small aperture, probably once housing poison.',
    '..., battered and worn, but still keen.',
    '... tarnished with a blood stain that cannot be removed.',
    '... given to you by your trainer.',
    '... you used in a tournament.',
    '... that nearly killed you in battle.',
    '... that was a diplomatic gift.',
    '... used before you were a noble.',
    '... taken from a foe.',
    '... scarred, but holds your family heraldry.',
    '... given by a loved one to end a relationship.',
  ];

  getBelongings(source: Source) {
    return this._belongings.sort((a, b) => {
      return a.localeCompare(b);
    });
  }

  getGarments(source: Source) {
    return this._garments.sort((a, b) => {
      return a.localeCompare(b);
    });
  }

  getProvenanceWeapons(source: Source) {
    return this._provenanceWeapons.sort((a, b) => {
      return a.localeCompare(b);
    });
  }

  getProvenances(source: Source) {
    return this._provenances.sort((a, b) => {
      return a.localeCompare(b);
    });
  }

  getAllWeapons() {
    var weapons = [];
    for (var i = 0; i < this._weapons.length; i++) {
      const weapon = this._weapons[i];
      var add = true;

      this._provenances.forEach((p) => {
        var prov = p.substr(0, p.indexOf('...'));
        prov = prov.length > 0 ? prov : p.substr(3);
        if (weapon.listName.indexOf(prov) > -1) {
          add = false;
          return;
        }
      });

      if (add) {
        weapons.push(weapon.listName);
      }
    }

    return this.arrayToString(
      weapons.sort((a, b) => {
        return a.localeCompare(b);
      })
    );
  }

  getWeaponsOfType(type: WeaponType) {
    var weapons = [];
    for (var i = 0; i < this._weapons.length; i++) {
      const weapon = this._weapons[i];
      if ((weapon.properties as IWeaponProperties).weaponType === type) {
        var add = true;

        this._provenances.forEach((p) => {
          var prov = p.substr(0, p.indexOf('...'));
          prov = prov.length > 0 ? prov : p.substr(3);
          if (weapon.listName.indexOf(prov) > -1) {
            add = false;
            return;
          }
        });

        if (add) {
          weapons.push(weapon.listName);
        }
      }
    }

    return this.arrayToString(
      weapons.sort((a, b) => {
        return a.localeCompare(b);
      })
    );
  }

  getWeaponsNotOfType(type: WeaponType) {
    var weapons = [];
    for (var i = 0; i < this._weapons.length; i++) {
      const weapon = this._weapons[i];
      if ((weapon.properties as IWeaponProperties).weaponType !== type) {
        var add = true;

        this._provenances.forEach((p) => {
          var prov = p.substr(0, p.indexOf('...'));
          prov = prov.length > 0 ? prov : p.substr(3);
          if (weapon.listName.indexOf(prov) > -1) {
            add = false;
            return;
          }
        });

        if (add) {
          weapons.push(weapon.listName);
        }
      }
    }

    return this.arrayToString(
      weapons.sort((a, b) => {
        return a.localeCompare(b);
      })
    );
  }

  getWeaponByName(name: string): Item {
    for (var i = 0; i < this._weapons.length; i++) {
      const weapon = this._weapons[i];
      if (weapon.listName === name) {
        return weapon;
      }
    }

    return null;
  }

  getOneHandedWeapons(nameFilter?: string) {
    var weapons = [];
    for (var i = 0; i < this._weapons.length; i++) {
      const weapon = this._weapons[i];
      if ((weapon.properties as IWeaponProperties).size === WeaponSize.OneHanded) {
        var add = true;

        if (nameFilter) {
          if (
            (weapon.properties as IWeaponProperties).weaponType.toString().toLowerCase() !==
            nameFilter.toLocaleLowerCase()
          ) {
            add = false;
          }
        }

        this._provenances.forEach((p) => {
          var prov = p.substr(0, p.indexOf('...'));
          prov = prov.length > 0 ? prov : p.substr(3);
          if (weapon.listName.indexOf(prov) > -1) {
            add = false;
            return;
          }
        });

        if (add) {
          weapons.push(weapon.listName);
        }
      }
    }

    return this.arrayToString(
      weapons.sort((a, b) => {
        return a.localeCompare(b);
      })
    );
  }

  getCeremonialWeapons() {
    var weapons = [];
    for (var i = 0; i < this._weapons.length; i++) {
      const weapon = this._weapons[i];
      if ((weapon.properties as IWeaponProperties).size === WeaponSize.OneHanded) {
        var add = true;

        this._provenances.forEach((p) => {
          var prov = p.substr(0, p.indexOf('...'));
          prov = prov.length > 0 ? prov : p.substr(3);
          if (weapon.listName.indexOf(prov) > -1) {
            add = false;
            return;
          }
        });

        if (add) {
          weapons.push('Ceremonial ' + weapon.listName);
        }
      }
    }

    return this.arrayToString(
      weapons.sort((a, b) => {
        return a.localeCompare(b);
      })
    );
  }

  weaponSizeToString(size: WeaponSize) {
    var result = '-';

    switch (size) {
      case WeaponSize.None:
        result = '-';
        break;
      case WeaponSize.OneHanded:
        result = '1H';
        break;
      case WeaponSize.TwoHanded:
        result = '2H';
        break;
      case WeaponSize.Unbalanced:
        result = 'U';
        break;
      case WeaponSize.Unwieldy:
        result = 'UW';
        break;
    }

    return result;
  }

  getBowForHomeland(homeland: HomeLand): string {
    switch (homeland) {
      case HomeLand.BossonianMarches:
        return this.getWeaponByName('Bossonian Longbow').listName;
      case HomeLand.Hyrkania:
        return this.getWeaponByName('Hyrkanian Horse Bow').listName;
      case HomeLand.Shem:
        return this.getWeaponByName('Shemite Bow').listName;
      case HomeLand.Stygia:
        return this.getWeaponByName('Stygian Short Bow').listName;
    }

    return this.getWeaponByName('Hunting Bow').listName;
  }

  getShields(): string {
    var shields = [];
    for (var i = 0; i < this._shields.length; i++) {
      const shield = this._shields[i];
      shields.push(shield.listName);
    }

    return this.arrayToString(
      shields.sort((a, b) => {
        return a.localeCompare(b);
      })
    );
  }

  getShieldByName(name: string): Item {
    for (var i = 0; i < this._shields.length; i++) {
      const shield = this._shields[i];
      if (shield.listName === name) {
        return shield;
      }
    }

    return null;
  }

  getAllArmor(): string {
    var armors = [];
    for (var i = 0; i < this._armor.length; i++) {
      const armor = this._armor[i];
      armors.push(armor.listName);
    }

    return this.arrayToString(
      armors.sort((a, b) => {
        return a.localeCompare(b);
      })
    );
  }

  getArmorOfType(type: ArmorType): string {
    var armors = [];
    for (var i = 0; i < this._armor.length; i++) {
      const armor = this._armor[i];
      if ((armor.properties as IArmorProperties).armorType === type) {
        armors.push(armor.listName);
      }
    }

    return this.arrayToString(
      armors.sort((a, b) => {
        return a.localeCompare(b);
      })
    );
  }

  getArmorByName(name: string): Item {
    for (var i = 0; i < this._armor.length; i++) {
      const armor = this._armor[i];
      if (armor.listName === name) {
        return armor;
      }
    }

    return null;
  }

  getKitsForSkill(skill: Skill) {
    const kit = this._kits[skill];

    if (kit === undefined) {
      return `Personal Library (${SkillsHelper.getSkillName(skill)})`;
    }

    return kit;
  }

  getKitsForSkills(skills: Skill[]) {
    let kits = '';

    skills.forEach((s) => {
      const kit = this._kits[s];
      kits += `|${kit}`;
    });

    return kits;
  }

  getAnimals() {
    return 'Camel|Cheetah|Coyote|Horse|Hound|Hawk|Monkey|Panther';
  }

  private arrayToString(array: string[]) {
    var str = '';
    for (var i = 0; i < array.length; i++) {
      str += `${i !== 0 ? '|' : ''}${array[i]}`;
    }

    return str;
  }
}

export const EquipmentHelper = new Equipment();
