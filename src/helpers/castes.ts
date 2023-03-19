import { character } from '../common/character';
import { HomeLand } from './homelands';
import { Skill } from './skills';
import { Source } from './sources';
import { TalentModel, TalentsHelper } from './talents';

export enum Caste {
  // Core
  Crafter,
  EscapedSerfSlave,
  Farmer,
  Herder,
  Merchant,
  Outcast,
  PettyNobility,
  Priesthood,
  Warrior,
  // Thief
  Outlaw,
  // Barbarian
  Barbaric,
  LawSpeaker,
  Renegade,
  Skald,
  // Mercenary
  BornSoldier,
  ChildOfCampFollowers,
  // Pirate
  Corsair,
  Fisher,
  Marine,
  Sailor,
  Trader,
  // Brigand
  HorseNomad,
  HunterGatherer,
  // Scout
  Clanfolk,
  Pioneer,
  Soldier,
  // Wanderer
  ChieftainsScion,
  HereditaryScholar,
  HorseClans,
  // King
  Estateless,
  LandedGentry,
  // Adventurer
  Laborers,
  Scribes,
  StygianPriest,
  Axumite,
  CleverOne,
  Exile,
  Griot,
  Tribesperson,
  // Kull
  Aristocrat,
  Conquered,
  Courtier,
  Feral,
  Savage,
}

class CasteModel {
  name: string;
  description: string;
  talents: TalentModel[];
  skill: Skill;
  socialStanding: number;
  roll: number;
  source: Source;

  constructor(
    name: string,
    description: string,
    talents: TalentModel[],
    skill: Skill,
    socialStanding: number,
    roll: number,
    source: Source
  ) {
    this.name = name;
    this.description = description;
    this.skill = skill;
    this.talents = talents;
    this.socialStanding = socialStanding;
    this.roll = roll;
    this.source = source;
  }
}

class CasteViewModel extends CasteModel {
  id: Caste;

  constructor(id: Caste, base: CasteModel) {
    super(base.name, base.description, base.talents, base.skill, base.socialStanding, base.roll, base.source);
    this.id = id;

    if (
      character.homeland === HomeLand.Hyperborea ||
      character.homeland === HomeLand.Cimmeria ||
      character.homeland === HomeLand.Nordheim
    ) {
      if (id === Caste.Crafter) {
        this.socialStanding = 1;
      } else if (id === Caste.Outcast) {
        this.socialStanding = 0;
      }
    }

    if (character.homeland === HomeLand.Nordheim) {
      if (id === Caste.EscapedSerfSlave) {
        this.name = 'Thrall';
      } else if (id === Caste.Farmer) {
        this.name = 'Churl';
      }
    }

    if (character.homeland === HomeLand.Vendhya) {
      if (id === Caste.Warrior) {
        this.name = 'Kshatriya';
      } else if (id === Caste.Priesthood) {
        this.name = 'Brahmin';
      } else if (id === Caste.Merchant) {
        this.name = 'Vaishya';
      } else if (id === Caste.EscapedSerfSlave) {
        this.name = 'Shudra';
      }
    }
  }
}

export class Castes {
  private _castes: { [id: number]: CasteModel } = {
    [Caste.Crafter]: new CasteModel(
      'Crafter',
      'There is an honesty in the way hammer hits metal, or how the awl bites into the wood. You’ve learned to trust in the objects you make, far more than those who might use them. When war-drums beckon, your purse swells with gold, and in peace-time it is sometimes difficult to make ends meet. Perhaps it’s time you packed up your tools and went looking for a new war.',
      [TalentsHelper.getTalent('Subject'), TalentsHelper.getTalent('Tradesman')],
      Skill.Craft,
      1,
      2,
      Source.Core
    ),
    [Caste.EscapedSerfSlave]: new CasteModel(
      'Escaped Serf/Slave',
      'Whether from an open field or within the confines of the deepest mine, you were caught and forced into labor, a fate you despised. One day an opportunity presented itself, and you set yourself free. Now you look back only to see if your former masters are searching for you.',
      [TalentsHelper.getTalent('Embittered'), TalentsHelper.getTalent('Vagabond')],
      Skill.Survival,
      0,
      4,
      Source.Core
    ),
    [Caste.Farmer]: new CasteModel(
      'Farmer',
      'Born to the field, you learned your parents’ lessons well. One day, though, the time came when you had to face the open road. Perhaps your farm was razed to the ground, or suffered blight, or you simply sought a life other than that of a farmer. Whether your memory is filled with regrets or swimming with excitement, you feel a connection to the soil and to those who work to reap its bounty.',
      [TalentsHelper.getTalent('Homesteader'), TalentsHelper.getTalent('Subject')],
      Skill.Animal_Handling,
      1,
      6,
      Source.Core
    ),
    [Caste.Herder]: new CasteModel(
      'Herder',
      'There are wolves at the edge of every land. Some walk on four feet, others on two. Regardless of where these predators come from, they inevitably seek to steal from your flock. It is up to you to stop them. Even though you’ve taken to a different life and your original flock is long gone, this basic fact hasn’t changed, and you remain ever-vigilant.',
      [TalentsHelper.getTalent('Sentry'), TalentsHelper.getTalent('Subject')],
      Skill.Animal_Handling,
      1,
      8,
      Source.Core
    ),
    [Caste.Merchant]: new CasteModel(
      'Merchant',
      'In vast families joined by convention and marriage there is little room for the youngest child to thrive. Still, whether you managed your uncle’s stalls, sold jewels found by thieves in the Maul, or supervised caravans between mighty cities, you know there is profit in providing the rare to the wealthy. Perhaps in this there is room enough for you to make your mark.',
      [TalentsHelper.getTalent('Tradesman'), TalentsHelper.getTalent('Vagabond')],
      Skill.Persuade,
      1,
      12,
      Source.Core
    ),
    [Caste.Outcast]: new CasteModel(
      'Outcast',
      'Met with disgusted eyes from even the slaves, outcasts are the beggars and petty thieves that skulk in alleys, sifting through rubbish for something to sell. While each nation treats outcasts differently, none treat them well, and you are used to hostility, or indifference at best, wherever you go.',
      [TalentsHelper.getTalent('Embittered'), TalentsHelper.getTalent('Survivor')],
      Skill.Thievery,
      0,
      14,
      Source.Core
    ),
    [Caste.PettyNobility]: new CasteModel(
      'Petty Nobility',
      'Your family has little need for you, as you were born far outside the line of succession. Your father sent you away with parting words telling you to “find your own sort of glory, or fail and be forgotten” seared into your mind. You have unlimited opportunities to find your own way, but you may find trouble should your family’s enemies learn of your forays.',
      [TalentsHelper.getTalent('Sheltered'), TalentsHelper.getTalent('Subject')],
      Skill.Command,
      2,
      16,
      Source.Core
    ),
    [Caste.Priesthood]: new CasteModel(
      'Priesthood',
      'The gods are real and active in the world around you, a fact you know for certain. They require sacrifice and dedication, and are not as mercyful as we would hope. Whether your worship is from love, fear, ambition , or tradition, you have the certainty needed to navigate their most complicated rites and to ensure they do not inflict curses upon those you would protect.',
      [TalentsHelper.getTalent('Priest'), TalentsHelper.getTalent('Subject')],
      Skill.Lore,
      2,
      18,
      Source.Core
    ),
    [Caste.Warrior]: new CasteModel(
      'Warrior',
      'One of your parents fought and died in battle. Your grandparent died guarding a city wall, having seen nothing more than the occasional tavern brawl. There was never a choice as to whether you’d pick up the blade as a calling, only the question as to how you’d turn profit from it.',
      [TalentsHelper.getTalent('Sentry'), TalentsHelper.getTalent('Subject')],
      Skill.Parry,
      1,
      20,
      Source.Core
    ),
    [Caste.Outlaw]: new CasteModel(
      'Outlaw',
      'In every society, there are intergenerational gangs of criminals, places where you learn the arts of larceny in the cradle and are tutored in robbery, as a squire is the sword.',
      [TalentsHelper.getTalent('Tradesman'), TalentsHelper.getTalent('Vagabond')],
      Skill.Society,
      0,
      99,
      Source.Thief
    ),
    [Caste.Barbaric]: new CasteModel(
      'Barbaric',
      'You hail from the uncivilized lands of the North, whether Cimmeria, Nordheim, or parts of Hyperborea. Your ways are strange and primitive to the folks of the Hyborian kingdoms and beyond, and you find their own practices and customs to be equally baffling. This is not to be confused with the Barbarian archetype, and barbaric characters may often have the caste as well as the archetype.',
      [TalentsHelper.getTalent('Savage Dignity'), TalentsHelper.getTalent('Uncivilized')],
      Skill.Discipline,
      1,
      99,
      Source.Barbarian
    ),
    [Caste.LawSpeaker]: new CasteModel(
      'Law-speaker',
      'Amongst the barbaric clans, tribes, and villages that make up most of Nordheim and Cimmeria, the role of the law-speaker is an important one. Charged with interpreting the will of the gods and adjudicating between aggrieved parties, the law-speaker is listened to by all, from the lowliest peasant to the mightiest chieftain or jarl. This responsibility is often inherited, and children of law-speakers are trained in this tradition.',
      [TalentsHelper.getTalent('Respectable'), TalentsHelper.getTalent('Subject')],
      Skill.Society,
      2,
      99,
      Source.Barbarian
    ),
    [Caste.Renegade]: new CasteModel(
      'Renegade',
      'Whatever the cause, those of your lineage — parents or grandparents — broke with the laws of land and liege, whether it was the breaking of an oath or a blood-feud with family, and chose to live outside society. In lands defined with kinship and bonds of loyalty, you and your family are considered renegades, though holding to your own code of honor. Your predecessors might have wandered freely, have settled somewhere else, or remained in one area, feared — or even beloved — by the folk there, but they, and you, will always be outsiders to some degree.',
      [TalentsHelper.getTalent('Exiled'), TalentsHelper.getTalent('Vagabond')],
      Skill.Survival,
      0,
      99,
      Source.Barbarian
    ),
    [Caste.Skald]: new CasteModel(
      'Skald',
      'Whether travelers or born to a particular place, your family are known as born tale-tellers, and you have grown up at the knee of a grandparent or parent skilled in the weaving of tales, the reciting of epic sagas, and performance, vocal or with an instrument. As a child, you were accustomed to being the one asked to tell the story, and much of your youth was spent learning to pitch and control your voice, to master an instrument, or to weave new tales from whatever strands you can imagine.',
      [TalentsHelper.getTalent('Respectable'), TalentsHelper.getTalent('Storyteller')],
      Skill.Persuade,
      1,
      99,
      Source.Barbarian
    ),
    [Caste.BornSoldier]: new CasteModel(
      'Born Soldier',
      'You were born to war. Whether pressed into the service of your homeland at an early age, or raised by the captain of a mercenary company, you have little memory of anything except battle. To you, war is a profession and a calling. Many men and women take up arms in times of trouble, but few live by that same sword and seek out trouble of their own volition. The born soldier yearns for battle. The born soldier thrives... nay... needs the rousing fury stoked in one’s veins by the clashing of arms!',
      [TalentsHelper.getTalent('Sentry'), TalentsHelper.getTalent('Vagabond')],
      Skill.Discipline,
      1,
      99,
      Source.Mercenary
    ),
    [Caste.ChildOfCampFollowers]: new CasteModel(
      'Child of Camp Followers',
      'You were born to a camp follower, one of those motley folks that travel behind mercenary companies like carrion following battle. Your innocence was brief with all the adult pleasures and horrors of the world surrounding you. In time, you decided you wanted to take up a blade with those whose gold and crumbs your people scrambled for.',
      [TalentsHelper.getTalent('Survivor'), TalentsHelper.getTalent('Scrounger')],
      Skill.Survival,
      0,
      99,
      Source.Mercenary
    ),
    [Caste.Corsair]: new CasteModel(
      'Corsair',
      'Seafaring raiders, corsairs are drafted or chosen for their fierceness and ambition while still young. Corsair expeditions are financed by chiefs or kings, raiding their neighbors and sometimes as far up the coastline as Shem or Argos.',
      [TalentsHelper.getTalent('Naval Discipline'), TalentsHelper.getTalent('Reaver')],
      Skill.Melee,
      1,
      99,
      Source.Pirate
    ),
    [Caste.Fisher]: new CasteModel(
      'Fisher',
      'Whether using spear, rod, or net, you worked with your family to gather fish for sale and sustenance, for yourselves or others. You may have gathered shellfish in the wet shallows and coastal sands, diving for pearls with knife and bag in hand, or sailed far to sea with great nets or spears to bring back many small fish or one great one. It was hard work, and you learned the trade well, including the skills of woodcarving, knotwork, and the repair of your equipment.',
      [TalentsHelper.getTalent('Fisher'), TalentsHelper.getTalent('Wave-harvester')],
      Skill.Craft,
      0,
      99,
      Source.Pirate
    ),
    [Caste.Marine]: new CasteModel(
      'Marine',
      'One of your parents — and likely, their parent — served in one of the great navies of the coastal kingdoms, whether Shem, Stygia, Argos, Zingara, or Turan. This parent hunted pirates or acted as a privateer, and battled the navies of neighboring kingdoms in the games of kings. You heard their tales of great sea-battles and bloodletting on the high seas, and knew that one day you would follow them to sea.',
      [TalentsHelper.getTalent('Naval Discipline'), TalentsHelper.getTalent('Salt for Blood')],
      Skill.Ranged_Weapons,
      1,
      99,
      Source.Pirate
    ),
    [Caste.Sailor]: new CasteModel(
      'Sailor',
      'Your father was a sailor, whether in a navy or as part of a merchant fleet. He was absent for long stretches of time, sailing up and down the coast of the Western Ocean or the Vilayet Sea. Much of your youth was spent at the docks, waiting to see if he returned, and when he did your ears were filled with tales of piracy and horrors from the deep.',
      [TalentsHelper.getTalent('Call of the Sea'), TalentsHelper.getTalent('Explorer')],
      Skill.Sailing,
      1,
      99,
      Source.Pirate
    ),
    [Caste.Trader]: new CasteModel(
      'Trader',
      'Your parents and their parents and those before them made their living from the ocean, whether at a coastal shop, a dockside stand, or through the transport of goods — sometimes illicit items or even slaves — up and down the coast for sale or resale. You’ve been on many trade voyages, and know your way around the coast.',
      [TalentsHelper.getTalent('Sea-trader'), TalentsHelper.getTalent('Shipbuilder')],
      Skill.Society,
      2,
      99,
      Source.Pirate
    ),
    [Caste.HorseNomad]: new CasteModel(
      'Horse Nomad',
      'You are one of the nomad tribes of the desert or steppes, accustomed to a hard life wrung from a nearwasteland. From your birth, you were brought up to weigh every action by asking whether it contributes to your survival or worsens your chances. The most important thing in your tribe is your mount — a sturdy desert horse — and you depend on it for everything.',
      [TalentsHelper.getTalent('Migrant'), TalentsHelper.getTalent('Saddle-bred')],
      Skill.Animal_Handling,
      1,
      99,
      Source.Brigand
    ),
    [Caste.HunterGatherer]: new CasteModel(
      'Hunter-Gatherer',
      'Your tribe is one of those who roam the desert or steppes in an eternal cycle of camping, hunting for game and gathering all that might be scavenged, and then moving on when the area is depleted. For this reason, you are accustomed to living light, and taking only what is needed. The hard ground is a soft bed to you, the open sky your roof. The comforts of civilization are not only astonishing and oft inexplicable to you, you may also find them vaguely obscene.',
      [TalentsHelper.getTalent('Forager'), TalentsHelper.getTalent('Rugged')],
      Skill.Survival,
      1,
      99,
      Source.Brigand
    ),
    [Caste.Clanfolk]: new CasteModel(
      'Clanfolk',
      'Blood is the strongest link between people, and you hail from one of the tight-knit clans of your homeland, folk untouched and nearly lawless but for their own discipline and traditions. Your home territory was largely left untouched, either too rugged or remote for settlement, far from the ability of a regional lord to govern. Though you were surrounded by family, life was not easy, and you set forth to find your own path, away from the rigid strictures of clan.',
      [TalentsHelper.getTalent('Clannish'), TalentsHelper.getTalent('Hunter')],
      Skill.Athletics,
      1,
      99,
      Source.Scout
    ),
    [Caste.Pioneer]: new CasteModel(
      'Pioneer',
      'The civilized lands of the southern kingdoms — whether Aquilonia, Nemedia, Brythunia, or even further afield such as Argos or Zingara — are all held by iron-fast monarchies, feudal societies where there is little hope of betterment. The frontiers, however, are limitless, and there your grandparents or parents sought new lives, provided with the rudiments to survive by the governments of their homelands. The tithes were high, but bearable, and years later the former wilderness is more home to your family than any city.',
      [TalentsHelper.getTalent('Enterprising'), TalentsHelper.getTalent('Hunter')],
      Skill.Survival,
      1,
      99,
      Source.Scout
    ),
    [Caste.Soldier]: new CasteModel(
      'Soldier',
      'There are few postings more dreaded by the professional soldier than being stationed at a frontier garrison, and unfortunately your forebear was assigned just such a duty. It is dangerous beyond any measure, with the entire north filled with barbarians or Picts all too eager to spill the blood of civilized folk. The pay, when it comes, is meager, and the rudiments of civilization are nowhere to be found should one wish to spend hard-earned coin. Despite this, your family somehow made this a home, and you come from a line of those stationed to guard the thin line between civilization and wilderness.',
      [TalentsHelper.getTalent('Regimented'), TalentsHelper.getTalent('Strife')],
      Skill.Observation,
      1,
      99,
      Source.Scout
    ),
    [Caste.ChieftainsScion]: new CasteModel(
      "Chieftain's Scion",
      'You are the son or daughter of a chieftain, possibly Hyrkanian or Ghuli in origin. Your rightful place in your parent’s tribe was either lost or is paused while you wander the world. What is it you seek so far away from home? Will you bring it back with you or will you remain one of the souls who never returns?',
      [TalentsHelper.getTalent('Sheltered'), TalentsHelper.getTalent('Subject')],
      Skill.Command,
      1,
      99,
      Source.Wanderer
    ),
    [Caste.HereditaryScholar]: new CasteModel(
      'Hereditary Scholar',
      'You are of an elite and somewhat separated caste, brought up within a temple, school, or even a monastery; educated almost from birth, your intended destiny is to join your brethren as a scholar, acolyte, or even a teacher. As such, your pursuit of the path of knowledge has led you along esoteric routes, and the cloistered environment you were brought up in has become all-too-confining.',
      [TalentsHelper.getTalent('Priest'), TalentsHelper.getTalent('Subject')],
      Skill.Lore,
      1,
      99,
      Source.Wanderer
    ),
    [Caste.HorseClans]: new CasteModel(
      'Horse Clans',
      'You are one of the great nomad clans or tribes that spread over Hyrkania. You live off the land and from war and raiding. Life is spent on the move: in the saddle, bow in hand, wind in your hair, and Erlik’s hell calling you to a home where, finally, you will rest. None can master you with the bow or horsemanship. ',
      [TalentsHelper.getTalent('Survivor'), TalentsHelper.getTalent('Vagabond')],
      Skill.Animal_Handling,
      1,
      99,
      Source.Wanderer
    ),
    [Caste.Estateless]: new CasteModel(
      'Estateless',
      'You have a title but no estate. This may mean you are a knight (or equivalent) of the realm, but it could also mean that you or your family lost the estate and the wealth along with it. Nobles in the latter position often leave home, unable to bear the shame of being numbered among the common and impoverished.',
      [TalentsHelper.getTalent('Indebted'), TalentsHelper.getTalent('Subject')],
      Skill.Persuade,
      1,
      99,
      Source.King
    ),
    [Caste.LandedGentry]: new CasteModel(
      'Landed Gentry',
      'You have both title and an estate, which means you rule over your holdings. They produce income but also cause you to owe fealty to those above you. You were most likely born with this status, though it may also have been conferred upon you after meritorious service or monetary ‘contributions’ to a lord. Almost anything can be bought in the Hyborian world, even nobility',
      [TalentsHelper.getTalent('Respected'), TalentsHelper.getTalent('Sheltered')],
      Skill.Society,
      1,
      99,
      Source.King
    ),
    [Caste.Laborers]: new CasteModel(
      'Laborer',
      'Most Stygians living in the cities are from the laboring class. They do not have the skills to be crafters or artisans, nor do they perform the specific work available to farmers or herdsmen. These are porters and diggers, the ones who work arduously at the bidding of the artisans, priests, and administrators. Though they may worship Set in name, they mostly keep their heads down and hope not to incur the wrath of the priests. Most within this caste are of multiple heritages, although all consider themselves Stygian. Few, if any, of this caste can read unless they have had training as a scribe. No one from these classes may legally carry weapons unless conscripted into the military. Failure to comply with the law usually means a trip to the sacrificial altars of the priests of Set. ',
      [TalentsHelper.getTalent('Subject'), TalentsHelper.getTalent('Tradesman')],
      Skill.Craft,
      0,
      99,
      Source.Adventurer
    ),
    [Caste.Scribes]: new CasteModel(
      'Scribe',
      'Scribes are the record keepers and intellectuals of Stygia. Only the most educated of Stygians know how to read and write, giving the scribes prestige and influence, opening the doors for social advancement. They may be accountants, barbers, priests, doctors, government officials, or serve within the court of the Stygian king. The profession of scribe is generally handed down from parent to child since the fall of the Giant-kings, but a few honored individuals gain apprenticeships as reward for services well-rendered. The scribes know full well their status and jealously guard their secrets. Anyone who learns the rudiments of reading and writing the complex Stygian hieroglyphs must apprentice and train as a scribe or join a school that trains scribes — the alternative is a one-way trip to the sacrificial altar.',
      [TalentsHelper.getTalent('Hyperliterate'), TalentsHelper.getTalent('Subject')],
      Skill.Lore,
      1,
      99,
      Source.Adventurer
    ),
    [Caste.StygianPriest]: new CasteModel(
      'Stygian Priest',
      'Priests hold the reins of power in the government and in the temples. Stygian priests are the most able throughout the society. They grow wealthy from donations to the gods, for all Stygians give gifts to Set and the other gods. Priests and nobles pass their position down from father to son. Priests are not just religious votaries standing in front of altars or haunting temples. Priests in Stygia are the bureaucracy of Stygia. Priests are diplomats, foreign dignitaries, doctors, embalmers, viziers, advisors, and supervisors. Only a select few are sorcerers: those seeking that level of power must seek out the Black Ring. Part-time priests, called phyles, come from the lower castes and function as porters, painters, or scribes. Outside of symbolic knives, most priests travel unarmed, preferring to use warriors for defense. All priests have titles, usually beginning as acolyte and progressing through novice, adept, overseer, and high priest. Priests, whether full-time or part-time, become initiates into the priesthood. The rituals involved take place over the course of a lunar month and involve rites of scarification, ritual purification, and frequent applications of the Black Lotus.',
      [TalentsHelper.getTalent('Priest'), TalentsHelper.getTalent('Subject')],
      Skill.Lore,
      2,
      99,
      Source.Adventurer
    ),
    [Caste.Axumite]: new CasteModel(
      'Axumite',
      'The provincial and uneducated, those who have never left their chosen homelands, consider the kingdoms of the south to be such in name alone. They couldn’t be more wrong. The far-flung south holds cities every bit as wondrous, often more so, than its northern neighbors, cities that have stood for thousands of years, built upon the shoulders and lineage of those who came before. With such long-standing and rich traditions, it comes as no surprise that even the common folk of the great cities often prove to be well-educated and cultured beyond even the nobility of their northern neighbors.',
      [TalentsHelper.getTalent('Subject'), TalentsHelper.getTalent('Tradesman')],
      Skill.Society,
      1,
      99,
      Source.Adventurer
    ),
    [Caste.CleverOne]: new CasteModel(
      'Clever One',
      'Known by a variety of names and titles, Clever Ones represent leaders in their communities on matters of spirituality and custom. Though the degree to which a culture invests authority in a Clever One varies, members of this caste are generally the authority on matters concerning deities, the spirit world, rituals, customs, traditions, omens, and taboos. As the intermediary between your people and the objects of their veneration, what drove you out among strangers? Did you defy the ways of your people, or transgress in some other way? Did you learn something through your contact with the spirit world that made it impossible to stay?',
      [TalentsHelper.getTalent('Priest'), TalentsHelper.getTalent('Savage Dignity')],
      Skill.Sorcery,
      1,
      99,
      Source.Adventurer
    ),
    [Caste.Exile]: new CasteModel(
      'Exile',
      'The laws of a tribe a vary. Some have many while others have few, but most are inviolate. The lives of the entire community depend on these rules, and those who break the most important of them risk exile. You betrayed the trust of your people and became an outcast. Perhaps you defiled the grave of an ancestor looking for valuables? Did you steal a neighbor’s cattle? Murder kin amongst your people? Whatever you did, only you and the tribe know about it. You perhaps bear a physical mark, so others know you are an outcast but few outside your region would know what the crime was. Starting a new life seems the best option, but no matter where you go your ancestor’s disappointment and ire follow.',
      [TalentsHelper.getTalent('Exiled'), TalentsHelper.getTalent('Vagabond')],
      Skill.Survival,
      -1,
      99,
      Source.Adventurer
    ),
    [Caste.Griot]: new CasteModel(
      'Griot',
      'Every society needs its guardians, not only those who bear sword and spear, but also those who maintain the traditions and memory of the people. In the south, the griots are these guardians, responsible for judging the worth of the people through their praise-songs, stories, and castigations. The griot is a troubadour, the counterpart of the northern minstrels. The virtuoso talents of the griots command universal admiration. This skill is the culmination of long years of study and demanding work under the tuition of a teacher who is often a father or uncle, but not always. The profession is by no means a male prerogative, and many griots are women whose talents as singers and musicians are equally remarkable.',
      [TalentsHelper.getTalent('Respected'), TalentsHelper.getTalent('Storyteller')],
      Skill.Persuade,
      2,
      99,
      Source.Adventurer
    ),
    [Caste.Tribesperson]: new CasteModel(
      'Tribesperson',
      'You may have been a herder, a hunter, a healer, or all three and more. A tribesperson must know a variety of things from the stories of your people’s origin to properly skinning a boar. Unlike city folk, your people cannot afford to overspecialize. If the healer takes ill, people do not stop getting sick. Hunters wounded by boar cannot hunt, but the people do not cease to be hungry. By having an array of skills shared between kin, the tribe survives. Perhaps you left for the call of adventure. Perhaps your people died, and you are the only survivor. Regardless, you are unfamiliar with being alone, and the loss of community is palpable.',
      [TalentsHelper.getTalent('Sentry'), TalentsHelper.getTalent('Homesteader')],
      -1, // or Healing
      1,
      99,
      Source.Adventurer
    ),
    [Caste.Aristocrat]: new CasteModel(
      'Aristocrat',
      'You are the product of extremely old money, a scion or daughter of a family who secured wealth and station a dozen generations or more ago. Privilege and power are your birthright, and opportunity opens for you wherever you choose to spend your time. The weight of tradition alone holds your place, though your actions might cement it further.',
      [TalentsHelper.getTalent('Connected'), TalentsHelper.getTalent('Sheltered')],
      Skill.Society,
      2,
      99,
      Source.Kull
    ),
    [Caste.Conquered]: new CasteModel(
      'Conquered',
      'Your people were once proud and free but were conquered generations ago by a powerful nation. They now live as second-class citizens, slaves or servants, in the cities and farmlands they used to rule. The higher classes treat you with disdain, but you hold a deep connection to others of your tribe, based on shared duress and memories of a better time.',
      [TalentsHelper.getTalent('Embittered'), TalentsHelper.getTalent('Sullen Obedience')],
      Skill.Observation,
      0,
      99,
      Source.Kull
    ),
    [Caste.Courtier]: new CasteModel(
      'Courtier',
      'From birth or even before, all knew you would spend your life in the halls of power like your parents, and their parents before them. Whether your assignment is as a clerk, tax collector, steward, military advisor, or close confidant of a ruler, you are adept at navigating the complex and perilous byways of speaking truth and lies to power in appropriate balance.',
      [TalentsHelper.getTalent('Bureaucrat'), TalentsHelper.getTalent('Subject')],
      Skill.Lore,
      1,
      99,
      Source.Kull
    ),
    [Caste.Feral]: new CasteModel(
      'Feral',
      'Raised in the wilderness by animals, you encountered human civilization only later in life. Their ways still confuse and sometimes horrify you. The same can be said of how others view your own ways, as you remind them of the wild from which their entire society was built to shield them. ',
      [TalentsHelper.getTalent('Survivor'), TalentsHelper.getTalent('Vagabond')],
      Skill.Animal_Handling,
      0,
      99,
      Source.Kull
    ),
    [Caste.Savage]: new CasteModel(
      'Savage',
      'You spent your youth in barbaric lands, living among peoples unaccustomed to the niceties and luxuries of civilized society. Although you can now move among them with comfort, and even some respect, you are keenly aware of the differences between their minds and yours. Sometimes this is confusing. Other times, it results in sudden insights you can turn to your advantage.',
      [TalentsHelper.getTalent('Sentry'), TalentsHelper.getTalent('Untamed')],
      Skill.Observation,
      0,
      99,
      Source.Kull
    ),
  };

  getCastes() {
    var castes: CasteViewModel[] = [];

    if (character.homeland === HomeLand.Vendhya) {
      castes = [
        new CasteViewModel(Caste.Warrior, this._castes[Caste.Warrior]),
        new CasteViewModel(Caste.Priesthood, this._castes[Caste.Priesthood]),
        new CasteViewModel(Caste.Merchant, this._castes[Caste.Merchant]),
        new CasteViewModel(Caste.EscapedSerfSlave, this._castes[Caste.EscapedSerfSlave]),
      ];

      return castes.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }

    var n = 0;
    for (var caste in this._castes) {
      var cas = this._castes[caste];
      if (character.hasSource(cas.source)) {
        if (n === Caste.Priesthood) {
          if (character.homeland === HomeLand.Cimmeria) {
            n++;
            continue;
          } else if (character.homeland === HomeLand.Stygia && character.hasSource(Source.Adventurer)) {
            n++;
            continue;
          }
        } else if (n === Caste.StygianPriest || n === Caste.Scribes || n === Caste.Laborers) {
          if (character.homeland !== HomeLand.Stygia) {
            n++;
            continue;
          }
        }

        castes.push(new CasteViewModel(n, cas));
      }
      n++;
    }

    return castes.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  getCaste(caste: Caste) {
    return new CasteViewModel(caste, this._castes[caste]);
  }

  getCasteForRoll(roll: number) {
    var n = 0;
    for (var caste in this._castes) {
      var c = this._castes[caste];
      if (c.roll >= roll) {
        return n;
      }

      n++;
    }
  }

  generateCaste(source: Source) {
    var roll = Math.floor(Math.random() * 20) + 1;

    if (source === Source.Skelos) {
      return this.generateSorcerousCaste(roll);
    } else if (source === Source.Pirate) {
      return this.generatePirateCaste(roll);
    } else if (character.hasSource(Source.Wanderer) && character.homeland == HomeLand.Vendhya) {
      return this.generateVendhyanCaste(roll);
    }

    var n = 0;
    for (var caste in this._castes) {
      var c = this._castes[caste];

      if (character.homeland === HomeLand.Cimmeria && n === Caste.Priesthood) {
        n++;
        continue;
      }

      if (c.roll >= roll) {
        return n;
      }

      n++;
    }
  }

  applyCaste(caste: Caste) {
    var c = this.getCaste(caste);

    if (c.skill > -1) {
      character.skills[c.skill].expertise++;
      character.skills[c.skill].focus++;
    }

    character.socialStanding = c.socialStanding;

    c.talents.forEach((t, i) => {
      character.addTalent(t.name);
    });
  }

  private generateSorcerousCaste(roll: number) {
    switch (roll) {
      case 1:
      case 2:
      case 3:
      case 4:
        return Caste.Outcast;
      case 5:
      case 6:
        return Caste.EscapedSerfSlave;
      case 7:
      case 8:
        return Caste.Merchant;
      case 9:
      case 10:
        return Caste.Crafter;
      case 11:
      case 12:
        return Caste.Herder;
      case 13:
      case 14:
      case 15:
      case 16:
        return Caste.Priesthood;
      case 17:
      case 18:
      case 19:
      case 20:
        return Caste.PettyNobility;
    }
  }

  private generatePirateCaste(roll: number) {
    switch (roll) {
      case 1:
      case 2:
      case 3:
      case 4:
        return Caste.Corsair;
      case 5:
      case 6:
      case 7:
      case 8:
        return Caste.Fisher;
      case 9:
      case 10:
      case 11:
      case 12:
        return Caste.Marine;
      case 13:
      case 14:
      case 15:
      case 16:
        return Caste.Sailor;
      case 17:
      case 18:
      case 19:
      case 20:
        return Caste.Trader;
    }
  }

  private generateVendhyanCaste(roll: number) {
    switch (roll) {
      case 1:
      case 2:
        return Caste.Warrior;
      case 3:
      case 4:
      case 5:
        return Caste.Priesthood;
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        return Caste.Merchant;
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        return Caste.EscapedSerfSlave;
    }
  }
}

export const CastesHelper = new Castes();
