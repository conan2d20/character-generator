import { character } from '../common/character';
import { Attribute } from './attributes';
import { Skill } from './skills';
import { Source } from './sources';

export enum Nature {
  // Core
  Cautious,
  Curious,
  Inspirational,
  Learned,
  Practical,
  Scheming,
  Sneaky,
  Stoic,
  Supportive,
  Wrathful,
  // Barbarian
  DutyBound,
  Proud,
  // Skelos
  UnholyBirth,
  Cursed,
  Academic,
  Driven,
  // Mercenary
  Professional,
  BloodCrazed,
  // Pirate
  Bloodthirsty,
  Craven,
  Egotistical,
  Greedy,
  Gregarious,
  Lustful,
  Reckless,
  Remorseless,
  Ruthless,
  Vain,
  // Cults
  Fanatical,
  // Brigand
  Renegade,
  Murderous,
  // Scout
  Ambitious,
  Reclusive,
  Restless,
  Rugged,
  Taciturn,
  // King
  AmbitiousKing,
  Avaricious,
  Calculating,
  Evenhanded,
  Megalomaniacal,
  // Adventurer
  Clever,
  Righteous,
  Treacherous,
  // Kull
  Aspiring,
  Iconoclast,
  Oathsworn,
  Opportunist,
  Philosopher,
  Skeptical,
  Superstitious,
  Traditionalist,
}

class NatureModel {
  name: string;
  description: string;
  attribute: Attribute;
  mandatory: Skill[];
  elective: Skill[];
  talentSkills: Skill[];
  roll: number;
  source: Source;

  constructor(
    name: string,
    description: string,
    attr: Attribute,
    mandatory: Skill[],
    elective: Skill[],
    talents: Skill[],
    roll: number,
    source: Source
  ) {
    this.name = name;
    this.description = description;
    this.attribute = attr;
    this.mandatory = mandatory;
    this.elective = elective;
    this.talentSkills = talents;
    this.roll = roll;
    this.source = source;
  }
}

export class NatureViewModel extends NatureModel {
  id: Nature;

  constructor(id: Nature, base: NatureModel) {
    super(
      base.name,
      base.description,
      base.attribute,
      base.mandatory,
      base.elective,
      base.talentSkills,
      base.roll,
      base.source
    );
    this.id = id;
  }
}

export class Natures {
  private _natures: { [id: number]: NatureModel } = {
    [Nature.Cautious]: new NatureModel(
      'Cautious',
      'You do your best to avoid trouble, whether through innate self-preservation or from hard-learned experience.',
      Attribute.Willpower,
      [Skill.Lore, Skill.Parry, Skill.Stealth],
      [Skill.Animal_Handling, Skill.Athletics, Skill.Sailing],
      [Skill.Lore, Skill.Parry, Skill.Stealth, Skill.Animal_Handling, Skill.Athletics, Skill.Sailing],
      2,
      Source.Core
    ),
    [Nature.Curious]: new NatureModel(
      'Curious',
      'The world is a fascinating place, with many mysteries yet to be discovered. You are always trying to find out what is unknown, or what is being concealed from you.',
      Attribute.Agility,
      [Skill.Athletics, Skill.Observation, Skill.Stealth],
      [Skill.Alchemy, Skill.Lore, Skill.Thievery],
      [Skill.Athletics, Skill.Observation, Skill.Stealth, Skill.Alchemy, Skill.Lore, Skill.Thievery],
      4,
      Source.Core
    ),
    [Nature.Inspirational]: new NatureModel(
      'Inspirational',
      'The world is a difficult place, and you take it upon yourself to provide a good example to those around you. Maybe you learned this from a prior command, or it seems the right thing to do.',
      Attribute.Personality,
      [Skill.Counsel, Skill.Observation, Skill.Persuade],
      [Skill.Command, Skill.Healing, Skill.Society],
      [Skill.Counsel, Skill.Observation, Skill.Persuade, Skill.Command, Skill.Healing, Skill.Society],
      6,
      Source.Core
    ),
    [Nature.Learned]: new NatureModel(
      'Learned',
      'You enjoy the path of knowledge, as it opens many doors for you and assists in your understanding of the world around you.',
      Attribute.Intelligence,
      [Skill.Animal_Handling, Skill.Craft, Skill.Lore],
      [Skill.Counsel, Skill.Healing, Skill.Observation],
      [Skill.Animal_Handling, Skill.Craft, Skill.Lore, Skill.Counsel, Skill.Healing, Skill.Observation],
      8,
      Source.Core
    ),
    [Nature.Practical]: new NatureModel(
      'Practical',
      'You have an eye towards the pragmatic, always seeking the most efficient or reasonable means of achieving your goals.',
      Attribute.Coordination,
      [Skill.Discipline, Skill.Craft, Skill.Healing],
      [Skill.Alchemy, Skill.Animal_Handling, Skill.Observation],
      [Skill.Discipline, Skill.Craft, Skill.Healing, Skill.Alchemy, Skill.Animal_Handling, Skill.Observation],
      10,
      Source.Core
    ),
    [Nature.Scheming]: new NatureModel(
      'Scheming',
      'There’s always an easier way to do things, one that does not involve as much risk or effort on your behalf. Furthermore, you always keep your options open, and always have a secondary plan of action.',
      Attribute.Intelligence,
      [Skill.Command, Skill.Counsel, Skill.Discipline],
      [Skill.Acrobatics, Skill.Lore, Skill.Parry],
      [Skill.Command, Skill.Counsel, Skill.Discipline, Skill.Acrobatics, Skill.Lore, Skill.Parry],
      12,
      Source.Core
    ),
    [Nature.Sneaky]: new NatureModel(
      'Sneaky',
      'Information is power, and it is best to keep others in the dark when it comes to you. You have learned to move quietly, speak softly, and keep your true motives to yourself.',
      Attribute.Awareness,
      [Skill.Observation, Skill.Stealth, Skill.Thievery],
      [Skill.Acrobatics, Skill.Athletics, Skill.Survival],
      [Skill.Observation, Skill.Stealth, Skill.Thievery, Skill.Acrobatics, Skill.Athletics, Skill.Survival],
      14,
      Source.Core
    ),
    [Nature.Stoic]: new NatureModel(
      'Stoic',
      'There is little in life that cannot be withstood, and no hardship — physical, mental, or even social — is so great that you cannot overcome it.',
      Attribute.Willpower,
      [Skill.Discipline, Skill.Lore, Skill.Resistance],
      [Skill.Counsel, Skill.Healing, Skill.Parry],
      [Skill.Discipline, Skill.Lore, Skill.Resistance, Skill.Counsel, Skill.Healing, Skill.Parry],
      16,
      Source.Core
    ),
    [Nature.Supportive]: new NatureModel(
      'Supportive',
      'In the end, all we have is each other. You have learned that the greatest bonds are those between allies, family, and friends, and thus you do all you can to assist those around you.',
      Attribute.Personality,
      [Skill.Counsel, Skill.Healing, Skill.Persuade],
      [Skill.Animal_Handling, Skill.Discipline, Skill.Resistance],
      [Skill.Counsel, Skill.Healing, Skill.Persuade, Skill.Animal_Handling, Skill.Discipline, Skill.Resistance],
      18,
      Source.Core
    ),
    [Nature.Wrathful]: new NatureModel(
      'Wrathful',
      'For each action there must be an equal and final reaction, a retribution to those who have done you wrong. You do not forgive slights against you and yours easily, and make sure to strike back with finality.',
      Attribute.Brawn,
      [Skill.Melee, Skill.Ranged_Weapons, Skill.Resistance],
      [Skill.Acrobatics, Skill.Discipline, Skill.Parry],
      [Skill.Melee, Skill.Ranged_Weapons, Skill.Resistance, Skill.Acrobatics, Skill.Discipline, Skill.Parry],
      20,
      Source.Core
    ),
    [Nature.DutyBound]: new NatureModel(
      'Duty-bound',
      'You have sworn allegiance to the service of another, whether to your clan chief, a particular leader you admire, or a group with a cause you support. Alternatively, it may be a more abstract sort of fealty, to a particular belief or an oath that guides your every waking action.',
      Attribute.Willpower,
      [Skill.Discipline, Skill.Observation, Skill.Resistance],
      [Skill.Craft, Skill.Melee, Skill.Survival],
      [Skill.Discipline, Skill.Observation, Skill.Resistance, Skill.Craft, Skill.Melee, Skill.Survival],
      99,
      Source.Barbarian
    ),
    [Nature.Proud]: new NatureModel(
      'Proud',
      'You are extraordinary for one reason another, be it earned or inherited. Your name might be a famed one, or you may have done some incredible deed that bolsters your sense of worth. Regardless, you believe that others owe you respect, and often find yourself defending insults to your pride.',
      Attribute.Personality,
      [Skill.Command, Skill.Counsel, Skill.Society],
      [Skill.Insight, Skill.Observation, Skill.Persuade],
      [Skill.Command, Skill.Counsel, Skill.Society, Skill.Insight, Skill.Observation, Skill.Persuade],
      99,
      Source.Barbarian
    ),
    [Nature.UnholyBirth]: new NatureModel(
      'Unholy Birth',
      'Your mother was a humble woman who slept unknowingly near a place of great power. At night, she was visited by something other than a mortal, and you were conceived. When you were born, there was a great argument as to whether you should be allowed to live. In the end, someone stole you away into the night and raised you apart from your people.',
      Attribute.Awareness,
      [Skill.Command, Skill.Discipline, Skill.Resistance],
      [Skill.Insight, Skill.Linguistics, Skill.Sorcery],
      [Skill.Command, Skill.Discipline, Skill.Insight, Skill.Linguistics, Skill.Resistance, Skill.Sorcery],
      99,
      Source.Skelos
    ),
    [Nature.Academic]: new NatureModel(
      'Academic',
      'It is your nature to learn — whether about the seasons and the clouds they bring or the darkest inhuman lore of broken civilizations. You have seen entire libraries reduced to ash and know that unless lore is retained in memory, it will soon vanish beneath the plow of history.',
      Attribute.Intelligence,
      [Skill.Alchemy, Skill.Lore, Skill.Sorcery],
      [Skill.Craft, Skill.Insight, Skill.Linguistics],
      [Skill.Alchemy, Skill.Craft, Skill.Insight, Skill.Linguistics, Skill.Lore, Skill.Sorcery],
      99,
      Source.Skelos
    ),
    [Nature.Cursed]: new NatureModel(
      'Cursed',
      'You were born marked by the powers of the Outer Dark. Your family home was destroyed, leaving you orphaned. Those who took you in were robbed and killed. For whatever reason, the hex upon you leaves you to suffer and puts those you love in the grave.',
      Attribute.Brawn,
      [Skill.Healing, Skill.Observation, Skill.Survival],
      [Skill.Discipline, Skill.Resistance, Skill.Sorcery],
      [Skill.Discipline, Skill.Healing, Skill.Observation, Skill.Resistance, Skill.Sorcery, Skill.Survival],
      99,
      Source.Skelos
    ),
    [Nature.Driven]: new NatureModel(
      'Driven',
      'You saw something wonderful, or have an idea so profound it scares you. You know you can bring that sensation back if only you work hard enough. Whatever this wonder was, it crystallized your will and is now your utmost goal.',
      Attribute.Willpower,
      [Skill.Command, Skill.Discipline, Skill.Resistance],
      [Skill.Persuade, Skill.Society, Skill.Sorcery],
      [Skill.Command, Skill.Discipline, Skill.Persuade, Skill.Resistance, Skill.Society, Skill.Sorcery],
      99,
      Source.Skelos
    ),
    [Nature.Professional]: new NatureModel(
      'Professional',
      'You are a professional to your core. Dereliction of duty to the company is worse than disloyalty to a monarch or forsaking one’s god. There are ways of doing things, and they are not meaningless. In fact, they save lives. The company is a machine and, if a single part fails, the whole ceases to operate. You drill formations and maneuvers. You spar at times. Your blade is always sharp. You never go into battle unprepared. Your dog-brothers and sword-sisters can count on you. The lazy break against the enemy’s shields. The professionals hack through them.',
      Attribute.Willpower,
      [Skill.Discipline, Skill.Observation, Skill.Resistance],
      [Skill.Command, Skill.Melee, Skill.Siegecraft],
      [Skill.Command, Skill.Discipline, Skill.Melee, Skill.Observation, Skill.Resistance, Skill.Siegecraft],
      99,
      Source.Mercenary
    ),
    [Nature.BloodCrazed]: new NatureModel(
      'Blood-crazed',
      'You need to kill. Drawing blood is not enough. Enemy or stranger... it matters not.',
      Attribute.Brawn,
      [Skill.Melee, Skill.Observation, Skill.Resistance],
      [Skill.Craft, Skill.Melee, Skill.Survival],
      [Skill.Craft, Skill.Melee, Skill.Observation, Skill.Resistance, Skill.Survival],
      99,
      Source.Mercenary
    ),

    [Nature.Bloodthirsty]: new NatureModel(
      'Bloodthirsty',
      'You crave violence, and feel no hesitation about spilling blood to pursue your goals, whether it is warranted or not. In truth, you need no reason at all to draw steel and sheathe it in flesh.',
      Attribute.Brawn,
      [Skill.Athletics, Skill.Melee, Skill.Parry],
      [Skill.Animal_Handling, Skill.Thievery, Skill.Siegecraft],
      [Skill.Athletics, Skill.Animal_Handling, Skill.Melee, Skill.Parry, Skill.Thievery, Skill.Siegecraft],
      99,
      Source.Pirate
    ),
    [Nature.Craven]: new NatureModel(
      'Craven',
      'Violence, danger, risk… these are the sorts of things you try to avoid. While others seek to prove themselves through bold action, you have learned that discretion is the most powerful contributor for your continued survival.',
      Attribute.Awareness,
      [Skill.Acrobatics, Skill.Observation, Skill.Stealth],
      [Skill.Parry, Skill.Persuade, Skill.Thievery],
      [Skill.Acrobatics, Skill.Observation, Skill.Parry, Skill.Persuade, Skill.Stealth, Skill.Thievery],
      99,
      Source.Pirate
    ),
    [Nature.Egotistical]: new NatureModel(
      'Egotistical',
      'You seek to make a name for yourself, and take offense when others impugn your deeds or character. Though you may not be as famous as you would like to be, you are not willing to let any unkind remark or deed go unanswered.',
      Attribute.Personality,
      [Skill.Melee, Skill.Resistance, Skill.Society],
      [Skill.Command, Skill.Insight, Skill.Persuade],
      [Skill.Command, Skill.Insight, Skill.Melee, Skill.Persuade, Skill.Resistance, Skill.Society],
      99,
      Source.Pirate
    ),
    [Nature.Greedy]: new NatureModel(
      'Greedy',
      'Wealth — whether in the form of gold, jewels, property, or other material goods — is all that matters to you. Your every decision is made with an assessment of “What’s in this for me?”, weighing risk versus reward for maximum profit.',
      Attribute.Awareness,
      [Skill.Insight, Skill.Society, Skill.Thievery],
      [Skill.Craft, Skill.Lore, Skill.Persuade],
      [Skill.Craft, Skill.Insight, Skill.Lore, Skill.Persuade, Skill.Society, Skill.Thievery],
      99,
      Source.Pirate
    ),
    [Nature.Gregarious]: new NatureModel(
      'Gregarious',
      'No matter where someone comes from, there are elements of commonality in everyone, and you take pleasure in reaching out to people in camaraderie, an open palm of friendship. This might be genuine, or your smile might mask the flint in your gaze.',
      Attribute.Intelligence,
      [Skill.Counsel, Skill.Linguistics, Skill.Persuade],
      [Skill.Animal_Handling, Skill.Insight, Skill.Society],
      [Skill.Animal_Handling, Skill.Counsel, Skill.Insight, Skill.Linguistics, Skill.Persuade, Skill.Society],
      99,
      Source.Pirate
    ),
    [Nature.Lustful]: new NatureModel(
      'Lustful',
      'Comforts of the flesh are what you crave, whether wantonness or something more specific and perverse. You tend to evaluate others on their potential to satisfy your desires, and have little patience with activities unlikely to result in your pleasure.',
      Attribute.Personality,
      [Skill.Counsel, Skill.Persuade, Skill.Society],
      [Skill.Athletics, Skill.Sorcery, Skill.Thievery],
      [Skill.Athletics, Skill.Counsel, Skill.Persuade, Skill.Society, Skill.Sorcery, Skill.Thievery],
      99,
      Source.Pirate
    ),
    [Nature.Reckless]: new NatureModel(
      'Reckless',
      'The thrill of adventure drives you, whether the clash of steel between dangerous opponents or the sensation of pitting yourself against the odds. You have always been fortunate, so you are inclined to take ever-greater risks.',
      Attribute.Agility,
      [Skill.Athletics, Skill.Observation, Skill.Survival],
      [Skill.Melee, Skill.Parry, Skill.Thievery],
      [Skill.Athletics, Skill.Melee, Skill.Observation, Skill.Parry, Skill.Survival, Skill.Thievery],
      99,
      Source.Pirate
    ),
    [Nature.Remorseless]: new NatureModel(
      'Remorseless',
      'No matter what the deed, you refuse to feel any guilt over it. If others came to harm through your actions or your inaction, you do not care, nor would you expect others to be concerned about the effects they have over you.',
      Attribute.Willpower,
      [Skill.Discipline, Skill.Melee, Skill.Resistance],
      [Skill.Observation, Skill.Parry, Skill.Survival],
      [Skill.Discipline, Skill.Melee, Skill.Observation, Skill.Parry, Skill.Resistance, Skill.Survival],
      99,
      Source.Pirate
    ),
    [Nature.Ruthless]: new NatureModel(
      'Ruthless',
      'No matter how hard the decision, whatever the cost, you will make it because it is the right thing to do. It does not matter whether your decisions are altruistic or selfish, everything is a calculation, with no emotional weight attached to any aspect of the equation.',
      Attribute.Willpower,
      [Skill.Command, Skill.Discipline, Skill.Insight],
      [Skill.Lore, Skill.Observation, Skill.Survival],
      [Skill.Command, Skill.Discipline, Skill.Insight, Skill.Lore, Skill.Observation, Skill.Survival],
      99,
      Source.Pirate
    ),
    [Nature.Vain]: new NatureModel(
      'Vain',
      'Whether your personal appearance or your reputation — or both — your sense of worth is inextricably tied to the perception of yourself in the mirror or in the eyes of others. Much of your attention is spent grooming, procuring fine garments, or cultivating your growing fame.',
      Attribute.Personality,
      [Skill.Insight, Skill.Persuade, Skill.Society],
      [Skill.Athletics, Skill.Counsel, Skill.Discipline],
      [Skill.Athletics, Skill.Counsel, Skill.Discipline, Skill.Insight, Skill.Persuade, Skill.Society],
      99,
      Source.Pirate
    ),
    [Nature.Fanatical]: new NatureModel(
      'Fanatical',
      'Your commitment to the words and teachings of your cult is total and unremitting. You brook no dissension from those who also follow your religion. Those who do not believe, you are prepared to tolerate for as long as they abet your interests and those of your cult. You are prepared to endure anything and do anything to ensure the survival of your faith.',
      Attribute.Willpower,
      [Skill.Discipline, Skill.Command, Skill.Resistance],
      [Skill.Lore, Skill.Insight, Skill.Survival],
      [Skill.Command, Skill.Discipline, Skill.Insight, Skill.Lore, Skill.Resistance, Skill.Survival],
      99,
      Source.Cults
    ),
    [Nature.Renegade]: new NatureModel(
      'Renegade',
      'Some have no ethos, no creed, no god. They exist, they understand, to remind other men that their beliefs, their idols, their heroes, and their dream are like the flotsam and jetsam of a torrential river — moved by tides they cannot understand. These souls act according to no law but the embrace of wanton chaos. Entropy is their constant companion, and helping the world burn itself is the only legitimate vocation for one who is honest about the world. Such folk are uncommon, though if one has raided long enough, not without example.',
      Attribute.Willpower,
      [Skill.Insight, Skill.Persuade, Skill.Resistance],
      [Skill.Melee, Skill.Observation, Skill.Survival],
      [Skill.Insight, Skill.Melee, Skill.Observation, Skill.Persuade, Skill.Resistance, Skill.Survival],
      99,
      Source.Brigand
    ),
    [Nature.Murderous]: new NatureModel(
      'Murderous',
      'It is a savage age, and such an era demands those who kill not just for defense or ideal, but because they like it. They want to wet their blade in a foeman’s guts, or even slaughter the weak. They care not who their targets are, only that blood is shed, their inner frenzy sated. Some men and women direct this inner demon, purposing toward martial glory. Those who become brigands revel solely in the lust for blood… sometimes even their own.',
      Attribute.Brawn,
      [Skill.Athletics, Skill.Melee, Skill.Stealth],
      [Skill.Command, Skill.Discipline, Skill.Resistance],
      [Skill.Athletics, Skill.Command, Skill.Discipline, Skill.Melee, Skill.Resistance, Skill.Stealth],
      99,
      Source.Brigand
    ),
    [Nature.Ambitious]: new NatureModel(
      'Ambitious',
      'You look out at the teeming wilderness and rough, unspoiled terrain and see opportunity there, a vast tableau to write your own desires upon. The frontier is opportunity to realize your dreams, and create a better world than the one you left behind.',
      Attribute.Personality,
      [Skill.Craft, Skill.Persuade, Skill.Survival],
      [Skill.Command, Skill.Lore, Skill.Observation],
      [Skill.Craft, Skill.Command, Skill.Lore, Skill.Observation, Skill.Persuade, Skill.Survival],
      99,
      Source.Scout
    ),
    [Nature.Reclusive]: new NatureModel(
      'Reclusive',
      'The frontier offers you the chance to seclude yourself away from the presence of others. You may live in fear of your fellow humans, or you may simply find them odious and disagreeable. Regardless, out here on the border you can keep to yourself, and pick the terms by which you interact with others, and seek to pursue your own interests, however esoteric or rarified.',
      Attribute.Intelligence,
      [Skill.Craft, Skill.Lore, Skill.Stealth],
      [Skill.Alchemy, Skill.Animal_Handling, Skill.Thievery],
      [Skill.Alchemy, Skill.Animal_Handling, Skill.Craft, Skill.Lore, Skill.Stealth, Skill.Thievery],
      99,
      Source.Scout
    ),
    [Nature.Restless]: new NatureModel(
      'Restless',
      'You never could settle down in one area, and thus the constructs of civilization are especially stifling, built to force folks to live dull lives, confined to dismal cities and the same scenery. Out here in the edge of civilization you can move from place to place with agility, experiencing the new as it is being made.',
      Attribute.Coordination,
      [Skill.Acrobatics, Skill.Linguistics, Skill.Survival],
      [Skill.Animal_Handling, Skill.Sailing, Skill.Stealth],
      [Skill.Acrobatics, Skill.Animal_Handling, Skill.Linguistics, Skill.Sailing, Skill.Survival, Skill.Stealth],
      99,
      Source.Scout
    ),
    [Nature.Rugged]: new NatureModel(
      'Rugged',
      'No matter what circumstances you find yourself in, you can endure, even thrive. Others are often made the victims of chance, subject to the will of others or the vagaries of their environments, while you are prepared, mentally and physically, to adapt and to persevere, paying close attention to your world and acting accordingly.',
      Attribute.Awareness,
      [Skill.Craft, Skill.Observation, Skill.Survival],
      [Skill.Discipline, Skill.Healing, Skill.Thievery],
      [Skill.Craft, Skill.Discipline, Skill.Healing, Skill.Observation, Skill.Survival, Skill.Thievery],
      99,
      Source.Scout
    ),
    [Nature.Taciturn]: new NatureModel(
      'Taciturn',
      'You don’t trust words, and you find yourself trusting your instincts far more than anything said aloud to you. Others either use speech as a mask for their true selves, or they reveal too much when they speak. You choose to remain silent, and stick to your beliefs, trusting in your own judgment to make decisions.',
      Attribute.Willpower,
      [Skill.Discipline, Skill.Insight, Skill.Resistance],
      [Skill.Craft, Skill.Observation, Skill.Survival],
      [Skill.Craft, Skill.Discipline, Skill.Insight, Skill.Observation, Skill.Resistance, Skill.Survival],
      99,
      Source.Scout
    ),
    [Nature.AmbitiousKing]: new NatureModel(
      'Ambitious',
      'Your goals may be secret, but their grandeur is not. You were not born to your station to idly sit and mind the land. Your lot, your destiny is to conquer, to expand, to make your holding greater than you left it. All other concerns are secondary; all other people must serve this goal. Your ambition may be tied to your ego or your firm belief that this world needs correcting, and it falls to you alone to do the bloody math.',
      Attribute.Willpower,
      [Skill.Command, Skill.Society, Skill.Siegecraft],
      [Skill.Insight, Skill.Observation, Skill.Survival],
      [Skill.Command, Skill.Insight, Skill.Observation, Skill.Society, Skill.Siegecraft, Skill.Survival],
      99,
      Source.King
    ),
    [Nature.Avaricious]: new NatureModel(
      'Avaricious',
      'He who dies with the most-stuffed coffers wins. You aim to win. Power is simply a measure of wealth. Land is simply a measure of the extent of your taxes. Conquest is only good if it turns a profit. Coin and coin alone are what you seek. Money is its own reward and you aim to collect so very much of it.',
      Attribute.Intelligence,
      [Skill.Insight, Skill.Society, Skill.Thievery],
      [Skill.Lore, Skill.Observation, Skill.Persuade],
      [Skill.Insight, Skill.Lore, Skill.Observation, Skill.Persuade, Skill.Society, Skill.Thievery],
      99,
      Source.King
    ),
    [Nature.Calculating]: new NatureModel(
      'Calculating',
      'Courtly politics is a game and one at which you are expert. You move people as pieces in this game and, by extension, affect entire territories, perhaps even kingdoms. You are not so foolish as to think you are the only skilled player in this game, however, and you size up each new player well. This is a zero-sum affair and you intend to win. Losing means death or worse: a fall from the heights to which you are accustomed. ',
      Attribute.Intelligence,
      [Skill.Counsel, Skill.Persuade, Skill.Society],
      [Skill.Command, Skill.Persuade, Skill.Society],
      [Skill.Command, Skill.Counsel, Skill.Persuade, Skill.Society],
      99,
      Source.King
    ),
    [Nature.Evenhanded]: new NatureModel(
      'Evenhanded',
      'You are one of the rare rulers of the day who thinks through the machinations of your enemies, the implications of your decisions, and seats your ego behind what is the best choice for the future. You are not rash but, when you act it is always decisive. You are confident you considered all the options and, after having done so, your path is clear. Those who would stand in the way should be wary.',
      Attribute.Willpower,
      [Skill.Command, Skill.Counsel, Skill.Discipline],
      [Skill.Command, Skill.Discipline, Skill.Society],
      [Skill.Command, Skill.Counsel, Skill.Discipline, Skill.Society],
      99,
      Source.King
    ),
    [Nature.Megalomaniacal]: new NatureModel(
      'Megalomaniacal',
      'This noble believes their rule is destined for greatness and that they, personally, are nigh-infallible. The actual results of their rule may argue completely otherwise, but the megalomaniac believes their power just and always in the right. Right being a product of what is good for them not what is actually just. Justice in the feudal system is a rare animal indeed.',
      Attribute.Personality,
      [Skill.Discipline, Skill.Persuade, Skill.Siegecraft],
      [Skill.Command, Skill.Discipline, Skill.Persuade],
      [Skill.Command, Skill.Discipline, Skill.Persuade, Skill.Siegecraft],
      99,
      Source.King
    ),
    [Nature.Clever]: new NatureModel(
      'Clever',
      '“Clever” as a word does not carry the same meaning as it does beyond the reaches of the south. When one has this nature, they are thought to be attuned to the world around them in strange ways, to hear the voices of the spirits and ancestors. ',
      Attribute.Willpower,
      [Skill.Alchemy, Skill.Lore, Skill.Sorcery],
      [Skill.Healing, Skill.Observation, Skill.Stealth],
      [Skill.Alchemy, Skill.Healing, Skill.Lore, Skill.Observation, Skill.Sorcery, Skill.Stealth],
      99,
      Source.Adventurer
    ),
    [Nature.Righteous]: new NatureModel(
      'Righteous (Iwa)',
      'To the people of the South, Iwa is more than outsiders’ conception of righteousness. It transcends religious doctrine, advising as it does that a person must also improve their civic, social, and intellectual character. It also encompasses pride and a warrior’s will to fight. Iwa is the full measure of one’s character and is the highest aim of the people.',
      Attribute.Personality,
      [Skill.Melee, Skill.Insight, Skill.Discipline],
      [Skill.Command, Skill.Lore, Skill.Society],
      [Skill.Command, Skill.Discipline, Skill.Insight, Skill.Lore, Skill.Melee, Skill.Society],
      99,
      Source.Adventurer
    ),
    [Nature.Treacherous]: new NatureModel(
      'Treacherous (Onni suban)',
      'Like iwa, being treacherous, or onni suban, carries a meaning and weight unfamiliar and strange to outsiders. A treacherous person is out of balance, but being so grants many gifts, the cost of which is the ruination of one’s spirit.',
      Attribute.Willpower,
      [Skill.Discipline, Skill.Insight, Skill.Stealth],
      [Skill.Insight, Skill.Observation, Skill.Persuade],
      [Skill.Discipline, Skill.Insight, Skill.Observation, Skill.Persuade, Skill.Stealth],
      99,
      Source.Adventurer
    ),
    [Nature.Aspiring]: new NatureModel(
      'Aspiring',
      'You know that you are destined for greatness, no matter what others around you think. When you close your eyes, you imagine yourself in a position of immense power and acclaim, glory heaped upon your name, all your ambitions fulfilled. ',
      Attribute.Personality,
      [Skill.Command, Skill.Discipline, Skill.Survival],
      [Skill.Lore, Skill.Observation, Skill.Persuade],
      [Skill.Command, Skill.Discipline, Skill.Lore, Skill.Observation, Skill.Persuade, Skill.Survival],
      99,
      Source.Kull
    ),
    [Nature.Iconoclast]: new NatureModel(
      'Iconoclast',
      'Many say “what always was, must always be” but you do not hold to that. While others live beholden to the ways of ancestors long forgotten, you question those traditions and look for better ways to live and be. This does not make you the most popular person in your circles, but it has contributed much to your success. ',
      Attribute.Personality,
      [Skill.Counsel, Skill.Lore, Skill.Observation],
      [Skill.Command, Skill.Insight, Skill.Sorcery],
      [Skill.Command, Skill.Counsel, Skill.Insight, Skill.Lore, Skill.Observation, Skill.Sorcery],
      99,
      Source.Kull
    ),
    [Nature.Oathsworn]: new NatureModel(
      'Oathsworn',
      'You have sworn an oath of allegiance to an individual, organization, power, or deity which you are loath to break. This might be a simple promise shored up by the power of your integrity and will, or a sorcerous pact woven into your very blood and sinew. Whatever the specifics, it is a core part of your identity and destiny. ',
      Attribute.Willpower,
      [Skill.Discipline, Skill.Insight, Skill.Persuade],
      [Skill.Healing, Skill.Resistance, Skill.Survival],
      [Skill.Discipline, Skill.Healing, Skill.Insight, Skill.Persuade, Skill.Resistance, Skill.Survival],
      99,
      Source.Kull
    ),
    [Nature.Opportunist]: new NatureModel(
      'Opportunist',
      'Lesser personages fail to live their lives. They live routines through a life with the same allegiances, same tasks, same fortunes every single day. But not you. You bend your decisions to the wills of fate, the movements of power, and the favor of fortune. ',
      Attribute.Coordination,
      [Skill.Insight, Skill.Persuade, Skill.Society],
      [Skill.Linguistics, Skill.Observation, Skill.Thievery],
      [Skill.Insight, Skill.Linguistics, Skill.Observation, Skill.Persuade, Skill.Society, Skill.Thievery],
      99,
      Source.Kull
    ),
    [Nature.Philosopher]: new NatureModel(
      'Philosopher',
      'You may not be the most educated person in a room, but you are fully aware of the depths of time on which you, your people, and your civilization stand. The hardships upon a single being, yourself included, are as but the motes of dust in a never-ending storm. You realize it matters little, and this realization gives perspective and strength. ',
      Attribute.Awareness,
      [Skill.Insight, Skill.Lore, Skill.Observation],
      [Skill.Counsel, Skill.Persuade, Skill.Sorcery],
      [Skill.Counsel, Skill.Insight, Skill.Lore, Skill.Observation, Skill.Persuade, Skill.Sorcery],
      99,
      Source.Kull
    ),
    [Nature.Skeptical]: new NatureModel(
      'Skeptical',
      'As soon as someone tells you something, you find a reason to doubt. It’s not that you disbelieve everything, but that you have seen enough to know that most of the time, things are not what they seem.',
      Attribute.Intelligence,
      [Skill.Discipline, Skill.Insight, Skill.Observation],
      [Skill.Lore, Skill.Persuade, Skill.Thievery],
      [Skill.Discipline, Skill.Insight, Skill.Lore, Skill.Observation, Skill.Persuade, Skill.Thievery],
      99,
      Source.Kull
    ),
    [Nature.Superstitious]: new NatureModel(
      'Superstitious',
      'The world is ruled by unseen forces, and you know that it is not wise to tempt fate or to ignore the gods and demons, however scant evidence there is of their existence. You make a point to avoid actions that will bring you ill-luck and are thankful when fortune favors you. ',
      Attribute.Awareness,
      [Skill.Discipline, Skill.Lore, Skill.Sorcery],
      [Skill.Counsel, Skill.Observation, Skill.Stealth],
      [Skill.Counsel, Skill.Discipline, Skill.Lore, Skill.Observation, Skill.Sorcery, Skill.Stealth],
      99,
      Source.Kull
    ),
    [Nature.Traditionalist]: new NatureModel(
      'Traditionalist',
      'You trust and rely upon your wise ancestors and rulers for their judgment and respect the traditions you have inherited. You may not understand the reasons for these laws and customs, but there is no reason to change things for the sake of change. ',
      Attribute.Willpower,
      [Skill.Counsel, Skill.Discipline, Skill.Society],
      [Skill.Command, Skill.Lore, Skill.Persuade],
      [Skill.Command, Skill.Counsel, Skill.Discipline, Skill.Lore, Skill.Persuade, Skill.Society],
      99,
      Source.Kull
    ),
    //[Nature.]: new NatureModel(
    //    "",
    //    "",
    //    Attribute.,
    //    [Skill., Skill., Skill.],
    //    [Skill., Skill., Skill.],
    //    [Skill., Skill., Skill., Skill., Skill., Skill.],
    //    99,
    //    Source.),
  };

  getNatures() {
    var natures: NatureViewModel[] = [];
    var n = 0;
    for (var nature in this._natures) {
      var nat = this._natures[nature];
      if (character.hasSource(nat.source)) {
        natures.push(new NatureViewModel(n, nat));
      }

      n++;
    }

    return natures.sort((a, b) => a.name.localeCompare(b.name));
  }

  getNature(nature: Nature) {
    return this._natures[nature];
  }

  getNatureForRoll(roll: number) {
    var n = 0;
    for (var nature in this._natures) {
      var a = this._natures[nature];
      if (a.roll >= roll) {
        return n;
      }

      n++;
    }
  }

  generateNature(source: Source) {
    var roll = Math.floor(Math.random() * 20) + 1;

    if (source === Source.Skelos) {
      return this.generateSorcerousNature(roll);
    } else if (source === Source.Pirate) {
      return this.generatePirateNature(roll);
    }

    var n = 0;
    for (var nature in this._natures) {
      var a = this._natures[nature];
      if (a.roll >= roll) {
        return n;
      }

      n++;
    }
  }

  applyNature(nature: Nature) {
    var nat = this.getNature(nature);
    character.attributes[nat.attribute].value++;

    nat.mandatory.forEach((s, i) => {
      character.skills[s].expertise++;
      character.skills[s].focus++;
    });
  }

  private generateSorcerousNature(roll: number) {
    switch (roll) {
      case 1:
      case 2:
        return Nature.Inspirational;
      case 3:
      case 4:
        return Nature.Learned;
      case 5:
      case 6:
        return Nature.Sneaky;
      case 7:
      case 8:
        return Nature.Scheming;
      case 9:
      case 10:
        return Nature.Curious;
      case 11:
      case 12:
        return Nature.Practical;
      case 13:
      case 14:
        return Nature.UnholyBirth;
      case 15:
      case 16:
        return Nature.Cursed;
      case 17:
      case 18:
        return Nature.Academic;
      case 19:
      case 20:
        return Nature.Driven;
    }

    return undefined;
  }

  private generatePirateNature(roll: number) {
    switch (roll) {
      case 1:
      case 2:
        return Nature.Bloodthirsty;
      case 3:
      case 4:
        return Nature.Craven;
      case 5:
      case 6:
        return Nature.Egotistical;
      case 7:
      case 8:
        return Nature.Greedy;
      case 9:
      case 10:
        return Nature.Gregarious;
      case 11:
      case 12:
        return Nature.Lustful;
      case 13:
      case 14:
        return Nature.Reckless;
      case 15:
      case 16:
        return Nature.Remorseless;
      case 17:
      case 18:
        return Nature.Ruthless;
      case 19:
      case 20:
        return Nature.Vain;
    }

    return undefined;
  }
}

export const NaturesHelper = new Natures();
