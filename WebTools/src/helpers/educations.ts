import {Skill} from './skills';
import {character} from '../common/character';
import {ArchetypesHelper} from './archetypes';
import {EquipmentHelper, WeaponType, ArmorType} from './equipment';
import {DiceRoller} from './diceRoller';
import {Source} from './sources';

export enum Education {
    // Core
    AgainstYourParentsWill,
    ApprenticedAbroad,
    EducatedOnTheBattlefield,
    ElderMentor,
    FamilyFootsteps,
    FromMasterfulTutors,
    LargelyAbsent,
    OnYourOwnTerms,
    Traditional,
    UnderDuress,
    // Thief
    Fence,
    Burglar,
    ConfidenceMan,
    Rustler,
    LockBreaker,
    StandoverMan,
    Spider,
    Bandit,
    QuackPhysician,
    Thug,
    // Barbarian
    EducatedByTheEnemy,
    RaisedToLead,
    // Skelos
    ApprenticedToASorcerer,
    HauntedByGhosts,
    MysteryCultAdherent,
    OstracizedAcolyte,
    // Pirate
    Adrift,
    ChainedToAnOar,
    Deserter,
    Envoy,
    FirstMate,
    Mutiny,
    Navigator,
    OnceAMerchant,
    OutlawedOnTheShore,
    WoundedAtSea,
    // Cults
    CultTrained,
    // Brigand
    BornToKill,
    VictimTurnedVictimizer,
    // Beast Masters
    RaisedByTheWild,
    SaddleBorn,
    // Scout
    GoneNative,
    LifeInTheGarrison,
    OnTheFarm,
    SentToTheCity,
    TakenUnderTheWing,
    // Wanderer
    Apprenticed,
    DivineTutelage,
    FormallyTaught,
    OnTheBackOfAHorse,
    ProfessionalSoldiering,
    RoyalVassal,
    SchooledByTheWild,
    ShamanicTradition,
    TheWisdomOfElders,
    YithianPossession,
    // King
    Foreign,
    Parental,
    PrivateTutor,
    WarAcademy,
    // Adventurer
    OralTradition,
    FormalTradition,
    TaughtByTheDead,
    ThePathOfTheWarrior,
    CommunionWithAnimals,
    DreamsOfSet,
    AWitchFinderPatron,
    ADemonsBargain,
    WisdomOfTheStars,
    TheWildForge,
}

class EducationModel {
    name: string;
    description: string;
    mandatory: Skill[];
    elective: Skill[];
    equipment: string[];
    roll: number;
    source: Source;

    constructor(name: string, description: string, mandatory: Skill[], elective: Skill[], equipment: string[], roll: number, source: Source) {
        this.name = name;
        this.description = description;
        this.mandatory = mandatory;
        this.elective = elective;
        this.equipment = equipment;
        this.roll = roll;
        this.source = source;
    }
}

export class EducationViewModel extends EducationModel {
    id: Education;

    constructor(id: Education, base: EducationModel) {
        super(base.name, base.description, base.mandatory, base.elective, base.equipment, base.roll, base.source);
        this.id = id;
    }
}

export class Educations {
    private BattlefieldHonor = "BATTLEFIELDHONOR:";
    private RandomArchetypeEquipment = "RANDOMARCHETYPE:";

    private _educations: { [id: number]: EducationModel } = {
        [Education.AgainstYourParentsWill]: new EducationModel(
            "Against Your Parents' Will",
            "You sought out your own education, defying your parent’s wishes. Though they tried to guide you in a particular direction, you practiced secretly. Perhaps it was the path followed by one of your parents, a close relative, or some figure significant to you.",
            [Skill.Discipline, Skill.Lore, Skill.Stealth],
            [Skill.Animal_Handling, Skill.Sailing, Skill.Survival],
            ["A broken family heirloom"],
            2,
            Source.Core),
        [Education.ApprenticedAbroad]: new EducationModel(
            "Apprenticed Abroad",
            "As a child, you were sent (or taken) from your home and educated in another land, amidst strangers. You adapted to your home as you learned ways that were strange to you, picking up the rudiments of skills that you scarcely cared about, until you began to grasp their usefulness.",
            [Skill.Lore, Skill.Career, Skill.RandomCareer],
            [Skill.Animal_Handling, Skill.Craft, Skill.Sailing],
            ["A selection of useful maps of the Hyborian kingdom"],
            4,
            Source.Core),
        [Education.EducatedOnTheBattlefield]: new EducationModel(
            "Educated on the Battlefield",
            "Your education was a harsh one, your school-yard strewn with the dead and dying, the clash and clamor of combat were your lessons. For whatever reason, as a child you were thrust into battle, forced to fight for your survival with your enemies as the strictest of taskmasters.",
            [Skill.Acrobatics, Skill.Healing, Skill.Survival],
            [Skill.Melee, Skill.Parry, Skill.Ranged_Weapons],
            [EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile), this.BattlefieldHonor + "Helmet (Armor 3: Head; Heavy)"],
            6,
            Source.Core),
        [Education.FromMasterfulTutors]: new EducationModel(
            "Educated by Masterful Tutors",
            "Fortunate was your apprenticeship, and you found yourself able to learn under the tutelage of a true master. Whether sitting on the rough ground beside your teacher, educated in the high halls of nobility, or in a well-appointed workshop, you learned from the very best.",
            [Skill.Discipline, Skill.Lore, Skill.Career],
            [Skill.Resistance, Skill.Survival, Skill.Career],
            ["Letter of praise and introduction from your tutor"],
            8,
            Source.Core),
        [Education.ElderMentor]: new EducationModel(
            "Elder Mentor",
            "Your mentor was venerable, well-known and respected by peers and associates, but was one whose heyday had passed. It was time for you to pick up your belongings and continue on your mentor’s path, continuing that great and respected tradition.",
            [Skill.Discipline, Skill.Lore, Skill.RandomCareer],
            [Skill.Animal_Handling, Skill.Observation, Skill.Parry],
            [this.RandomArchetypeEquipment],
            10,
            Source.Core),
        [Education.FamilyFootsteps]: new EducationModel(
            "Family Footsteps",
            "You learned your career directly from one of your family-members: whether a parent, grandparent, uncle or aunt, brother or sister. This meant that you received additional attention, but also meant that the lessons were longer and the standards were much higher.",
            [Skill.Discipline, Skill.Resistance, Skill.Career],
            [Skill.Animal_Handling, Skill.Society, Skill.Survival],
            ["A family heirloom of little more than sentimental value"],
            12,
            Source.Core),
        [Education.LargelyAbsent]: new EducationModel(
            "Largely Absent",
            "Left to fend for yourself, you had to learn on your own. Perhaps it was through negligence or necessity, or it was tragedy that kept you alone. The end result was the same: hours and even days spent with little to do but study or train, to repeat tasks until you had mastered them.",
            [Skill.Athletics, Skill.Persuade, Skill.Career],
            [Skill.Acrobatics, Skill.Observation, Skill.Resistance],
            [],
            14,
            Source.Core),
        [Education.OnYourOwnTerms]: new EducationModel(
            "On Your Own Terms",
            "You always knew what you wanted, and sought out your own education when it was clear it would not be offered you. Driven, you chose your teachers carefully, and found other means of learning when there were none to instruct you. Even now, you follow your own path to enlightenment.",
            [Skill.Acrobatics, Skill.Athletics, Skill.Stealth],
            [Skill.Craft, Skill.Lore, Skill.Survival],
            [],
            16,
            Source.Core),
        [Education.Traditional]: new EducationModel(
            "Traditional",
            "Yours was an unremarkable education, perhaps thankfully. You were either trained in the family trade, apprenticed to (mostly) benevolent master, or tutored without overmuch drama. As such, your education was well-rounded, if not the most inspired. Looking back, you feel blessed.",
            [Skill.Animal_Handling, Skill.Craft, Skill.Career],
            [Skill.Melee, Skill.Parry, Skill.RandomCareer],
            ["Heavy Cape (Armor 1: Torso/Legs)|Crafting Tools|" + EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile)],
            18,
            Source.Core),
        [Education.UnderDuress]: new EducationModel(
            "Under Duress",
            "Whether you were enslaved, apprenticed cruelly, or were simply a reluctant student, your education was a hard-fought battle that you stubbornly resisted, only learning when it became absolutely necessary (and sometimes even barely so). Others look to these years with fondness: you do not.",
            [Skill.Lore, Skill.Resistance, Skill.Career],
            [Skill.Animal_Handling, Skill.Society, Skill.Survival],
            ["A broken family heirloom"],
            20,
            Source.Core),
        [Education.Fence]: new EducationModel(
            "Fence",
            "You either worked for a local fence, paying attention the variety of items being brought in almost as closely as those who sought to sell them, or you dealt with a fence that took a particular liking to you, teaching you how to identify valuable items, to bargain for a good price, and to re-sell them without earning the attention of the law.",
            [Skill.Lore, Skill.Observation, Skill.Stealth],
            [Skill.Animal_Handling, Skill.Insight, Skill.Society],
            [
                `${Math.max(DiceRoller.rollSpecial(3, 0).hits, 1)} extra Gold`,
                "An item that cannot easily be sold (GM's choice)"
            ],
            102,
            Source.Thief),
        [Education.Burglar]: new EducationModel(
            "Burglar",
            "You spent your formative years as an apprentice or assistant to a burglar, as part of a small gang of thieves that focused on burglary, or you figured it out for yourself.You’ve learned how to case a potential site, search for traps, watch for guards, and how to get in and out without notice.",
            [Skill.Athletics, Skill.Acrobatics, Skill.Stealth],
            [Skill.Discipline, Skill.Society, Skill.Thievery],
            [
                `${Math.max(DiceRoller.rollSpecial(1, 0).hits, 1)} extra Gold`,
                "Pry bar",
                "Lockpicks"
            ],
            104,
            Source.Thief),
        [Education.ConfidenceMan]: new EducationModel(
            "Confidence Man",
            "Whether it was family or strangers who taught you how to spin elaborate lies and convince others to trust you, you learned the subtle art of persuading people to act against their best interests, spending money on junk or otherwise behaving in a manner contrary to their beliefs.",
            [Skill.Insight, Skill.Observation, Skill.Persuade],
            [Skill.Alchemy, Skill.Athletics, Skill.Healing],
            [
                "Three sets of clothing: noble, tradesman and peasant"
            ],
            106,
            Source.Thief),
        [Education.Rustler]: new EducationModel(
            "Rustler",
            "Unlike other thieves, you spent your youth in the countryside, working with a group of cattle— or horse-thieves. You learned how to find them and to move with stealth into their barns, corrals, or pastures and lead them away without detection, and to train them for later re-sale.",
            [Skill.Animal_Handling, Skill.Craft, Skill.Survival],
            [Skill.Athletics, Skill.Melee, Skill.Resistance],
            [
                "Riding horse (+saddle and tack)|Mule (+saddle and tack)|Cow",
            ],
            108,
            Source.Thief),
        [Education.LockBreaker]: new EducationModel(
            "Lock Breaker",
            "Many are the thieves who use brute force to get what they want, while your apprenticeship was spent poring over locks and other mechanical devices, learning how to disable and dismantle them. While others learn to steal and escape quickly, yours is the art of stealing and leaving no trace there was ever a theft.",
            [Skill.Craft, Skill.Discipline, Skill.Thievery],
            [Skill.Alchemy, Skill.Lore, Skill.Stealth],
            [
                "Locks",
                "Lockpick set"
            ],
            110,
            Source.Thief),
        [Education.StandoverMan]: new EducationModel(
            "Standover Man",
            "Early on in life, you fell in with a standover man — someone who extorts money from tradesman through intimidation, usually a threat of violence.You went along as your mentor did their rounds, going from shop to shop and getting payment in return for being left alone. Sometimes it was necessary to show reluctant victims that it was no idle threat, but most of the time, the looming specter standing over them as they counted out their protection money was enough.",
            [Skill.Discipline, Skill.Insight, Skill.Thievery],
            [Skill.Melee, Skill.Parry, Skill.Resistance],
            [
                `${Math.max(DiceRoller.rollSpecial(3, 0).hits, 1)} extra Gold`,
                EquipmentHelper.getWeaponsOfType(WeaponType.Knife) + EquipmentHelper.getShields(),
                "Apple taken from a vendor's stall"
            ],
            112,
            Source.Thief),
        [Education.Spider]: new EducationModel(
            "Spider",
            "To thieves, a “spider” isn’t someone who climbs walls — it’s someone who sits in the middle of the web, watching and waiting, then pouncing when prey comes along.You apprenticed with just such a mentor, learning how to cultivate sources, leads, connections… how to barter for information and how to create a web of contacts that could get you what you want, and to help you get what others want.",
            [Skill.Observation, Skill.Stealth, Skill.Thievery],
            [Skill.Command, Skill.Insight, Skill.Persuade],
            [
                "Fine set of clothing",
                "Fake documents or badge of office",
                "Contacts high and low"
            ],
            114,
            Source.Thief),
        [Education.Bandit]: new EducationModel(
            "Bandit",
            "Out in the countryside with a gang of like-minded thugs, you and your allies preyed upon travelers, merchant caravans, and others who dared leave the safety of cities and their estates.You learned how to pick those ripe for looting, and those to avoid.",
            [Skill.Discipline, Skill.Resistance, Skill.Survival],
            [Skill.Ranged_Weapons, Skill.Society, Skill.Stealth],
            [
                "Wineskin and dried meat",
                "Heavy cloak",
                "Walking staff"
            ],
            116,
            Source.Thief),
        [Education.QuackPhysician]: new EducationModel(
            "Quack Physician",
            "You learned the healer’s art alongside one who sold false remedies to unwitting peasants, sometime even pretending to be miraculously cured.Occasionally you and your mentor treated some of the high and mighty, relieving them of their imagined pains as easily as you did their coin.Despite selling little more than flavored oils and wines, you nonetheless learned a bit about actual medicine.",
            [Skill.Counsel, Skill.Healing, Skill.Persuade],
            [Skill.Alchemy, Skill.Lore, Skill.Sorcery],
            [
                `${Math.max(DiceRoller.rollSpecial(2, 0).hits, 1)} extra Gold`,
                "Healer's kit",
                "4 bottles of false cures"
            ],
            118,
            Source.Thief),
        [Education.Thug]: new EducationModel(
            "Thug",
            "At the basest level of thievery looms the thug, a brute with little finesse, style, or training, used as henchmen and muscle by criminals across the continent.Maybe a family-member was a thug, showing you the ropes, or you joined the entourage of a gang leader and learned the brutal techniques of thuggery there.",
            [Skill.Melee, Skill.Ranged_Weapons, Skill.Resistance],
            [Skill.Command, Skill.Discipline, Skill.Persuade],
            [
                EquipmentHelper.getWeaponsOfType(WeaponType.Cudgel) + EquipmentHelper.getShields(),
                "Leather jerkin (Armor 2; Torso)"
            ],
            120,
            Source.Thief),
        [Education.EducatedByTheEnemy]: new EducationModel(
            "Educated by the Enemy",
            "Your community was at the edge of a larger nation, whether Aquilonia, Brythunia, or the Border Kingdom, and their efforts at colonization meant they forced you to learn their ways, in an attempt to make you more “civilized”. They are gone now, but left you an insight into their culture.",
            [Skill.Linguistics, Skill.Lore, Skill.Career],
            [Skill.Discipline, Skill.Insight, Skill.Society],
            [
                "Writing implements",
                "Religious icon of Mitra"
            ],
            299,
            Source.Barbarian),
        [Education.RaisedToLead]: new EducationModel(
            "Raised to Lead",
            "One of your parents was a powerful leader, and you grew up in the hall at their side, treated as if you would eventually take their throne and assume leadership of the community. You learned much from seeing how your parent treated others, and how they were treated in turn.",
            [Skill.Command, Skill.Society, Skill.Career],
            [Skill.Observation, Skill.Melee, Skill.Siegecraft],
            [
                "Fine drinking horn",
                "Ring of gold",
                "Suit of court clothing",
                EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile) + EquipmentHelper.getShields()
            ],
            299,
            Source.Barbarian),
        [Education.ApprenticedToASorcerer]: new EducationModel(
            "Apprenticed to a Sorcerer",
            "At an early age, you were handed over to a sorcerer. Perhaps they initially planned to sacrifice you, but for whatever reason they kept you on and trained you. As time progressed, the sorcerer introduced you to their dark patrons and offered to make you a sorcerer as well.",
            [Skill.Discipline, Skill.Lore, Skill.Sorcery],
            [Skill.Linguistics, Skill.Persuade, Skill.Society],
            [
                "Token from your former mentor",
            ],
            99,
            Source.Skelos),
        [Education.HauntedByGhosts]: new EducationModel(
            "Haunted by Ghosts",
            "While your family tried to teach you about the world, you faced other challenges. At night, you were visited — sometimes by voices, sometimes by presences, sometimes by nothing but the nagging doubt you were going mad. Over time, you listened to the voices, understood their teachings, and watched the ghosts argue amongst themselves and paint the walls with violent shadows. The spirits dwindled over time from a handful to just a single mentor, and now even that mentor has grown distant.",
            [Skill.Insight, Skill.Lore, Skill.Sorcery],
            [Skill.Discipline, Skill.Linguistics, Skill.Persuade],
            [
                "Small trinket associated with the dead or necromancy"
            ],
            99,
            Source.Skelos),
        [Education.MysteryCultAdherent]: new EducationModel(
            "Mystery Cult Adherent",
            "Your family always followed a faith hidden from the regular world. It may be a harmless faith, but other faiths can be dangerously intolerant; so, it is better to stay hidden. Now, you have learned the lesser mysteries and are ready to progress into the deeper secrets.",
            [Skill.Discipline, Skill.Insight, Skill.Stealth],
            [Skill.Alchemy, Skill.Lore, Skill.Sorcery],
            [
                "Holy symbol of your god"
            ],
            99,
            Source.Skelos),
        [Education.OstracizedAcolyte]: new EducationModel(
            "Ostracized Acolyte",
            "You studied their false path and learned that it offered little in true power. They just needed a thug who would do as they were told. That was never going to be you, and when you rebelled, you were cast aside. Still, you learned enough that finding other masters would not be too difficult.",
            [Skill.Healing, Skill.Lore, Skill.Melee],
            [Skill.Alchemy, Skill.Sorcery, Skill.Stealth],
            [
                "A stolen grimoire from your master's library"
            ],
            99,
            Source.Skelos),
        [Education.Adrift]: new EducationModel(
            "Adrift",
            "You were found clinging to a piece of flotsam, no clue to your origin other than your skin color and the language you spoke. How you got there, you do not like to remember. You were taken in by the crew of that vessel — merchant, naval, or pirate — apprenticed in their trades, yet you were always set apart.",
            [Skill.Craft, Skill.Sailing, Skill.Survival],
            [Skill.Athletics, Skill.Insight, Skill.Observation],
            [
                "A small keepsake from your past, worn about your neck or concealed somewhere"
            ],
            502,
            Source.Pirate),
        [Education.ChainedToAnOar]: new EducationModel(
            "Chained to an Oar",
            "You spent several years chained to an oar on a slave vessel, every day marked with the monotony of punishing labor. Lashed for the slightest lapse, in constant threat of being killed and tossed overboard, a fire grew within you. When you found your chance to escape, you took it.",
            [Skill.Athletics, Skill.Discipline, Skill.Resistance],
            [Skill.Craft, Skill.Observation, Skill.Sailing],
            [
                "A manacle around your wrist, to be struck off when your former tormenter is dead"
            ],
            504,
            Source.Pirate),
        [Education.Deserter]: new EducationModel(
            "Deserter",
            "Life in the navy was one of unwanted discipline and capricious leadership. Your ship met its end in battle against a pirate fleet, and you threw your lot in with the very searogues you hunted. You have not looked back.",
            [Skill.Craft, Skill.Melee, Skill.Sailing],
            [Skill.Acrobatics, Skill.Athletics, Skill.Observation],
            [
                "An old lodestone, stolen from the navigator on your former vessel"
            ],
            506,
            Source.Pirate),
        [Education.Envoy]: new EducationModel(
            "Envoy",
            "Your service at sea was one of diplomacy, attached to a royal ambassador from one of the major seafaring nations. Though you held no title yourself, you accompanied the negotiators and messengers to foreign estates and courts, and learned their ways.",
            [Skill.Linguistics, Skill.Persuade, Skill.Society],
            [Skill.Insight, Skill.Lore, Skill.Observation],
            [
                "Papers identifying you as an envoy of a foreign court"
            ],
            508,
            Source.Pirate),
        [Education.FirstMate]: new EducationModel(
            "First Mate",
            "Your service onboard your vessel was exemplary, and you earned your captain’s trust. Whether through loyalty, competence, or both, you rose to the position of first mate, serving as your captain’s proxy, and at times, the voice of the crew to the captain.",
            [Skill.Command, Skill.Craft, Skill.Sailing],
            [Skill.Insight, Skill.Persuade, Skill.Survival],
            [
                "The captain’s own gold-hilted cutlass (worth 10 Gold)"
            ],
            510,
            Source.Pirate),
        [Education.Mutiny]: new EducationModel(
            "Mutiny",
            "Your apprenticeship was on a merchant vessel or a naval ship under a cruel and unthinking captain, backed by his loyal henchmen. Morale was low, and the crew suffered. You supported your shipmates in a night of bloody mutiny, and with a ship in your possession, the only course left was piracy.",
            [Skill.Observation, Skill.Persuade, Skill.Sailing],
            [Skill.Craft, Skill.Melee, Skill.Ranged_Weapons],
            [
                "A jeweled earring cut from your captain’s ear"
            ],
            512,
            Source.Pirate),
        [Education.Navigator]: new EducationModel(
            "Navigator",
            "It is rare that a vessel sails the Western Ocean for reasons other than trade, but you were on such a ship. Your captain was tasked with navigating the coastlines and trade routes, mapping currents and winds, as well as seeking any uncharted islands.",
            [Skill.Lore, Skill.Observation, Skill.Sailing],
            [Skill.Insight, Skill.Linguistics, Skill.Survival],
            [
                "A set of naval charts, more accurate than any yet made"
            ],
            514,
            Source.Pirate),
        [Education.OnceAMerchant]: new EducationModel(
            "Once a Merchant",
            "You plied the seas on a merchant vessel, sailing the rivers or along the coast, transporting goods to and from various ports. You paid attention to the trade, learning how to read customers, figure risks and expenses, and weigh everything against profit. It ended with pirates. You either joined their ranks or you are your own captain.",
            [Skill.Insight, Skill.Persuade, Skill.Sailing],
            [Skill.Craft, Skill.Linguistics, Skill.Society],
            [
                "A leather-bound folio of detailed notes about trade routes"
            ],
            516,
            Source.Pirate),
        [Education.OutlawedOnTheShore]: new EducationModel(
            "Outlawed on the Shore",
            "Whether a criminal or an exile, you found it expedient to leave your homeland and set to sea, as it limited your enemies’ means of striking at you. Originally your sea-passage was to a destination, now it is your home. Several years later, you wonder if it is safe to return to your homeland.",
            [Skill.Insight, Skill.Observation, Skill.Survival],
            [Skill.Parry, Skill.Sailing, Skill.Thievery],
            [
                "A signet ring identifying your lineage|A pendant identifying your lineage"
            ],
            518,
            Source.Pirate),
        [Education.WoundedAtSea]: new EducationModel(
            "Wounded at Sea",
            "You served onboard a sea-vessel, whether in the navy, as a trader, or even as a pirate, and you earned your keep in blood. Your first battle nearly cost you your life, and you were wounded so grievously that you were sent ashore to convalesce with a healer. You spent months recovering, but your former crew-mates never returned for you. Now you consider yourself free, to make your own fate.",
            [Skill.Craft, Skill.Healing, Skill.Sailing],
            [Skill.Counsel, Skill.Melee, Skill.Siegecraft],
            [
                "A healer’s bag (3 Resources), given you by your former caretakers"
            ],
            520,
            Source.Pirate),
        [Education.CultTrained]: new EducationModel(
            "Cult Trained",
            "From birth, until you were old enough to venture out into the world on your own, your education was supervised by the cult of which you are a part. You learned to read by combing through strange tomes containing the secret histories that your cult maintains, while your numerical skills were honed discovering the numerological significance of the names of gods. You possess scraps of knowledge about many arcane subjects but are woefully ignorant about the world beyond the confines of your cult.",
            [Skill.Linguistics, Skill.Lore, Skill.Career],
            [Skill.Alchemy, Skill.Craft, Skill.Discipline],
            [],
            99,
            Source.Cults),
        [Education.BornToKill]: new EducationModel(
            "Born to Kill",
            "You were born to this life, whether in the saddle of the dread kozaki or the into a nomad tribe of raiders. This is your way of life. Killing others is as natural as the lion pouncing on the rabbit, the snake killing the mongoose. You have known this way of life as long as you can remember. You would likely choose no other.",
            [Skill.Melee, Skill.Ranged_Weapons, Skill.Career],
            [Skill.Discipline, Skill.Insight, Skill.Survival],
            [
                "Trophies from the dead"
            ],
            99,
            Source.Brigand),
        [Education.VictimTurnedVictimizer]: new EducationModel(
            "Victim Turned Victimizer",
            "Raiders made you and, in time, you became one. Bloodied, left to die, your valuables stolen, perhaps your family killed, you learned what the world offers the weak, the timid, the complacent. You swore that you would never be the victim again. Instead, you are now the predator, stalking the fat caravan trails for coin and slaughter. Sometimes, you recognize that look in your victim’s eyes, but you quickly dispatch them and forget.",
            [Skill.Melee, Skill.Survival, Skill.Career],
            [Skill.Discipline, Skill.Persuade, Skill.Siegecraft],
            [
                "A single item you tracked down that once belonged to you",
                "The finger bones and teeth of the person who stole from you"
            ],
            99,
            Source.Brigand),
        [Education.RaisedByTheWild]: new EducationModel(
            "Raised By the Wild",
            "Rumors tell of children abandoned in the wilderness who find strange charity amongst the beasts. Raised far from civilization, these human cubs begin as little more than beasts, but upon exposure to their own kind find themselves uniquely placed to rally their animal brethren against humankind. Some even eschew civilization entirely, becoming leaders of their packs and leading them in defense of their territory.",
            [Skill.Animal_Handling, Skill.Athletics, Skill.Stealth],
            [Skill.Acrobatics, Skill.Resistance, Skill.Survival],
            [
                "A primitive totem or carved piece of bone, older than the Hyborian Age itself",
            ],
            99,
            Source.Beastmasters),
        [Education.SaddleBorn]: new EducationModel(
            "Saddle-Born",
            "You have never known a day when your mount was not with you. Whether riding on your estates or in massed caravans crossing the desert, your experience was one of constant travel and fellowship. Saddle-born tend to view more sedentary characters as if they were somewhat deficient, turning established social norms on their head.",
            [Skill.Animal_Handling, Skill.Craft, Skill.Observation],
            [Skill.Healing, Skill.Insight, Skill.Survival],
            [
                "An excellently crafted saddle (-1D to riding tests)"
            ],
            99,
            Source.Beastmasters),
        [Education.GoneNative]: new EducationModel(
            "Gone Native",
            "Your exposure to the frontier awakened the barbaric spirit within your own nature, and the best way to survive was to embed yourself into the primitive, savage culture and thrive within it. Forsaking the towns and garrisons of the colonists and settlers, you instead went into the wild, co-existing uneasily alongside the Picts themselves.",
            [Skill.Craft, Skill.Observation, Skill.Survival],
            [Skill.Ranged_Weapons, Skill.Resistance, Skill.Stealth],
            [
                "A thick, fur-lined cloak, made from the hide of your first kill"
            ],
            99,
            Source.Scout),
        [Education.LifeInTheGarrison]: new EducationModel(
            "Life in the Garrison",
            "The frontier was best viewed from inside a stone wall or wooden palisade, and you spent your formative years dwelling inside one of the many border forts erected by Gundermen, Bossonians, or Aquilonian settlers. In such a confined environment, you knew everyone, and grew up with the knowledge that outside those walls was a savagery that would only be content with your death.",
            [Skill.Observation, Skill.Ranged_Weapons, Skill.Parry],
            [Skill.Command, Skill.Melee, Skill.Siegecraft],
            [
                "Brigandine hauberk (Armor 2: Arms/Torso)"
            ],
            99,
            Source.Scout),
        [Education.OnTheFarm]: new EducationModel(
            "On the Farm",
            "Your family were homesteaders, and you were educated by your parents, and perhaps also their parents, working the farm and attempting to cultivate fields and food from grounds once claimed only by wilderness and wild animals. Self-sufficiency was the rule of the day, and your experience, though isolated, gave you a remarkable sense of independence.",
            [Skill.Animal_Handling, Skill.Craft, Skill.Resistance],
            [Skill.Observation, Skill.Ranged_Weapons, Skill.Survival],
            [
                "Sling bag of farm tools",
                "One week’s worth of dried food",
                "Clay bottle of home-made liquor"
            ],
            99,
            Source.Scout),
        [Education.SentToTheCity]: new EducationModel(
            "Sent to the City",
            "Though you were born to the frontier, your parents wanted you to learn more than life on a farm would provide, so you were sent to the capital city of your homeland, boarded with distant family or friends, and tutored as if you were a child of some wealth. Your bookish studies taught you much, but upon your return to the place of your birth, you realized how little you really knew.",
            [Skill.Lore, Skill.Society, Skill.Sorcery],
            [Skill.Discipline, Skill.Linguistics, Skill.Thievery],
            [
                "Pouch containing 5 Gold",
                "Fine garments",
                "Letter of introduction from your mentor"
            ],
            99,
            Source.Scout),
        [Education.TakenUnderTheWing]: new EducationModel(
            "Taken Under the Wing",
            "Someone — whether a guard company, a group of Rangers, traveling merchants, or even your town’s scouts — took a liking to you, and took you under their wing. You learned a trade alongside those who practiced it, an apprenticeship on the frontier like no other. Though you were more of a curiosity, a pet, to some within the group, their leader took you seriously and made certain you learned what you needed to survive.",
            [Skill.Observation, Skill.Stealth, Skill.Survival],
            [Skill.Athletics, Skill.Ranged_Weapons, Skill.Resistance],
            [
                "5 reloads"
            ],
            99,
            Source.Scout),
        [Education.Apprenticed]: new EducationModel(
            "Apprenticed",
            "Like many before you, your parent indentured you to an expert in their craft. It was not your choice, though you may have come to love it. Alternatively, you may have left that profession long behind, but you have not lost the skills you gained.",
            [Skill.Athletics, Skill.Counsel, Skill.Craft],
            [Skill.Craft, Skill.Society, Skill.Thievery],
            [
                "Your old tools"
            ],
            1002,
            Source.Wanderer),
        [Education.DivineTutelage]: new EducationModel(
            "Divine Tutelage",
            "Either someone from the temple or a wise person from your tribe schooled you in the ways of your culture’s god. They showed you the public face of the god, which all may see, and the secret face of the god, which only priests can know. ",
            [Skill.Persuade, Skill.Society, Skill.Sorcery],
            [Skill.Healing, Skill.Persuade, Skill.Sorcery],
            [
                "Symbol of your god wrought of precious metal (worth 10 Gold)"
            ],
            1004,
            Source.Wanderer),
        [Education.FormallyTaught]: new EducationModel(
            "Formally Taught",
            "Either through the efforts of a tutor or within an academic environment with other students, you learned philosophy, religion, math, and the history of the world (or your culture’s version thereof). ",
            [Skill.Discipline, Skill.Linguistics, Skill.Lore],
            [Skill.Insight, Skill.Lore, Skill.Society],
            [
                "Vellum, ink and quill"
            ],
            1006,
            Source.Wanderer),
        [Education.OnTheBackOfAHorse]: new EducationModel(
            "On the Back of a Horse",
            "You are Hyrkanian, born and raised on the steppes held by your people for centuries. You know the open steppe, the ways of slaying, and how to pierce a foe’s eye at fifty paces with your bow. What else does one need in life?",
            [Skill.Animal_Handling, Skill.Ranged_Weapons, Skill.Survival],
            [Skill.Melee, Skill.Observation, Skill.Parry],
            [
                "Hyrkanian Bow",
                EquipmentHelper.getOneHandedWeapons("sword"),
                "Fleet riding horse",
            ],
            1008,
            Source.Wanderer),
        [Education.ProfessionalSoldiering]: new EducationModel(
            "Professional Soldiering",
            "In mighty empires, soldiering is a full-time profession. Elsewhere, only mercenaries fight constantly for pay. You were neither conscript nor sell-sword. You fought for your ruler, your people, and the brothers and sisters around you. War is your way of life. ",
            [Skill.Melee, Skill.Parry, Skill.Siegecraft],
            [Skill.Command, Skill.Ranged_Weapons, Skill.Resistance],
            [
                EquipmentHelper.getAllWeapons() + EquipmentHelper.getShields(),
                EquipmentHelper.getAllArmor()
            ],
            1010,
            Source.Wanderer),
        [Education.RoyalVassal]: new EducationModel(
            "Royal Vassal",
            "You were taught by royal scholars with others of your caste. Perhaps, you were sent abroad to study with another culture, even an enemy as part of mutual hostage exchange or ‘treaty’. You learned about ruling, the maneuvers of sword and society, and your own limits for remaining in a gilded tower as the world goes by.",
            [Skill.Command, Skill.Melee, Skill.Society],
            [Skill.Counsel, Skill.Insight, Skill.Linguistics, Skill.Persuade],
            [
                ""
            ],
            1012,
            Source.Wanderer),
        [Education.SchooledByTheWild]: new EducationModel(
            "Schooled in the Wild",
            "You were separated from your parents at an all-too-early age, and so you largely fended for yourself. All the lessons you learned were the harsh ones of the natural order, whether conservation of resources, weighing risk versus reward, or survival of the fittest. ",
            [Skill.Animal_Handling, Skill.Melee, Skill.Survival],
            [Skill.Animal_Handling, Skill.Discipline, Skill.Survival],
            [
                "Knife",
                "Scavenged trinkets"
            ],
            1014,
            Source.Wanderer),
        [Education.ShamanicTradition]: new EducationModel(
            "Shamanic Tradition",
            "Early in your life, your keen ‘sight-beyond-sight’ marked you, and thus you were sent to study the old ways of your people, whether active or dwindling in favor. Under that tutelage, you learned much of the spirit world. You heard your ancestors speak in dreams and the living world offered its soul to you in return for tribute.",
            [Skill.Discipline, Skill.Healing, Skill.Sorcery],
            [Skill.Alchemy, Skill.Insight, Skill.Lore],
            [
                "Fetishes associated with your beliefs",
                "Herbs and other elements for tinctures and concoctions"
            ],
            1016,
            Source.Wanderer),
        [Education.TheWisdomOfElders]: new EducationModel(
            "The Wisdom of Elders",
            "The elders of your clan or village taught you, as they did most children. You were schooled in things that matter, in things that help a person survive a world set to kill them. You had no time for poetry or history beyond your borders. You needed to know how to hold a weapon, hunt, and ride against the knife-edge of wind coming off the frozen steppe. ",
            [Skill.Animal_Handling, Skill.Resistance, Skill.Survival],
            [Skill.Lore, Skill.Melee, Skill.Ranged_Weapons],
            [
                "Hyrkanian Bow",
                EquipmentHelper.getOneHandedWeapons("sword")
            ],
            1018,
            Source.Wanderer),
        [Education.YithianPossession]: new EducationModel(
            "Yithian Possession",
            "Your body was used as shell for another species traveling in time. The being was not of this world, or of a recognizable reality. You were left with curious knowledge and ideas most consider… mad. Still, you know there is a truth in the Outer Dark. You know you can unlock the secrets of the race that used you and find the means to duplicate their power. ",
            [Skill.Alchemy, Skill.Insight, Skill.Lore],
            [Skill.Discipline, Skill.Observation, Skill.Sorcery],
            [
                "A scribbled journal of your experiences filled with drawings of conical things from beyond time and space"
            ],
            1020,
            Source.Wanderer),
        [Education.Foreign]: new EducationModel(
            "Foreign",
            "The grand tour of the world, or perhaps a single culture, was your education. Perhaps you studied with nearby allies, perhaps you were sent far to the East where they have forgotten more mysteries than the West will ever know. You are cultured, worldly, and possessed of points of view different from those rulers who never left their domains. This gives you a tremendous advantage, but sometimes causes other nobles to label your thinking that of a ‘foreign devil’.",
            [Skill.Linguistics, Skill.Lore, Skill.Persuade],
            [Skill.Counsel, Skill.Insight, Skill.Sorcery],
            [
                "Weapon from a foreign land|Jewelry from a foreign land"
            ],
            1105,
            Source.King),
        [Education.Parental]: new EducationModel(
            "Parental",
            "Your parents taught you to rule as they had, though perhaps omitting certain flaws in their own character. You were molded to be their scion, the extension of their own vision, and to continue what they had set out. The worlds they did not conquer weigh heavily upon you. You have no illusions about your intended purpose in this world, but is it what you want?",
            [Skill.Lore, Skill.Persuade, Skill.Society],
            [Skill.Command, Skill.Observation, Skill.Siegecraft],
            [
                "A parent's signet ring"
            ],
            1110,
            Source.King),
        [Education.PrivateTutor]: new EducationModel(
            "Private Tutor",
            "The finest tutor in the land, perhaps from another land, came to live at your estate or took you into theirs. There you learned all manner of things encompassing the totality of human knowledge at the time. You know history and languages, stories of war and expansion, and may even have paged through some arcane tome like those wrought by Skelos. How you apply this vast amount of learning is left up to you. Your turor may have offered guidance, even demanded you follow their path, but knowledge unlocks doors otherwise closed, and once opened, are very hard to shut.",
            [Skill.Craft, Skill.Linguistics, Skill.Lore],
            [Skill.Alchemy, Skill.Observation, Skill.Sorcery],
            [
                "A bevy of quotes from great philospohers of the age"
            ],
            1115,
            Source.King),
        [Education.WarAcademy]: new EducationModel(
            "War Academy",
            "You were sent to a war academy. Your parent believed war was the surest means to controlling a kingdom and, dispensing with the niceties of diplomacy, gave you an education focused on the art, history, and outcome of war. This is not to say you are single-minded, only that you are more likely to make tactical decisions rather than instinctual ones and take up the sword more readily than the pen when it comes to problems solvable with violence. Would that one to wish every solution to be met with cold steel, one would not have to look far in the Hyborian Age.",
            [Skill.Command, Skill.Melee, Skill.Siegecraft],
            [Skill.Parry, Skill.Ranged_Weapons, Skill.Resistance],
            [
                "Fine horse|" + EquipmentHelper.getWeaponsNotOfType(WeaponType.Missile)
            ],
            1120,
            Source.King),
        [Education.OralTradition]: new EducationModel(
            "Oral Tradition",
            "You sat at the feet of your elders and wise folk, listening to their tales, parables, and sometimes cryptic wisdom. Over time, you absorbed their lessons and now carry the traditions of your people into a new day.",
            [Skill.Counsel, Skill.Craft, Skill.Lore],
            [Skill.Command, Skill.Insight, Skill.Sorcery],
            [],
            1202,
            Source.Adventurer),
        [Education.FormalTradition]: new EducationModel(
            "Formal Tradition",
            "You have training in the physical arts of your people and can well advise others in times of strife. Your taskmasters were harsh, often cruel, yet you recall their lessons and perhaps dedicate yourself to another way of teaching any pupils you have.",
            [Skill.Athletics, Skill.Command, Skill.Counsel],
            [Skill.Insight, Skill.Persuade, Skill.Resistance],
            [],
            1204,
            Source.Adventurer),
        [Education.TaughtByTheDead]: new EducationModel(
            "Taught by the Dead",
            "The spirits of the dead spoke to you often, and in their words sent from beyond the grave you learned much. Now, you know the secrets of others and can advise them, create things lost to the mists of history, and you can see into the hearts of men, discerning their true motives.",
            [Skill.Counsel, Skill.Craft, Skill.Insight],
            [Skill.Craft, Skill.Lore, Skill.Thievery],
            [],
            1206,
            Source.Adventurer),
        [Education.ThePathOfTheWarrior]: new EducationModel(
            "The Path of the Warrior",
            "You have training in the martial virtues of your people. Perhaps you protected your home, guarded trade caravans, or became a sword for hire. Your life has lent itself to battle, whatever your past. Your arm is swift, your mettle vast, and enemies’ blades rarely find your flesh.",
            [Skill.Athletics, Skill.Melee, Skill.Parry],
            [Skill.Acrobatics, Skill.Ranged_Weapons, Skill.Siegecraft],
            [],
            1208,
            Source.Adventurer),
        [Education.CommunionWithAnimals]: new EducationModel(
            "Communion with Animals",
            "Animals trust and obey you and you have a deep kinship with them. You may have learned this as a herder, a trainer of beasts, or inherited it from your ancestors. No matter the reason, you’re called upon when animals of all stripes are involved.",
            [Skill.Animal_Handling, Skill.Observation, Skill.Survival],
            [Skill.Craft, Skill.Healing, Skill.Insight],
            [],
            1210,
            Source.Adventurer),
        [Education.DreamsOfSet]: new EducationModel(
            "Dreams of Set",
            "Set, or another god of your culture, visited you while you slept and taught you things you could not otherwise know. Those around you saw you as either a prophet or a horror. You may have risen to great heights or been cast out to fend for yourself. Either way, you know this god has plans for you. What is your purpose? What does the god want in return? Are the others right, did you just imagine all this? There is a fine line between divine communion and insanity, they say. Which side do you fall on?",
            [Skill.Insight, Skill.Lore, Skill.Sorcery],
            [Skill.Society, Skill.Stealth, Skill.Thievery],
            [],
            1212,
            Source.Adventurer),
        [Education.AWitchFinderPatron]: new EducationModel(
            "A With-Finder Patron",
            "A witch-finder taught you. That does not mean you yourself are a witch-finder, for they require normal human assistants as well. You may have been a scout for one, or a warrior alongside such a patron, hunting down those who misuse the wisdom of your ancestors. Whatever the case, you’ve been in contact with both the natural and unnatural. You are wiser for it, and more cautious. What have you seen that others fear? What things come to you when you close your eyes to the light?",
            [Skill.Discipline, Skill.Insight, Skill.Lore],
            [Skill.Alchemy, Skill.Counsel, Skill.Persuade],
            [],
            1214,
            Source.Adventurer),
        [Education.ADemonsBargain]: new EducationModel(
            "A Demon's Bargain",
            "Sorcerers are known for making pacts with the dark beings that scream through the depths of space, but not all taught by such beings practice magic. You certainly may know something of the dark arts, but you also learned how to fight, to survive, to hunt from a creature bound to the Earth from the stars. There is something unnatural about how you gained this knowledge, but the knowledge itself may be natural. You may have learned all your talents at a very unnatural rate. Perhaps you were but a simple herder who, after meeting a demon upon a crossroads, became a mighty warrior. Perhaps you made it all up to inspire awe and fear in those you regale with such stories.",
            [Skill.Lore, Skill.Melee, Skill.Survival],
            [Skill.Counsel, Skill.Insight, Skill.Ranged_Weapons],
            [],
            1216,
            Source.Adventurer),
        [Education.WisdomOfTheStars]: new EducationModel(
            "Wisdom of the Stars",
            "Many things wheel in the bowl of night, and in them are encoded messages and secrets few know, but you are such a one. Perhaps priests taught you or the elders of your people. In any case, the sky speaks to you. Above, among the tapestry of stars and sky-borne objects is all the knowledge of the world. It would take a hundred lifetimes to learn it all, but you have only one. Make it count.",
            [Skill.Insight, Skill.Lore, Skill.Observation],
            [Skill.Alchemy, Skill.Sailing, Skill.Survival],
            [],
            1218,
            Source.Adventurer),
        [Education.TheWildForge]: new EducationModel(
            "The Wild Forge",
            "Your education was that of nature. The wild called and you answered. Few can claim the same. Sure, many are taught about the ways of the natural world, but few are thrust naked into the wild and left to survive. That was your story. Whether your people set you out in the wild at a tender age, or you were lost in a Stygian caravan and survived the vast wastes alone, you are self-reliant, attuned to nature, and respectful of the power the Earth can muster over mere mortal flesh and blood. The trees always regrow, the sand never blows entirely away, the drought always ends with rain… only the human form is transitory.",
            [Skill.Animal_Handling, Skill.Resistance, Skill.Survival],
            [Skill.Healing, Skill.Resistance, Skill.Stealth],
            [],
            1220,
            Source.Adventurer),
        //[Education.]: new EducationModel(
        //    "",
        //    "",
        //    [Skill., Skill., Skill.],
        //    [Skill., Skill., Skill.],
        //    [
        //        ""
        //    ],
        //    99,
        //    Source.),
    };

    getEducations() {
        var edus: EducationViewModel[] = [];
        var n = 0;

        for (var education in this._educations) {
            var edu = this._educations[education];
            if (character.hasSource(edu.source)) {
                edus.push(new EducationViewModel(n, edu));
            }
            n++;
        }

        return edus.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }

    getEducation(education: Education) {
        return this._educations[education];
    }

    getEducationForRoll(roll: number) {
        var n = 0;
        for (var edu in this._educations) {
            var e = this._educations[edu];
            if (e.roll >= roll) {
                return n;
            }

            n++;
        }
    }

    generateEducation(magnitude: number) {
        var roll = (Math.floor(Math.random() * 20) + 1) + magnitude;

        var n = 0;
        for (var edu in this._educations) {
            var e = this._educations[edu];
            if (e.roll >= roll) {
                return n;
            }

            n++;
        }
    }

    applyEducation(education: Education) {
        var edu = this.getEducation(education);

        edu.mandatory.forEach((s, i) => {
            if (s === Skill.Career) {
                var archetype = ArchetypesHelper.getArchetype(character.archetype);
                s = archetype.careerSkill;
            }
            else if (s === Skill.RandomCareer) {
                var arch = ArchetypesHelper.generateArchetype();
                s = ArchetypesHelper.getArchetype(arch).careerSkill;
            }

            character.educationMandatory.push(s);
            character.skills[s].expertise++;
            character.skills[s].focus++;
        });

        edu.elective.forEach((s, i) => {
            if (s === Skill.Career) {
                var archetype = ArchetypesHelper.getArchetype(character.archetype);
                s = archetype.careerSkill;
            }
            else if (s === Skill.RandomCareer) {
                var arch = ArchetypesHelper.generateArchetype();
                s = ArchetypesHelper.getArchetype(arch).careerSkill;
            }

            character.educationElective.push(s);
        });

        character.educationMandatory.forEach((s, i) => {
            character.educationTalentSkills.push(s);
        });

        character.educationElective.forEach((s, i) => {
            character.educationTalentSkills.push(s);
        });

        edu.equipment.forEach((e, i) => {
            if (e.indexOf(this.BattlefieldHonor) > -1) {
                var archetypeHasArmor = false;
                var archetype = ArchetypesHelper.getArchetype(character.archetype);
                archetype.equipment.forEach((ee, ii) => {
                    if (ee.indexOf('Armor') > -1) {
                        archetypeHasArmor = true;
                    }
                });

                if (archetypeHasArmor) {
                    character.educationEquipment.push('Battlefield Honor');
                }
                else {
                    character.educationEquipment.push(e.substr(e.indexOf(this.BattlefieldHonor) + this.BattlefieldHonor.length));
                }
            }
            else if (e.indexOf(this.RandomArchetypeEquipment) > -1) {
                var archetype = ArchetypesHelper.getArchetype(ArchetypesHelper.generateArchetype());
                var eq = archetype.equipment[Math.floor(Math.random() * archetype.equipment.length)];
                character.educationEquipment.push(eq);
            }
            else {
                character.educationEquipment.push(e);
            }
        });

        character.educationEquipment.forEach(eq => {
            if (eq.indexOf('|') === -1) {
                character.addEquipment(eq);
            }
        });

        if (education === Education.TakenUnderTheWing) {
            const bow = EquipmentHelper.getBowForHomeland(character.homeland);
            character.addEquipment(bow);
            character.educationEquipment.push(bow);
        }

        if (education === Education.Apprenticed) {
            const gold = DiceRoller.rollSpecial(2, 0).hits;
            character.gold += gold | 1;
        }

        if (education === Education.FormallyTaught) {
            const gold = DiceRoller.rollSpecial(3, 0).hits;
            character.gold += gold | 1;
        }

        if (education === Education.RoyalVassal) {
            const gold = DiceRoller.rollSpecial(5, 0).hits;
            character.gold += gold | 1;
        }

        if (education === Education.TheWisdomOfElders) {
            const gold = DiceRoller.rollSpecial(1, 0).hits;
            character.gold += gold | 1;
        }
    }
}

export const EducationsHelper = new Educations();