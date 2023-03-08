import {Skill} from './skills';
import {character} from '../common/character';

export class WarStoryModel {
    description: string;
    skills: Skill[];
    roll: number;

    constructor(desc: string, skills: Skill[], roll: number) {
        this.description = desc;
        this.skills = skills;
        this.roll = roll;
    }
}

export class WarStories {
    private _warStories: WarStoryModel[] = [
        // Core
        new WarStoryModel("Defeated a Savage Beast", [Skill.Animal_Handling, Skill.Melee], 2),
        new WarStoryModel("Dispossessed", [Skill.Resistance, Skill.Survival], 4),
        new WarStoryModel("Gained (and Lost) a Great Treasure", [Skill.Observation, Skill.Society], 6),
        new WarStoryModel("Gained the Favor of a Local Noble", [Skill.Persuade, Skill.Society], 8),
        new WarStoryModel("Prevented a Disaster", [Skill.Craft, Skill.Survival], 10),
        new WarStoryModel("Shipwrecked", [Skill.Athletics, Skill.Sailing], 12),
        new WarStoryModel("Survived a Duel", [Skill.Parry, Skill.Resistance], 14),
        new WarStoryModel("Survived a Massacre", [Skill.Stealth, Skill.Survival], 16),
        new WarStoryModel("Survived a Stint at Court", [Skill.Insight, Skill.Society], 18),
        new WarStoryModel("Survived Witchcraft or Sorcery", [Skill.Discipline, Skill.Sorcery], 20),
        // Thief (heists)
        new WarStoryModel("Sacked a Mystery Cult Temple", [Skill.Melee, Skill.Sorcery], 102),
        new WarStoryModel("Robbed a Merchant Caravan", [Skill.Animal_Handling, Skill.Persuade], 104),
        new WarStoryModel("Stole a Mysterious Object for a Stranger", [Skill.Discipline, Skill.Insight], 106),
        new WarStoryModel("Robbed a Drunk of an Expensive Piece of Jewelry", [Skill.Observation, Skill.Society], 108),
        new WarStoryModel("Sold Forged Goods in the Market", [Skill.Athletics, Skill.Craft], 110),
        new WarStoryModel("Plundered a Merchant Vessel at Sea", [Skill.Ranged_Weapons, Skill.Sailing], 112),
        new WarStoryModel("Performed as 'Angry Drunk' and 'Out of Control Lover' While Robbing Tavern Folk", [Skill.Parry, Skill.Persuade], 114),
        new WarStoryModel("Served a Nobleman as His Thief of Choice", [Skill.Insight, Skill.Society], 116),
        new WarStoryModel("Survived a Horrible Gang War", [Skill.Parry, Skill.Resistance], 118),
        new WarStoryModel("Planned and Executed Several Thefts with Skill and Precision", [Skill.Stealth, Skill.Thievery], 120),
        // Barbarian
        new WarStoryModel("Mentioned in a Saga", [Skill.Lore, Skill.Melee], 202),
        new WarStoryModel("Swore a Great Oath", [Skill.Discipline, Skill.Athletics], 204),
        new WarStoryModel("Prevented a Massacre", [Skill.Observation, Skill.Persuade], 206),
        new WarStoryModel("Witnessed an Insurrection", [Skill.Counsel, Skill.Insight], 208),
        new WarStoryModel("Stranded in the Wild", [Skill.Ranged_Weapons, Skill.Survival], 210),
        new WarStoryModel("Captured by Slavers", [Skill.Craft, Skill.Resistance], 212),
        new WarStoryModel("Fell Victim to a Curse", [Skill.Discipline, Skill.Sorcery], 214),
        new WarStoryModel("Left for Dead After a Slave Raid", [Skill.Resistance, Skill.Survival], 216),
        new WarStoryModel("Survived a Raid on Your Village", [Skill.Melee, Skill.Stealth], 218),
        new WarStoryModel("Scarred by a Savage Beast", [Skill.Animal_Handling, Skill.Resistance], 220),
        // Skelos
        new WarStoryModel("Survived a failed summoning", [Skill.Discipline, Skill.Insight], 302),
        new WarStoryModel("Survived a war between your Patron and another sorcerer", [Skill.Discipline, Skill.Lore], 304),
        new WarStoryModel("Survived witchcraft", [Skill.Discipline, Skill.Sorcery], 306),
        new WarStoryModel("Led a witch hunt", [Skill.Command, Skill.Society], 308),
        new WarStoryModel("Cured a serious illness", [Skill.Healing, Skill.Resistance], 310),
        new WarStoryModel("Bargained for a great treasure", [Skill.Persuade, Skill.Society], 312),
        new WarStoryModel("Gained the favor of a demon", [Skill.Lore, Skill.Sorcery], 314),
        new WarStoryModel("Flogged in the street", [Skill.Persuade, Skill.Resistance], 316),
        new WarStoryModel("Stranded in a strange place", [Skill.Athletics, Skill.Survival], 318),
        new WarStoryModel("Stole a book of sorcery written in an ancient tongue", [Skill.Linguistics, Skill.Thievery], 320),
        // Mercenary
        new WarStoryModel("Defeated a Company Champion", [Skill.Persuade, Skill.Melee], 401),
        new WarStoryModel("Nearly Slain by a Horde of Foes", [Skill.Survival, Skill.Parry], 402),
        new WarStoryModel("Last Survivor of Slaughtered Unit", [Skill.Resistance, Skill.Survival], 403),
        new WarStoryModel("Punished for a War Crime", [Skill.Discipline, Skill.Resistance], 404),
        new WarStoryModel("Gained (and Lost) a Dog-brother", [Skill.Observation, Skill.Discipline], 405),
        new WarStoryModel("Gained (and Lost) a Position of Rank", [Skill.Discipline, Skill.Society], 406),
        new WarStoryModel("Served as a Spy in an Enemy Town or City", [Skill.Persuade, Skill.Society], 407),
        new WarStoryModel("Gained the Favor of a Sorcerer", [Skill.Observation, Skill.Sorcery], 408),
        new WarStoryModel("Saved a Town or Village", [Skill.Craft, Skill.Survival], 409),
        new WarStoryModel("Endured a Plague or Disease", [Skill.Resistance, Skill.Survival], 410),
        new WarStoryModel("Shipwrecked as a Marine", [Skill.Athletics, Skill.Sailing], 411),
        new WarStoryModel("Stranded in the Wastelands", [Skill.Athletics, Skill.Resistance], 412),
        new WarStoryModel("Survived a Duel", [Skill.Parry, Skill.Resistance], 413),
        new WarStoryModel("Lifted a Siege", [Skill.Discipline, Skill.Siegecraft], 414),
        new WarStoryModel("Survived a Massacre", [Skill.Stealth, Skill.Survival], 415),
        new WarStoryModel("Sacked a City", [Skill.Melee, Skill.Thievery], 416),
        new WarStoryModel("Charged in the First Wave", [Skill.Melee, Skill.Survival], 417),
        new WarStoryModel("Engaged in Banditry", [Skill.Stealth, Skill.Thievery], 418),
        new WarStoryModel("Survived a Sorcerous Foe", [Skill.Discipline, Skill.Sorcery], 419),
        new WarStoryModel("Acted as a Captain's Bodyguard", [Skill.Insight, Skill.Siegecraft], 420),
        // Pirate
        new WarStoryModel("Survived a famous sea battle (winning side)", [Skill.Command, Skill.Siegecraft], 502),
        new WarStoryModel("Survived an outbreak", [Skill.Healing, Skill.Resistance], 504),
        new WarStoryModel("Lost (and found) at sea", [Skill.Observation, Skill.Survival], 506),
        new WarStoryModel("Marooned", [Skill.Resistance, Skill.Survival], 508),
        new WarStoryModel("Survived a pirate raid", [Skill.Stealth, Skill.Thievery], 510),
        new WarStoryModel("Shipwrecked", [Skill.Athletics, Skill.Sailing], 512),
        new WarStoryModel("Saw a mysterious sea creature", [Skill.Lore, Skill.Observation], 514),
        new WarStoryModel("Ship seized by pirates", [Skill.Parry, Skill.Sailing], 516),
        new WarStoryModel("Survied a famous sea battle (losing side)", [Skill.Ranged_Weapons, Skill.Parry], 518),
        new WarStoryModel("Mistaken for a famous pirate", [Skill.Persuade, Skill.Society], 520),
        // Cults
        new WarStoryModel("Mentioned on a Prophecy", [Skill.Discipline, Skill.Lore], 602),
        new WarStoryModel("Renowned for Preaching", [Skill.Persuade, Skill.Society], 604),
        new WarStoryModel("Saved an Unbeliever", [Skill.Command, Skill.Persuade], 606),
        new WarStoryModel("Preserved a Holy Text from Desecration", [Skill.Melee, Skill.Survival], 608),
        new WarStoryModel("Excommunicated and Hunted", [Skill.Stealth, Skill.Survival], 610),
        new WarStoryModel("Crafted Religious Symbols of Great Beauty", [Skill.Craft, Skill.Resistance], 612),
        new WarStoryModel("Touched a Holy Relic", [Skill.Insight, Skill.Sorcery], 614),
        new WarStoryModel("Survived the Slaughter of Your Community", [Skill.Resistance, Skill.Survival], 616),
        new WarStoryModel("At One with the Beasts of the Field", [Skill.Animal_Handling, Skill.Persuade], 618),
        new WarStoryModel("Touched the Other Side", [Skill.Lore, Skill.Sorcery], 620),
        // Brigand
        new WarStoryModel("Captured by Brigands", [Skill.Craft, Skill.Resistance], 702),
        new WarStoryModel("Escaped Slave", [Skill.Craft, Skill.Stealth], 704),
        new WarStoryModel("Fought Off Trained Soldiers", [Skill.Discipline, Skill.Siegecraft], 706),
        new WarStoryModel("Hunted by the Law", [Skill.Ranged_Weapons, Skill.Survival], 708),
        new WarStoryModel("Killed a Noble", [Skill.Command, Skill.Society], 710),
        new WarStoryModel("Murderer", [Skill.Melee, Skill.Stealth], 712),
        new WarStoryModel("Razed a Village", [Skill.Melee, Skill.Persuade], 714),
        new WarStoryModel("Starving", [Skill.Discipline, Skill.Survival], 716),
        new WarStoryModel("Stole from Your Fellows", [Skill.Stealth, Skill.Thievery], 718),
        new WarStoryModel("You Community's Only Hope", [Skill.Command, Skill.Survival], 720),
        // Beast Masters
        new WarStoryModel("Fought a Giant Creature", [Skill.Parry, Skill.Resistance], 802),
        new WarStoryModel("Fell from Your Mount", [Skill.Animal_Handling, Skill.Discipline], 804),
        new WarStoryModel("Hunted a Savage Boar", [Skill.Melee, Skill.Ranged_Weapons], 806),
        new WarStoryModel("Presented a Mighty Stag to a Lord", [Skill.Ranged_Weapons, Skill.Society], 808),
        new WarStoryModel("Spent Time with Old Hunters", [Skill.Insight, Skill.Observation], 810),
        new WarStoryModel("Survived a Year Away from Humans", [Skill.Craft, Skill.Stealth], 812),
        new WarStoryModel("Landed a 10-Foot-Long Fish", [Skill.Discipline, Skill.Sailing], 814),
        new WarStoryModel("Was Lost in the Darkest of Forests", [Skill.Resistance, Skill.Survival], 816),
        new WarStoryModel("Was Hunted by a Possessed Animal", [Skill.Insight, Skill.Sorcery], 818),
        new WarStoryModel("Taught the Young to Hunt", [Skill.Command, Skill.Counsel], 820),
        // Scout
        new WarStoryModel("Lost in the Wild", [Skill.Stealth, Skill.Survival], 904),
        new WarStoryModel("Attacked by Picts and Left for Dead", [Skill.Discipline, Skill.Parry], 908),
        new WarStoryModel("Survived an Outbreak of Disease", [Skill.Healing, Skill.Resistance], 912),
        new WarStoryModel("Survived a Hyperborean Slave Raid", [Skill.Parry, Skill.Thievery], 916),
        new WarStoryModel("Survived a Raid by Barbarians", [Skill.Melee, Skill.Siegecraft], 920),
        // Wanderer
        new WarStoryModel("A Training Ground Prodigy", [Skill.Athletics, Skill.Parry], 1002),
        new WarStoryModel("Spared by the Horse Nomads", [Skill.Animal_Handling, Skill.Society], 1004),
        new WarStoryModel("Escaped the Noose", [Skill.Resistance, Skill.Stealth], 1006),
        new WarStoryModel("Scarred by the Black Seers", [Skill.Discipline, Skill.Sorcery], 1008),
        new WarStoryModel("Apprentice of the Master Strategist", [Skill.Insight, Skill.Observation], 1010),
        new WarStoryModel("Found Adrift on the Vast River", [Skill.Craft, Skill.Sailing], 1012),
        new WarStoryModel("Savior of an Exiled Prince", [Skill.Melee, Skill.Society], 1014),
        new WarStoryModel("Avenger of the True Servants of the Gods", [Skill.Discipline, Skill.Parry], 1016),
        new WarStoryModel("Bearer of the War's Grim Tidings", [Skill.Insight, Skill.Survival], 1018),
        new WarStoryModel("Lived Lawless as a Hillman", [Skill.Animal_Handling, Skill.Melee], 1020),
        // King
        new WarStoryModel("Forbidden Romance", [Skill.Lore, Skill.Persuade], 1102),
        new WarStoryModel("Participated in a Coup", [Skill.Persuade, Skill.Siegecraft], 1104),
        new WarStoryModel("Sent on a Diplomatic Mission", [Skill.Linguistics, Skill.Siegecraft], 1106),
        new WarStoryModel("Fallen Favorite", [Skill.Melee, Skill.Society], 1108),
        new WarStoryModel("Illicit Scion", [Skill.Persuade, Skill.Survival], 1110),
        new WarStoryModel("Undone by Politics", [Skill.Insight, Skill.Persuade], 1112),
        new WarStoryModel("Removed from Succession", [Skill.Discipline, Skill.Society], 1114),
        new WarStoryModel("Parent Killed", [Skill.Melee, Skill.Lore], 1116),
        new WarStoryModel("Ransomed!", [Skill.Linguistics, Skill.Lore], 1118),
        new WarStoryModel("Famous Vendetta", [Skill.Melee, Skill.Thievery], 1120),
        // Adventurer
        new WarStoryModel("Killed a More Experienced Warrior", [Skill.Athletics, Skill.Parry], 1202),
        new WarStoryModel("Encountered an Orisha", [Skill.Animal_Handling, Skill.Society], 1204),
        new WarStoryModel("Lost an Ishlangu", [Skill.Resistance, Skill.Stealth], 1206),
        new WarStoryModel("Lived a Year in the Night", [Skill.Discipline, Skill.Sorcery], 1208),
        new WarStoryModel("War Scout for the People", [Skill.Insight, Skill.Observation], 1210),
        new WarStoryModel("Sailed the Black Coast", [Skill.Craft, Skill.Sailing], 1212),
        new WarStoryModel("Raided a Rival", [Skill.Melee, Skill.Society], 1214),
        new WarStoryModel("Gifted an Ishlangu", [Skill.Discipline, Skill.Parry], 1216),
        new WarStoryModel("Captured by Slavers", [Skill.Insight, Skill.Survival], 1218),
        new WarStoryModel("Rode with the Cavalry", [Skill.Animal_Handling, Skill.Melee], 1220),
        // Kull
        new WarStoryModel("Part of a Famous Last Stand", [Skill.Athletics, Skill.Survival], 1402),
        new WarStoryModel("Enslaved and Escaped", [Skill.Stealth, Skill.Thievery], 1404),
        new WarStoryModel("Scarred by Sorcery", [Skill.Insight, Skill.Sorcery], 1406),
        new WarStoryModel("Rode to the Outlands", [Skill.Animal_Handling, Skill.Lore], 1408),
        new WarStoryModel("Impressed into Service", [Skill.Melee, Skill.Siegecraft], 1410),
        new WarStoryModel("Survived a Coup", [Skill.Persuade, Skill.Society], 1412),
        new WarStoryModel("Betrayed by Allies", [Skill.Insight, Skill.Survival], 1414),
        new WarStoryModel("Of Local Renown", [Skill.Counsel, Skill.Persuade], 1416),
        new WarStoryModel("Rent by Monsters", [Skill.Animal_Handling, Skill.Resistance], 1418),
        new WarStoryModel("Survived a Disaster", [Skill.Resistance, Skill.Survival], 1420),
        //new WarStoryModel("", [Skill., Skill.], 02),
        //new WarStoryModel("", [Skill., Skill.], 04),
        //new WarStoryModel("", [Skill., Skill.], 06),
        //new WarStoryModel("", [Skill., Skill.], 08),
        //new WarStoryModel("", [Skill., Skill.], 10),
        //new WarStoryModel("", [Skill., Skill.], 12),
        //new WarStoryModel("", [Skill., Skill.], 14),
        //new WarStoryModel("", [Skill., Skill.], 16),
        //new WarStoryModel("", [Skill., Skill.], 18),
        //new WarStoryModel("", [Skill., Skill.], 20),
    ];

    getWarStories(source: number) {
        const magnitude = source * 100;
        return this._warStories.filter(story => story.roll > magnitude && story.roll < magnitude+99);
    }

    getWarStory(id: number) {
        for (var i = 0; i < this._warStories.length; i++) {
            var story = this._warStories[i];
            if (story.roll === id) {
                return story;
            }
        }
    }

    getWarStoryForRoll(roll: number) {
        for (var i = 0; i < this._warStories.length; i++) {
            var story = this._warStories[i];
            if (story.roll >= roll) {
                return story;
            }
        }
    }

    generateWarStory(magnitude: number) {
        var roll = (Math.floor(Math.random() * 20) + 1) + magnitude;
        for (var i = 0; i < this._warStories.length; i++) {
            var story = this._warStories[i];
            if (story.roll >= roll) {
                return story;
            }
        }
    }

    applyWarStory(id: number) {
        var story = this.getWarStory(id);
        character.warStory = story.description;
        character.warStoryId = id;

        story.skills.forEach((s, i) => {
            character.skills[s].expertise++;
            character.skills[s].focus++;
        });
    }
}

export const WarStoriesHelper = new WarStories();