import { character } from '../common/character';
import { DiceRoller } from '../helpers/diceRoller';
import { ArmorType, EquipmentHelper, WeaponType } from '../helpers/equipment';
import { Source } from '../helpers/sources';
import { Skill, SkillsHelper } from './skills';
import { TalentModel, TalentsHelper } from './talents';

export enum Archetype {
  // Core
  Archer,
  Barbarian,
  Mercenary,
  NobleWarrior,
  Nomad,
  Pirate,
  Priest,
  Scholar,
  Scoundrel,
  WitchShaman,
  // Thief
  Assassin,
  BloodyRightHand,
  Fence,
  Highwayman,
  MasterThief,
  RelicHunter,
  Spy,
  // Barbarian
  Bard,
  Hunter,
  Raider,
  Slaver,
  // Skelos
  Alchemist,
  Charlatan,
  Sage,
  Sorcerer,
  WitchDoctor,
  // Mercenary
  Asshuri,
  Captain,
  Champion,
  Messenger,
  UnseasonedYouth,
  Veteran,
  // Pirate
  GalleySlave,
  Mariner,
  MerchantCaptain,
  Smuggler,
  // Cults
  Cultist,
  Oracle,
  Philosopher,
  Pilgrim,
  // Brigand
  Entertainer,
  Kozaki,
  Merchant,
  Torturer,
  // Beast Masters
  Beast,
  BeastMaster,
  // Scout
  Explorer,
  Missionary,
  Scout,
  Trader,
  // Wanderer
  Beggar,
  CourtOfficial,
  Emissary,
  HorseNomad,
  Mystic,
  Vagabond,
  // King
  Courtier,
  HealerPhysician,
  Knight,
  Minstrel,
  Noble,
  // Adventurer
  Adventurer,
  CleverOne,
  Griot,
  Seeker,
  TombGuardian,
  WitchFinder,
  // Exiles
  Exile,
  Forgotten,
  Shaper,
  WastelandPriest,
  // Kull
  Agent,
  Ambassador,
  Counselor,
  Gladiator,
}

class ArchetypeModel {
  name: string;
  description: string;
  careerSkill: Skill;
  careerTalent: TalentModel;
  mandatorySkills: Skill[];
  electiveSkills: Skill[];
  equipment: string[];
  roll: number;
  source: Source;

  constructor(
    name: string,
    description: string,
    careerSkill: Skill,
    careerTalent: TalentModel,
    mandatory: Skill[],
    elective: Skill[],
    equipment: string[],
    roll: number,
    source: Source
  ) {
    this.name = name;
    this.description = description;
    this.careerSkill = careerSkill;
    this.careerTalent = careerTalent;
    this.mandatorySkills = mandatory;
    this.electiveSkills = elective;
    this.equipment = equipment;
    this.roll = roll;
    this.source = source;
  }
}

export class ArchetypeViewModel extends ArchetypeModel {
  id: Archetype;

  constructor(id: Archetype, base: ArchetypeModel) {
    super(
      base.name,
      base.description,
      base.careerSkill,
      base.careerTalent,
      base.mandatorySkills,
      base.electiveSkills,
      base.equipment,
      base.roll,
      base.source
    );
    this.id = id;
  }
}

export class Archetypes {
  private HOMELAND_BOW = 'Bow suitable for homeland';

  private _archetypes: { [id: number]: ArchetypeModel } = {
    [Archetype.Archer]: new ArchetypeModel(
      'Archer',
      'Whether trained alongside the legendary Bossonian archers, within one of the militaries of the great middle kingdoms, or even skilled in Hyrkanian horse archery, you are now a practiced archer, capable of sending iron-tipped shafts across great distances with accuracy.',
      Skill.Ranged_Weapons,
      TalentsHelper.getTalent('Accurate'),
      [Skill.Animal_Handling, Skill.Observation, Skill.Stealth, Skill.Survival],
      [Skill.Acrobatics, Skill.Athletics, Skill.Melee],
      [
        this.HOMELAND_BOW,
        '2 reloads for bow',
        'Helmet (Armor 3: Head; Heavy)',
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Riding horse|Donkey',
        'Padded gambeson and trousers (Armor 1: Torso/Arms/Legs)|Brigandine vest and trousers (Armor 2: Torso/Legs)|Mail vest (Armor 3: Torso; Noisy)',
      ],
      2,
      Source.Core
    ),
    [Archetype.Barbarian]: new ArchetypeModel(
      'Barbarian',
      'You hail from one of the untamed lands bordering civilization, whether to the far north, the east, the south, or some other uncharted territory. Your ways are as strange to civilized folk as their customs are inscrutable to you.',
      Skill.Melee,
      TalentsHelper.getTalent('No Mercy'),
      [Skill.Acrobatics, Skill.Animal_Handling, Skill.Athletics, Skill.Survival],
      [Skill.Healing, Skill.Parry, Skill.Stealth],
      [
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Full suit of brigandine (Armor 2: Torso/Arms/Legs)|Mail vest (Armor 3: Torso; Noisy) and a helmet (Armor 3: Head; Heavy)|Ragged furs (Heavy Clothing) (Armor 1: Torso/Arms/Legs)',
      ],
      4,
      Source.Core
    ),
    [Archetype.Mercenary]: new ArchetypeModel(
      'Mercenary',
      'Whether drafted into the militia as a youth or adult, or voluntarily signing on for military service, you have become a sell-sword, a paid soldier, loyal only to the hand that holds the strings to the coin-purse. You travel the Hyborian kingdoms in search of work, sometimes even fighting against your former masters.',
      Skill.Athletics,
      TalentsHelper.getTalent('Strong Back'),
      [Skill.Acrobatics, Skill.Melee, Skill.Parry, Skill.Ranged_Weapons],
      [Skill.Animal_Handling, Skill.Healing, Skill.Stealth],
      [
        EquipmentHelper.getWeaponsOfType(WeaponType.Polearm),
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Sling',
        '1 load of stones for sling',
        'A baggage mule and a cheap riding horse',
        'Suit of mail armor (Armor 3: all locations; Noisy)|Brigandine long coat (Armor 2: Torso/Arms/Legs) with helmet (Armor 3: Head; Heavy)',
      ],
      6,
      Source.Core
    ),
    [Archetype.NobleWarrior]: new ArchetypeModel(
      'Noble Warrior',
      'You may be a knighted noble from one of the civilized Hyborian kingdoms such as Aquilonia, Nemedia, Zingara, Brythunia, or elsewhere. Whether you hold to a code of chivalry or are merely a well-trained and equipped warrior, you fight primarily for yourself and for causes you choose.',
      Skill.Society,
      TalentsHelper.getTalent('A Modicum of Comfort'),
      [Skill.Acrobatics, Skill.Animal_Handling, Skill.Parry, Skill.Resistance],
      [Skill.Melee, Skill.Persuade, Skill.Ranged_Weapons],
      [
        'Heavy Hauberk (Armor 3: Torso/Arms/Legs; Heavy)|Heavy Coat (Armor 3: Torso/Arms/Legs; Noisy)|Heavy Vest (Armor 3: Torso; Heavy)|Heavy Shirt (Armor 3: Torso/Arms; Noisy)|Heavy Sleeves (Armor 3: Arms; Noisy)|Heavy Leggings (Armor 3: Legs; Noisy)|Helmet (Armor 3: Head; Heavy)|Coif (Armor 3: Head; Heavy)',
        EquipmentHelper.getShields(),
        EquipmentHelper.getAllWeapons() + '|' + EquipmentHelper.getShields(),
        EquipmentHelper.getAllWeapons() + '|' + EquipmentHelper.getShields(),
        'Suits of fine and traveling clothing',
        'Warhorse with light barding (Armor 2)',
      ],
      8,
      Source.Core
    ),
    [Archetype.Nomad]: new ArchetypeModel(
      'Nomad',
      'To the east and south, the Hyborian kingdoms are surrounded by deserts, steppes, tundra, and wastelands — inhospitable to civilized folk but home to you and your people. You know how to survive in these places, to find food and water and to make shelter, and to navigate to safety. Life is hard in your homeland, perhaps the reason you left.',
      Skill.Animal_Handling,
      TalentsHelper.getTalent('Born in the Saddle'),
      [Skill.Acrobatics, Skill.Athletics, Skill.Parry, Skill.Survival],
      [Skill.Melee, Skill.Ranged_Weapons, Skill.Stealth],
      [
        EquipmentHelper.getAllWeapons() + '|' + EquipmentHelper.getShields(),
        EquipmentHelper.getAllWeapons() + '|extra reload for a weapon',
        EquipmentHelper.getAllWeapons() + '|extra reload for a weapon',
        'A horse and a mule',
        "Animal Handler's Kit and 3 rewards",
        'Heavy Clothing (Armor 1: Torso/Arms/Legs)|Mail shirt (Armor 3: Torso/Arms; Noisy)',
      ],
      10,
      Source.Core
    ),
    [Archetype.Priest]: new ArchetypeModel(
      'Priest',
      'Born into the faith or a late convert, you feel the calling of one of the many gods of the Hyborian Age: from holy Mitra, accursed Set, Ishtar, Bori, Asura, Ibis, the living Tarim, Erlik, Bel, Derketo, or even those who are not overly worshipped, like Crom, Ymir, or the Zamoran spider-god. You are either associated with a particular temple or you are itinerant, wandering the land and converting the unfaithful by any means you can, be it through example, with convincing speech, or by the sword.',
      Skill.Counsel,
      TalentsHelper.getTalent('Quiet Wisdom'),
      [Skill.Insight, Skill.Lore, Skill.Persuade, Skill.Society],
      [Skill.Alchemy, Skill.Healing, Skill.Sorcery],
      [
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        "A single copy of a scroll or book containing your faith's precepts and holy words",
        'Travelling clothes and priestly vestments',
        'Oils, herbs and religious accoutrements',
        'A mule',
      ],
      14,
      Source.Core
    ),
    [Archetype.Pirate]: new ArchetypeModel(
      'Pirate',
      'You may once have been a sailor, a merchant, or even the member of one of the great navies, but eventually you turned your hand towards piracy. More at home on the open water than on land, you are nonetheless willing to seek your fortune wherever fate guides you.',
      Skill.Observation,
      TalentsHelper.getTalent('Sharp Senses'),
      [Skill.Melee, Skill.Parry, Skill.Resistance, Skill.Survival],
      [Skill.Sailing, Skill.Stealth, Skill.Thievery],
      [
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Padded jerkin (Armor 1: Torso/Arms)',
        'A share in a small watercraft, or the proceeds that may come from its activities',
      ],
      12,
      Source.Core
    ),
    [Archetype.Scholar]: new ArchetypeModel(
      'Scholar',
      'You have explored the breadth of history and human knowledge from the vantage point of a chair, spending hours poring over thick tomes of lore. Your interest may be specific to a particular field of study, or you may have broad expertise in a variety of subjects. Despite your inclination towards scholarship, you have ventured into the world outside your studies, to experience the world firsthand.',
      Skill.Lore,
      TalentsHelper.getTalent('Scribe'),
      [Skill.Animal_Handling, Skill.Linguistics, Skill.Persuade, Skill.Society],
      [Skill.Alchemy, Skill.Healing, Skill.Sorcery],
      [
        EquipmentHelper.getAllWeapons() + '|' + EquipmentHelper.getShields(),
        'Several sets of plain travelling clothes and a suit of courtly clothing',
        'A plethora of writing materials, including vellum or papyrus scrolls and books',
        'Horse and baggage mule',
        'A small personal library of choice volumes and reference materials',
      ],
      16,
      Source.Core
    ),
    [Archetype.Scoundrel]: new ArchetypeModel(
      'Scoundrel',
      'You make a living exploiting the weaknesses of others, whether gambling, theft, or outright banditry. Survival by wits is the only life you have ever known, and you have gotten quite good at it, trusting in your wits, reflexes, and lack of scruples to get you out of danger, though by one means or another you readily find yourself back in the thick of it.',
      Skill.Acrobatics,
      TalentsHelper.getTalent('Agile'),
      [Skill.Athletics, Skill.Parry, Skill.Persuade, Skill.Society],
      [Skill.Melee, Skill.Stealth, Skill.Thievery],
      [
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        EquipmentHelper.getShields() + '|None',
        'A small chest of counterfeit goods',
        'Brigandine jacket (Armor 2: Torso/Arms)|Heavy Clothing (Armor 1: Torso/Arms/Legs)',
      ],
      18,
      Source.Core
    ),
    [Archetype.WitchShaman]: new ArchetypeModel(
      'Witch/Shaman',
      'You have made pacts with powers that are not of this world, sought knowledge forbidden to, and feared by, most, and for this daring you have been granted power and insights beyond those of mortal men and women. Even if you are unable to use sorcery outright, you know much secret lore as well as the secrets of the natural world. It is up to you whether you practice your gifts to assist others, or for your own desires.',
      Skill.Persuade,
      TalentsHelper.getTalent('Force of Presence'),
      [Skill.Alchemy, Skill.Counsel, Skill.Healing, Skill.Lore],
      [Skill.Animal_Handling, Skill.Sorcery, Skill.Thievery],
      [
        'Knife|Dagger',
        'Toughened leather jacket (Armor 1: Torso/Arms)',
        "Healer's Kit",
        "Alchemist's Kit",
        'Personal Library (might be clay tablets or scrolls)',
        'A riding horse|A donkey',
      ],
      20,
      Source.Core
    ),
    [Archetype.Assassin]: new ArchetypeModel(
      'Assassin',
      'Killers from Zamora, skulking in the dark, striking silently, and leaving no trace save a bloodied corpse are the stuff of legend — a bogeyman conjured up by superstitious governesses to scare young lords and young ladies into obeying their elders.These whispered deeds of death imply that the assassins are something more than human. Not surprisingly, these legends come from the assassins themselves, who understand the value such tales have on the uninitiated.The upper- class nobles who look past the legends pay well for the services of these killers.',
      Skill.Stealth,
      TalentsHelper.getTalent('Living Shadow'),
      [Skill.Acrobatics, Skill.Alchemy, Skill.Ranged_Weapons, Skill.Observation],
      [Skill.Melee, Skill.Society, Skill.Survival],
      [
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Padded jerkin (Armor 1: Torso/Arms)|Mail vest (Armor 3; Torso, Noisy)',
        'Fine traveling clothes',
        "Alchemist's kit",
        "Traveler's Survival kit",
        'Riding horse|Donkey',
        'Faction membership in the Black Hand|No faction membership',
      ],
      99,
      Source.Thief
    ),
    [Archetype.BloodyRightHand]: new ArchetypeModel(
      'Bloody Right Hand',
      'Everyone needs a bastard; everyone who runs the streets knows the type — the dangerous ones, the ones without any fear or pity behind the eyes.The kind of person who doesn’t ask “Why am I breaking this arm?” but instead ponders “In how many places?” This is the bloody right hand; the thief, enforcer and general purveyor of bad news found in every back alley in every city in every kingdom in the world. That’s not to say there aren’t regional differences; an Aquilonian right hand is likely to wield a cosh instead of a knife and to rely on intimidation more than violence.A Zamorian equivalent is likely to have half a dozen knives and be more than prepared to sheathe them in prospective targets.',
      Skill.Melee,
      TalentsHelper.getTalent('No Mercy'),
      [Skill.Observation, Skill.Parry, Skill.Ranged_Weapons, Skill.Thievery],
      [Skill.Command, Skill.Persuade, Skill.Stealth],
      [
        'Two daggers|Sword',
        'Heavy clothing and brigandine vest (Armor 3: Torso)',
        'Clothes and accoutrements for a second identity',
        "Thieves' kit",
        "Traveler's survival kit",
        'Riding horse|Donkey',
      ],
      99,
      Source.Thief
    ),
    [Archetype.Fence]: new ArchetypeModel(
      'Fence',
      'There is always a middleman. How does the graven image of Ibis come to be in the hands of the wealthy, decorous nobleman? Does he buy it from a thief in an alleyway encrusted with grime and the sour vomit of a Nemedian mercenary? No, of course not. He has it brought to him by the fence.The man or woman who knows everyone. From the crudest street thug to the most eloquent scholar, the Fence is welcomed by anyone with something illegal to sell or who wants to buy something which can only be acquired through somewhat dubious means.',
      Skill.Insight,
      TalentsHelper.getTalent('Sixth Sense'),
      [Skill.Lore, Skill.Observation, Skill.Persuade, Skill.Thievery],
      [Skill.Craft, Skill.Melee, Skill.Society],
      [
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Traveling clothes',
        'Magnifying glass',
        "Traveler's survival kit",
        'Riding horse|Donkey',
      ],
      99,
      Source.Thief
    ),
    [Archetype.Highwayman]: new ArchetypeModel(
      'Highwayman',
      'If the skills gained in the Maul are likened to wielding a rapier, then the highwayman’s technique is a blunt instrument.Using charm, intimidation, and the threat of violence to accomplish his goals, the highwayman takes what he needs to survive from unwary travelers, traders, caravans, and merchants. There’s a name for these bandits in every country. In Brythunia, they are called brigands.In Corinthia, they are outlaws. Nemedia calls them road agents.Whatever the term, the highwayman operates on the fringes of society, and rarely alone. All jackals hunt in packs.',
      Skill.Persuade,
      TalentsHelper.getTalent('Force of Presence'),
      [Skill.Command, Skill.Melee, Skill.Parry, Skill.Thievery],
      [Skill.Animal_Handling, Skill.Linguistics, Skill.Survival],
      [
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Suit of mail armor (Armor 3: all locations; Noisy)|Brigandine long coat (Armor 2: Torso, Arms; Legs) with Helmet (Armor 3: Head; Heavy)',
        'Plain traveling clothes',
        "Traveler's survival kit",
        'Cheap riding horse',
      ],
      99,
      Source.Thief
    ),
    [Archetype.MasterThief]: new ArchetypeModel(
      'Master Thief',
      'Far more severe than a mere honorific, the master thief has certain obligations and traditions to uphold. His code of honor is legendary, after all, and reflects not only upon himself but every other who make their living through relieving others of their wealth.Of course, this code of honor is a strange, confusing thing to any who aren’t thieves.For instance, master thieves may never turn down an opportunity to steal, or sacrifice another thief in order to preserve their own lives.Master thieves are not simply thieves with greater skills than another: they are masters of thieves, the aristocracy of the underworld, and they must act like it.Master thieves are planners and plotters, whether working alone or with a hand-picked crew. Becoming a master thief requires the dedication of a lifetime — it is a path that must be decided upon at a young age and pursued with the diligence that sorcerers must commit to their study of rites and rituals. Agility, intelligence, and the means by which even the most highly guarded of locations can be broken into… all of this a master thief must learn.',
      Skill.Thievery,
      TalentsHelper.getTalent('Thief'),
      [Skill.Athletics, Skill.Command, Skill.Observation, Skill.Stealth],
      [Skill.Acrobatics, Skill.Craft, Skill.Persuade],
      [
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Padded jerkin (Armor 1: Torso/Arms)',
        'Pig Spit|Marbles|Tripwire|Smoke stick|Sutli bomb',
        "Thieves' kit",
        'Plain traveling clothes',
      ],
      99,
      Source.Thief
    ),
    [Archetype.RelicHunter]: new ArchetypeModel(
      'Relic Hunter',
      'The relic hunter is well-versed in the lore of the ancients and smart enough to know how to avoid trouble, most of the time.Rubbing shoulders with smugglers and less-trustworthy thieves is dangerous work, and the relic hunter can navigate those troubled waters with relative ease. Their knowledge of high society can be an asset in these situations.',
      Skill.Lore,
      TalentsHelper.getTalent('Scribe'),
      [Skill.Counsel, Skill.Observation, Skill.Society, Skill.Thievery],
      [Skill.Acrobatics, Skill.Craft, Skill.Stealth],
      [
        'Sword|Two daggers',
        'Set of expensive clothes',
        'Set of common digging garments',
        'Mapmaking tools',
        'Excavation tools',
        "Traveler's survival kit",
        'Riding horse|Donkey',
      ],
      99,
      Source.Thief
    ),
    [Archetype.Spy]: new ArchetypeModel(
      'Spy',
      'In the civilized kingdoms of the world, there is overt diplomacy, often carried out in arranged marriages, exchanges of gifts, and bequeathing holdings.Then there is covert diplomacy, conducted by men with no name, who pry secrets from unwilling lips and bring them back to their masters to use as leverage in the next round of negotiations. Wherever there is politics, there is a need for spies. Spies and thieves spend a great deal of time together and, for those thieves who can restrict their urge to pilfer from pockets (unless absolutely necessary), spying can provide a path to a slightly more respectable way of life. If you survive long enough, of course.Thieves guilds also use spies, to ensure that the nobility isn’t considering doing anything stupid like “cleansing the streets”. Influence is power and spies are the ones who use it best.',
      Skill.Observation,
      TalentsHelper.getTalent('Sharp Senses'),
      [Skill.Linguistics, Skill.Persuade, Skill.Society, Skill.Stealth],
      [Skill.Lore, Skill.Melee, Skill.Thievery],
      [
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Heavy clothing',
        "Thieves' kit",
        'Set of plain clothes',
        "Traveler's survival kit",
        'Riding horse|Donkey',
      ],
      99,
      Source.Thief
    ),
    [Archetype.Bard]: new ArchetypeModel(
      'Bard',
      'Blessed with a pleasant demeanor and a gift for words or music, you have made entertainment your trade, whether as a minstrel playing a musical instrument or reciting the sagas and stories of your people. You can create new stories and compositions or recite those you were taught, and for this you are afforded a level of respect and accommodation beyond that which others of your station receive.',
      Skill.Persuade,
      TalentsHelper.getTalent('Skald'),
      [Skill.Insight, Skill.Craft, Skill.Lore, Skill.Society],
      [Skill.Acrobatics, Skill.Linguistics, Skill.Counsel],
      [
        'Fine suit of clothing',
        'Traveling clothes and sling bag|Several sets of normal clothing and wooden chest',
        'Drum|Harp|Horn',
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Riding horse',
      ],
      99,
      Source.Barbarian
    ),
    [Archetype.Hunter]: new ArchetypeModel(
      'Hunter',
      'Trained to identify the marks of wildlife, to hunt them with bow or to trap them, you are more at home in the wild than in the confines of society. Your abilities may be put to use feeding your village, or you may choose to use your skills to obtain wild animals dead or alive, either for their hides or as specimens for southern bestiaries and menageries.',
      Skill.Ranged_Weapons,
      TalentsHelper.getTalent('Accurate'),
      [Skill.Discipline, Skill.Observation, Skill.Stealth, Skill.Survival],
      [Skill.Animal_Handling, Skill.Craft, Skill.Melee],
      [
        'Bow and reloads (2)',
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Long skinning knife',
        'Warm hooded cloak and leather cloaks and furs (Armor: 1; Torso/Arms/Legs)',
        'Bedroll and sling bag',
        'Two riding horses',
        'Animal traps (3)',
      ],
      99,
      Source.Barbarian
    ),
    [Archetype.Raider]: new ArchetypeModel(
      'Raider',
      'Whether a Vanir sea-reaver roaming the fjords in a dragon-prowed longship or a Hyperborean slave-taker in search of chattel, you are a raider, a specialized warrior trained in skirmishing and close combat. Yours is not the campaign trail, or dull hours standing at watch. In pitched combat, you strike quickly and seize your intended bounty, be it wealth or captives, leaving fear in your wake.',
      Skill.Melee,
      TalentsHelper.getTalent('No Mercy'),
      [Skill.Athletics, Skill.Parry, Skill.Ranged_Weapons, Skill.Siegecraft],
      [Skill.Acrobatics, Skill.Resistance, Skill.Stealth],
      [
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Target shield',
        'Full suit of brigandine (Armor 2: Torso/Arms/Legs)|Mail vest (Armor 3: Torso; Noisy) and a helmet (Armor 3: Head; Heavy)',
      ],
      99,
      Source.Barbarian
    ),
    [Archetype.Slaver]: new ArchetypeModel(
      'Slaver',
      'You are adept in the handling and selling of slaves. Perhaps you were the child of a slaver, or slave-born yourself. However you came into the profession, you learned the harsh trade and know how to capture and transport slaves, keep them in line, prepare them for sale, and how to extract the best price for their flesh. Your particular trade is despised throughout many of the Hyborian nations — including Nordheim (where thralldom is different) and especially Cimmeria — despite their acceptance of the institution of slavery itself, but you do not let that deter you from making a profit.',
      Skill.Resistance,
      TalentsHelper.getTalent('Hardy'),
      [Skill.Command, Skill.Craft, Skill.Melee, Skill.Persuade],
      [Skill.Discipline, Skill.Observation, Skill.Stealth],
      [
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Padded tunic (Armor 1: Torso/Arms)',
        'Manacles and chains',
        'Whip/Lash',
        'Riding horse',
      ],
      99,
      Source.Barbarian
    ),
    [Archetype.Alchemist]: new ArchetypeModel(
      'Alchemist',
      'Sitting amongst braziers and oils, the alchemist stirs the mixture, waiting for the metal in the fire to glow, so that a turn of a screw might preserve the mixture for the next stage. The metal glows, the ratchet turns, wine is sipped, and the process is renewed. The moon sets on another night spent ennobling metals. While much of the population calls you a wizard, you know that, unlike mere ritual, there is method and procedure governing your works. You might not understand why a cause commands an effect, but they’re recorded, confirmed, and you have mastered their preparation and use.',
      Skill.Alchemy,
      TalentsHelper.getTalent('Alchemist'),
      [Skill.Counsel, Skill.Healing, Skill.Persuade, Skill.Society],
      [Skill.Animal_Handling, Skill.Sorcery, Skill.Thievery],
      [
        'Alchemical laboratory',
        'Alchemical field laboratory',
        'Personal library',
        'Seasonal clothing',
        'Traveling gear',
        'Mule|Horse',
        '3 ingredients',
      ],
      99,
      Source.Skelos
    ),
    [Archetype.Charlatan]: new ArchetypeModel(
      'Charlatan',
      '“Behold my curative powers. I command you Bezoar, Picatrix, Gastrolith! Infuse this medicine with your power! Quickly drink this concoction, and you will feel no pain or fear. Yes… I can see its working! Are the aches dying away? No… that bottle is a gift. You’ll not need to pay for it. Still, if you would have more, I’d be happy to add some of your goats to my caravan.” You’re not a wizard or a sorcerer, but there are plenty who will pay you to pretend to be one. Why work for a living when you can just wave your hands? Most fools could not tell real magic from what you engineer by imagination alone.',
      Skill.Persuade,
      TalentsHelper.getTalent('Force of Presence'),
      [Skill.Insight, Skill.Society, Skill.Stealth, Skill.Thievery],
      [Skill.Alchemy, Skill.Healing, Skill.Lore],
      [
        'Personal library of fake lore',
        'Seasonal clothing',
        'Traveling gear',
        'Fast riding horse',
        'Several bottles of colored water or similar gimmicks',
        "Portable alchemical laboratory|Personal library|Healer's bag",
        "Portable alchemical laboratory|Personal library|Healer's bag",
      ],
      99,
      Source.Skelos
    ),
    [Archetype.Sage]: new ArchetypeModel(
      'Sage',
      'When powerful people need answers, you are the one they seek and while sorcery is dangerous, little else offers the opportunity to learn more about the world. You pursue knowledge for your own reasons, but the pursuit is an obsession willingly financed by kings and would-be rulers.',
      Skill.Lore,
      TalentsHelper.getTalent('Scribe'),
      [Skill.Sorcery, Skill.Alchemy, Skill.Insight, Skill.Persuade],
      [Skill.Insight, Skill.Lore, Skill.Society],
      [
        'Sorcerous accoutrements',
        'Personal library',
        'Seasonal clothing',
        'Traveling gear',
        'Mule|Horse',
        '1 ingredient',
      ],
      99,
      Source.Skelos
    ),
    [Archetype.Sorcerer]: new ArchetypeModel(
      'Sorcerer',
      'Delving through broken ruins or drunk on their own power, sorcerers are a constant threat to the kingdoms of the Hyborian Age. Each sorcerer is born out of their own obsessions and, even though some might be useful or even amicable in nature, they should be watched for the moment that their sanity fades. Then, one ceases to be companion and becomes the sacrifice!',
      Skill.Sorcery,
      TalentsHelper.getTalent('Patron'),
      [Skill.Alchemy, Skill.Counsel, Skill.Healing, Skill.Lore],
      [Skill.Animal_Handling, Skill.Command, Skill.Thievery],
      [
        'Sorcerous accoutrements',
        'Personal library',
        'Seasonal clothing',
        'Traveling gear',
        'Mule|Horse',
        '3 offerings',
      ],
      99,
      Source.Skelos
    ),
    [Archetype.WitchDoctor]: new ArchetypeModel(
      'Witch Doctor',
      'In the Black Kingdoms, there is no distinction between healer and wizard. If you are a doctor, you are expected to cope with the root cause of all maladies including those inflicted by curse or animistic spirit. When the curses are lifted, it becomes the responsibility of the witch doctor to find the culprit and ensure such things can never happen again. The tradition of the witch doctor may be a local phenomenon, but there are healers in many lands who take up sorcery in the hopes of finding miracle cures. Many are embittered when these promises turn out to be empty.',
      Skill.Healing,
      TalentsHelper.getTalent('Bind Wounds'),
      [Skill.Insight, Skill.Observation, Skill.Lore, Skill.Sorcery],
      [Skill.Animal_Handling, Skill.Counsel, Skill.Survival],
      [
        'Sorcerous accoutrements',
        "Healer's bag with 3 doses of medicine",
        'Seasonal clothing',
        'Traveling gear',
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Bow|Sling',
        'Suitable beast of burden|Hand cart',
      ],
      99,
      Source.Skelos
    ),
    [Archetype.Asshuri]: new ArchetypeModel(
      'Asshuri',
      'These proud warriors are usually Shemitish: rarely are outsiders inducted into their ranks. Trained from birth, they are fiercely devoted to their companies. Life in the asshuri instills camaraderie and discipline. Those who leave find work as mercenaries. Outside of Shem, many asshuri refuse to fight against other asshuri, though inside Shem they are all-too-willing to do so.',
      Skill.Ranged_Weapons,
      TalentsHelper.getTalent('Accurate'),
      [Skill.Animal_Handling, Skill.Melee, Skill.Parry, Skill.Survival],
      [Skill.Command, Skill.Observation, Skill.Siegecraft],
      [
        'Scale hauberk with helm (Armor 3: Torso/Head)',
        'Shortsword',
        'Dagger',
        'Shield',
        'Shemite Bow',
        '3 reloads of arrows',
        'Riding horse',
        'Desert robes',
      ],
      99,
      Source.Mercenary
    ),
    [Archetype.Captain]: new ArchetypeModel(
      'Captain',
      'Ruthless, intelligent, and committed to the job — so long as it pays — the captain leads a company of mercenaries, negotiating for contracts and ensuring they are carried out. A captain must balance loyalties: to gold, to their troops, and to their mission. While gold comes in, the captain is beloved. If fortunes change, a captain may end up murdered by their own company. Captains are found in taverns, barracks, prisons, and even royal courts — their skill at arms matched by their ability to negotiate a deal and to recruiting those to earn it for them. Between jobs or even armies, a captain is always alert, aware, and ready for opportunity.',
      Skill.Siegecraft,
      TalentsHelper.getTalent('Strategist'),
      [Skill.Parry, Skill.Melee, Skill.Persuade, Skill.Command],
      [Skill.Acrobatics, Skill.Stealth, Skill.Counsel],
      [
        'Mail coat and helmet (Armor 3: Arms/Torso/Legs/Head; Heavy)',
        EquipmentHelper.getAllWeapons() + '|' + EquipmentHelper.getShields(),
        EquipmentHelper.getAllWeapons() + '|' + EquipmentHelper.getShields(),
        'Riding horse',
        'Clothing',
        'Maps of the current region',
      ],
      99,
      Source.Mercenary
    ),
    [Archetype.Champion]: new ArchetypeModel(
      'Champion',
      'The champion is not merely accustomed to combat, but is seemingly born to it. Every mercenary company has their “best”, and others waiting in their shadow to claim that title. Thus, every champion knows that their days are numbered. Only in legends are warriors immortalized, and those who fight for coin must be very great to merit any such fame. Standing armies also have champions, but they serve their ruler, not themselves.',
      Skill.Melee,
      TalentsHelper.getTalent('No Mercy'),
      [Skill.Acrobatics, Skill.Discipline, Skill.Parry, Skill.Resistance],
      [Skill.Command, Skill.Persuade, Skill.Siegecraft],
      [
        'Mail hauberk with coif (Armor 3: Head/Arms/Torso; Heavy)',
        'Battleaxe|Broadsword|Two-handed sword',
        'Dagger',
        'Shield',
        'Riding horse',
        'Fine clothing',
      ],
      99,
      Source.Mercenary
    ),
    [Archetype.Messenger]: new ArchetypeModel(
      'Messenger',
      'Battle is frenzy; a chaos in which commanders attempt to impose order. During a fray, flags, horns, drums, and screams are signals of command, but are limited in range and usefulness. The messenger can carry complex orders and news. They are adept riders, bold enough to cross battlefields, directly through the enemy ranks if need be. Some are tricky, larcenous sorts, others hardened at survival, while others are experienced soldiers, fleeter of foot than with a blade.',
      Skill.Animal_Handling,
      TalentsHelper.getTalent('Born in the Saddle'),
      [Skill.Athletics, Skill.Linguistics, Skill.Ranged_Weapons, Skill.Survival],
      [Skill.Acrobatics, Skill.Healing, Skill.Melee],
      [
        'Brigandine vest (Armor 2: Torso) and helmet (Armor 3: Head; Heavy)',
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Spear|Lance|Hunting Bow (1 load of arrows)',
        'Fast horse',
        'Survival kit',
      ],
      99,
      Source.Mercenary
    ),
    [Archetype.UnseasonedYouth]: new ArchetypeModel(
      'Unseasoned Youth',
      'Every soldier begins somewhere. Every scarred veteran once had the smooth, unsullied face of youth. Camp boys in the tross dream of becoming real mercenaries or soldiers. They lack the wisdom born of experience, or the rightful fear of death, but what they do have is vitality and enthusiasm. Most are barely out of childhood, though they are all-too-willing to fight, and to prove themselves to the old grognards and veterans in the company. Those who survive become dog-brothers or sword-sisters, and those who do not are forgotten.',
      Skill.Acrobatics,
      TalentsHelper.getTalent('Agile'),
      [Skill.Athletics, Skill.Persuade, Skill.Melee, Skill.Society],
      [Skill.Animal_Handling, Skill.Parry, Skill.Stealth],
      [
        'Sword',
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Cheap riding horse',
        'Heavy clothing and set of spare clothing',
      ],
      99,
      Source.Mercenary
    ),
    [Archetype.Veteran]: new ArchetypeModel(
      'Veteran',
      'A soldier who has seen more wars than winters garners respect. Those who have seen many of each are approached with caution. Their best days are behind them, but the veteran can still split a foe’s skull to the teeth with the broadsword at their side. With wisdom born of bitter experience, the veteran is less inclined to charge headlong into certain death, and for this, they are respected by others in their company.',
      Skill.Society,
      TalentsHelper.getTalent('A Modicum of Comfort'),
      [Skill.Insight, Skill.Parry, Skill.Persuade, Skill.Thievery],
      [Skill.Counsel, Skill.Observation, Skill.Stealth],
      [
        'Brigandine jacket (Armor 2: Torso/Arms)',
        'Mace|Club',
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Cheap riding horse',
        'Cheap clothes with military insigna of dubious origin',
      ],
      99,
      Source.Mercenary
    ),
    [Archetype.GalleySlave]: new ArchetypeModel(
      'Galley Slave',
      'You were chained to the oar of a slave galley, a punishing life and a certain death. Your skin is burnt dark by the ever-present sun and exposure, and marked with the cruel lines of the lash. However, this experience fills you with a savage determination to survive. Somehow, you won your freedom. Where you go next is up to you. Do you seek vengeance… or will you instead search for glory, loot, and adventure?',
      Skill.Resistance,
      TalentsHelper.getTalent('Hardy'),
      [Skill.Athletics, Skill.Discipline, Skill.Persuade, Skill.Sailing],
      [Skill.Insight, Skill.Observation, Skill.Stealth],
      ['Knife|Club', 'Worn clothes', 'Curious amulet snatched from your brutal slavers'],
      99,
      Source.Pirate
    ),
    [Archetype.Mariner]: new ArchetypeModel(
      'Mariner',
      'You went to sea at a young age, either born on a coast and following a family tradition or through your own volition. Once on the decks, surrounded by a fraternity of sea-goers, you realized you were home, and thus you have stayed. Whether you sailed on fishing boats, merchant vessels, or warships, you know the ropes, and cannot imagine life on land. You thrive under the routine of shipboard duties and chores, and have thrilled when cutlasses came out and the waters ran red beneath the hull of your ship and those it fought. You know how to sail along the coasts, and you know your way around the docks in the ports that you’ve visited, far better than you know the streets of the cities beyond. The countryside itself is a strange vista, whereas you find yourself quite at home riding upon the dark waters of the Western Ocean or the Vilayet Sea.',
      Skill.Sailing,
      TalentsHelper.getTalent('Sailor'),
      [Skill.Athletics, Skill.Craft, Skill.Discipline, Skill.Survival],
      [Skill.Command, Skill.Society, Skill.Stealth],
      [
        'Knife',
        'Few sets of plain traveling clothes',
        EquipmentHelper.getKitsForSkills([Skill.Athletics, Skill.Command, Skill.Stealth, Skill.Survival]),
      ],
      99,
      Source.Pirate
    ),
    [Archetype.MerchantCaptain]: new ArchetypeModel(
      'Merchant Captain',
      'You’ve made a living on the sea trading goods along the coast. You may know all the ports along the Western Sea, or you may have merely sailed between Messantia and Asgalun. You’re an able seaman, captain, and merchant, ready to either ride out a storm or invest in goods that fetch a fine price in Kordava.',
      Skill.Society,
      TalentsHelper.getTalent('A Modicum of Comfort'),
      [Skill.Command, Skill.Insight, Skill.Persuade, Skill.Sailing],
      [Skill.Craft, Skill.Discipline, Skill.Observation],
      [
        'Sword|Knife',
        'Several sets of plain traveling clothes',
        'Suit of decent clothing',
        'Sea chest',
        'A share in a small merchant watercraft',
      ],
      99,
      Source.Pirate
    ),
    [Archetype.Smuggler]: new ArchetypeModel(
      'Smuggler',
      'You know the secret ways along the coast, the secluded coves, the guards you can readily bribe to look the other way, and how to sneak items into and out of a city. You know how to covertly move goods, whether to avoid the tax collector or some other officious lout. Evading both tax and law, while avoiding the noose, is your reason for being.',
      Skill.Stealth,
      TalentsHelper.getTalent('Living Shadow'),
      [Skill.Discipline, Skill.Observation, Skill.Persuade, Skill.Thievery],
      [Skill.Insight, Skill.Sailing, Skill.Society],
      [
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Several sets of plain traveling clothes, one set in dark color',
        'Mule|Camel|Canoe|Rowboat',
      ],
      99,
      Source.Pirate
    ),
    [Archetype.Cultist]: new ArchetypeModel(
      'Cultist',
      'The cult is your home, your family, your reason for being. Raised within the faith, you owe everything to your fellow devotees and the priests that lead the temple. Such is the strength of your belief in your patron deity that it defines your life — you work within the cult for its prosperity and strive to enact its precepts in the world, whether benevolent or malign.',
      Skill.Discipline,
      TalentsHelper.getTalent('Courageous'),
      [Skill.Counsel, Skill.Insight, Skill.Lore, Skill.Persuade],
      [Skill.Observation, Skill.Society, Skill.Sorcery],
      [
        'Religious icon|Religious symbol',
        'Holy scroll|Small devotional book',
        'Ceremonial robe and a change of clothing',
        'Dagger|Knife',
        'Riding horse',
      ],
      99,
      Source.Cults
    ),
    [Archetype.Oracle]: new ArchetypeModel(
      'Oracle',
      'All your life you have had a sense for that which you could not otherwise be aware of: you have seen into the hearts of others, into faraway lands, back into a secrecy-veiled past, or into the unknowable future. Obviously, one or more gods are speaking through you. For this gift you are lauded and feted within your cult, but this has set you apart from humankind, an unbearable isolation. And thus, you have fled the cult, going forth into the world to experience life as others do.',
      Skill.Insight,
      TalentsHelper.getTalent('Sixth Sense'),
      [Skill.Counsel, Skill.Discipline, Skill.Lore, Skill.Observation],
      [Skill.Linguistics, Skill.Persuade, Skill.Sorcery],
      ['Robe and change of clothes', 'Staff', 'Dagger|Knife', 'A stolen horse'],
      99,
      Source.Cults
    ),
    [Archetype.Philosopher]: new ArchetypeModel(
      'Philosopher',
      'In others, spirituality is governed by emotion, but your beliefs about the universe stem from reason. Though your beliefs are as heartfelt as faith, you use your intellect to divine the higher world, attempting to answer life’s ineffable questions through study and rationality. Your theories, however, require testing in the crucible of the real world, so you wander, seeking to prove your philosophies.',
      Skill.Counsel,
      TalentsHelper.getTalent('Quiet Wisdom'),
      [Skill.Discipline, Skill.Insight, Skill.Lore, Skill.Persuade],
      [Skill.Alchemy, Skill.Linguistics, Skill.Sorcery],
      [
        'Walking staff',
        'Low wooden platform to stand upon',
        'Comfortable clothes',
        'Selection of books, scrolls, paper and writing implements',
      ],
      99,
      Source.Cults
    ),
    [Archetype.Pilgrim]: new ArchetypeModel(
      'Pilgrim',
      'Not content to remain in your homeland within the comforting embrace of your home temple and cult, you have set forth across the continent — perhaps even the world — on a spiritual journey. You may be seeking enlightenment through experience, an encounter with the divine, or you are on a path to visit one or more holy sites. Your faith is unshakable, but can mere mortal flesh carry you far enough?',
      Skill.Survival,
      TalentsHelper.getTalent('Born Wild'),
      [Skill.Insight, Skill.Linguistics, Skill.Lore, Skill.Parry],
      [Skill.Discipline, Skill.Stealth, Skill.Sorcery],
      [
        'Walking staff',
        'Dagger',
        'Religious symbol|Religious icon',
        'Riding horse|Pack mule',
        'Religious vestments',
        'Comfortable travel garb',
      ],
      99,
      Source.Cults
    ),
    [Archetype.Entertainer]: new ArchetypeModel(
      'Entertainer',
      'Wherever there are people, there is the need to entertain. Cultures large enough can support such individuals, whether singers, dancers, actors, musicians, or other performers of acrobatics, feats of dexterity and skill, or even mimicry. You have dedicated your life to learning how to read a crowd and perform before them, whether out of some ritual duty, for your profession, or because you are driven by a creative muse. Perhaps you are even one of the famed dancers of Zamboula.',
      Skill.Persuade,
      TalentsHelper.getTalent('Force of Presence'),
      [Skill.Acrobatics, Skill.Craft, Skill.Insight, Skill.Observation],
      [Skill.Athletics, Skill.Melee, Skill.Thievery],
      [
        'Fine clothing',
        'Satchel',
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Keepsake from a favored patron',
        'Makeup and scent oils',
        'Drum|Harp|Flute|Maracas',
      ],
      99,
      Source.Brigand
    ),
    [Archetype.Kozaki]: new ArchetypeModel(
      'Kozaki',
      'The dread kozaki — whose name means “wastrel” — are the most infamous of all the brigands west of the Vilayet. Some say they are born in the saddle, though they have only been a recognizable force for perhaps fifty years. Masters of banditry, the kozaki are like a sudden squall — they appear from seeming calm, wreak havoc, and leave devastation in their wake. Among their numbers are the worst scoundrels of the Hyborian Age, though bound by the kozak code. Every kozak can survive in the steppes, has killed many foes, burned caravans and towns, and slain anything or anyone who gets in their way.',
      Skill.Animal_Handling,
      TalentsHelper.getTalent('Born in the Saddle'),
      [Skill.Melee, Skill.Ranged_Weapons, Skill.Resistance, Skill.Survival],
      [Skill.Observation, Skill.Parry, Skill.Stealth],
      [
        'Desert robes',
        'Brigandine jacket (Armor 2: Torso/Arms)',
        'Saber',
        'Cherkess Knife',
        'Hunting Bow',
        'Riding horse',
        'Water-skin',
        'Minor trophies taken from victims',
      ],
      99,
      Source.Brigand
    ),
    [Archetype.Merchant]: new ArchetypeModel(
      'Merchant',
      'It is rare for a shop-owner or trader to find adventure, but it is not unheard of. There is no greater venture than staking one’s life in a small shop or stand, selling goods, and trusting to one’s instincts that what they have is worth selling, and thus some merchants find it easy enough to sidle into danger, dealing with rough customers in search of bargains, or even — having lost everything — finding a life of danger more to their liking. Some others use their positions as fixtures within the community to conceal illicit activities, such as theft or worse.',
      Skill.Persuade,
      TalentsHelper.getTalent('Force of Presence'),
      [Skill.Craft, Skill.Insight, Skill.Lore, Skill.Society],
      [Skill.Discipline, Skill.Linguistics, Skill.Thievery],
      [
        'Knife',
        "Merchant's garb and apron",
        'Riding horse',
        '50 Gold line credit with fellow merchants or trade guilds',
      ],
      99,
      Source.Brigand
    ),
    [Archetype.Torturer]: new ArchetypeModel(
      'Torturer',
      'Many would call this an ignoble profession, but it is nonetheless an essential one, for there is always a need for those who practice the specialized alchemy of adding pain to flesh and spirit, and, from it, producing truth. Trained in the art of physical and psychological torment — knowing when to exert pain and when a mere threat will do — the torturer is also adept in seeing into the heart of the subject and determining their measure and separating lies from honesty. At times, the torturer doubles as an executioner, and within the cult of Yajur, the stranglers are venerated.',
      Skill.Insight,
      TalentsHelper.getTalent('Sixth Sense'),
      [Skill.Counsel, Skill.Healing, Skill.Observation, Skill.Persuade],
      [Skill.Craft, Skill.Linguistics, Skill.Melee],
      [
        "Torturer's garments",
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Torture devices',
        'Manacles',
      ],
      99,
      Source.Brigand
    ),
    [Archetype.Beast]: new ArchetypeModel(
      'Beast',
      'Whether you were raised in the wild or isolated for long enough that you passed beyond savagery, you barely acknowledge any affinity to other humans, and even find yourself deeply uncomfortable when surrounded by people or their works. Animals recognize you as something other, something to be even more wary of!',
      Skill.Survival,
      TalentsHelper.getTalent('Born Wild'),
      [Skill.Animal_Handling, Skill.Athletics, Skill.Parry, Skill.Resistance],
      [Skill.Acrobatics, Skill.Melee, Skill.Stealth],
      [
        'Primitive Club',
        'Primitive Knife',
        'Rough rags|Scraps of animal skin',
        'Mysterious keepsake from parents you never knew',
      ],
      99,
      Source.Beastmasters
    ),
    [Archetype.BeastMaster]: new ArchetypeModel(
      'Beast Master',
      'Given the choice, you’d rather spend your time with animals. They make more sense to you. Whether you are a seasoned huntsman or a savage from the fiercest jungles, the beast master is the ultimate expression of the partnership between human — and animal-kind.',
      Skill.Animal_Handling,
      TalentsHelper.getTalent('Born in the Saddle'),
      [Skill.Acrobatics, Skill.Athletics, Skill.Stealth, Skill.Survival],
      [Skill.Healing, Skill.Melee, Skill.Parry],
      [
        'Seasonally appropriate clothing',
        'Whip',
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Full suit of brigandine (Armor 2: Torso/Arms/Legs)|Heavy clothing (Armor 1: Torso/Arms/Legs)',
        'Survival kit',
        EquipmentHelper.getAnimals(),
        EquipmentHelper.getAnimals(),
        EquipmentHelper.getAnimals(),
      ],
      99,
      Source.Beastmasters
    ),
    [Archetype.Explorer]: new ArchetypeModel(
      'Explorer',
      'You are driven to seek out the unknown parts of the world, to step into places where no civilized person has trodden. Ancient temples, lost cities, unmapped wilderness… these all beckon to you, making you risk everything to do what none have done before, but you would choose no other path. The world is only as big as it is known, and with every new discovery you make the world a larger place.',
      Skill.Observation,
      TalentsHelper.getTalent('Sharp Senses'),
      [Skill.Linguistics, Skill.Lore, Skill.Stealth, Skill.Survival],
      [Skill.Athletics, Skill.Ranged_Weapons, Skill.Sailing],
      [
        'Knife',
        'Hunting Bow',
        'Quiver with 3 reloads',
        'Walking staff',
        'Sturdy travel garb',
        'Maps of nearby territories',
        'Lodestone',
        'Flint and tinder',
        'Rations',
        'Water skin',
        'Riding horse',
      ],
      99,
      Source.Scout
    ),
    [Archetype.Missionary]: new ArchetypeModel(
      'Missionary',
      'Your god’s light shines within you, and you are eager to share it with the disbelievers, the ignorant, and the heathens. Most likely, you serve Mitra, as few others save for perhaps Ishtar or Ibis send pilgrims into new lands. Though your command of doctrine is not as deep as that of the temple priests and priestesses, your zeal is far greater. Most of your time is spent ministering and teaching, preaching to those who have yet to be converted. You carry little, as your god provides all you need.',
      Skill.Persuade,
      TalentsHelper.getTalent('Force of Presence'),
      [Skill.Counsel, Skill.Craft, Skill.Linguistics, Skill.Lore],
      [Skill.Command, Skill.Insight, Skill.Society],
      [
        'Humble robes',
        "Copy of your faith's scriptures",
        'Icon of your god|Symbol of your god',
        'Bedroll',
        'Walking staff',
      ],
      99,
      Source.Scout
    ),
    [Archetype.Scout]: new ArchetypeModel(
      'Scout',
      'You feel at home in the wilderness, and can venture deep into unknown territory and return safely, gaining an insight into the land and the movement of native animals and peoples. Your wits and a sharp blade are all that stand between you and death, with wild beasts and fierce Picts willing to slay you for trespassing into their lands.',
      Skill.Survival,
      TalentsHelper.getTalent('Born Wild'),
      [Skill.Athletics, Skill.Observation, Skill.Ranged_Weapons, Skill.Stealth],
      [Skill.Animal_Handling, Skill.Craft, Skill.Resistance],
      [
        'Hatchet|Short Sword',
        'Knife',
        'Hunting Bow',
        'Quiver with 3 reloads',
        'Buckskins (Armor 1: Arms/Legs/Torso)',
        'Hardtack for a few days|Rations for a few days',
      ],
      99,
      Source.Scout
    ),
    [Archetype.Trader]: new ArchetypeModel(
      'Trader',
      'Equal parts diplomat, explorer, and scout, you are adept at finding new territories and customers to sell your wares to, and at determining the worth of any goods these new customers might have to offer. You know the markets of the civilized and uncivilized world, and have a keen sense about how to turn a profit from any situation.',
      Skill.Persuade,
      TalentsHelper.getTalent('Force of Presence'),
      [Skill.Insight, Skill.Linguistics, Skill.Lore, Skill.Society],
      [Skill.Craft, Skill.Survival, Skill.Thievery],
      ['Dagger', 'Fine clothing', 'Travel clothing', 'Network of business contacts', 'Water skin'],
      99,
      Source.Scout
    ),
    [Archetype.Beggar]: new ArchetypeModel(
      'Beggar',
      'You are unseen by the folk of the cities, like a door they pass every day but never notice. You are the background of the world, and that allows you to be the eyes and ears of a network of your ilk who trade in information. Who cares what the beggar hears? No court would hear a beggar speaking about a witnessed murder. You are without caste or have been exiled from your own. As such, you are without identity. That ostensibly makes you unimportant, but there are many of you. You traffic in the secrets of those who do matter, and from this amass your own kind of power',
      Skill.Thievery,
      TalentsHelper.getTalent('Thief'),
      [Skill.Insight, Skill.Observation, Skill.Persuade, Skill.Stealth],
      [Skill.Acrobatics, Skill.Linguistics, Skill.Survival],
      ['Tattered, dirty clothing', 'Begging bowl', 'Bandages|Crutch|Walking cart', 'Rusty Knife'],
      99,
      Source.Wanderer
    ),
    [Archetype.CourtOfficial]: new ArchetypeModel(
      'Court Official',
      'You are at home in the court of a truly civilized land, whether within Iranistan, Khitai, Vendhya, or elsewhere, accustomed to a life of relative material ease, though one just as perilous as any battlefield. One ill-considered remark or unwitting rebuke and you may find yourself exiled, imprisoned, or even kneeling before the imperial headsman. Within your office, your role is to see that the will of your ruler is obeyed and facilitated to the letter, or to find someone to blame if it is not. ',
      Skill.Society,
      TalentsHelper.getTalent('A Modicum of Comfort'),
      [Skill.Command, Skill.Linguistics, Skill.Lore, Skill.Persuade],
      [Skill.Counsel, Skill.Craft, Skill.Insight],
      [
        'Set of courtly garments',
        'Elaborate hat denoting status',
        'Street clothing and simple disguise',
        'Paper and writing equipment',
        'Seal and ink for your office',
        EquipmentHelper.getCeremonialWeapons(),
      ],
      99,
      Source.Wanderer
    ),
    [Archetype.Emissary]: new ArchetypeModel(
      'Emissary',
      'Whether born into the role or appointed as a sign of political favor (or even disfavor), you are a herald of the court of your native land, expected to represent and bear messages from your ruler to another court. You are accustomed to speaking with some measure of authority, and demand that you be treated with respect and hospitality, even if you bear ill news or your kingdoms are not allied. Even if accompanied with guards when traveling, you can defend yourself if need be. ',
      Skill.Persuade,
      TalentsHelper.getTalent('Force of Presence'),
      [Skill.Command, Skill.Linguistics, Skill.Observation, Skill.Society],
      [Skill.Counsel, Skill.Melee, Skill.Survival],
      [
        'Set of courtly garments',
        'Traveling clothes',
        'Armored breastplate (Armor 4: Torso) and helmet (Armor 3: Head)',
        'Riding horse',
        EquipmentHelper.getOneHandedWeapons() + '|' + EquipmentHelper.getShields(),
        'Sigil of your ruler',
      ],
      99,
      Source.Wanderer
    ),
    [Archetype.HorseNomad]: new ArchetypeModel(
      'Horse Nomad',
      'You have known nothing but the steppes throughout your life, growing up amidst a nomadic people in the vast panorama of sweeping plains and low hills. Perhaps you have enjoyed a relatively peaceful existence, or your tribe may have been in savage conflict with other nomads or even the folk of civilized kingdoms. The continual need to migrate, hunt, and forage for survival is a repetitious existence, but nonetheless it has made you an expert rider and, hunter, and taught you much about the natural world. Now you have, for reasons of your own, forsaken your tribe to see what civilization has to offer. Thus far, you are not impressed. ',
      Skill.Animal_Handling,
      TalentsHelper.getTalent('Born in the Saddle'),
      [Skill.Athletics, Skill.Observation, Skill.Ranged_Weapons, Skill.Survival],
      [Skill.Craft, Skill.Discipline, Skill.Melee],
      [
        'Fine riding horse',
        'Riding clothes and fur cap',
        'Leather hauberk (Armor 2: Torso/Arms)',
        this.HOMELAND_BOW,
        '4 Reloads for bow',
        EquipmentHelper.getOneHandedWeapons() + '|' + EquipmentHelper.getShields(),
        'Water skin and dried horse meat for several days',
      ],
      99,
      Source.Wanderer
    ),
    [Archetype.Mystic]: new ArchetypeModel(
      'Mystic',
      'Whether an ascetic, fakir, lama, monk, or other such holy one, you are steeped in the divine magical traditions of your homeland. You spend your time contemplating the mysteries of your patron god or cosmology, often in a meditative state, and you have devoted yourself to esoteric spirituality as a means of understanding the divine. While you may know sorcery, it is but a tool to bring yourself closer to unlocking the mysteries of existence, rather than a means of seeking power. Perhaps you have left a monastic existence as a means of seeking knowledge of the world, or tragedy has thrust you into it. ',
      Skill.Sorcery,
      TalentsHelper.getTalent('True Understanding'),
      [Skill.Counsel, Skill.Discipline, Skill.Insight, Skill.Lore],
      [Skill.Alchemy, Skill.Craft, Skill.Observation],
      ['Simple robes', 'Prayer mat', 'Sacred texts from your faith', 'Holy symbol of your faith', 'Walking staff'],
      99,
      Source.Wanderer
    ),
    [Archetype.Vagabond]: new ArchetypeModel(
      'Vagabond',
      'Some travel for commerce, war, or for duty, and there are those who travel because they must. Like leaves on the wind, these people move by whim and chance, not intentional purpose. Yet in the journey, the purpose may be revealed by the journey itself. Vagabonds know many things. They have seen many great peaks and low defiles. They have exchanged coin and love and blood with people of a dozen kingdoms, and they want more. Wanderlust propels the vagabond who, while traveling light, accrues an impressive collection intangible to others — memories and experiences that they would not trade for anything. ',
      Skill.Observation,
      TalentsHelper.getTalent('Sharp Senses'),
      [Skill.Animal_Handling, Skill.Linguistics, Skill.Lore, Skill.Survival],
      [Skill.Melee, Skill.Stealth, Skill.Thievery],
      [
        'Traveling clothes',
        'Walking staff',
        EquipmentHelper.getOneHandedWeapons() + '|' + EquipmentHelper.getShields(),
        'Riding horse|Pack mule',
        'Wineskin and several days of rations',
        'Several conflicting maps',
      ],
      99,
      Source.Wanderer
    ),
    [Archetype.Courtier]: new ArchetypeModel(
      'Courtier',
      'The courtier is a creature of the court, whether an aide to the monarch, a functionary, or someone whose presence adds to the status of the court. Many are of noble birth, but rarely are they the heir apparent to their household and seek a place within the court as a means of bettering their own station and, in some cases, that of their family. Couriers not coming from the nobility fill the ranks of squires, maidservants, clerks, agents, and especially favored servants. Most are expected to dwell within the court they serve, or have an estate nearby, and are often at the beck and call of their king or queen. Generally, courtiers spend their time serving the court in some fashion, attending functions and relaying messages, or sometimes merely adding to the quality of courtly life with their presence. ',
      Skill.Society,
      TalentsHelper.getTalent('A Modicum of Comfort'),
      [Skill.Insight, Skill.Lore, Skill.Observation, Skill.Persuade],
      [Skill.Counsel, Skill.Discipline, Skill.Stealth],
      ['Fine courtly clothing (several sets)', 'Dagger|Sword', 'Apartment in the palace|Apartment near the palace'],
      99,
      Source.King
    ),
    [Archetype.HealerPhysician]: new ArchetypeModel(
      'Healer',
      'Trained in the healing arts in a tradition appropriate to their homeland — whether physicking, herbalism and minor magic, or leech-craft — the healer has learned to administer to the injured, sick, and dying, binding their wounds, curing their ailments, and easing their pain. Whether this is done this out of compassion or scientific curiosity, the healer’s goal is ultimately the restoration of health, and if that cannot be attained, the cessation of misery. ',
      Skill.Healing,
      TalentsHelper.getTalent('Bind Wounds'),
      [Skill.Alchemy, Skill.Counsel, Skill.Insight, Skill.Persuade],
      [Skill.Craft, Skill.Lore, Skill.Survival],
      ["Healer's kit (4 reloads)", 'Healing poultices (4)', 'Appropriate garments', 'Knife'],
      99,
      Source.King
    ),
    [Archetype.Knight]: new ArchetypeModel(
      'Knight',
      'The epitome of the civilized world’s mounted cavalry, the knight dominates the battlefield, the thunder of the mounted charge striking terror into those on foot. Trained from youth in horsemanship, battle tactics, and weapon use, knights often put these skills to use in tournaments or as mercenaries, hiring themselves out in great companies. Some knights are of noble birth, landless and seeking acclaim and prestige on the path of iron, while others are essentially well-equipped mercenaries. ',
      Skill.Animal_Handling,
      TalentsHelper.getTalent('Born in the Saddle'),
      [Skill.Melee, Skill.Parry, Skill.Resistance, Skill.Siegecraft],
      [Skill.Command, Skill.Observation, Skill.Society],
      [
        'Full suit of plate armor (Armor 4: all locations)',
        EquipmentHelper.getOneHandedWeapons() + '|' + EquipmentHelper.getShields(),
        'Lance',
        'Lance',
        'Lance',
        'Shield',
        'Warhorse',
        'Riding horse',
      ],
      99,
      Source.King
    ),
    [Archetype.Minstrel]: new ArchetypeModel(
      'Minstrel',
      'The minstrel (or poet) has the ear of commoner and royalty alike, relaying messages to all with their art. Some compose their own verse, others sing ballads written by others, and some instead create poetry that can sway the fate of nations. Minstrels and poets alike are favored within most courts, not only entertaining and reflecting glory onto their patrons, but also speaking truth where others might dare not. Welcome at any event, they are often overlooked, and thus hear and see much when their hosts act unguardedly. They are generally passionate people and are oft drawn into conspiracies, usually unwisely. ',
      Skill.Persuade,
      TalentsHelper.getTalent('Force of Presence'),
      [Skill.Insight, Skill.Linguistics, Skill.Lore, Skill.Society],
      [Skill.Counsel, Skill.Discipline, Skill.Observation],
      ['Fine courtly clothing', 'Commoners garments', 'Lute|Harp|Flute|Drum|Tambourine', ''],
      99,
      Source.King
    ),
    [Archetype.Noble]: new ArchetypeModel(
      'Noble',
      'The noble is elevated by birth, one of the gentlefolk of their homeland, fortunate enough to be born with a title and wanting for little. Raised within a noble household or in the ruler’s court itself, the noble is a political creature by necessity, taught to wield influence as a weapon with a far-wider reach than mere steel. With this inheritance comes the right to a title and some degree of prestige, regardless of whether it came with any land or wealth. ',
      Skill.Society,
      TalentsHelper.getTalent('A Modicum of Comfort'),
      [Skill.Command, Skill.Persuade, Skill.Society, Skill.Siegecraft],
      [Skill.Command, Skill.Lore, Skill.Siegecraft],
      [
        'Fine clothing (several sets)',
        'Sword|Dagger',
        'Jeweled hilt on weapon (worth 3x more)',
        'Jewellery (worth 10 Gold)',
        'Signet ring',
        'Perfume',
        'Fine riding horse',
      ],
      99,
      Source.King
    ),
    [Archetype.Adventurer]: new ArchetypeModel(
      'Adventurer',
      'While most folk are content to live their lives within a short distance of where they were born, others must explore, discover, and give names to lost places and undiscovered territories. These folk are hardy, understanding how to survive, even thrive, in the wild. They seek fortune and glory, be it for themselves or their ancestors. The world to them is more interesting because of the dark places on the map from which only legend emerges. They seek to turn legend into truth and reclaim the past for the sake of tomorrow.',
      Skill.Survival,
      TalentsHelper.getTalent('Born Wild'),
      [Skill.Discipline, Skill.Melee, Skill.Observation, Skill.Resistance],
      [Skill.Athletics, Skill.Animal_Handling, Skill.Lore],
      [
        EquipmentHelper.getAllWeapons() + '|' + EquipmentHelper.getShields(),
        'Practical exploration garments',
        'Maps, lists of landmarks',
        'Rope',
        'Climbing Gear',
      ],
      99,
      Source.Adventurer
    ),
    [Archetype.CleverOne]: new ArchetypeModel(
      'Clever One',
      'Clever Ones are both priest and sorcerer. They speak to spirits and heal the sick. Most are born to the role, chosen by the orishas and other spirits to fulfill a vital purpose in their communities. Sometimes they receive visions from their ancestors or the world itself that command them to wander where needed most. A few pursue darker paths, creating awful pacts with spirits foul and demons of the Outer Dark, casting curses that bind men’s souls.',
      Skill.Sorcery,
      TalentsHelper.getTalent('True Understanding'),
      [Skill.Alchemy, Skill.Counsel, Skill.Healing, Skill.Lore],
      [Skill.Animal_Handling, Skill.Counsel, Skill.Survival],
      [
        'Sorcerous garbs',
        'Talismans',
        "Healer's bag (3 doses)",
        'Seasonally appropriate clothing and travelling gear',
        EquipmentHelper.getAllWeapons() + '|' + EquipmentHelper.getShields(),
        'Bow|Sling',
        'Mule|Donkey|Pack Horse|Hand Cart',
      ],
      99,
      Source.Adventurer
    ),
    [Archetype.Griot]: new ArchetypeModel(
      'Griot',
      'Singers, musicians, storytellers, historians, sages, and scholars; yours is the voice of the past, the songs of the ancestors, and you hold the portents of the future in your hands. You are no mere entertainer, but the proud heir to traditions dating back thousands of years. You sometimes have a patron, but more often wander, carrying news and wisdom to even the farthest reaches of the south. Truth is your guide, and it is by your words that the people rise and fall.',
      Skill.Persuade,
      TalentsHelper.getTalent('Griot'),
      [Skill.Insight, Skill.Craft, Skill.Lore, Skill.Society],
      [Skill.Acrobatics, Skill.Linguistics, Skill.Counsel],
      [
        EquipmentHelper.getAllWeapons() + '|' + EquipmentHelper.getShields(),
        'Fine Lute|Fine Harp|Fine Flute|Fine Drum|Fine Tambourine|Fine Maracas',
        'Fine suit of clothing (worth 2 Gold more than normal)',
        'Traveling clothes and sling bag',
        'Lute|Harp|Flute|Drum|Tambourine|Maracas',
        'Riding horse',
      ],
      99,
      Source.Adventurer
    ),
    [Archetype.Seeker]: new ArchetypeModel(
      'Seeker',
      'Before humans waged war, they hunted. Weapons were first made to kill for food, not territory. The seeker is the primal figure of myth, the stalwart provider on which a community relies, and the first to step forward to defend what belongs to their people. Skilled in locating and killing prey, the seeker must also outwit clever animals, best strong ones in brawn, and sometimes fight the unnatural in the quest for survival. Their role is central in any small community of hunter-gatherers and many young people see them as role models. Constellations in the sky are named for legendary seekers and both oral histories and ancient scrolls tell of their mighty deeds.',
      Skill.Observation,
      TalentsHelper.getTalent('Sharp Senses'),
      [Skill.Discipline, Skill.Melee, Skill.Stealth, Skill.Survival],
      [Skill.Athletics, Skill.Healing, Skill.Resistance],
      [
        EquipmentHelper.getWeaponsOfType(WeaponType.Polearm),
        'Sandals and animal skin garb',
        'Personal trophies taken form past prey',
        'Boning and skinning knives',
        'Tanning kit',
      ],
      99,
      Source.Adventurer
    ),
    [Archetype.TombGuardian]: new ArchetypeModel(
      'Tomb Guardian',
      'Tomb guardians watch over the tombs of the important dead, charged by priests, kings, and wise folk. Many are masters of mounted combat and complex fighting techniques. Some are also dabblers in the occult, capable of summoning up horrible curses, undead guardians, or worse from the tombs they guard. They also track down those who steal from the tombs or violate the ancients, hunting down the offenders and avenging the dead, returning what was taken to their resting places. Tomb protectors are cold and remorseless killers who protect the dead from the avarice of the living.',
      Skill.Melee,
      TalentsHelper.getTalent('No Mercy'),
      [Skill.Animal_Handling, Skill.Insight, Skill.Parry, Skill.Survival],
      [Skill.Observation, Skill.Ranged_Weapons, Skill.Sorcery],
      [
        'Knife',
        'Silk kilt|Linen kilt|Tunic dress',
        'Mantle to indicate caste',
        'Sandals',
        'Desert survival kit',
        'Scimitar|Khopesh|Bow',
        'Riding horse|Camel',
        "Handler's kit",
        '3 Rewards for animal training',
      ],
      99,
      Source.Adventurer
    ),
    [Archetype.WitchFinder]: new ArchetypeModel(
      'Witch-Finder',
      'Witch-finders are powerful among the South because they are more proximate to the spirit world than others, who are more distant. A Witch-finder does not need to have actual sorcerous power in their culture to possess a reputation as powerful and/or sorcerous. Some of these witch-finders seek out witchcraft and unnatural magic to destroy it, or at least to try. A witch-finder is both priest and warrior, then, up against odds that turn most stomachs and foes whose power originates in the Outer Dark.',
      Skill.Sorcery,
      TalentsHelper.getTalent('True Understanding'),
      [Skill.Counsel, Skill.Insight, Skill.Melee, Skill.Observation],
      [Skill.Alchemy, Skill.Lore, Skill.Sorcery],
      [
        'Spear|Club',
        'Unsettling garb',
        'Headdress',
        "Healer's kit|Alchemist's kit|Sorcerous garb",
        "Personal 'library' (fetishes)",
      ],
      99,
      Source.Adventurer
    ),
    [Archetype.Exile]: new ArchetypeModel(
      'Exile',
      'You have forsaken the world you came from. It no longer matters. Or you have not forgotten it, but it does not shape you in the way it does others. You embrace the wilderness, taking the Exiled Lands into yourself and becoming part of them. You move over the steppes as though you were born there, stalking your prey (whether animal or human) with the zeal of a born hunter. The Exiled Lands are supposed to be places of death and despair. To you, they have become home.',
      Skill.Survival,
      TalentsHelper.getTalent('Born Wild'),
      [Skill.Animal_Handling, Skill.Healing, Skill.Insight, Skill.Parry],
      [Skill.Acrobatics, Skill.Melee, Skill.Ranged_Weapons],
      ['A handmade pouch', 'A stout branch', 'Bone Knife', 'Ragged loincloth'],
      99,
      Source.Exiles
    ),
    [Archetype.Forgotten]: new ArchetypeModel(
      'Forgotten',
      'You were on that cross too long before escaping, your past burned away in the fixed glare of the sun. You have no recollection of who you were, or even how you came to be here. Perhaps some inkling of what brought you to the Exiled Lands still lingers in your mind, a few half-formed notions of places you have been, people you once knew. But beyond these fragments, you are scrubbed clean. It is time to forge yourself anew, or to find who you were. Whichever you choose, the journey is sure to be arduous.',
      Skill.Observation,
      TalentsHelper.getTalent('Sharp Senses'),
      [Skill.Animal_Handling, Skill.Lore, Skill.Melee, Skill.Thievery],
      [Skill.Acrobatics, Skill.Linguistics, Skill.Parry],
      [
        'A scrap of paper in a language you have forgotten how to read',
        'An empty waterskin',
        'A sheet of fabric wound around your body',
        'Good sandals you do not remember acquiring',
      ],
      99,
      Source.Exiles
    ),
    [Archetype.Shaper]: new ArchetypeModel(
      'Shaper',
      'In the wilderness, you were lost. Not simply literally, in that vast and trackless waste, but spiritually. The purpose that your old place in the world bestowed upon you is forever gone. It is time to reclaim that, but not back in the old world. It is time to make the wilderness a new world. It is time to civilize it, to build something here that rivals, and eventually dwarfs, the place and wealth you were deprived of. No matter what you must do, how many you must kill and how much blood must be spilled, you will make this place something better. You will shape it, bend it to your will, and you will break it, if you must.',
      Skill.Discipline,
      TalentsHelper.getTalent('Courageous'),
      [Skill.Alchemy, Skill.Command, Skill.Melee, Skill.Observation],
      [Skill.Resistance, Skill.Persuade, Skill.Society],
      [
        'Stone Axe',
        'A pair of rude leggings',
        'A set of plans and diagrams for how the wilderness is to be transformed',
        'A quill and a pot of ink',
      ],
      99,
      Source.Exiles
    ),
    [Archetype.WastelandPriest]: new ArchetypeModel(
      'Wasteland Priest',
      'Something happened to you, up there on that cross. As the sun baked your brains and the cross twisted your body, you heard, or you saw something. A voice, perhaps, telling you to hold on. A vision of a better place. It might be the fact of your rescue was enough to convince a god had taken a special interest. But it is not enough to simply know this. Now you have been given this gift, this proof of divinity, you must share it. Thus, you make your way across the vast and unending plains, preaching the message to any who will listen. ',
      Skill.Sorcery,
      TalentsHelper.getTalent('True Understanding'),
      [Skill.Discipline, Skill.Lore, Skill.Observation, Skill.Society],
      [Skill.Alchemy, Skill.Animal_Handling, Skill.Persuade],
      [
        'Rough fabric robe',
        'Fragments from the crucifix you hung from',
        'Carved wooden staff, decorated with fetishes and charms',
        'Stone Knife',
      ],
      99,
      Source.Exiles
    ),
    [Archetype.Agent]: new ArchetypeModel(
      'Agent',
      'Either acting on their own accord, employed privately by nobles, or operating clandestinely at the behest of an organization or court, the agent is primarily focused on changing the status quo or defending change to it, whether negotiating deals whose nature is best kept from public knowledge, recruiting others to accomplish this goal, or even fomenting resentment that leads to rebellion. The agent’s specialty is embedding themselves within the existing social order and seeking out those who might be best used as proxies, keeping the agent’s hands, and reputation, clean.',
      Skill.Persuade,
      TalentsHelper.getTalent('Force of Presence'),
      [Skill.Insight, Skill.Lore, Skill.Observation, Skill.Society],
      [Skill.Melee, Skill.Stealth, Skill.Thievery],
      [
        'One set of appropriate garments for your station',
        'One set of garments appropriate for another spcial class/caste',
        EquipmentHelper.getOneHandedWeapons() + '|' + EquipmentHelper.getShields(),
        'Ring showing true allegiance|Document showing true allegiance|Identifying mark showing true allegiance',
      ],
      99,
      Source.Kull
    ),
    [Archetype.Ambassador]: new ArchetypeModel(
      'Ambassador',
      'An envoy sent from another court, country, or political entity, the ambassador is a highly regarded messenger and representative of their culture to another, straddling both worlds. They are trained to observe and to put on the best possible face for those they stand in for, and to listen and observe carefully to take knowledge back to the one who sent them. They can never judge openly and must be at home in a court as well as a hovel. An ambassador from a wealthy or powerful country will wish for allies from their betters, and a representative from a poor or weaker nation sometimes holds the safety of their home in their hands. ',
      Skill.Society,
      TalentsHelper.getTalent('A Modicum of Comfort'),
      [Skill.Insight, Skill.Linguistics, Skill.Lore, Skill.Persuade],
      [Skill.Counsel, Skill.Observation, Skill.Survival],
      ['Fine robes and garments', 'Travel garments', 'Riding horse|Palanquin', 'Writ of passage and credentials'],
      99,
      Source.Kull
    ),
    [Archetype.Counselor]: new ArchetypeModel(
      'Counselor',
      'Advisors to kings, queens, and other nobles, the Counselor is trusted and expected to weigh their decisions with the grander fate of the kingdom in mind, sometimes being the one who must speak hard truths to the one they serve. They are privy to the kingdom’s secrets, and at times know things that not even the monarch is aware of. More than even a spouse, the counselor is the one trusted above all else for guidance by their ruler, and for this reason they are often the target of conspiracies. Some counselors have agendas of their own, serving multiple generations of a ruling family or within the court of one who conquered the prior ruler. In such cases, they may be loyal primarily to the kingdom, or to their own desires. ',
      Skill.Counsel,
      TalentsHelper.getTalent('Quiet Wisdom'),
      [Skill.Command, Skill.Insight, Skill.Lore, Skill.Observation],
      [Skill.Persuade, Skill.Society, Skill.Siegecraft],
      [
        'Fine courtly clothing',
        'Walking staff',
        'Royal insignia ring|Royal insignia amulet|Royal insignia badge',
        'Parchment and writing implements',
        'Research library',
        'Apartment within the palace',
      ],
      99,
      Source.Kull
    ),
    [Archetype.Gladiator]: new ArchetypeModel(
      'Gladiator',
      'Whether an outland barbarian, a slave of exceptional skill, a criminal sent to the arena as punishment, or a captured soldier in an enemy army, the gladiator knows only captivity and combat. Training daily, the gladiator learns how to fight, and how to kill. Though all are kin within the pits, on the blood-soaked floor of the arena each stands alone. Simultaneously a skilled professional and mere token to be gambled away, the gladiator seeks success, as well as attention from the audience, in hopes of being granted liberty. Once set free, the gladiator must learn how to live. ',
      Skill.Melee,
      TalentsHelper.getTalent('No Mercy'),
      [Skill.Acrobatics, Skill.Athletics, Skill.Parry, Skill.Resistance],
      [Skill.Linguistics, Skill.Observation, Skill.Siegecraft],
      [
        "Commoner's garments",
        EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + '|' + EquipmentHelper.getShields(),
        'Token of life before the arena',
        'Certificate of release',
        '2 impressive scars|3 impressive scars',
      ],
      99,
      Source.Kull
    ),
    //[Archetype.]: new ArchetypeModel(
    //    "",
    //    "",
    //    Skill.,
    //    TalentsHelper.getTalent(""),
    //    [Skill., Skill., Skill., Skill.],
    //    [Skill., Skill., Skill.],
    //    [
    //        "",
    //    ],
    //    99,
    //    Source.),
  };

  getArchetypes() {
    var archetypes: ArchetypeViewModel[] = [];
    var n = 0;
    for (var archetype in this._archetypes) {
      var arch = this._archetypes[archetype];
      if (character.hasSource(arch.source)) {
        archetypes.push(new ArchetypeViewModel(n, arch));
      }
      n++;
    }

    return archetypes.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  getArchetype(archetype: Archetype) {
    return this._archetypes[archetype];
  }

  getArchetypeForRoll(roll: number) {
    var n = 0;
    for (var archetype in this._archetypes) {
      var a = this._archetypes[archetype];
      if (a.roll >= roll) {
        return n;
      }

      n++;
    }
  }

  generateArchetype(): Archetype {
    var roll = Math.floor(Math.random() * 20) + 1;
    var n = 0;
    for (var archetype in this._archetypes) {
      var a = this._archetypes[archetype];
      if (a.roll >= roll) {
        return n;
      }

      n++;
    }
  }

  generateMercenaryArchetype(): Archetype {
    var roll = Math.floor(Math.random() * 20) + 1;
    switch (roll) {
      case 1:
      case 2:
      case 3:
        return Archetype.Asshuri;
      case 4:
      case 5:
        return Archetype.Captain;
      case 6:
      case 7:
        return Archetype.Champion;
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
        return Archetype.Mercenary;
      case 14:
      case 15:
      case 16:
        return Archetype.Messenger;
      case 17:
      case 18:
        return Archetype.UnseasonedYouth;
      case 19:
      case 20:
        return Archetype.Veteran;
    }

    return undefined;
  }

  generateWandererArchetype(): Archetype {
    var roll = Math.floor(Math.random() * 20) + 1;
    switch (roll) {
      case 1:
      case 2:
      case 3:
        return Archetype.Beggar;
      case 4:
      case 5:
      case 6:
        return Archetype.CourtOfficial;
      case 7:
      case 8:
      case 9:
      case 10:
        return Archetype.Emissary;
      case 11:
      case 12:
      case 13:
      case 14:
        return Archetype.HorseNomad;
      case 15:
      case 16:
      case 17:
        return Archetype.Mystic;
      case 18:
      case 19:
      case 20:
        return Archetype.Vagabond;
    }

    return undefined;
  }

  generateKingArchetype(): Archetype {
    var roll = Math.floor(Math.random() * 20) + 1;
    switch (roll) {
      case 1:
      case 2:
      case 3:
      case 4:
        return Archetype.Courtier;
      case 5:
      case 6:
      case 7:
      case 8:
        return Archetype.HealerPhysician;
      case 9:
      case 10:
      case 11:
      case 12:
        return Archetype.Knight;
      case 13:
      case 14:
      case 15:
      case 16:
        return Archetype.Minstrel;
      case 17:
      case 18:
      case 19:
      case 20:
        return Archetype.Noble;
    }

    return undefined;
  }

  generateExileArchetype(): Archetype {
    var roll = Math.floor(Math.random() * 20) + 1;
    switch (roll) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return Archetype.Exile;
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        return Archetype.Forgotten;
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
        return Archetype.Shaper;
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        return Archetype.WastelandPriest;
    }

    return undefined;
  }

  applyArchetype(archetype: Archetype) {
    var a = this.getArchetype(archetype);
    character.skills[a.careerSkill].expertise += 2;
    character.skills[a.careerSkill].focus += 2;

    if (!character.useWeedOfSorcery && archetype !== Archetype.Veteran) {
      character.addTalent(a.careerTalent.name);
    }

    a.mandatorySkills.forEach((s) => {
      character.skills[s].expertise++;
      character.skills[s].focus++;
    });

    a.equipment.forEach((eq) => {
      if (eq === this.HOMELAND_BOW) {
        character.addEquipment(EquipmentHelper.getBowForHomeland(character.homeland));
      } else if (eq.indexOf('|') === -1) {
        character.addEquipment(eq);
      }
    });

    if (archetype === Archetype.Merchant) {
      character.gold += DiceRoller.rollSpecial(10, 0).hits;
    } else if (archetype === Archetype.Courtier) {
      character.gold += DiceRoller.rollSpecial(10, 0).hits;
    } else if (archetype === Archetype.Torturer) {
      const num = DiceRoller.rollSpecial(3, 0).hits;
      if (num > 0) {
        character.addEquipment(`${num} mementos or personal keepsakes taken from victims`);
      }
    } else if (archetype === Archetype.Trader) {
      const worth = DiceRoller.rollSpecial(10, 0).hits;
      if (worth > 0) {
        character.addEquipment(`Trade goods worth ${worth} gold`);
      }
    } else if (archetype === Archetype.Noble) {
      character.socialStanding = 2;
    } else if (archetype === Archetype.Ambassador) {
      const worth = DiceRoller.rollSpecial(12, 0).hits;
      if (worth > 0) {
        character.addEquipment(`${worth} Gold in gifts suitable for a monarch`);
      }
    }
  }
}

export const ArchetypesHelper = new Archetypes();
