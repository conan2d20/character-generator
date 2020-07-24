import {character} from '../common/character';
import {Skill, SkillsHelper} from './skills';
import {Attribute} from './attributes';
import {DiceRoller} from './diceRoller';
import {Source} from './sources';

export interface ITalentPrerequisite {
    isPrerequisiteFulfilled(): boolean;
    str(): string;
}

class TalentPrerequisite implements ITalentPrerequisite {
    private talent: string;

    constructor(talent: string) {
        this.talent = talent;
    }

    isPrerequisiteFulfilled() {
        var found = false;
        for (var talent in character.talents) {
            if (talent === this.talent) {
                found = true;
                break;
            }
        }

        return found;
    }

    str() {
        return `Talent: ${this.talent}`;
    }
}

class TalentRankPrerequisite implements ITalentPrerequisite {
    private talent: string;
    private rank: number;

    constructor(talent: string, rank: number) {
        this.talent = talent;
        this.rank = rank;
    }

    isPrerequisiteFulfilled() {
        var found = false;
        for (var talent in character.talents) {
            var t = character.talents[talent];
            if (talent === this.talent && t.rank >= this.rank) {
                found = true;
                break;
            }
        }

        return found;
    }

    str() {
        return `Talent: ${this.talent} (Rank ${this.rank})`;
    }
}

class AnyTalentsPrerequisite implements ITalentPrerequisite {
    private count: number;
    private talents: string[];

    constructor(count: number, talents: string[]) {
        this.count = count;
        this.talents = talents;
    }

    isPrerequisiteFulfilled() {
        var n = 0;
        this.talents.forEach(talent => {
            if (character.hasTalent(talent)) {
                n++;
            }
        });

        return n >= this.count;
    }

    str() {
        return `${this.count} of these talents: ${this.talents.join(", ")}`;
    }
}

class VariableTalentPrerequisite implements ITalentPrerequisite {
    private talent1: string;
    private talent2: string;

    constructor(talent1: string, talent2: string) {
        this.talent1 = talent1;
        this.talent2 = talent2;
    }

    isPrerequisiteFulfilled() {
        var found = false;
        for (var talent in character.talents) {
            if (talent === this.talent1 || talent === this.talent2) {
                found = true;
                break;
            }
        }

        return found;
    }

    str() {
        return `Talent: ${this.talent1} or ${this.talent2}`;
    }
}

class ExpertisePrerequisite implements ITalentPrerequisite {
    private skill: Skill;
    private value: number;

    constructor(skill: Skill, value: number) {
        this.skill = skill;
        this.value = value;
    }

    isPrerequisiteFulfilled() {
        return character.skills[this.skill].expertise >= this.value;
    }

    str() {
        return `${SkillsHelper.getSkillName(this.skill)} expertise ${this.value}`;
    }
}

class FocusPrerequisite implements ITalentPrerequisite {
    private skill: Skill;
    private value: number;

    constructor(skill: Skill, value: number) {
        this.skill = skill;
        this.value = value;
    }

    isPrerequisiteFulfilled() {
        return character.skills[this.skill].focus >= this.value;
    }

    str() {
        return `${SkillsHelper.getSkillName(this.skill)} focus ${this.value}`;
    }
}

class AncientBloodlinePrerequisite implements ITalentPrerequisite {
    constructor() {
    }

    isPrerequisiteFulfilled() {
        return character.ancientBloodline;
    }

    str() {
        return `Ancient Bloodline`;
    }
}

class HomelandPrerequisite implements ITalentPrerequisite {
    private homeland: number;

    constructor(homeland: number) {
        this.homeland = homeland;
    }

    isPrerequisiteFulfilled() {
        return character.homeland === this.homeland;
    }

    str() {
        return "";
    }
}

class HomelandsPrerequisite implements ITalentPrerequisite {
    private homelands: number[];

    constructor(homelands: number[]) {
        this.homelands = homelands;
    }

    isPrerequisiteFulfilled() {
        return this.homelands.indexOf(character.homeland) > -1;
    }

    str() {
        return "";
    }
}

class VariableHomelandPrerequisite implements ITalentPrerequisite {
    private homeland1: number;
    private homeland2: number;

    constructor(homeland1: number, homeland2: number) {
        this.homeland1 = homeland1;
        this.homeland2 = homeland2;
    }

    isPrerequisiteFulfilled() {
        return character.homeland === this.homeland1 ||
               character.homeland === this.homeland2;
    }

    str() {
        return "";
    }
}

class RegionPrerequisite implements ITalentPrerequisite {
    private region: string;

    constructor(region: string) {
        this.region = region;
    }

    isPrerequisiteFulfilled() {
        return character.region === this.region;
    }

    str() {
        return `Homeland Region: ${this.region}`;
    }
}

class WeedOfSorceryPrerequisite implements ITalentPrerequisite {
    private expertise: number;

    constructor(expertise: number) {
        this.expertise = expertise;
    }

    isPrerequisiteFulfilled() {
        return character.useWeedOfSorcery ||
               character.skills[Skill.Sorcery].expertise >= this.expertise;
    }

    str() {
        return `Sorcery expertise ${this.expertise}`;
    }
}

class UniqueTalentPrerequisite implements ITalentPrerequisite {
    private talent: string;

    constructor(talent: string) {
        this.talent = talent;
    }

    isPrerequisiteFulfilled() {
        var result = true;

        for (var talent in character.talents) {
            if (talent.indexOf(this.talent) > -1) {
                result = false;
            }
        }

        return result;
    }

    str() {
        return `Must not have ${this.talent} talent`;
    }
}

class AttributePrerequisite implements ITalentPrerequisite {
    private attribute: Attribute;
    private value: number;

    constructor(attribute: Attribute, value: number) {
        this.attribute = attribute;
        this.value = value;
    }

    isPrerequisiteFulfilled() {
        return character.attributes[this.attribute].value >= this.value;
    }

    str() {
        return `${Attribute[this.attribute]} ${this.value}`;
    }
}

class SourcePrerequisite implements ITalentPrerequisite {
    private source: Source;

    constructor(source: Source) {
        this.source = source;
    }

    isPrerequisiteFulfilled() {
        return character.hasSource(this.source);
    }

    getSource() {
        return this.source;
    }

    str() {
        return ""
    }
}

export class TalentModel {
    name: string;
    description: string;
    prerequisites: ITalentPrerequisite[];
    maxRank: number;

    constructor(name: string, desc: string, prerequisites: ITalentPrerequisite[], maxRank: number) {
        this.name = name;
        this.description = desc;
        this.prerequisites = prerequisites;
        this.maxRank = maxRank;
    }
}

export class TalentViewModel {
    id: string;
    name: string;
    rank: number;
    description: string;

    constructor(name: string, rank: number, showRank: boolean, description: string, skill: Skill) {
        this.id = name;
        this.description = description;
        this.name = name + (showRank ? " [Rank: " + rank + "]" : "") + (skill !== Skill.None ? " (" + SkillsHelper.getSkillName(skill) + ")" : "");
    }
}

export class Talents {
    private _talents: { [skill: number]: TalentModel[] } = {
        [Skill.Acrobatics]: [
            new TalentModel(
                "Agile",
                "You may re-roll one d20 when attempting an Acrobatics test, but you must accept the new result.",
                [new ExpertisePrerequisite(Skill.Acrobatics, 1)],
                1),
            new TalentModel(
                "Healthy Paranoia",
                "You have a natural sense for when your life might be endangered. When involved in a struggle to resist being surprised, you gain 2 bonus Momentum.",
                [new TalentPrerequisite("Savage Instincts"), new ExpertisePrerequisite(Skill.Acrobatics, 2)],
                1),
            new TalentModel(
                "Message Runner",
                "Couriers and message runners must get through the harshest conditions, across land that even goats would balk at. They learn to recognize the environment and to move naturally in response to it, taking advantage of the terrain’s effects. For each rank of Message Runner, you can reduce by 1 the Difficulty of any Acrobatics tests made to overcome obstacles, hindrances, hazards, and other forms of difficult terrain.",
                [new TalentPrerequisite("Agile")],
                2),
            new TalentModel(
                "Nimble as a Cat",
                "Whether a career thief or just naturally graceful, you can leap extraordinary distances or suffer falls without harm. When making an Acrobatics test to jump or leap, reduce the Difficulty by one step for every rank of Nimble as a Cat. This may eliminate the need for the skill test if the result is reduced to Simple (D0). In addition, for each rank of Nimble as a Cat you gain 2 additional Armor Soak dice when suffering falling damage.",
                [new TalentPrerequisite("Agile")],
                2),
            new TalentModel(
                "Pantherish Twist",
                "You may use your Acrobatics skill in place of Parry when attempting a Defend reaction, reducing the amount of Doom generated by 1, to a minimum of 0.",
                [new TalentPrerequisite("Nimble as a Cat")],
                1),
            new TalentModel(
                "Savage Instincts",
                "You are constantly in motion and difficult to hit with ranged attacks. If you use a minor or standard action to move during your turn, any ranged attacks targeted against you increase in Difficulty by one step.",
                [new TalentPrerequisite("Agile")],
                1),
            new TalentModel(
                "Deck Rat",
                "Your training has left you accustomed to maneuvering in the tight and claustrophobic environment below-decks, whether moving quickly to extinguish a fire, defending your ship from attacks, or pursuing victims while you ransack their vessel. As such, you are never inconvenienced by fighting in cramped or close quarters. Each rank in this talent negates one additional step of Difficulty imposed by the environment when attempting to act in such conditions. This talent applies to any such conditions (darkness, lack of room, etc.), as well as to any physical or perception-based skills attempted.",
                [new TalentPrerequisite("Agile"), new SourcePrerequisite(Source.Pirate)],
                3),
            new TalentModel(
                "Swashbuckler",
                "You know your way around the rigging of any sea vessel and can perform astonishing feats of agility and movement by swinging or rapidly climbing from rope-to-rope, using the rigging as if it were solid ground. You gain +1d20 for any Acrobatics or Athletics test while climbing the rigging of a ship, and whenever you are on a vessel with adequate mast and rigging, you may use a Move Action to swing to any zone on that vessel or an adjacent zone, such as a dock or the deck of another ship.",
                [new TalentPrerequisite("Deck Rat"), new TalentPrerequisite("Nimble as a Cat"), new SourcePrerequisite(Source.Pirate)],
                3)
        ],
        [Skill.Alchemy]: [
            new TalentModel(
                "Alchemist",
                "You may re-roll one d20 when attempting an Alchemy test, but you must accept the new result. With this talent, you can also substitute Alchemy for ranged weapons when using an alchemical weapon.",
                [new ExpertisePrerequisite(Skill.Alchemy, 1)],
                1),
            new TalentModel(
                "Dabbler",
                "Having studied many alchemical formulas, you are comfortable with making your own discoveries through experimentation. You are not restricted as to which petty enchantments you would make but doing so is very expensive. You must spend three times the number of reagents needed before making any alchemy test to build a petty enchantment for which you do not have the Master of Formulae talent.",
                [new TalentPrerequisite("Alchemist")],
                1),
            new TalentModel(
                "Master of Formulae",
                "Most alchemists work extensively with a specific formula, which becomes second nature. More exacting measures become the standard. When selecting this talent, you must also select a specific type of petty enchantment: blasting powder, lotus pollen, etc. When using this petty enchantment, you may attempt higher Difficulty tests to increase the power of the particular enchantment.",
                [new VariableTalentPrerequisite("Alchemist", "Sorcerer")],
                1),
            new TalentModel(
                "Master Alchemist",
                "You have refined your measurements to the point of obsession, retesting established formulae, and making unique tools for weighing and separating the resins, fluids, pollens, dusts, and metals of your craft. When working with reagents on any petty enchantment that you have the Master of Formulae talent for, you may roll 1[CD]: if you roll an Effect, you have prevented the waste of much of the reagent. This only counts for one reagent: if multiple reagents are used, the rest are consumed as normal.",
                [new TalentPrerequisite("Master of Formulae")],
                1),
            new TalentModel(
                "Poisoner",
                "You’ve made a study of toxic plants and animal venoms and can distil their essences down to a single dose, to be administered by mouth or at the end of a weapon. You have access to lotus pollen petty enchantments and all other venoms.",
                [new ExpertisePrerequisite(Skill.Alchemy, 0), new SourcePrerequisite(Source.Thief)],
                1),
            new TalentModel(
                "Eye for the Toxic",
                "Alchemical Ingredients and precious oils are found in a surprising number of places for those who know where to look. When you make a test to gather Exotic Materials, you may roll an additional d20 for each rank you have in Eye for the Exotic. ",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Alchemy, 1), new TalentPrerequisite("Alchemist")],
                3),
            new TalentModel(
                "Resourceful Alchemist",
                "At times, the perfect Ingredient for an Exotic Material is unavailable. The less informed learn to do without the concoction, while true masters know how to substitute other Materials. When crafting to make anything requiring Exotic Ingredients, you may substitute 2 of any other resource for 1 Exotic Ingredient. You may do this once per build for every rank you have in Resourceful Alchemist and may only do so if you use at least 1 Exotic Ingredient. ",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Eye for the Toxic")],
                3),
        ],
        [Skill.Animal_Handling]: [
            new TalentModel(
                "Animal Healer",
                "Any time you are called upon to make a Healing test upon an animal, you may instead substitute your Animal Handling skill. You may also substitute your Animal Handling skill for Healing tests upon humans, but you must increase the Difficulty of any such tests by one step.",
                [new TalentPrerequisite("Faithful Companion"), new ExpertisePrerequisite(Skill.Animal_Handling, 2)],
                1),
            new TalentModel(
                "Born in the Saddle",
                "You have spent a lifetime in the company of animals and can recognize personality quirks and identify potential sources of distress. On any Animal Handling test where you generate at least one success, you may immediately roll a number of bonus d20s equal to your ranks of Born in the Saddle. Any successes generated on these additional dice are added to the initial success total, and Complications on these additional dice may be ignored.",
                [new ExpertisePrerequisite(Skill.Animal_Handling, 1)],
                3),
            new TalentModel(
                "Charge!",
                "You are particularly adept at riding mounts, even those not used to combat. When riding a mount of any kind, the mount is considered combat trained. When riding a horse outside of combat, you can reduce the Difficulty of any tests by one step.",
                [new TalentPrerequisite("Born in the Saddle")],
                1),
            new TalentModel(
                "Child of Jhebbal Sag",
                "While not literally one of the offspring of this primitive animal god, your character is nonetheless accepted naturally by animals. Any time you encounter a new animal, you may attempt an Average (D1) Animal Handling test as a Minor Action. On a success, the animal immediately considers you to be a friend. If the target is a guard animal, it does not alert its handlers to your presence.",
                [new TalentPrerequisite("Voice of Jhebbal Sag")],
                1),
            new TalentModel(
                "Eyes in the Forest",
                "You have come to recognize when animals are reacting to the environment. Any time you are in the company of animals and need to make an Observation test, you may substitute the Animal Handling skill instead, if desired.",
                [new TalentPrerequisite("Born in the Saddle")],
                1),
            new TalentModel(
                "Faithful Companion",
                "You recognize the needs of your animal companions and are rewarded with devotion. When this talent is purchased, you must nominate a single animal you own. This becomes an animal companion. Generally you can control your companion, though the gamemaster may guide its behavior in some instances. Each additional rank allows you to nominate one additional animal companion. Whenever you succeed at a Survival test to find food, water, or shelter, you automatically find adequate food and shelter for your animal companion(s) as well, without needing to spend Momentum or increase the Difficulty of the task. In addition, when in combat, if you have one or more animal companions within reach, you gain a bonus d20 on your Defend Reactions made against melee and threaten attacks.",
                [new TalentPrerequisite("Born in the Saddle")],
                3),
            new TalentModel(
                "Voice of Jhebbal Sag",
                "Wild or tamed matters not to you: all animals are kin and to be afforded due respect. Any time you attempt to direct an animal to take an action that goes against its instinct or training — including instances when the animal is in service of another — any Momentum spent or Doom generated to add bonus d20s to the skill test add two d20s to the dice pool instead of one, though the normal limit of three bonus d20s still applies. In addition, any Momentum spent to obtain information using an Animal Handling test (based on interpreting an animal’s behavior) grants you one additional question. While this is not actual speech, the connection with the animal is uncanny.",
                [new TalentPrerequisite("Eyes in the Forest"), new ExpertisePrerequisite(Skill.Animal_Handling, 2)],
                1),
            new TalentModel(
                "Call of Jhebbal Sag",
                "Through close study of natural animals in their habitats, you’ve become adept at mimicking their sounds well enough to fool your fellow humans. With a successful Animal Handling (D1) test, you can imitate the calls, growls, cries, and other natural sounds of wildlife, whether to signal allies without enemies knowing, to frighten away potential predators, or to lure enemies into danger. Use of this talent is a struggle against the Animal Handling skill of any who hear it, if deception is intended. Each rank adds to your Target Number. ",
                [new TalentPrerequisite("Eyes in the Forest"), new ExpertisePrerequisite(Skill.Animal_Handling, 2), new SourcePrerequisite(Source.Scout)],
                3),
            new TalentModel(
                "Speak to Wild",
                "Your bond with your animal companion is so great that you can guide it to perform actions that would otherwise be too complex for a normal animal. To do so, roll an Animal Handling test versus the intended Difficulty of the task being requested, usually Average (D1). These instructions must still be within the animal’s normal range of capabilities but are such that they seem astounding to those unaware of your connection to the animal. You can bid the animal to perform this task when you are not present at an increase of one step of Difficulty.",
                [new TalentPrerequisite("Faithful Companion"), new ExpertisePrerequisite(Skill.Animal_Handling, 3), new SourcePrerequisite(Source.Scout)],
                3),
            new TalentModel(
                "Animal Instinct",
                "Some innate, preternatural connection between you and the creature(s) designated as your Faithful Companions as per the talent allows your allies to sense your distress when not immediately within the same zone as you, and even outside of sight or earshot. If barred or otherwise separated, the animal companion(s) will do everything within their power to make their way to you to aid and comfort.",
                [new TalentPrerequisite("Speak to Wild"), new SourcePrerequisite(Source.Scout)],
                3),
            new TalentModel(
                "Herder",
                "You have learned how to turn a wild herd of animals into a tame source of ready supplies. When your populace harvests Forage Materials, it depletes the hex from which you gathered that Forage by half the regular amount, reflecting your ability to cull only the weakest animals, and to gather milk or eggs rather than killing the creatures who provide them.",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Born in the Saddle"), new ExpertisePrerequisite(Skill.Animal_Handling, 1)],
                1),
            new TalentModel(
                "Husband",
                "Through understanding of animals and how they move, you can keep more thriving with fewer resources. Animal pens you build consume 1 less Ingredient than normal. ",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Herder")],
                5),
        ],
        [Skill.Athletics]: [
            new TalentModel(
                "Born Swimmer",
                "You are as comfortable in water as you are on land. You can reduce the Difficulty of any swimming test by one step per rank of Born Swimmer, and can ignore any penalties for acting in water.",
                [new TalentPrerequisite("Strong Back")],
                3),
            new TalentModel(
                "Brutal Brawler",
                "You can ignore the effects of the Improvised quality, and increase the damage of the basic Improvised Attack by +1[CD].",
                [new TalentPrerequisite("Pugilist"), new ExpertisePrerequisite(Skill.Athletics, 2), new FocusPrerequisite(Skill.Melee, 2)],
                1),
            new TalentModel(
                "Human Spider",
                "You have spent a significant portion of your life in an environment that involves a great deal of climbing, often in the presence of sheer drops. You are very comfortable acting in these environments and never suffer from vertigo or fear of heights. In addition, you never suffer a penalty for a lack of climbing equipment and may reduce the Difficulty of any climbing test by one step.",
                [new TalentPrerequisite("Strong Back")],
                1),
            new TalentModel(
                "Iron Grasp",
                "You never drop or surrender an object unless you wish it. You are immune to the Disarm Momentum spend, and cannot drop your weapon(s) as a result of Complications.",
                [new VariableTalentPrerequisite("Human Spider", "Born Swimmer")],
                1),
            new TalentModel(
                "Might",
                "You are able to perform feats of strength that seem at odds with your physique, due to a combination of training and expertise. On any test to lift or move an inanimate object, you may roll a number of bonus d20s equal to your ranks in Might, though the normal limit of three bonus d20s still applies.",
                [new TalentPrerequisite("Strong Back")],
                3),
            new TalentModel(
                "Strong Back",
                "You are a magnificent example of human physical prowess, all-too-frequently abused for this ability. For any Athletics test that generates at least one success, you generate one additional success for each rank of Strong Back. Further, your Encumbrance limit is increased by 1 for each rank of Strong Back.",
                [new ExpertisePrerequisite(Skill.Athletics, 1)],
                3),
            new TalentModel(
                "Pugilist",
                "You can add the Knockdown quality to all melee attacks.",
                [new TalentPrerequisite("Might"), new ExpertisePrerequisite(Skill.Athletics, 2)],
                1),
            new TalentModel(
                "Perfect Cast",
                "You are highly skilled throwing rope where you want it to go, whether with grappling equipment or not, and securing it in advantageous spots. When climbing, you can reduce or increase the Difficulty for Athletics tests by one step. In addition, you can attack with a noose as if it were a regular ranged weapon.",
                [new TalentPrerequisite("Strong Back"), new SourcePrerequisite(Source.Thief)],
                1),
        ],
        [Skill.Command]: [
            new TalentModel(
                "Captain",
                "You have learned to issue orders in such a way that they are clear to the recipient, with little margin for misinterpretation. You may re-roll one d20 when making a Command test, but you must accept the new result.",
                [new ExpertisePrerequisite(Skill.Command, 1)],
                1),
            new TalentModel(
                "Commanding Men",
                "You speak in such a way that even those who do not know you or fully understand your language recognize your charisma and persuasive abilities. You can substitute Command for Linguistics or Persuasion tests.",
                [new TalentPrerequisite("Heed My Words"), new ExpertisePrerequisite(Skill.Command, 2)],
                1),
            new TalentModel(
                "Guardsman's Eye",
                "You are very familiar with the way a crowd would normally act, and recognize actions that are unusual. When dealing with places full of people — even if the people are not organized — you may substitute your Command skill for any Observation or Insight tests that deal with the crowd or the area. You may also use Command to resist against Thievery tests in a crowded area.",
                [new TalentPrerequisite("Captain")],
                1),
            new TalentModel(
                "Heed My Words",
                "Your bearing, presence, and voice grab attention and give enemies pause. This counts as a Display which must always use the Command skill. It has a range of Close, and inflicts 4[CD] mental damage with the Area and Stun qualities. This Display has no specific requirements, but it can only be used once in any scene. Outside of an action scene, you may instead add 1 point to Doom to seize the attention of a crowd of people and compel them to listen to you, though getting the crowd to do anything for you will still require Command or Persuade tests as normal. Toughened foes add one step of Difficulty to the Command test, and Nemesis foes add two steps.",
                [new TalentPrerequisite("Captain")],
                1),
            new TalentModel(
                "Inspiring Leader",
                "You are an inspiring presence to those who follow you. All of your allies and subordinates gain 2[CD] Morale Soak while they can see or hear you. Any characters who are within close range gain 4[CD] Morale Soak instead.",
                [new TalentPrerequisite("Captain")],
                1),
            new TalentModel(
                "Minions",
                "Individuals under your authority become extremely loyal to you, perhaps even willing to sacrifice themselves. Any time you come under attack and have a non-player character minion under your command within Reach, that minion may generate one point of Doom. In return, one of your minions also immediately attempts a Protect Reaction. These non-player character minions do not need to be the same, but both must be under your command.",
                [new TalentPrerequisite("Commanding Men")],
                1),
            new TalentModel(
                "Wise Veteran",
                "You have become proficient in making certain that the actions of a group are well-coordinated. Any time you are involved in a teamwork test — even if you are not the leader for the test — all characters involved may choose to re-roll any die on the initial roll that results in a failure. They must accept the results of the re-roll, even if they are worse than the initial roll.",
                [new TalentPrerequisite("Guardsman's Eye"), new ExpertisePrerequisite(Skill.Command, 2)],
                1),
            new TalentModel(
                "Benevolent Despot",
                "Your smiling face and strong sword arm keep the people happy to keep you happy. Although some rumble that you are a stern taskmaster, none can argue that you do not defend your people well. When making any test to maintain your settlement’s Morale, or to deal with the consequences of poor Morale, you may roll one bonus d20 per rank in Benevolent Despot. ",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Steward of the People")],
                3),
            new TalentModel(
                "Known to Some",
                "Your name and reputation have spread through the land, and those who meet you are not disappointed. When attempting to gain the loyalty of a new follower, you may add one bonus d20 to a single test related to that attempt. Additional ranks in Known to Some allow you to add a bonus d20 to an additional test in this process. ",
                [new SourcePrerequisite(Source.Exiles), new AnyTalentsPrerequisite(1, ["Lead by Example: Agility", "Lead by Example: Awareness", "Lead by Example: Brawn", "Lead by Example: Coordination", "Lead by Example: Intelligence", "Lead by Example: Personality", "Lead by Example: Willpower"])],
                3),
            new TalentModel(
                "Lead by Example: Agility",
                "Upon gaining this talent, you may choose a single skill. Any of your non-player character followers, with appropriate influence and access as judged by the gamemaster, may act as though they possess that skill while undergoing tasks appointed by you. Their level with that skill is 2 points lower than your score in that skill. Additional ranks in Lead by Example allow you to choose an additional skill you may thus “lend” to a follower. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Lead by Example: Awareness",
                "Upon gaining this talent, you may choose a single skill. Any of your non-player character followers, with appropriate influence and access as judged by the gamemaster, may act as though they possess that skill while undergoing tasks appointed by you. Their level with that skill is 2 points lower than your score in that skill. Additional ranks in Lead by Example allow you to choose an additional skill you may thus “lend” to a follower. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Lead by Example: Brawn",
                "Upon gaining this talent, you may choose a single skill. Any of your non-player character followers, with appropriate influence and access as judged by the gamemaster, may act as though they possess that skill while undergoing tasks appointed by you. Their level with that skill is 2 points lower than your score in that skill. Additional ranks in Lead by Example allow you to choose an additional skill you may thus “lend” to a follower. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Lead by Example: Coordination",
                "Upon gaining this talent, you may choose a single skill. Any of your non-player character followers, with appropriate influence and access as judged by the gamemaster, may act as though they possess that skill while undergoing tasks appointed by you. Their level with that skill is 2 points lower than your score in that skill. Additional ranks in Lead by Example allow you to choose an additional skill you may thus “lend” to a follower. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Lead by Example: Intelligence",
                "Upon gaining this talent, you may choose a single skill. Any of your non-player character followers, with appropriate influence and access as judged by the gamemaster, may act as though they possess that skill while undergoing tasks appointed by you. Their level with that skill is 2 points lower than your score in that skill. Additional ranks in Lead by Example allow you to choose an additional skill you may thus “lend” to a follower. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Lead by Example: Personality",
                "Upon gaining this talent, you may choose a single skill. Any of your non-player character followers, with appropriate influence and access as judged by the gamemaster, may act as though they possess that skill while undergoing tasks appointed by you. Their level with that skill is 2 points lower than your score in that skill. Additional ranks in Lead by Example allow you to choose an additional skill you may thus “lend” to a follower. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Lead by Example: Willpower",
                "Upon gaining this talent, you may choose a single skill. Any of your non-player character followers, with appropriate influence and access as judged by the gamemaster, may act as though they possess that skill while undergoing tasks appointed by you. Their level with that skill is 2 points lower than your score in that skill. Additional ranks in Lead by Example allow you to choose an additional skill you may thus “lend” to a follower. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Lord Protector",
                "During a siege or battle, in the Rally Troops phase, you inspire more of your citizenry to risk their lives for their liege. For each rank you possess in Lord Protector, you rally 10% more troops to the battle. Round down if the total would indicate less than a full extra unit, unless rounding down would result in no extra units rallied. In that case, round up to 1 extra unit. ",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Taskmaster")],
                3),
            new TalentModel(
                "Steward of the People",
                "You know how to save resources and distribute them to best effect. As long as you continue to take a direct hand in the governance of your settlement or stronghold, your populace consumes 10 percent fewer Forage and Water Materials than normal. Your gamemaster will determine what “a direct hand” means for the particular terms of your game. ",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Known to Some")],
                1),
            new TalentModel(
                "Taskmaster",
                "You drive a hard bargain when it comes to what you will pay your people for their work on the settlement in which they live. For each rank in Taskmaster you possess, reduce the Payment cost for maintaining your settlement by 5%.",
                [new SourcePrerequisite(Source.Exiles), new AnyTalentsPrerequisite(1, ["Lead by Example: Agility", "Lead by Example: Awareness", "Lead by Example: Brawn", "Lead by Example: Coordination", "Lead by Example: Intelligence", "Lead by Example: Personality", "Lead by Example: Willpower"])],
                4),
        ],
        [Skill.Counsel]: [
            new TalentModel(
                "An Ear to Listen",
                "You listen patiently to the problems of others, and few can dispute that hearing your voice steadies the nerves and stills doubts. When making a Counsel test to recover Resolve or treat Trauma for another character, every point of Momentum paid or point of Doom generated to add dice to the Counsel test provides two d20s instead of one, though the normal limit of three bonus d20s still applies.",
                [new TalentPrerequisite("Quiet Wisdom")],
                1),
            new TalentModel(
                "Calming Oratory",
                "You can speak to people and calm any situation. When making Persuade tests to convince someone to engage in conversation or to avoid violence, you may substitute Counsel for Command, Discipline, or Persuade. If a Struggle emerges from this attempt, the opposing side gains no bonus Momentum for having greater numbers. Once violence has been prevented this talent does not help with further negotiation.",
                [new TalentPrerequisite("An Ear to Listen"), new ExpertisePrerequisite(Skill.Counsel, 2)],
                1),
            new TalentModel(
                "Comforting Lies",
                "You know that often, the greatest reassurance comes from denial, and while it is not always the best way to give counsel, it can be valuable in dire times. When you successfully treat one or more Traumas another character has suffered, that character may add 3 points to Doom; the Traumas treated are now healed instead of simply being treated.",
                [new TalentPrerequisite("Quiet Wisdom")],
                1),
            new TalentModel(
                "Motivate",
                "You have a way of hastening the recovery of your allies, quickly and effectively restoring their determination and morale. When treating another character to recover their Resolve, you gain 1 bonus Momentum per rank of Motivate, which must be used to recover additional Resolve.",
                [new TalentPrerequisite("Quiet Wisdom")],
                1),
            new TalentModel(
                "Overcome Dark Powers",
                "Truly wise counsellors know that while most traumas come from the mortal world, some come from more nefarious sources. When treating Trauma caused by Sorcery or a creature summoned by Sorcery, you may take on some of your patient’s burden. To do this, add 2 points to Doom and suffer a single Trauma. The patient then heals a single Trauma completely. You must heal your newly-gained Trauma as normal.",
                [new TalentPrerequisite("Calming Oratory"), new ExpertisePrerequisite(Skill.Counsel, 3)],
                1),
            new TalentModel(
                "Quiet Wisdom",
                "You may re-roll any dice that did not generate a success on the initial roll when making a Counsel test, but you must accept the new result.",
                [new ExpertisePrerequisite(Skill.Counsel, 1)],
                1),
            new TalentModel(
                "Sophist",
                "You have become known for your wisdom and council, and many are happy to hear you speak. You may substitute Counsel for Persuade or Society.",
                [new TalentPrerequisite("Quiet Wisdom")],
                1),
        ],
        [Skill.Craft]: [
            new TalentModel(
                "Armorsmith",
                "You have the knack for repairing armor in the field; making do with whatever is available to repair your armor and that of your allies, even when resources are scarce. When repairing armor away from proper tools and materials, you may add 2 points to Doom in order to attempt a repair on a single hit location’s armor, without the use of materials.",
                [new TalentPrerequisite("Journeyman")],
                1),
            new TalentModel(
                "Barricade",
                "You have learnt to put up barricades or small structures quickly and efficiently. If you take a Standard Action to create a barricade, you can find or create light cover enough for one character. If given suitable time, you can find or create protections for an entire zone.",
                [new TalentPrerequisite("Armorsmith")],
                1),
            new TalentModel(
                "Journeyman",
                "You have passed apprenticeship and passed its trials. When making a Craft test, you may either roll one extra d20 or spend 1 Doom to reduce the Difficulty of the test by one step, to a minimum of 0.",
                [new ExpertisePrerequisite(Skill.Craft, 1)],
                1),
            new TalentModel(
                "Labor of Love",
                "Master Smiths can create truly beautiful works. When you have access to your tools and create a labor of love, you can use any bonus Momentum granted by Master Smith to increase the attractiveness of your work. This offers little functional difference to the finished item itself, but will increase your wealth and influence. With Labor of Love, you can use Craft in place of Society tests and gain 1 extra level of Renown for every rank of Master Smith.",
                [new TalentPrerequisite("Master Smith")],
                1),
            new TalentModel(
                "Mason",
                "You have been apprenticed to a skilled mason, and have learned the specialised and highly-valued skills necessary to oversee the construction of important buildings: temples, castles, palaces, and similar monuments. When overseeing a team of laborers during a construction project, you may use your Craft skill instead of Command. With a Standard Action, you can find or create heavy cover adequate for one character. Given suitable time and resources, you can create this level of protection for an entire zone.",
                [new TalentPrerequisite("Barricade"), new ExpertisePrerequisite(Skill.Craft, 2)],
                1),
            new TalentModel(
                "Master Smith",
                "You work faster than lesser workers and have the vision to recognize alternative uses of common items. With success on a Challenging (D2) Craft test, you can adapt existing items at hand in order to solve a problem. This adaptation is only good for a single use. Any Momentum from the test can be spent to provide an additional use, 1 extra per point of Momentum. After the final use has been completed, the item is ruined for both the alternative use and its originally intended use. When you have access to your tools you gain bonus Momentum equal to your ranks in Master Smith, which may only be spent on reducing the time taken to complete the task.",
                [new TalentPrerequisite("Journeyman"), new ExpertisePrerequisite(Skill.Craft, 2)],
                3),
            new TalentModel(
                "Sabotage!",
                "You are able to identify the problem with any broken item or structure, or to recognize a vulnerability that could be used to cause such a break. You reduce by one the Difficulty of any Craft test to perform repairs or maintenance. When an Exploit Action is taken using the Craft skill, Sabotage! grants bonus Momentum equal to your Craft Skill Focus.",
                [new TalentPrerequisite("Journeyman")],
                1),
            new TalentModel(
                "Architect",
                "When upgrading your Village to a Town, Town to a City, City to a Citadel, you may make the upgrade for 5 fewer units per rank in Architect of Material in Water, Forage, Wood, or Stone. Alternatively, you may make the build for 3 less Material in Metal, Treasure, or Exotic. ",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Engineer")],
                2),
            new TalentModel(
                "Civil Engineer",
                "With an eye for sturdy building and quick repairs, you know how to keep your settlement well-maintained. You pay 10% fewer resources for Upkeep on your settlement as long as you are materially involved in its operations. Round up to the nearest complete unit of Materials. This discount is applied to each type of Materials needed (as opposed to reducing the total by 10% and choosing which type of Materials to discount).",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Engineer")],
                1),
            new TalentModel(
                "Engineer",
                "When upgrading your Thorp to a Commot, Commot to a Hamlet, or Hamlet to a Village, you may make the upgrade for three fewer Materials of Water, Forage, Wood, or Stone, or one less Material worth of Metal, Treasure, or Exotic for each rank in Engineer.",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Resourceful Builder")],
                2),
            new TalentModel(
                "Lumberjack",
                "Through experience with the forest, and the methods and tools for harvesting its bounty, you can eke extra material out of any piece of timber cut down or found lying on the earth. Any time you roll at least one success on your test to harvest Wood, you gain 1 extra point of Momentum per rank of Lumberjack.",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Craft, 1), new TalentPrerequisite("Journeyman")],
                3),
            new TalentModel(
                "Metalsmith",
                "You know the ways of metals. How to forge it and cut it, how to temper it correctly so parts do not break. For every rank you have in Metalsmith, you reduce by 1 the amount of Metal needed to craft Metal Ingredients into items. ",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Prospector")],
                3),
            new TalentModel(
                "Prospector",
                "You are a natural hand at finding veins of ore and extracting the metals therefrom. When you make a test to gather Metal resources and roll at least 1 Momentum, you gain 1 extra Momentum for each rank you have in Prospector. ",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Craft, 1), new TalentPrerequisite("Journeyman")],
                3),
            new TalentModel(
                "Quarry Hand",
                "Whether from a long-done apprenticeship or a natural knack, you know where to strike rock to gain greater quantities in just the right shape. Whenever you roll at least 1 Momentum on a Survival test to gather Stone, you gain 1 extra Momentum per rank in Quarry Hand. ",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Craft, 1), new TalentPrerequisite("Journeyman")],
                3),
            new TalentModel(
                "Resourceful Builder",
                "When constructing a Farmstead or upgrading to a Farmstead to a Thorp, you may substitute up to 2 Materials per rank in Resourceful Builder for another when spending the resources necessary to make this build.",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Craft, 1), new TalentPrerequisite("Journeyman")],
                3),
            new TalentModel(
                "Stonemason",
                "An expert crafter of stone knows how to reduce waste and improve efficiency when building with this Ingredient. For every rank you have in Stonemason, you reduce by 1 the amount of Stone needed to craft Stone Ingredients into items.",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Quarry Hand")],
                3),
            new TalentModel(
                "Woodworker",
                "As an expert woodworker, you produce everything from tools to entire buildings with a minimum of waste. When building something requiring Wood, you reduce by 1 the amount of Wood needed to craft Ingredients into items for every rank you have in Woodworker, with a minimum of 1 Ingredient per build.",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Lumberjack")],
                3),
        ],
        [Skill.Discipline]: [
            new TalentModel(
                "Blessed",
                "You are particularly resistant to supernatural attempts to manipulate your perceptions, beliefs, and mental processes. Any time you attempt to resist supernatural powers that target your mind, you may re-roll any d20s that did not generate at least one success, though the second roll stands. Further, each d20 that you roll a 1 on will cause a single Complication for the attacker.",
                [new TalentPrerequisite("Healthy Superstition"), new ExpertisePrerequisite(Skill.Discipline, 2)],
                1),
            new TalentModel(
                "Courageous",
                "You may re-roll a single d20 on any Discipline test, though the second result stands. For every point of Discipline Focus, you gain 1 Courage Soak.",
                [new ExpertisePrerequisite(Skill.Discipline, 1)],
                1),
            new TalentModel(
                "Healthy Superstition",
                "Some superstitions are just common sense, and you hold many of those beliefs. This superstition allows you to stand firm in the face of the unnatural, even if doing so would seem foolhardy. When facing supernatural threats, you are empowered by this belief. When a supernatural threat manifests, you may spend one Momentum (Immediate, Repeatable) to immediately gain 1[CD] Morale Soak, which lasts until the end of the current scene.",
                [new TalentPrerequisite("Courageous")],
                1),
            new TalentModel(
                "Iron Will",
                "You have survived countless challenges and are prepared to face even more. You don’t cry out when struck or startled, and you quickly rebound from Stress. Rather than having to choose a particular stress when you take a Recover Action, you recover both Vigor and Resolve, regaining the same amount of each (two points, plus two per Momentum spent). In addition to this you can add 2 points to Doom in order to perform the Recover Action as a Minor Action. If you use this option, you do not get to re-roll Cover dice, as outlined in the Recover Action.",
                [new TalentPrerequisite("Courageous")],
                1),
            new TalentModel(
                "Jaded",
                "You have repeatedly observed and suffered cruelties, and have built up a tolerance to mental suffering. Increase your maximum Resolve by one for each rank of Jaded.",
                [new TalentPrerequisite("Courageous")],
                3),
            new TalentModel(
                "Wary",
                "You have seen countless attempts at manipulation, and no longer trust easily. Whenever you are the target of a Persuade or Command action by another character or nonplayer character, any Momentum spent (or points added to Doom) to add bonus d20s to the Willpower test adds two dice instead of one, though the normal limit of three bonus d20s still applies. Further, if you resist the manipulation attempt, any other characters who have been convinced may each spend 1 Momentum (Immediate) to see through the manipulation, inspired by your example.",
                [new TalentPrerequisite("Jaded")],
                1),
            new TalentModel(
                "If It Bleeds...",
                "When facing a foe that has suffered a Wound, you gain 4[CD] Morale Soak against that foe and all its abilities.",
                [new TalentPrerequisite("Iron Will"), new ExpertisePrerequisite(Skill.Discipline, 3), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "...It Can Be Killed",
                "When facing a foe that has suffered a Wound, you automatically restore Resolve up to your Discipline Focus. If this means that all your Resolve is restored, you can count 1 Trauma as automatically treated.",
                [new TalentPrerequisite("If It Bleeds..."), new SourcePrerequisite(Source.Barbarian)],
                1)
        ],
        [Skill.Healing]: [
            new TalentModel(
                "A Little to Ease the Pain",
                "In your past you worked with extremely limited resources, and have learned to take full advantage of them when available. When using medicine from a healer’s bag, each load adds two d20s to the Healing test, instead of the usual one, though the normal limit of three bonus d20s still applies. In addition, if you have access to narcotics or alcohol you can make a Daunting (D3) Healing test to convert a dose of either into a dose of medicine.",
                [new TalentPrerequisite("Bind Wounds")],
                1),
            new TalentModel(
                "Anatomist",
                "You know the human body like no other and can exploit this in many ways. When making a Healing test to treat injuries, you can reduce the Difficulty of any test by one step, to a minimum of Average (D1). In addition to this you may add +1[CD] and the Vicious 1 quality to any melee or Threaten attack you make, as your knowledge of the body makes your cuts and your threats alike all-the-crueller and more specific.",
                [new TalentPrerequisite("This Will Hurt")],
                1),
            new TalentModel(
                "Apothecary",
                "You are well-versed in treating poisons. You can attempt an Average (D1) Healer test any time you encounter a poisoned or drugged patient. On success, you are able to identify both the poison or drug and the antidote necessary to relieve its symptoms. You may spend Momentum to have the antidote at hand, though the amount required is subject to the gamemaster’s discretion, based upon the rarity and toxicity of the poison or drug. You can use the Healing skill instead of Alchemy or Animal Handling when treating or procuring venoms.",
                [new TalentPrerequisite("A Little to Ease the Pain")],
                1),
            new TalentModel(
                "Avoid Danger",
                "You recognize various environmental risks and know how to mitigate them. You may substitute your Healing skill for Survival for the purposes of avoiding hazards.",
                [new TalentPrerequisite("Bind Wounds")],
                1),
            new TalentModel(
                "Bind Wounds",
                "You may re-roll one d20 when using the Healing skill, but you must accept the new result.",
                [new ExpertisePrerequisite(Skill.Healing, 1)],
                1),
            new TalentModel(
                "Chirurgeon",
                "You have encountered a variety of sicknesses, plagues and injuries, and have learned many effective ways of treating these maladies. You can attempt an Average (D1) Healing test to identify the best course of treatments for any patient you encounter. On a success, you are able to prescribe a suitable remedy. You may spend Momentum to have the necessary treatments on hand, though the cost in both money and time is subject to the gamemaster’s discretion. You are a figure of authority and can substitute Healer for the Command skill. If you command another character to assist you or to act in your stead, that character can reroll a single d20 of their own Healing test. Given suitable downtime, you can completely heal the injuries of others.",
                [new TalentPrerequisite("Apothecary"), new ExpertisePrerequisite(Skill.Healing, 2)],
                1),
            new TalentModel(
                "This Will Hurt",
                "You know that setting bones and tending to injuries will cause plenty of pain, and there’s little good that comes from being gentle when trying to save a life. Better that they suffer pain now and live to tell of it. When you attempt to treat a patient’s injuries, you may choose to reduce the Difficulty of the test by up to three steps. However, if you do this, you also inflict 2[CD] mental damage on that patient, plus an additional +1[CD] for every step of Difficulty reduced, as your swift and indelicate actions cause the patient intense pain.",
                [new TalentPrerequisite("Bind Wounds")],
                1),
            new TalentModel(
                "Herbalist",
                "The herbalist is skilled in the variety of processes and disciplines that involve the use of herbs in treatment, from identifying plants (whether growing wild or gathered and prepared), to knowing their uses and risks, to familiarity with the various methods by which these plants can be prepared and administered. The Herbalist talent provides the character with the ability to make a Healing test and determine what herbal remedies or treatments will be most beneficial to a particular subject, and in what doses. In some cases, this might be identifying the effects of plant life on the subject. Furthermore, the talent provides the fundamental knowledge for creating herbal concoctions.",
                [new FocusPrerequisite(Skill.Healing, 2), new FocusPrerequisite(Skill.Survival, 2), new SourcePrerequisite(Source.Skelos)],
                3),
        ],
        [Skill.Insight]: [
            new TalentModel(
                "Know the Signs",
                "You have personally dealt with the effects of the supernatural, and recognize the signs of its activity. Whenever you are in the presence of a person or object that was affected by supernatural abilities within the last six hours, you may attempt an Insight test, with a Difficulty equal to the number of hours ago the person or object was affected. On success, you can recognize the taint of the supernatural. By spending 2 points of Momentum, you can identify the specific powers in use.",
                [new TalentPrerequisite("Pierce the Veil")],
                1),
            new TalentModel(
                "Pierce the Veil",
                "You have a knack for recognizing the subtle cues of supernatural ability. Whenever you are in the presence of the supernatural or beings with unusual powers — particularly if you are not aware of them — the gamemaster should call for you to attempt an Average (D1) Insight test. On success, you recognize that the other being (or presence) has supernatural abilities, and may spend 2 Momentum to identify the type of abilities. This test should be made even if the target does not have any active abilities.",
                [new TalentPrerequisite("Sixth Sense")],
                1),
            new TalentModel(
                "Rescue the Innocents",
                "Instead of using the ability from Witch, prior to combat you can attempt a Simple (D0) Insight test to evacuate innocents from the scene. For every Momentum spent, you can earmark three chosen non-player characters and ensure that they get to safety. These non-player characters cannot be targeted by combat unless the gamemaster pays three points of Doom for each attack.",
                [new TalentPrerequisite("Witch")],
                1),
            new TalentModel(
                "See the Soul",
                "While you might not literally see the human soul, you can intuitively relate your alternate senses to the physical world. When dealing with mortal humans you may substitute your Insight skill for Observation, Social, Stealth, or Thievery.",
                [new TalentPrerequisite("Sixth Sense")],
                1),
            new TalentModel(
                "Sixth Sense",
                "You may re-roll one d20 when making an Insight test, but you must accept the new result. In the event of an ambush, you gain 1 additional bonus point of Momentum. If the Insight test was requested because of sorcerous or otherwise unnatural phenomena, the gamemaster must reveal this.",
                [new ExpertisePrerequisite(Skill.Insight, 1)],
                1),
            new TalentModel(
                "Smell Out Sorcery",
                "Instead of using the ability from Witch prior to combat, you can attempt a Challenging (D2) Insight test to sense any sorcery, whether a sorcerer, summoned creature, ruin or artifact within medium range. However, this test is highly inaccurate and its consequences may target innocent victims.",
                [new TalentPrerequisite("Sorcerer")], // TODO: also Rescue the Innocents??
                1),
            new TalentModel(
                "Witch",
                "Whether from dire sorcery or human cruelty, you have learned to discover when matters will escalate. Prior to any combat, you can attempt a Dire (D4) Insight test to gain an additional Standard Action. This Action takes place as if you had spent a Fortune point. Each additional rank of this talent beyond the first reduces the Insight test by one Difficulty step.",
                [new TalentPrerequisite("Sixth Sense")],
                1),
        ],
        [Skill.Linguistics]: [
            new TalentModel(
                "Accent",
                "You are familiar with the idioms and speech patterns of a broad range of different populations. You know not just how to speak a language, but how to speak it in a fashion that sets a native speaker at ease, often even utilizing a local dialect. You can substitute Linguistics for Persuade.",
                [new TalentPrerequisite("Traveler's Tongue")],
                1),
            new TalentModel(
                "A Cryptic Ear",
                "You have a knack for spotting and solving word and number ciphers, even those hidden in plain sight. So long as you are fluent in the language spoken, the Difficulty of any test to decipher the hidden meaning is reduced by one step. In addition, you can add 1 to Doom in order to reduce the Difficulty of the test by one step further. This may eliminate the need for a test, if it becomes lower than Simple (D0).",
                [new TalentPrerequisite("Traveler's Tongue")],
                1),
            new TalentModel(
                "Body Language",
                "You are a master at understanding people. You can speak with any living person so long as there is no immediate distraction that would prevent communication, at which point the Linguistics skill must be used as normal. This communication requires a Standard Action but no test is needed. You can also substitute Linguistics for Insight.",
                [new TalentPrerequisite("Polyglot")],
                1),
            new TalentModel(
                "Polyglot",
                "You are a master at understanding languages. You speak the active languages of all the locations you have traveled to, and will immediately learn the active languages of anywhere you visit. Learning the language(s) costs 1 Fortune point, which can be spent at any time during the visit.",
                [new TalentPrerequisite("Accent"), new FocusPrerequisite(Skill.Linguistics, 2)],
                1),
            new TalentModel(
                "Translator",
                "You can read more languages than you can speak. For every Linguistics talent possessed, you can add one language that you can read with fluency. You do not count as fluent when hearing or speaking the language, though you can still communicate fluently through writing should you find a literate character to converse with.",
                [new TalentPrerequisite("Traveler's Tongue")],
                1),
            new TalentModel(
                "Traveler's Tongue",
                "You gain one additional language fluency for every Linguistics talent you possess.",
                [new ExpertisePrerequisite(Skill.Linguistics, 1)],
                1),
            new TalentModel(
                "Two Tongues",
                "You are a master at expression and can transmit a private message at the same time as a public one. You can take two Speak Actions at the same time. For others, cracking your spoken code is a Daunting (D3) Linguistics test, though for the expected recipient it is an Average (D1) Linguistics test to understand the message.",
                [new TalentPrerequisite("A Cryptic Ear"), new FocusPrerequisite(Skill.Linguistics, 2)],
                1),
        ],
        [Skill.Lore]: [
            new TalentModel(
                "Common Ground",
                "You have a broad education that includes an understanding of history and culture from a variety of different perspectives. When interacting with an opponent, you may attempt an Average (D1) Lore test as a Minor Action. On success, you recognize within your opponent an element of common ground for discussion. Any Momentum from the Lore test may be immediately added to a Persuade or Command test, taken as a Standard Action.",
                [new TalentPrerequisite("Scribe")],
                1),
            new TalentModel(
                "The Enemy of My Enemy",
                "You have come to recognize the reasons why an opponent is acting in a particular way, and can use that to dissuade them from acting. You may substitute your Lore skill for Command, Counsel, or Persuade when making a test against an opponent whose motivations you understand.",
                [new TalentPrerequisite("Know Your Enemy")],
                1),
            new TalentModel(
                "Know Your Enemy",
                "When analyzing an opponent’s pattern of actions — including combats, social interactions, and rumors — you have learned to recognize your foe’s overall strategy. Once you have assembled the available clues, you may spend 1 Doom point. The gamemaster must then truthfully reveal your opponent’s short-term goals.",
                [new TalentPrerequisite("Politically Savvy"), new ExpertisePrerequisite(Skill.Lore, 2)],
                1),
            new TalentModel(
                "Play the Part",
                "You are so familiar with foreign cultures that you have learned to impersonate the members of a broad range of cultures. This includes style of dress, speech, and other mannerisms. When attempting to make use of a disguise, you may substitute your Lore skill for Stealth.",
                [new TalentPrerequisite("Common Ground"), new ExpertisePrerequisite(Skill.Lore, 2)],
                1),
            new TalentModel(
                "Politically Savvy",
                "You are familiar with the philosophies, styles, and motivations of various political entities. When interacting with an opponent, you may attempt a Simple (D0) Lore test as a Minor Action. One Momentum is enough to recognize the foe’s significant political and personal affiliations, based upon their apparent mannerisms and actions. Additional Momentum provides more detailed information.",
                [new TalentPrerequisite("Scribe")],
                1),
            new TalentModel(
                "Sage",
                "You have an impressive amount of knowledge at an academic level. When performing research on any topic covered by the Lore skill you may reduce the Difficulty by one step per rank of Sage. This may eliminate the need for the test.",
                [new TalentPrerequisite("Scribe")],
                3),
            new TalentModel(
                "Scribe",
                "You have had access to at least a small library of books, scrolls, or tablets, and gained a fascination with learning and knowledge. When rolling a Lore test you gain one bonus Momentum for every d20 that rolls less than your Lore Focus. This bonus Momentum can only be used for the Obtain Information Momentum spend.",
                [new ExpertisePrerequisite(Skill.Lore, 1)],
                1),
            new TalentModel(
                "Excavator",
                "You are trained to recognize, identify, and retrieve the relics of the past.When searching for any treasure or artifact, or when attempting to identify their use or value, any Difficulty test is reduced by one step.Additional ranks in this Talent generate 1 Momentum per rank in any related Difficulty test.",
                [new ExpertisePrerequisite(Skill.Lore, 0), new SourcePrerequisite(Source.Thief)],
                3),
            new TalentModel(
                "Astrologer",
                "The astrologer is knowledgeable about the movement of the stars throughout the heavens and its influence upon terrestrial and supernatural matters. When attempting to perform a sorcerous activity, the astrologer can spend an hour consulting the stars themselves, or star charts and almanacs, to determine the influence the arrangement of the stars will have on that activity, performing a Lore (D1) test. Attempting this test without the time to consult the stars or the relevant resources increases the Difficulty by one step. Success with this test means that the astrologer can determine a fortuitous alignment of the celestial bodies that will aid the casting of the spell.",
                [new TalentPrerequisite("Scribe"), new SourcePrerequisite(Source.Skelos)],
                1),
            new TalentModel(
                "Eye for Antiquity",
                "In the ruins and deserts of the Exiled Lands lie many a treasure mistaken for trash. Those who know the history of lost valuables, the difference between iron pyrite and true gold, and the distinctive pelts of the most valuable fur-bearing animals can find profit where other find but dust and vermin. When you gather Treasure resources and roll at least 1 Momentum on the test, you gain 1 bonus Momentum for each rank you have in Eye for Antiquity.",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Lore, 1), new TalentPrerequisite("Scribe")],
                3),
            new TalentModel(
                "Profiteer",
                "You have an innate sense for not just the objective value of an item, but its potential value to whomever you are trading it to. When you trade using Treasure resources, you may make a Challenging (D2) Lore or Persuade test. For each point of Momentum gained on that test, you receive 2 extra Forage, Wood, or Stone per 2 units of Treasure traded. ",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Eye for Antiquity")],
                1),
        ],
        [Skill.Melee]: [
            new TalentModel(
                "Adaptable Combatant",
                "You can adjust your fighting style to suit a range of circumstances. When making or defending against an attack, you may increase or decrease the Reach of your weapon by 1. A weapon’s Reach may not be reduced below 1.",
                [new TalentPrerequisite("Deft Blade"), new ExpertisePrerequisite(Skill.Melee, 3)],
                1),
            new TalentModel(
                "Blood on Steel",
                "You do not hesitate to bloody your weapons. When rolling for damage with a melee attack, you may spend one Momentum in order to add the Vicious 1 quality to the weapon, or increase the weapon’s Vicious quality by 1 if it already possesses the quality.",
                [new TalentPrerequisite("No Mercy"), new ExpertisePrerequisite(Skill.Melee, 2)],
                1),
            new TalentModel(
                "Deft Blade",
                "You wield a blade as if it were an extension of your arm. Whenever you make a melee attack, any Momentum spent or points added to Doom to add bonus d20s to the Melee test adds two dice instead of one, though the normal limit of three bonus d20s still applies.",
                [new TalentPrerequisite("No Mercy"), new ExpertisePrerequisite(Skill.Melee, 2)],
                1),
            new TalentModel(
                "Grappler",
                "You know that a mobile foe is a dangerous one, and the easiest way to stop someone moving is to grab hold of them. After making a successful melee attack, you may spend 1 Momentum to gain the Grappling quality on an unarmed attack.",
                [new TalentPrerequisite("No Mercy")],
                1),
            new TalentModel(
                "Killing Strike",
                "Your strikes are deadly, making corpses of all who cross you. When you inflict 1 or more Wounds as a result of a melee attack, you may spend 2 Momentum in order to inflict an additional Wound immediately. Against a mob or squad of enemies, this additional Wound may be applied to another member of that mob or squad.",
                [new TalentPrerequisite("Blood on Steel"), new ExpertisePrerequisite(Skill.Melee, 3)],
                1),
            new TalentModel(
                "Murder in the Eyes",
                "You are a savage up close, where your foes can feel the wet heat of your breath and see the savagery in your gaze. When attacking an opponent that does not have Guard, add +2[CD] to your damage roll.",
                [new TalentPrerequisite("Grappler")],
                1),
            new TalentModel(
                "No Mercy",
                "When making a Melee attack, you may re-roll a number of damage dice equal to the total number of Melee talents (and ranks in those talents) you have acquired, if desired. You must accept the results of the re-rolls.",
                [new ExpertisePrerequisite(Skill.Melee, 1)],
                1),
            new TalentModel(
                "Brutal Reaction",
                "When you suffer damage from a Melee attack, you can spend 2 Doom to make an immediate improvised Melee attack. This attack is a Daunting (D3) Melee test dealing your usual damage for an unarmed strike. As this attack doesn’t cost an Action, no Momentum can be carried forward. The attack either hits or misses. If you have 2 ranks of Brutal Reaction and the Riposte talent, Brutal Reaction is triggered on any Melee attack that hits, even if it doesn’t do damage.",
                [new TalentPrerequisite("Deflection"), new TalentPrerequisite("No Mercy"), new SourcePrerequisite(Source.Barbarian)],
                2),
            new TalentModel(
                "Hostage Taker",
                "When wounding a foe, rather than delivering a blow that would kill the foe, you can knockout, bind, or otherwise restrain that foe so that they might be later be interrogated or ransomed back to their families.",
                [new TalentPrerequisite("Grappler"), new ExpertisePrerequisite(Skill.Melee, 2), new ExpertisePrerequisite(Skill.Persuade, 2), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Fighting Dirty",
                "Pirates rarely fight with any honor, and you’ve learned a gruesome array of brutal and dirty tricks to employ against your opponents. Once per turn after you make a successful melee attack, you quickly follow through with an immediate second attack, an instinctive dirty trick. This costs 1 Momentum and is assumed to be part of the initial attack, though damage is calculated separately. This trick (eye gouge, groin kick, elbow, spit in the eye, etc.) causes X[CD] damage with the Stun Quality, where X is the number of Ranks in this talent. Fighting Dirty cannot cause a Wound.",
                [new TalentPrerequisite("No Mercy"), new SourcePrerequisite(Source.Pirate)],
                3),
            new TalentModel(
                "Pikeman",
                "At some point in your youth you received training in the Gunderland militia, specifically the use of the pike and shield. When allied with at least two others within Reach with this talent and equipped with pike or long spear and medium or large shield, you may each roll one additional d20 when attempting Melee Weapon or Parry tests. This bonus d20 disappears if any of you are incapacitated, lose a shield, or are otherwise unable to move, attack, and defend freely.",
                [new VariableHomelandPrerequisite(0, 12), new TalentPrerequisite("No Mercy"), new ExpertisePrerequisite(Skill.Melee, 2), new ExpertisePrerequisite(Skill.Parry, 2), new SourcePrerequisite(Source.Scout)],
                1),
            new TalentModel(
                "Plowshare to Sword",
                "You have spent time farming and working the land, so much so that you are just as adept with farming tools and implements as you are weapons. With this talent, when using a farming implement such as a pitchfork, sickle, or farm-tool-turned-improvised-weapon, you can ignore any Improvised or Fragile Qualities the weapon possesses.",
                [new TalentPrerequisite("No Mercy"), new SourcePrerequisite(Source.Scout)],
                1),
        ],
        [Skill.Observation]: [
            new TalentModel(
                "Battlefield Perception",
                "During combat, you may choose one enemy and make an Average (D1) Observation test as a Minor Action. If successful, you can determine how much of the target’s Stress remains, and how many Harms the target is suffering from. For one Momentum (Repeatable), you may choose one additional foe.",
                [new TalentPrerequisite("Scout"), new ExpertisePrerequisite(Skill.Observation, 2)],
                1),
            new TalentModel(
                "Crippling Blow",
                "You know how to place your blows to deal crippling harm. After making a successful attack, you may add 1 point to Doom in order to make the attack particularly effective. Add a number of additional damage dice to the attack equal to your Observation Focus. Each time this ability is used in a single scene, the cost of using the ability increases by 1: the first time adds 1 to Doom, the second adds 2, the third adds 3, etc.",
                [new TalentPrerequisite("Battlefield Perception")],
                1),
            new TalentModel(
                "Perfect Memory",
                "You have a knack for recalling information, even if it was irrelevant at the time. You can make an Observation test to investigate any area you’ve been to, even if you are not in that location any more. You cannot change any of the physical features of the area, meaning that your memory is limited to what you actually experienced. For example, if you didn’t look behind a tapestry or open a door, you have no idea what they conceal. However, if you also have the Ransack talent, it should be assumed that you opened/ closed all doors and looked at the scene from multiple points of view.",
                [new TalentPrerequisite("Sharp Senses")],
                1),
            new TalentModel(
                "Ransack",
                "You are adept at thoroughly searching an area quickly. The search is obvious to any onlookers and any who examine the area searched, with a Difficulty determined by the size of the area to be searched. Searching within Reach requires an Average (D1) Observation test, while searching within Close range becomes a Challenging (D2) test. With a successful Observation test, you identify all of the clues that you currently consider important in that area. Ransack takes a Standard Action and can be attempted multiple times.",
                [new TalentPrerequisite("Sharp Senses")],
                1),
            new TalentModel(
                "Scout",
                "You can survey a new environment quickly. The first time you attempt an Observation test in a location you’ve never been before, you gain 1 bonus Momentum, which must be used on the Obtain Information Momentum spend.",
                [new TalentPrerequisite("Sharp Senses")],
                1),
            new TalentModel(
                "Sharp Senses",
                "You may re-roll one d20 when making an Observation test, but you must accept the new result.",
                [new ExpertisePrerequisite(Skill.Observation, 1)],
                1),
            new TalentModel(
                "Spy",
                "You can perform the Ransack talent without leaving tell-tale evidence of the search. To notice that a search has been undertaken, you must engage in a Struggle with the character that used this talent upon the space, gaining bonus Momentum equal to your Observation Focus.",
                [new TalentPrerequisite("Ransack"), new ExpertisePrerequisite(Skill.Observation, 2)],
                1),
            new TalentModel(
                "It's a Trap!",
                "You can spot covered pits, pressure plates, fulcrums, and other constructions designed to keep thieves out of burial chambers and treasure rooms.",
                [new ExpertisePrerequisite(Skill.Observation, 1), new SourcePrerequisite(Source.Thief)],
                1),
            new TalentModel(
                "Architect",
                "You can sense changes in elevation, discrepancies in room size, spot camouflaged doors, and other hiding places that are built into a structure.",
                [new ExpertisePrerequisite(Skill.Observation, 1), new SourcePrerequisite(Source.Thief)],
                1),
            new TalentModel(
                "Human Compass",
                "You have an innate sense of direction and can always find north, even with no visible markers.",
                [new TalentPrerequisite("Architect"), new SourcePrerequisite(Source.Thief)],
                1),
        ],
        [Skill.Parry]: [
            new TalentModel(
                "Crowd Pleaser",
                "You have become adept at gauging your attacks to create more spectacular results that are less lethal than they appear. After successfully hitting with a Melee attack, but before rolling for damage, you can reduce the damage of the attack by up to 3[CD]. You gain 1 bonus Momentum for each [CD] of damage reduced.",
                [new TalentPrerequisite("Stage Fighting")],
                1),
            new TalentModel(
                "Deflection",
                "You know the importance of keeping your weapons up and ready to defend. When making a Defend Reaction using the Parry skill, you can reduce the number of points added to Doom by 1, to a minimum of 0. This stacks with the weapon’s Parrying quality.",
                [new ExpertisePrerequisite(Skill.Parry, 1)],
                1),
            new TalentModel(
                "Reflexive Block",
                "You have become so attuned to your Parry skill that you may use your Parry skill when attempting a Defend Reaction against a ranged attack, which is normally not possible.",
                [new TalentPrerequisite("Riposte")],
                1),
            new TalentModel(
                "Riposte",
                "The instant after an attack is the moment when the attacker is the most vulnerable. After successfully making a Defend Reaction using the Parry skill, you may immediately add 1 to Doom in order to make a Melee attack against the foe you just parried. Momentum remaining from the Parry Action may be carried over to this Melee attack.",
                [new TalentPrerequisite("Deflection")],
                1),
            new TalentModel(
                "Stage Fighting",
                "You can believably fake combat with others, presenting no risk to the ones facing you. When using Parry to engage in such deception, any attack made gains the Nonlethal quality.",
                [new TalentPrerequisite("Deflection")],
                1),
            new TalentModel(
                "Tutored Warrior",
                "You can study human foes to learn their weaknesses, drawing them out in combat to see how they react, and thus, learning how to exploit those moments when they are unintentionally defenseless. As a Standard Action, you may attempt a Daunting (D3) Parry test to learn one particular enemy’s patterns and weaknesses. For the remainder of the scene, you may re-roll a single d20 on every Melee or Parry skill test made against that enemy.",
                [new TalentPrerequisite("Deflection")],
                1),
            new TalentModel(
                "A Single Honest Blade",
                "When carrying a single weapon, and using the Parry skill on a Reaction, the character gains cover soak against all Melee attacks equal to their Parry focus −2. If the character is using a shield, they can use either the benefit of this talent or the benefit of the shield, but not both.",
                [new TalentPrerequisite("Deflection"), new ExpertisePrerequisite(Skill.Parry, 3), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Hazardous Disarm",
                "When making a Flamboyant Disarm against a foe in a Mob or Squad, you can pay 1 Doom and inflict 3[CD] damage to a Mob or Squad member of the gamemaster’s choice. The damage inflicted has all the Qualities of the disarmed weapon.",
                [new TalentPrerequisite("Flamboyant Disarm"), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Ferocious Wounds",
                "When you wound a foe, your penchant for the dramatic allows you to panic the weak-willed. Once you have inflicted a wound, your weapon gains the Fearsome 1 Quality for the rest of the combat. This doesn’t add to any weapon already having the Ferocious Quality.",
                [new TalentPrerequisite("Stage Fighting"), new ExpertisePrerequisite(Skill.Persuade, 1), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Flamboyant Disarm",
                "When you perform a Riposte you can instead perform a Flamboyant Disarm. A Flamboyant Disarm costs 2 Doom, but automatically triggers a Disarm of any one-handed weapon, and allows you to make an instant Threaten Action against the foe you have disarmed.",
                [new TalentPrerequisite("Riposte"), new ExpertisePrerequisite(Skill.Parry, 2), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Boarding Action",
                "Pirates are experts at boarding unfriendly craft and know all the best places to seek cover. When boarding a hostile vessel, you count as having Reach 4 and Cover Soak 1 per rank of the talent for the round you board the vessel. You must be aware of the presence of opponents onboard, and be able to move freely to take cover, for this talent to work.",
                [new TalentPrerequisite("Deflection"), new SourcePrerequisite(Source.Pirate)],
                3),
            new TalentModel(
                "Natural Cover",
                "Long accustomed to fighting within natural environments, using trees, brushes, and other types of foliage to your advantage, you have become extremely difficult to spot and attack successfully with ranged weapons. While in a jungle or forest environment, and taking a Movement Action, you gain the equivalent of light cover against any Ranged Weapons tests made against you by mortal foes, so long as you are actively seeking to avoid being struck and are able to move freely.",
                [new TalentPrerequisite("Deflection"), new ExpertisePrerequisite(Skill.Athletics, 1), new SourcePrerequisite(Source.Scout)],
                1),
        ],
        [Skill.Persuade]: [
            new TalentModel(
                "Force of Presence",
                "Your damage bonus on mental attacks is increased by +1[CD].",
                [new ExpertisePrerequisite(Skill.Persuade, 1)],
                1),
            new TalentModel(
                "Haggler",
                "You are particularly proficient at striking a bargain, either to obtain goods or favours. After making a Society test to purchase an item, you may roll a Simple (D0) Persuade test and reduce the cost by 1 by spending 2 Momentum (Repeatable).",
                [new TalentPrerequisite("Force of Presence"), new ExpertisePrerequisite(Skill.Persuade, 2)],
                1),
            new TalentModel(
                "Naturally Charming",
                "You have a warm personality and a winning smile. People trust you. A successful Persuade test yields 1 point of bonus Momentum per rank of Naturally Charming.",
                [new TalentPrerequisite("Force of Presence")],
                3),
            new TalentModel(
                "Remorseless",
                "You are willing and able to tell any lie that you feel is necessary to overcome an opponent’s social defenses. When lying to an opponent, you gain one additional d20 per rank of Remorseless to your Persuade or Command test.",
                [new TalentPrerequisite("Haggler")],
                1),
            new TalentModel(
                "Seducer",
                "You are particularly adept at seducing others. When attempting a seduction, you gain two additional d20s to your Persuade test per Momentum spent or Doom generated, instead of one, though the normal limit of three additional d20s still applies.",
                [new TalentPrerequisite("Naturally Charming")],
                1),
            new TalentModel(
                "Social Chameleon",
                "It is one thing to be convincing for a minute, it is another to be convincing for a lifetime. When impersonating a different social caste, this talent lets you substitute your Persuade skill in place of Animal Handling, Craft, Insight, Society, Survival, or Thievery, though only when convincing others that you have this expertise. Any practical application of the skill that requires actual knowledge relies on your existing relevant skill, if any.",
                [new TalentPrerequisite("Remorseless")],
                1),
            new TalentModel(
                "Strong-arm Tactics",
                "You recognize others’ limitations and can easily exploit them. When attempting to intimidate an opponent, you are able to recognize the most effective strategies to use. You gain one additional d20 to any Persuade or Command test per rank of Strong-arm Tactics. Further, you gain Piercing X on your Threaten attacks, where X is equal to your ranks in Strong-arm Tactics.",
                [new TalentPrerequisite("Force of Presence")],
                3),
            new TalentModel(
                "Intimidate",
                "You can use your physical presence or carefully chosen words (or both) to compel obedience from others, whether through the threat of violence or social humiliation.Whenever making an appropriate Social test under these conditions, you generate 1 automatic success.",
                [new ExpertisePrerequisite(Skill.Persuade, 0), new SourcePrerequisite(Source.Thief)],
                1),
            new TalentModel(
                "Chicanery",
                "This talent allows the player character to perform minor tricks that seem to be outside the realm of possibility, the equivalent of parlor tricks — whether guessing the result of a playing piece before it is cast, identifying the owner of an item, appearing to know information about a relative stranger, bending or deforming objects, casting one’s voice to another place, or producing small items apparently out of thin air (or conversely, making them vanish into thin air). None of these tasks are inherently magical, and each relies more on misdirection, sleight-of-hand, careful questioning and observation, or other bits of inherent trickery. In game terms, the player character may re-roll 1d20 on any task relating to sleight-of-hand, identification of items, manipulating objects, revealing hidden information, or making things appear or disappear. The second result, successful or not, must be accepted.",
                [new ExpertisePrerequisite(Skill.Persuade, 1), new ExpertisePrerequisite(Skill.Stealth, 1), new SourcePrerequisite(Source.Skelos)],
                1),
            new TalentModel(
                "Mummer",
                "The true mummer has a bit of the sorcerous art, able to direct scraps of magical energy into superficial effects. These minor glamors, often called cantrips, do little other than support other skills. They add to attempts at impressing others, whether by cowing them through theatrical displays of power, or by impressing them into believing the sorcerer knows greater magic than is being displayed. This can range from causing candles, lamps, or torches to flare (or dim), fluttering curtains or causing brief winds to whip through interior spaces, or creating rattles, creaks, or other ominous sounds where there is no apparent cause. It can also be used outdoors, to startle animals into frightened squawks or screeches, or to cause flocks of birds to suddenly flee. Using this talent, a character may spend a trapping as a resource for any successful skill use relating to magic but not intrinsically magical in nature, whether Command, Persuade, or Thievery (used for misdirection and sleight-of-hand).",
                [new TalentPrerequisite("Chicanery"), new ExpertisePrerequisite(Skill.Sorcery, 1), new SourcePrerequisite(Source.Skelos)],
                1),
            new TalentModel(
                "Buy Low, Sell High",
                "Your expertise in haggling for the best possible price is second to none. Whenever you gain Momentum on a test to make a favorable trade for resources, you gain 1 bonus Momentum per rank you possess in Buy Low, Sell High. ",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Master Negotiator")],
                5),
            new TalentModel(
                "Diplomacy",
                "You are skilled at negotiating with rivals and potential allies, cementing treaties and trade deals that enrich and protect your settlement or stronghold. When making a Persuade test to negotiate directly with another settlement, stronghold, or state, you may roll one bonus d20 for each rank you possess in Diplomacy. ",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Force of Presence")],
                3),
            new TalentModel(
                "Enemy of My Enemy",
                "Positive relations with your neighbors or fostering negative relations between your neighbors and your enemies, pays off when you must march to war. During the Rally Troops stage of any siege, you gain 1 extra unit of troops for every neighboring settlement or stronghold with whom you have friendly relations, to a maximum number of troops units equal to your ranks in Enemy of My Enemy. These troops are Conscripts (see Rally Troops on “Rallying Troops” on page 104) under normal circumstances, but a canny negotiator with the right successful tests might have some of them upgraded to Troops.",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Diplomacy")],
                5),
            new TalentModel(
                "Master Negotiator",
                "Years of practice and training coupled with a natural gift have made you an unparalleled orator, negotiator, and haggler. Any time you gain Momentum on a Persuade test to negotiate with the leaders of another settlement or stronghold, you gain 1 extra Momentum per rank in Master Negotiator. ",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Diplomacy")],
                3),
        ],
        [Skill.Ranged_Weapons]: [
            new TalentModel(
                "Accurate",
                "When making an attack with a ranged weapon, you may re-roll a number of damage dice equal to the number of Ranged Weapon talents (and ranks in those talents) you have acquired. You must accept the result of these re-rolls.",
                [new ExpertisePrerequisite(Skill.Ranged_Weapons, 1)],
                1),
            new TalentModel(
                "Blot Out the Sun",
                "When you target a mob or gang with a ranged attack, the Secondary Target Momentum spend deals full damage to each additional target, rather than half damage.",
                [new TalentPrerequisite("Hail of Arrows")],
                1),
            new TalentModel(
                "Hail of Arrows",
                "When you attempt a ranged attack with a weapon with the Volley quality, you can spend 1 Load to use the Secondary Target Momentum spend for 1 Momentum (repeatable).",
                [new TalentPrerequisite("Quick Release")],
                1),
            new TalentModel(
                "Marksman",
                "You have learned to perform ranged attacks with great precision. You may spend a Minor Action before attempting a ranged attack, putting a little more time and effort into your attack. When you do this, you gain 1 additional Momentum to use for the attack.",
                [new TalentPrerequisite("Accurate")],
                1),
            new TalentModel(
                "Quick Release",
                "You are able to ready a shot almost as soon as you’ve loosed the previous one. When using a ranged weapon with the Volley quality, you may spend a Minor Action to increase your rate of attack, allowing you to spend two Loads, gaining a bonus d20 and +1[CD] damage for each Load spent.",
                [new TalentPrerequisite("Accurate"), new ExpertisePrerequisite(Skill.Ranged_Weapons, 2)],
                1),
            new TalentModel(
                "Shoot for the Horizon",
                "You have learned to take shots at any range compensating instinctively for variations in weapon manufacturing, weather conditions, and other anomalies that could affect the trajectory of an attack. You can reduce the penalty for firing at a range other than the weapon’s optimal range by one step, to a minimum of 0.",
                [new TalentPrerequisite("Accurate")],
                1),
            new TalentModel(
                "Trick Shot",
                "You are an extremely precise shot. You gain one bonus Momentum on ranged attacks, though these may not be used to increase the attack’s damage and may not be saved in the group pool.",
                [new TalentPrerequisite("Shoot for the Horizon"), new FocusPrerequisite(Skill.Ranged_Weapons, 3)],
                1),
            new TalentModel(
                "Bossonian Archer",
                "You’ve been trained with the Bossonian bow since childhood, and the muscles and even bones of your frame are shaped by the rigors of its use. When using a Bossonian bow, add the Fearsome Quality to your attacks. Conversely, any other type of bow feels wrong to you, and when using such a bow your Difficulty is increased by one step.",
                [new HomelandPrerequisite(1), new TalentPrerequisite("Marksman"), new ExpertisePrerequisite(Skill.Ranged_Weapons, 1), new SourcePrerequisite(Source.Scout)],
                1),
            new TalentModel(
                "Quiver-full",
                "You’ve always been careful where you place your shots, and lucky even when you miss. Instead of performing a test to recover spent Loads of ranged ammunition — whether arrows, quarrels, sling bullets, etc. — you regain 1 Load per rank automatically. However, a Complication on the attack roll when using the attack means 1 Load is gone and cannot be recovered. Two Complications means that a Load has perhaps struck some unintended target, or an arrow has fallen into the hands of a potential enemy, identifying your handiwork.",
                [new TalentPrerequisite("Accurate"), new SourcePrerequisite(Source.Scout)],
                3),
            new TalentModel(
                "Woodland Archer",
                "When using a ranged weapon in a forest, swamp, or other environment densely filled with trees, leaves, and other growth, you may ignore one level of Difficulty imposed by obstructed vision per rank of this talent, to a minimum difficulty of Average (D1).",
                [new TalentPrerequisite("Marksman"), new ExpertisePrerequisite(Skill.Ranged_Weapons, 3), new SourcePrerequisite(Source.Scout)],
                3),
        ],
        [Skill.Resistance]: [
            new TalentModel(
                "Hardy",
                "When making a Resistance test, you may re-roll any dice that did not generate a success on the initial roll, but you must accept the new result.",
                [new ExpertisePrerequisite(Skill.Resistance, 1)],
                1),
            new TalentModel(
                "Impervious",
                "You have been injured before, and have faced something more grievous than what just happened to you. When you suffer a Wound, you may pay 1 Fortune point to ignore that Wound entirely.",
                [new TalentPrerequisite("Just a Scratch"), new ExpertisePrerequisite(Skill.Resistance, 2)],
                1),
            new TalentModel(
                "Indefatigable",
                "You are tireless, able to press on when others would falter. Whenever you would suffer Fatigue, you may ignore it by adding a number of points to Doom equal to the Fatigue suffered.",
                [new TalentPrerequisite("Hardy"), new ExpertisePrerequisite(Skill.Resistance, 1)], // TODO: resistance req is same as Hardy
                1),
            new TalentModel(
                "Iron-skinned",
                "You are so used to taking injuries that it now takes an impressive amount of damage to actually hurt you. You increase your Armor Soak on all locations by 1, and you still benefit from this Armor Soak if you are not wearing armor on that location (even if the armor was sacrificed).",
                [new TalentPrerequisite("Impervious")],
                1),
            new TalentModel(
                "Just a Scratch",
                "You have a knack for shrugging off injuries that would fell a lesser mortal. The amount of physical damage needed to inflict a Wound is increased by 1 per rank of Just a Scratch. For example, if you have Just a Scratch 1, you will suffer a Wound if 6 or more points of damage are inflicted, rather than the normal total of 5 or more.",
                [new TalentPrerequisite("Hardy")],
                2),
            new TalentModel(
                "Resilient",
                "Your physique is particularly sturdy and resilient. Whenever you suffer a condition that may be avoided by adding to Doom, you can reduce the amount of Doom you need to pay by your rank in Resilient, to a minimum of 0.",
                [new TalentPrerequisite("Stubborn as a Mule")],
                3),
            new TalentModel(
                "Stubborn as a Mule",
                "You have gone through grievous injuries and survived truly epic quantities of ale and mead. You have learned how to face down the seemingly insurmountable, and rely on your physical stamina to do so. When already suffering from an injury, you may substitute your Resistance skill for Discipline, if desired.",
                [new TalentPrerequisite("Hardy")],
                1),
            new TalentModel(
                "Strength from the Sea",
                "You’re used to being on a ship in the roughest of weather. You never get seasick and you can ignore any additional levels of Difficulty from stormy weather or rough seas, save for the roughest of hurricanes or maelstroms.",
                [new TalentPrerequisite("Hardy"), new SourcePrerequisite(Source.Pirate)],
                1),
        ],
        [Skill.Sailing]: [
            new TalentModel(
                "Alone at Sea",
                "When a ship is damaged on the water, it is often unable to reach a port where repairs can be made, requiring a temporary solution. You are familiar with the methods of repairing a ship in the short-term so that it can survive long enough to undergo proper repairs. You may substitute your Sailing skill for Craft when attempting repairs on watercraft. However, those repairs will only last for a scene, plus an additional Scene per Momentum (Repeatable), before proper repairs are required.",
                [new TalentPrerequisite("Sea Legs")],
                1),
            new TalentModel(
                "Catch the Wind",
                "You know the nuances of sailing, and can guide a vessel safely through difficult and dangerous situations. Decrease the Difficulty for any Sailing tests by one step per rank of Catch the Wind when you are piloting.",
                [new TalentPrerequisite("Navigation"), new ExpertisePrerequisite(Skill.Sailing, 2)],
                1),
            new TalentModel(
                "Navigation",
                "You have learned to navigate watercraft through the many hazards of the sea. You may ignore any penalties to the Difficulty of a Sailing test incurred by situational hazards, including harsh weather, magical impediments, and similar dangers.",
                [new TalentPrerequisite("Sailor")],
                1),
            new TalentModel(
                "Old Salt",
                "You are a veteran ship-hand: you’ve weathered storms, survived pirates, and struggled through the foulest misfortune. Through all of it, you’ve learned to trust your own skills and those of your shipmates, and learned to spot the wide range of expertise available on a ship’s crew. While onboard a ship with a reasonably-sized crew, you may add 1 to Doom in order to substitute your Sailing skill for any skill, except for Alchemy or Sorcery.",
                [new TalentPrerequisite("Alone at Sea"), new ExpertisePrerequisite(Skill.Sailing, 2)],
                1),
            new TalentModel(
                "Sailor",
                "You are an experienced sailor, accustomed to river, sea, or ocean. You may re-roll one d20 when making a Sailing test, but you must accept the new result.",
                [new ExpertisePrerequisite(Skill.Sailing, 1)],
                1),
            new TalentModel(
                "Sea Legs",
                "You have been at sea for a long time, and are more-than-familiar with the swaying and shifting of the deck, so much so that you may even be a little out of sorts when on dry land. You no longer suffer any penalties caused by the random motion of being aboard a ship when taking any test. Additionally, you may substitute Sailing for Acrobatics, Athletics, or Resistance while onboard a ship or when using a rope.",
                [new TalentPrerequisite("Sailor")],
                1),
            new TalentModel(
                "Seafarer",
                "You are a reputable sailor with a name known in many ports. You can add 1 to Doom in any port to find someone who will vouch for you, including ports you have not yet travelled to. For the duration of the stay, this allows you to substitute Sailing for Society and grants a bonus d20 on any tests using Sailing in place of Society. If you are asked for a favor by another sailor at any time during your stay, you must grant it, or the effects of Seafarer can no longer be used for that stay.",
                [new TalentPrerequisite("Sailor")],
                1),
        ],
        [Skill.Siegecraft]: [
            new TalentModel(
                "Artillerist",
                "You have learned how best to operate siege weaponry. When making an attack with a siege weapon, you may re-roll a number of damage dice equal to the number of Warfare talents (and ranks in them) you have acquired. The results of these re-rolls must be accepted.",
                [new TalentPrerequisite("Strategist"), new ExpertisePrerequisite(Skill.Siegecraft, 1)],
                1),
            new TalentModel(
                "Ballistics",
                "You have experience firing large and inaccurate weapons over long distances, and have learned the techniques that make these weapons truly effective. For each rank of Ballistics, you can reduce the Difficulty of a Warfare test to attack with a siege weapon by one step, to a minimum of Average (D1). Each rank of Ballistics also increases the damage of a siege weapon used by +1[CD].",
                [new TalentPrerequisite("Artillerist")],
                3),
            new TalentModel(
                "Conqueror",
                "With this talent, you have learned how to bring your retinue (generated with the General talent, below) to bear with explosive force; any warrior in your retinue adds a bonus d20 to all Melee, Parry, Ranged Weapons, and Warfare tests. Warriors in your retinue no longer need to be within earshot to gain the benefit of your leadership. As with the General talent, this benefit does not apply to other player characters, even if they are under your control.",
                [new TalentPrerequisite("General"), new ExpertisePrerequisite(Skill.Siegecraft, 2)],
                1),
            new TalentModel(
                "Devastating Bombardment",
                "You have learned how to get the greatest effect from siege weaponry, using shots to shatter morale as well as masonry. After making a successful attack with a siege weapon, you may spend 2 points of Momentum to unleash a Devastating Bombardment. A Devastating Bombardment forces all creatures within Close range of the attack’s target to attempt an Average (D1) Discipline test or suffer mental damage equal to the attack’s damage rolled. Additionally, any Momentum spent to add damage to the Devastating Bombardment adds 2 points of damage rather than 1.",
                [new TalentPrerequisite("Ballistics"), new ExpertisePrerequisite(Skill.Siegecraft, 2)],
                1),
            new TalentModel(
                "General",
                "You have become particularly adept at coordinating the actions of soldiers. When leading an army or unit of warriors in battle you can substitute Warfare for Command, Counsel, or Persuade. In addition, you can create a retinue (warband, squad, etc.) of dedicated and highly-loyal warriors of a size equal in number to your Warfare Focus times your rank in this talent. For example, if you have General 2 and Warfare Focus 2, you can have up to four warriors in your retinue. The warriors in your retinue must be chosen prior to combat, must be dedicated followers who have trained with you, and must be within earshot to gain any benefits. This benefit does not apply to other player characters, even if they are under your control. These are considered to be Elite Minions, whereas normal soldiers or warriors are normal Minions.",
                [new TalentPrerequisite("Strategist")],
                3),
            new TalentModel(
                "Spotter",
                "You are familiar with discovering enemy positions and communicating this back to your leader. When assisting in setting up or seeking out an ambush, or when assisting an artillery crew as a spotter, you may add your Warfare dice pool rather than only a single d20.",
                [new TalentPrerequisite("Strategist")],
                1),
            new TalentModel(
                "Strategist",
                "You are an experienced soldier that has fought in significant battles, skilled in assaulting and defending buildings. When crossing an obstacle or hindering terrain, or while skirting a hazard, you gain the benefit of Light Cover (2[CD] Cover Soak) from any ranged weapon attack, including siege weapons.",
                [new ExpertisePrerequisite(Skill.Siegecraft, 1)],
                1),
            new TalentModel(
                "Skirmisher",
                "You can fight in a Squad with one other character and not lose your Reaction.",
                [new FocusPrerequisite(Skill.Siegecraft, 1), new SourcePrerequisite(Source.Mercenary)],
                1),
            new TalentModel(
                "Shieldwall",
                "You treat all shields as large shields so long as you are in a Squad with at least one other character with a shield.",
                [new TalentPrerequisite("Skirmisher"), new SourcePrerequisite(Source.Mercenary)],
                1),
        ],
        [Skill.Society]: [
            new TalentModel(
                "A Modicum of Comfort",
                "You have a legacy of wealth or substantial funds available to you, and can leverage old debts into sustaining you. Reduce your Upkeep by 1, to a minimum of 1.",
                [new ExpertisePrerequisite(Skill.Society, 1)],
                1),
            new TalentModel(
                "Ear of the King",
                "You know the best way to raise awareness of an issue with the proper authorities. When attempting to spread a message across a large group of people, or even a region, you can substitute your Society skill for Command. In addition, the Difficulty for all skill tests dealing with civic figures is reduced by one step, so a minimum of Simple (D0).",
                [new TalentRankPrerequisite("Wealthy", 3), new TalentRankPrerequisite("Reputation", 2)],
                1),
            new TalentModel(
                "Friends in the Maul",
                "Once you have lived in any place for any length of time you pick up a variety of hangers-on and informants. In any location where you have had downtime, you have at least one useful contact on tap. All skill tests made during downtime gain a d20 so long as the skill test does not involve combat of any kind.",
                [new TalentPrerequisite("Garrulous"), new ExpertisePrerequisite(Skill.Society, 2)],
                1),
            new TalentModel(
                "Garrulous",
                "You have an ever-expanding range of transitory contacts. Any time you need assistance from other individuals, you may reduce the Difficulty to find a contact by one step per rank of Garrulous.",
                [new TalentPrerequisite("A Modicum of Comfort")],
                3),
            new TalentModel(
                "Powerful Friends",
                "You know many powerful people in positions of significant authority. When selecting this talent, you gain a number of  Powerful Friends equal to your current Society Focus. You must specify the type and allegiance of each influential contact, but must also obtain the gamemaster’s approval for that selection. You may attempt a Daunting (D3) Society test to ask the selected contact for a favor. On a success, the contact responds with resources proportionate to their level of importance and the nature of the request. Any goods provided must be returned within a reasonable time limit: a period decided by the gamemaster but usually at the end of an adventure. You can attempt one such skill test during each period of downtime or in-play visit, taking a suitable amount of time to pleasantly broach the topic. Powerful Friends may be purchased multiple times, with each purchase establishing new contacts equal to your current Society Focus.",
                [new TalentPrerequisite("Friends in the Maul")],
                1),
            new TalentModel(
                "Reputation",
                "You have gained something of a reputation, and are often recognized by friends and foes alike. Each rank of Reputation increases your Renown by 1.",
                [new TalentPrerequisite("A Modicum of Comfort")],
                3),
            new TalentModel(
                "Wealthy",
                "You have squirreled away significant resources in longterm investments with multiple merchant families. Each rank of Wealthy grants 1 bonus Momentum for the express purpose of reducing the cost of any purchase, to a minimum of 1 Gold.",
                [new TalentPrerequisite("A Modicum of Comfort")],
                3),
        ],
        [Skill.Sorcery]: [
            new TalentModel(
                "Delver in the Dark",
                "You have paid attention to the votaries of Skelos and know many secrets about dark forgotten places. When exploring old ruins, you may substitute Sorcery for Insight, Lore, or Thievery. Additionally, you may add 2 to Doom in order to substitute Sorcery for Athletics.",
                [new TalentPrerequisite("True Understanding")],
                1),
            new TalentModel(
                "Demon Slayer",
                "You have learned how to most effectively harm and kill unnatural beings. When using the Witch Hunter talent, you can spend 1 Momentum to add Vicious 1 to your weapons (or increase the Vicious quality by 1 if your weapon already has the quality) against any sorcerers and unnatural entities present in the scene.",
                [new TalentPrerequisite("Witch Hunter")],
                1),
            new TalentModel(
                "Patron",
                "You have obtained a patron, who will teach you the arts of sorcery. You may now purchase the Sorcerer talent and can begin to learn spells.",
                [new WeedOfSorceryPrerequisite(1)],
                1),
            new TalentModel(
                "Protective Superstitions",
                "When involved in a Struggle to resist the effects of a spell, you gain one bonus Momentum per rank of Protective Superstitions.",
                [new TalentPrerequisite("True Understanding")],
                3),
            new TalentModel(
                "Reader of the Book of Skelos",
                "Your mind has been corrupted with detailed knowledge of places and deeds both foul and terrible. When using the Ritualist talent to assist another character, you may spend Momentum to buy bonus d20s to add to your roll for the teamwork test.",
                [new TalentPrerequisite("Ritualist")],
                1),
            new TalentModel(
                "Ritualist",
                "You are well-versed in the sorcerous arts, understanding enough to assist true masters with their work. When performing teamwork tests or rituals using the Sorcery skill, you can assist with 2d20 rather than the normal d20 teamwork provides.",
                [new TalentPrerequisite("True Understanding")],
                1),
            new TalentModel(
                "Sorcerer",
                "Your character’s eyes are open to the horrible realities of the cosmos. Gain 1 spell and reduce the character’s resolve permanently by 0+[CD]2.",
                [new TalentPrerequisite("Patron"), new WeedOfSorceryPrerequisite(2)],
                1),
            new TalentModel(
                "True Understanding",
                "You may pay 2 points of Resolve to gain 1 bonus Momentum on any Sorcery test other than tests to cast a spell. You may do this once per rank in this talent, paying up to 6 Resolve in this fashion.",
                [new ExpertisePrerequisite(Skill.Sorcery, 1)],
                3),
            new TalentModel(
                "Witch Hunter",
                "You have turned your knowledge of the unnatural to the practical concern of saving your own life. In a combat where there is at least one sorcerer or unnatural creature on the opposing side, you may attempt a Daunting (D3) Sorcery test as a Standard Action. If successful, you gain 1[CD] extra Cover Soak against your foe’s attacks and powers. Momentum increases this Soak by +1[CD] (Repeatable).",
                [new TalentPrerequisite("Protective Superstitions"), new ExpertisePrerequisite(Skill.Sorcery, 2)],
                1),
            new TalentModel(
                "Barter Your Soul",
                "By entertaining the dark forces, your patron introduces you to your patron’s own fell lords. The rituals involved are harrowing and sanity-destroying, but ultimately rich in knowledge. Gain one spell. Reduce your character’s Resolve permanently by X+2[CD], where X is the total number of spells you will know once you gain an additional spell from this bargain. Barter Your Soul can be taken multiple times, representing multiple deals to supernatural entities, selling your soul piecemeal, or selling fealty in the afterlife in terms of millennia of servitude.",
                [new TalentPrerequisite("Pact")],
                10),
            new TalentModel(
                "Curse",
                "You must permanently sacrifice 1 Fortune point to house a spell within a living creature, usually to inflict some negative effect or condition upon the desired subject of the spell. The resource cost for doing this is twenty times that of a regular petty enchantment. You must have a trigger that will activate the spell’s effects, which may cost additional Momentum. The amount of Momentum should be determined by the gamemaster based on how subjective or narrow the focus of the trigger is. The more specific, the more expensive the Momentum cost should be, and the more general and outside human intervention, the less expensive the spell will be. For example, “When the moon turns full” is specific but is general and predictable, with no human intervention whatsoever, so it would cost no extra Momentum. A trigger such as “When the name Aktur Ashmal is spoken” would be an easily controllable event, and could cost as much as 3 additional Momentum. Once the curse’s effects are complete or have otherwise passed, the spell is done.",
                [new TalentPrerequisite("Barter Your Soul"), new TalentPrerequisite("Everlasting Sorcery")],
                1),
            new TalentModel(
                "Enchanter",
                "You have learned to bind spells into treasures. Every success or Momentum stored requires one offering and a single “named” treasure of value equal to the total Momentum of the spell. These offerings can be any item of portable wealth such as jewels, golden statuettes, or similarly valuable objects.Weapons, armor, and the like are never counted as offerings, but adornments on such items can be added to them to fulfill this function. The named treasure must be something of relative fame and uniqueness, with a specific name (or names) it is known by, and might even be considered an item of legendry, coveted by many. Preparing this spell is a Minor Action, needing only a rudimentary understanding of sorcery (Sorcery Expertise 1). The spell is otherwise a normal spell, and the treasure becomes non-magical once the spell is cast. Discovering whether an item or person has been enchanted is a Challenging (D2) Sorcery test for a character with this talent. This Difficulty is increased to Dire (D4) for those who do not have this talent.",
                [new TalentPrerequisite("Enduring")],
                1),
            new TalentModel(
                "Enduring",
                "By tying your character’s spells to the ephemera of the mortal world, you have begun learning how to give them breath. With this talent, all of your spells and petty enchantments gain 1 extra Momentum to be used solely for the spell’s duration.",
                [new TalentPrerequisite("Sorcerer")],
                3),
            new TalentModel(
                "Everlasting Sorcery",
                "You must permanently sacrifice 1 Fortune point in order to house a spell within an inanimate vessel. The cost for doing this is ten times that a regular enchantment in both offerings and treasure. Preparing the spell is a Minor Action, needing only a rudimentary understanding of sorcery (Sorcery Expertise 1). Once invoked, the spell uses its Momentum as decided by the caster preparing the vessel. The spell can be invoked once per scene, although there is no limit to the number of spells a vessel might contain, assuming you have made the requisite Fortune point sacrifices.",
                [new TalentPrerequisite("Enchanter")],
                1),
            new TalentModel(
                "Life Eternal",
                "You may petition the scribes of your dark masters, beseeching them to disregard your mortal form, sparing you the chastisement of time and the degradation of the self and soul. You will not die, no matter how old you get or how many injuries you suffer.These hurts will affect you, however. You will feel them just as much, and they will heal as normal. If your body is completely destroyed, you will be an insensate, unmoving, unending presence, a fate only spared to you if you have the Astral Wanderings spell. It is rumored that some have bargained for eternal youth as well, drinking life deeply from victims ensnared in dark rituals. For some sorcerers, seeking out the means of learning this talent is the sole ambition of their enfeebled immortality.",
                [new TalentPrerequisite("Barter Your Soul")],
                1),
            new TalentModel(
                "Pact",
                "Your character selects a second patron. This is a permanent addition, a new master that must be kept appeased. In return for such appeasement, the patron teaches you one spell or petty enchantment. The second patron can be the same as your first patron, in which case you have a redoubled pact, but this patron cannot be used more than twice. After the second rank with a particular patron, there is little else you can offer that patron, and thus you must seek another if you wish to learn additional ranks in this talent.",
                [new TalentPrerequisite("Sorcerer")],
                2),
            new TalentModel(
                "The Eternal Chain",
                "The Eternal Chain talent allows the sorcerer to cast any spell they possess on a target that is not within eyesight. The sorcerer must have a lock of hair, tooth, vial of blood, or similar representation of the victim to cast the spell, but, once this is obtained, the sorcerer can cast spells on the target as if the target were within reach. Using The Eternal Chain to target a spell normally increases the Difficulty of casting the spell by one step. This increases to two steps should the target take refuge within a Circle. When a second rank is taken, the Difficulty of casting the spell no longer increases, save on targets inside of Circles.",
                [new VariableTalentPrerequisite("Sorcerer", "Necromancer"), new SourcePrerequisite(Source.Skelos)],
                2),
            new TalentModel(
                "Vital Essence",
                "Vital essence allows the sorcerer to drain the life force of a character in a manner equivalent to human sacrifice. This essence can be stored within the sorcerer and allows the sorcerer to retain their youth. Additionally, the essence may provide Momentum to any spell cast instead. If a human sacrifice is made near the sorcerer, the sorcerer can take some of the loose power and restock their hoard. The sorcerer takes and houses Momentum equal to the number of times they have taken the Vital Essence talent, but the sorcerer can’t leave the sacrifice with more essence than the rite produced.",
                [new TalentPrerequisite("Life Eternal"), new SourcePrerequisite(Source.Skelos)],
                2),
            new TalentModel(
                "Necromancer",
                "A necromancer is a sorcerer that has abandoned or just never learned the practices necessary to contain the corrupting elements of sorcery. They count as if possessing the Sorcerer talent, but instead of picking any spell, must choose between the spell Raise Up the Dead or the Skinwalker talent.",
                [new TalentPrerequisite("Patron"), new SourcePrerequisite(Source.Skelos)],
                1),
            new TalentModel(
                "Skinwalker: Eyes",
                "A skinwalker engages in symbolic cannibalism and the theft of specific body parts to act as ritual components. Every time the Skinwalker talent is used, a ritual component is either worn or eaten. If eaten, no test is required, but the item is used up permanently. If worn, a Daunting (D3) Sorcery test must be passed, or it will rot into uselessness. This counts as if the sorcerer was casting a spell. A skinwalker can only carry their sorcery focus in one body part at any one time. Any additional components will rot away when claimed. Eyes can be used as offerings to empower spells.",
                [new TalentPrerequisite("Necromancer"), new UniqueTalentPrerequisite("Skinwalker"), new SourcePrerequisite(Source.Skelos)],
                1),
            new TalentModel(
                "Skinwalker: Heart",
                "A skinwalker engages in symbolic cannibalism and the theft of specific body parts to act as ritual components. Every time the Skinwalker talent is used, a ritual component is either worn or eaten. If eaten, no test is required, but the item is used up permanently. If worn, a Daunting (D3) Sorcery test must be passed, or it will rot into uselessness. This counts as if the sorcerer was casting a spell. A skinwalker can only carry their sorcery focus in one body part at any one time. Any additional components will rot away when claimed. A heart can be used to gain the victim's Brawn.",
                [new TalentPrerequisite("Necromancer"), new UniqueTalentPrerequisite("Skinwalker"), new SourcePrerequisite(Source.Skelos)],
                1),
            new TalentModel(
                "Skinwalker: Hand",
                "A skinwalker engages in symbolic cannibalism and the theft of specific body parts to act as ritual components. Every time the Skinwalker talent is used, a ritual component is either worn or eaten. If eaten, no test is required, but the item is used up permanently. If worn, a Daunting (D3) Sorcery test must be passed, or it will rot into uselessness. This counts as if the sorcerer was casting a spell. A skinwalker can only carry their sorcery focus in one body part at any one time. Any additional components will rot away when claimed. A hand can be used to gain the victim's dominant skill.",
                [new TalentPrerequisite("Necromancer"), new UniqueTalentPrerequisite("Skinwalker"), new SourcePrerequisite(Source.Skelos)],
                1),
            new TalentModel(
                "Skinwalker: Face",
                "A skinwalker engages in symbolic cannibalism and the theft of specific body parts to act as ritual components. Every time the Skinwalker talent is used, a ritual component is either worn or eaten. If eaten, no test is required, but the item is used up permanently. If worn, a Daunting (D3) Sorcery test must be passed, or it will rot into uselessness. This counts as if the sorcerer was casting a spell. A skinwalker can only carry their sorcery focus in one body part at any one time. Any additional components will rot away when claimed. A face can be used to gain the visage of the victim.",
                [new TalentPrerequisite("Necromancer"), new UniqueTalentPrerequisite("Skinwalker"), new SourcePrerequisite(Source.Skelos)],
                1),
            new TalentModel(
                "Skinwalker: Tongue and Ears",
                "A skinwalker engages in symbolic cannibalism and the theft of specific body parts to act as ritual components. Every time the Skinwalker talent is used, a ritual component is either worn or eaten. If eaten, no test is required, but the item is used up permanently. If worn, a Daunting (D3) Sorcery test must be passed, or it will rot into uselessness. This counts as if the sorcerer was casting a spell. A skinwalker can only carry their sorcery focus in one body part at any one time. Any additional components will rot away when claimed. The tongue and ears can be used to speak a language known by the victim, or to cast a spells they knew.",
                [new TalentPrerequisite("Necromancer"), new UniqueTalentPrerequisite("Skinwalker"), new SourcePrerequisite(Source.Skelos)],
                1),
            new TalentModel(
                "Counsel the Dead",
                "Necromancers find learning spells incredibly easy and, by calling on the dead to advise them, can attempt sorcerous eats far beyond those of lesser practitioners. The dead must be bribed, and they tell as many false tales as true, making these feats expensive to achieve A necromancer casting a spell they haven’t learned through other means must increase the Difficulty of that spell by two steps and pay three times the regular casting cost. Also, when using offerings to gain additional dice, the necromancer only gets 1d20 for every three offerings used.",
                [new TalentPrerequisite("Necromancer"), new SourcePrerequisite(Source.Skelos)],
                1),
            new TalentModel(
                "Corruption",
                "Necromancers find that over time their bodies are racked with malformations, making them sturdier if less appealing. At any point, a necromancer with the Corruption talent can spend 1 Fortune point to gain 4 successes on a Sorcery skill test. Once the test is complete, the corruption begins to manifest. Roll or select a malformation from the table on page 74 in the Book of Skelos. After a day of slow change, the malformation begins to manifest, causing the effects noted.",
                [new TalentPrerequisite("Necromancer"), new SourcePrerequisite(Source.Skelos)],
                1),
            new TalentModel(
                "Beyond Madness and Sanity",
                "The necromancer is now beyond traditional ideas of sanity. They may regain any Resolve lost to the learning of spells. The process for regaining this Resolve is utterly debased, and requires the necromancer to seek out that which would drive others mad. It costs the necromancer 200 experience points for every point of Resolve regained by this process. Mere sorcerers can, with the gamemaster’s permission, also learn this talent, but each point of Resolve costs 250 experience points to regain.",
                [new TalentPrerequisite("Barter Your Soul"), new TalentPrerequisite("Iron Will"), new TalentPrerequisite("Jaded"), new VariableTalentPrerequisite("Necromancer", "Sorcerer"), new SourcePrerequisite(Source.Skelos)],
                1),
            new TalentModel(
                "Unaging",
                "The immortal necromancer, by engaging in unspeakable rites, separates their mind from their frame and, in the ritual murder of their body, preserves it against the tortures of aging. The first rank teaches the necromancer the poison known as the sleep of death. By imbibing this venom, the necromancer can sleep away the eons preserved for antiquity or simply avoid aging as the night passes. The second rank teaches further preparations which allow the necromancer to cease aging entirely and retain their current age for all eternity. The third rank returns the necromancer to a more youthful state. This talent does nothing to remove the scars the world inflicts and, after a few centuries, the mask of youth becomes a map of minor mutilations leaving the necromancer looking for even greater magic to hide the passage of time.",
                [new TalentPrerequisite("Life Eternal"), new SourcePrerequisite(Source.Skelos)],
                3),
            new TalentModel(
                "Mesmerist",
                "This talent, taught by a Patron either from the East or trained there, allows the mesmerist to use the Sorcery skill when attempting to place an intended subject into a mesmeric trance (described above). Once the subject is in this mesmeric trance, the talent grants the mesmerist 1 point of bonus Momentum per rank of the talent for use on the mesmerism. Once the subject is in a mesmeric trance, the mesmerist can use the Sorcery skill in place of a Personality skill (such as Command or Persuade) to suggest a specific course of action, inaction, or other condition from the mesmerist techniques described on page 84 in the Book of Skelos.",
                [new TalentPrerequisite("Patron"), new ExpertisePrerequisite(Skill.Discipline, 2), new SourcePrerequisite(Source.Skelos)],
                3),
            new TalentModel(
                "Master of the Mind",
                "The mesmerist excels in the mesmeric arts, delving deeply into this esoteric practice to a degree unimaginable to the uninitiated. The Master of the Mind is a force to be reckoned with, achieving a profound understanding of the human psyche and behavior, able to exert this extraordinary mentalism upon even the most unwilling subjects. In addition to putting subjects in a mesmeric trance, the Master of the Mind gains an additional die of Momentum per rank when using any Personality skills or the Sorcery skill to perform acts of mesmerism, and can re-roll one effect die per rank of the talent when using mesmerism. Furthermore, the Master of the Mind grants a discount of 1 Momentum per rank when casting the Enslave sorcery spell.",
                [new TalentPrerequisite("Mesmerist"), new FocusPrerequisite(Skill.Discipline, 4), new AttributePrerequisite(Attribute.Willpower, 11), new SourcePrerequisite(Source.Skelos)],
                3),
        ],
        [Skill.Stealth]: [
            new TalentModel(
                "Assassin",
                "You are practiced in the art of murder, and taking lives no longer carries any emotional weight. When rolling damage with a melee weapon that has the Hidden quality, you may spend 2 points of Momentum in order to count every dice in the pool as an Effect, instead of whatever was actually rolled. Additionally, you gain +2[CD] Courage Soak.",
                [new TalentPrerequisite("Death Dealer")],
                1),
            new TalentModel(
                "Camouflage",
                "It is important for you to remain concealed, but at times it is also important that your allies and any equipment they may be using also go unseen. You can apply your Stealth skill result to a number of other creatures or large objects equal to your Stealth Focus plus your ranks in Camouflage.",
                [new TalentPrerequisite("Living Shadow"), new ExpertisePrerequisite(Skill.Stealth, 2)],
                3),
            new TalentModel(
                "Death Dealer",
                "You are a proficient killer, relying on trickery and misdirection. When armed with any weapon that has the Hidden quality, you may substitute Stealth for your Melee and Ranged Weapons skills, and increase the damage of the weapon by +1[CD].",
                [new TalentPrerequisite("Many Blades")],
                1),
            new TalentModel(
                "Living Shadow",
                "You are adept at using terrain effects and social cues to remain unnoticed by observers. When attempting to remain unseen or unnoticed, you gain bonus Momentum equal to the number of your rank in Living Shadow.",
                [new ExpertisePrerequisite(Skill.Stealth, 1)],
                3),
            new TalentModel(
                "Many Blades",
                "You always carry at least a dagger concealed somewhere. Even if you lose all your weaponry, you can add 1 to Doom and produce a concealed dagger as a Minor Action.",
                [new TalentPrerequisite("Living Shadow")],
                1),
            new TalentModel(
                "Master of Disguise",
                "You know how to impersonate others, whether to blend into the background or to appear as a specific person. When you succeed at a Stealth test to create a disguise, you gain bonus Momentum equal to the amount of Momentum generated on that test (in essence, every point of Momentum generated by the test is doubled). In addition to this, if the disguise is to impersonate another, you may substitute your Stealth skill for Persuade or Command.",
                [new TalentPrerequisite("Living Shadow")],
                1),
            new TalentModel(
                "Obscure Trail",
                "You know a variety of tricks to make it substantially harder for someone to follow you. When you suspect (or fear) that you might be followed, you may make an Average (D1) Stealth test. The Difficulty for any pursuer’s test to follow you is increased by one step, plus an additional step for each Momentum spent (Repeatable).",
                [new TalentPrerequisite("Camouflage")],
                1),
            new TalentModel(
                "Perfect Ambush",
                "You have such mastery of stealth and subterfuge that you can perform an ambush with little-to-no preparation. When you perform an ambush, you can voluntarily make the ambush harder to pull off, and in doing so make it almost impossible to detect. When you attempt an ambush or surprise, you may increase the Difficulty of your Stealth test by one or two steps. The Difficulty of the enemy’s Observation test to spot the ambush increases by two steps for every step of increase you accepted.",
                [new TalentPrerequisite("Master of Disguise")],
                1),
            new TalentModel(
                "At One with the Wild",
                "You are preternaturally adept at moving through natural environments quickly and quietly, and creating minimal evidence of your passage. When making a successful Stealth test in a forest, swamp, or jungle environment, you earn 1 additional point of Momentum. Additionally, you can spend any additional points of Momentum earned on this roll to move more swiftly through the environment.",
                [new TalentPrerequisite("Obscure Trail"), new SourcePrerequisite(Source.Scout)],
                1),
            new TalentModel(
                "Guide",
                "When on a hunt, you were inevitably the one who was sent ahead to scout, leading others with less woods-craft through the terrain. Because of this experience, you’re especially good at leading others through such environments stealthily, minimizing the noise and traces of their passage.",
                [new TalentPrerequisite("Obscure Trail"), new ExpertisePrerequisite(Skill.Stealth, 3), new ExpertisePrerequisite(Skill.Survival, 3), new SourcePrerequisite(Source.Scout)],
                3),
            new TalentModel(
                "Silent Strider",
                "You’ve long since learned how to move quietly despite wearing armor. This talent lets you ignore the Difficulty penalty to Stealth while wearing armor with the Noisy Quality. This also extends to Very Heavy armor, which includes the Noisy Quality.",
                [new TalentPrerequisite("Living Shadow"), new FocusPrerequisite(Skill.Stealth, 3), new SourcePrerequisite(Source.Scout)],
                1),
        ],
        [Skill.Survival]: [
            new TalentModel(
                "Born Wild",
                "You can reduce the Difficulty of any Survival test to find food and shelter by one step, to a minimum of Simple (D0). Born Wild is factored into the difficulties of all Survival talents.",
                [new ExpertisePrerequisite(Skill.Survival, 1)],
                1),
            new TalentModel(
                "Hunter",
                "You have learned to anticipate the movements of prey. When making a Survival test to track a creature or group of creatures, you may spend 2 Momentum or add 2 to Doom to find a shortcut or other way of intercepting the creatures being tracked. You may also substitute Survival for Stealth when attempting to ambush creatures being tracked.",
                [new TalentPrerequisite("Tracker")],
                1),
            new TalentModel(
                "Living Off the Land",
                "You are particularly capable of finding the necessities of life. When attempting a Survival test to find food, water, or shelter, each point of Momentum spent (Repeatable) provides these necessities for two other creatures (allies, tame animals, etc.). If you are in your own homeland or some other territory you are extremely familiar with, the basic Difficulty of Survival tests to find food, water, and shelter is reduced to Simple (D0), and every point of Momentum spent (Repeatable) finds these necessities for three additional creatures, rather than two.",
                [new TalentPrerequisite("Born Wild")],
                1),
            new TalentModel(
                "Risks",
                "You are familiar with various environmental hazards presented by the wilderness. Choose one environment when this talent is purchased, and any time you travel within a particular kind of environment you may attempt an Average (D1) Survival test. On a success, you are able to avoid all implicit dangers, potentially avoiding dangerous encounters. Each point of Momentum may be spent to protect one of your allies from these same risks. Further ranks in this talent add new environment types. Possible environments are: Arctic, Coastal, Desert, Jungle, Mountain, Forest, Plains, Steppes, Subterranean, Urban, or another if permitted by the gamemaster.",
                [new TalentPrerequisite("Born Wild")],
                10),
            new TalentModel(
                "Remedies and Rewards",
                "You know various natural or traditional remedies for illness and sickness that can be found in the wild. When outside of the city, you may substitute your Survival skill for Healing or Alchemy. Additionally, when travelling through the wilderness, you may make a Challenging (D2) Survival test once per journey. Each point of Momentum achieved provides 1 poultice for use in treating wounds.",
                [new TalentPrerequisite("Risks"), new ExpertisePrerequisite(Skill.Survival, 2)],
                1),
            new TalentModel(
                "Tracker",
                "You can recognize all the signs of passage, from the subtle to the obvious, and have become particularly adept at following a target. When attempting a Survival test to track a creature or group of creatures, you may reduce the Difficulty of the test by one step for every rank of Tracker.",
                [new TalentPrerequisite("Born Wild")],
                3),
            new TalentModel(
                "Lodestone",
                "You have a knack for navigation, and know the skies well enough to navigate day or night without difficulty. If the constellations are visible to you, you gain one free use of the Obtain Information Momentum spend when using the Survival skill to attempt to chart a course or to find your bearings. The information from the Momentum spend must relate to your current location and a potential path from there to another destination.",
                [new SourcePrerequisite(Source.Pirate)],
                1),
            new TalentModel(
                "Explorer",
                "Fascinated by the natural world and dedicated to seeing it depicted upon maps and portrayed accurately to fellow travelers, you can use and make maps, turning your physical exploration of a space into a depiction upon vellum, parchment, or some other medium. When you spend more than a day in a new environment exploring it, you may make an Average (D1) Lore test to transform your knowledge and experience into a usable map, which can be of potential value to others. For every point of Momentum you spend making the map, its accuracy reduces the Difficulty of any Survival tests by one step by someone using that map to navigate that area.",
                [new TalentPrerequisite("Born Wild"), new TalentPrerequisite("Scribe"), new SourcePrerequisite(Source.Scout)],
                1),
            new TalentModel(
                "Forest-runner",
                "You are sure-footed in the forest and in wilderness environments, capable of moving with rapid speed in the densest of underbrush or foliage. Whenever making any test to maneuver in any woods or forest environment, you reduce the Difficulty of any terrain tests by one step per rank in this talent. Additionally, you may reduce the Difficulty of any Stealth tests while running through the forest quietly at the same time, one step per rank.",
                [new TalentPrerequisite("Born Wild"), new SourcePrerequisite(Source.Scout)],
                1),
            new TalentModel(
                "Nature's Bounty",
                "The wilderness is not just a sanctuary, it is also a source of wealth. For every rank in this talent, you gain 1[CD] Gold worth of animal pelts, rare woods, precious plants, or whatever seems appropriate, when spending your downtime in the wilderness. These goods can be immediately disposed of once you are back in civilized territories or have access to a trading post.",
                [new TalentPrerequisite("Living Off the Land"), new SourcePrerequisite(Source.Scout)],
                1),
            new TalentModel(
                "Dowser",
                "A lifetime of living on meager water wherever you can find it has left you with a preternatural ability to find it even in the most arid places.When you roll at least 1 success on a test to gather Water resources, you gain 1 bonus Momentum for each rank you have in Dowser.",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Hardscrabble Senses")],
                3),
            new TalentModel(
                "Hardscrabble Senses",
                "You know how to quickly and accurately survey land to determine what is to be gained from it, and how easily. When entering a new hex, make a Simple (D0) Survival test. For each point of Momentum scored, you will know one of the following: what kinds of resources are present, how much of one specific type of resource is present.",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Born Wild")],
                3),
            new TalentModel(
                "Hunter and Gatherer",
                "Living off the land is second nature to you. You may have come from a people of wandering nomads, or lived rough and ready for too many years. Because of this, you gain 1 extra Momentum for each rank in Hunter and Gatherer you have, whenever you roll at least 1 success on a test to gather Forage.",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Hardscrabble Senses")],
                3),
            new TalentModel(
                "Master Woodsman",
                "You use every possible part of each gift the earth brings you, allowing you to construct tools and weapons from supplies so meager it amazes others. For each rank you have in Master Woodsman, reduce by 2 the amount of Forage needed to craft with Forage Ingredients. ",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Hunter and Gatherer")],
                3),
            new TalentModel(
                "Water Witch",
                "You can ration your drinking water, reuse gray water, and make the most of what others would think insufficient supplies. When crafting items requiring the water Ingredient, you use 1 fewer Water than normal for every rank you have in Water Witch, with a minimum of 1 Water. Further, you may go one day without water before incurring Fatigue, as you are able to glean a little extra moisture from your meager stores.",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Dowser")],
                3),
        ],
        [Skill.Thievery]: [
            new TalentModel(
                "Appraisal",
                "You have robbed many people, and over time learned the difference between valuable items and those that merely look valuable. You instinctively know the difference between real treasure and fake baubles and know to forgo lesser rewards for greater ones. When looking over valuable items to determine their worth and provenance, you may substitute Thievery for Insight or Lore. Further, when using the Easy Money talent, you may gain one additional Gold by adding 2 to Doom instead of 3, and you may use this benefit twice on any given criminal act.",
                [new TalentPrerequisite("Easy Money")],
                1),
            new TalentModel(
                "Burglar",
                "You have made a career of entering the towers, homes, and palaces of the wealthy. You’ve experienced tall walls, cunning traps, and strange locks, and have developed a broad range of different techniques to overcome them all. Any time you attempt to enter or leave a property with larceny in mind, you may add 1 to Doom in order to substitute Thievery for any other skill except Alchemy or Sorcery.",
                [new TalentPrerequisite("Walk In, Walk Out"), new FocusPrerequisite(Skill.Thievery, 2)],
                1),
            new TalentModel(
                "Easy Money",
                "You are particularly astute at recognising profitable opportunities such as picking pockets, short cons, and other minor crimes. You may substitute your Thievery skill for Observation on any tests that are related to committing a crime. In addition, whenever you steal or otherwise obtain money by illicit means, you may add 3 to Doom in order to gain 1 additional Gold from that particular crime (and only one additional Gold).",
                [new TalentPrerequisite("Thief")],
                1),
            new TalentModel(
                "Master Thief",
                "You may re-roll one d20 when making a Thievery test, but you must accept the new result.",
                [new TalentPrerequisite("Thief")],
                1),
            new TalentModel(
                "Thief",
                "After years of dealing with the criminal underworld, you have a basic familiarity of how to interact with this segment of the population. You may use Thievery in place of Society when dealing with criminals. When you generate at least one success on a Persuade or Lore test to relate to or interact with the criminal element, you may immediately roll one additional d20 and add the result to the skill test.",
                [new ExpertisePrerequisite(Skill.Thievery, 1)],
                1),
            new TalentModel(
                "Underworld Lore",
                "You have listened to your elders and know many tales of amazing scores and terrible calamities. When considering a theft of any sort, you may spend 1 Momentum (Immediate) to know the fate of the last thief who attempted a similar act, and any precautions the target is likely to have taken since. Additionally, whenever studying the activities, traditions, taboos, and histories of a region’s criminal underworld, you may substitute Thievery for Insight, Lore, or Observation.",
                [new TalentPrerequisite("Thief")],
                1),
            new TalentModel(
                "Walk In, Walk Out",
                "Committing a crime is easy: getting away with it is harder. Through practice, you have learned how to avoid notice by blending in with the crowd. You may substitute your Thievery skill for Stealth when attempting any criminal act.",
                [new TalentPrerequisite("Master Thief")],
                1),
            new TalentModel(
                "Jury Rigger",
                "A master thief works faster than lesser thieves and has developed shortcuts to getting the job done.With success on a Challenging (D2) Thieving test, you can work without thieves’ tools.You must substitute more common items in order to complete the task.",
                [new TalentPrerequisite("Journeyman"), new TalentPrerequisite("Master Thief"), new SourcePrerequisite(Source.Thief)],
                1),
            new TalentModel(
                "Smuggler",
                "Smugglers can modify existing objects and structures to hide contraband and leave no trace that a hiding place exists.When making a test in order to hide any small item upon your person (or, when hiding a Medium — or Largesized object onboard a wagon or a ship, for example), you automatically generate a number of successes equal to your Craft Skill Focus, to better avoid detection.",
                [new TalentPrerequisite("Master Thief"), new ExpertisePrerequisite(Skill.Craft, 1), new SourcePrerequisite(Source.Thief)],
                1),
            new TalentModel(
                "Picker of Locks",
                "Whenever you fail a Thievery test to pick a lock, you can choose instead to succeed — at a price.In order to automatically succeed, you can add Doom to the pool in an amount equal to 1+ the Difficulty of the test.",
                [new TalentPrerequisite("Master Thief"), new SourcePrerequisite(Source.Thief)],
                1),
        ],
        [Skill.None]: [
            // Homeland Talents
            new TalentModel(
                "Cosmopolitan",
                "Your homeland has many visitors and people dwelling within it, all with different customs and tongues. When speaking with a non-player character that also has the Cosmopolitan talent, it is assumed that you each possess enough of each other’s languages in common that you are considered fluent when speaking with one other.",
                [],
                1),
            new TalentModel(
                "Desert-born",
                "Your homeland is a vicious and arid one, harsh and indifferent to its inhabitants. When in the desert, the number of successes required for any Survival test you attempt is reduced by 1. This can even reduce tests to a Difficulty of Simple (D0), usually an automatic success. However, when attempting Survival tests in areas offering the Winter-born talent, you must achieve 1 additional level of success.",
                [],
                1),
            new TalentModel(
                "Gilded",
                "In a land where gold is commonplace, you have learned to spot those pretending to have wealth. In every scene, you can attempt to make a free Average D2 Thievery or Craft test to gain a general feel for the wealth of a particular non-player character, or even the relative worth of an environment.",
                [],
                1),
            new TalentModel(
                "Honest Corruption",
                "In a land of corrupt merchants and honest thieves, you have gained a sixth sense about those who are likely to betray you. When interacting with a non-player character for the first time, you can make a free Average D2 Thievery or Counsel test to gain a general feel for the trustworthiness of the non-player character.",
                [],
                1),
            new TalentModel(
                "Hunter",
                "You’ve lived with the wild as a constant neighbor, and know how to take from that environment what is necessary for survival. When in the rural parts of their homeland, the number of successes required for any Survival tests you attempt is reduced by 1, even if this reduces the Difficulty of the test to Simple (D0).",
                [],
                1),
            new TalentModel(
                "Of Saddle and Bow",
                "Hyrkanian riders are renowned for their facility while on horseback, with stories of these horse archers reaching far and wide. As one of these riders, you count as having the Hunter talent so long as you have a horse and bow ready for use. You can also reduce the Difficulty of any Animal Handling test by 1, even if this reduces the Difficulty of the test to Simple (D0).",
                [],
                1),
            new TalentModel(
                "Savage Court",
                "With civility being a new addition to your homeland, it is difficult to know when the old ways will rise to the surface. In any scene within your homeland, you can make a free Challenging D2 Lore test. Each point of Momentum gives you a general idea as to how easily it would be to overturn the civility of the moment and cause savage old emotions to rule the day.",
                [],
                1),
            new TalentModel(
                "Sea Raider",
                "The Difficulty of all Sailing tests made in your homeland's waters are reduced by 1. This can reduce tests to a Difficulty of Simple (D0). Additionally, the Difficulties of any Athletics tests relating to swimming are similarly reduced.",
                [],
                1),
            new TalentModel(
                "Strife",
                "With fractious nobles and near constant civil war, it pays to be attentive. Each day when in your homeland, you can make a free Simple (D0) Lore test. Each point of Momentum gives you a general idea as to whether there will be a major disturbance that day. While matters can take a turn at any point (and this doesn’t account for the actions of you or your allies) this test should provide accurate — if nonspecific — information about the general feel of the region.",
                [],
                1),
            new TalentModel(
                "Winter-born",
                "Born in a place of deep winter and intense cold, often spanning the entire year, you are accustomed to frigid climes. When in wintry environments, the number of successes required for any Survival test you attempt is reduced by 1. This can even reduce tests to a Difficulty of Simple (D0). However, you must achieve 1 additional level of success when attempting Survival tests in areas offering the Desert-born talent.",
                [],
                1),
            new TalentModel(
                "Decadent",
                "Your homeland may not be as ancient as others in this age, but its wealth and resources have enabled its citizens to thrive for so long that their interests become focused on pleasure and aesthetics more than sustenance. They have not known hardship in decades, and debauchery is commonplace. When in your homeland, your Upkeep costs are increased by 2CD, but for every effect rolled you automatically recover 1 additional Wound or Trauma (your choice), free of charge, up to your total.",
                [],
                1),
            new TalentModel(
                "Faded Glory",
                "Millennia of affluence, corruption, and ennui in your homeland has bred an entire civilization inured to the pleasures of the flesh and mind. No debauchery is too much for the people of your land, nor is any excess new or shocking. When you make a test to resist, enjoy, or employ some form of decadence, you can voluntarily fail the test but do not pay 1 Doom to the gamemaster.",
                [],
                1),
            new TalentModel(
                "Pastoral",
                "Decades or centuries of relative peace have left the people of your homeland optimistic and full of joy, even when faced with deep adversity. Once per play session, you may think back on happier times and take a Recover Action as a Minor Action, restoring Resolve only.",
                [],
                1),
            new TalentModel(
                "Primitive",
                "Though the Seven Empires are ancient, your homeland is remote and slow to rise. Many of the touchstones of civilization — architecture, society, religion, craftsmanship — are woefully behind those of its rivals. Your connection to the wild is more profound, however. You may reduce the Difficulty of an Animal Handling or Survival test by one step by paying 1 Doom.",
                [],
                1),
            new TalentModel(
                "Resplendent",
                "Your home kingdom is akin to a strutting peacock, its arts and culture so refined and ostentatious that you stand apart from other lands. The quality of craftsmanship, clothing, and architecture in your homeland stands head-and-shoulders above those of others. Any equipment you begin with is worth an additional +1 Gold per item, and you may add an additional +1d20 when performing any Craft test.",
                [],
                1),
            new TalentModel(
                "Treacherous",
                "Your homeland, and its folk, are unfortunately known throughout the Seven Empires for their unreliability and dishonesty, and adages are common identifying you — perhaps unfairly — as being untrustworthy. Persuasion attempts against those from other homelands are increased by one step of Difficulty, but any successful Persuasion test results in 1 free point of Momentum. If the test is made over an issue of money, you receive an additional +1 Gold instead of this Momentum.",
                [],
                1),

            // Caste Talents
            new TalentModel(
                "Embittered",
                "You have long since given up fealty to your lord. You avoid taxes and play fast-and-loose with the law. Within the borders of your homeland, your Social Standing is 0, and your Renown is reduced by 2 (to a minimum of -2). If you draw the attention of the authorities for any reason, all Command, Persuade, and Society tests increase in Difficulty by two steps. Whenever you spend Gold to Cultivate Renown during Carousing, you must spend two additional Gold, which don’t contribute [CD] to the attempt.",
                [],
                1),
            new TalentModel(
                "Homesteader",
                "You’ll take the wide vistas of crops and fields over the cramped, stinking confines of a city any day. So long as you are in your homeland, you reduce the Difficulty of Survival tests by one. This may reduce tests to Simple (D0).",
                [],
                1),
            new TalentModel(
                "Priest",
                "You are an ordained priest in one of the land’s many cults. Wherever in a town or city your faith has a presence, you may spend time amidst the faithful before travelling again. When Carousing, if you do not have sufficient Gold to pay your Upkeep, you may turn to your order for support. If you do so, you are required to donate all remaining Gold you have. If you attempt to cheat your order out of any of the Gold they are owed, you are expelled from the order and lose access to this talent until restitution or some sort of penance has been made (at the gamemaster’s discretion).",
                [],
                1),
            new TalentModel(
                "Sentry",
                "You learned at a young age that the watchful eye subsists on little rest. So long as you have had a total of four hours of sleep within the last two days (either one four-hour stretch or multiple short rests), you suffer no penalties for sleep deprivation when making Observation tests.",
                [],
                1),
            new TalentModel(
                "Sheltered",
                "You led a remarkably sheltered existence, buffered by family and servants against the rigors and dangers of the outside world. The prestige of your family means that you find many willing to pay for your room and board, so long as you are suitably grateful upon future visits. Whenever you enter a new town or city, you may seek out shelter from those willing to support you; these people pay your Upkeep.However, they are liable to ask for further compensation — either in Gold, or in the form of a favor — at some later juncture.",
                [],
                1),
            new TalentModel(
                "Subject",
                "You are a subject in good standing to a lord or king. While subject to their laws, the taxes you face are much less than the more expensive taxes others experience. Whenever you pay Upkeep within your homeland, you can reduce the amount of Gold the Upkeep costs by one.",
                [],
                1),
            new TalentModel(
                "Survivor",
                "Deprivation has been all-too-common in your life. When you are deprived of obvious sources of food and water, you reduce the Difficulty of Survival tests by one. This may reduce tests to Simple (D0).",
                [],
                1),
            new TalentModel(
                "Tradesman",
                "You have passed apprenticeship with a tradesman or within a guild. While your talent may be mediocre or worse, at least you have a fallback plan. When Carousing, if you do not have sufficient Gold to pay your Upkeep, you may offer your services to a tradesman or to a guild in order to cover your Upkeep. However, you may not take any other actions during that period of Carousing.",
                [],
                1),
            new TalentModel(
                "Vagabond",
                "The road is more home to you than any town or city ever has been. Whether a nomad by choice or necessity, you can reduce the Difficulty of Survival tests by one, so long as you are on a maintained road. This may reduce the Difficulty of tests to Simple (D0).",
                [],
                1),
            new TalentModel(
                "Exiled",
                "Some past crime, oath-breaking, or disagreement sent your family into exile, and you can never return or hold a place in the society that is your own. You must spend 2 additional Gold when Carousing within your homeland, but for all other purposes your Social Standing is treated as if it were 2 higher in the Carousing phase.",
                [],
                1),
            new TalentModel(
                "Respectable",
                "Though you are not particularly wealthy and have no inherited title, your caste is nonetheless held in high regard. Within your community, you may reduce the difficulties of any Command, Counsel, Persuade, and Society tests by one step, and you may reduce the cost of Upkeep by 1 Gold in addition to any modifications from Renown or Social Standing.",
                [],
                1),
            new TalentModel(
                "Savage Dignity",
                "Despite your barbaric upbringing, you have a fierce sense of pride in yourself and your lineage. You cannot be dominated or cowed easily. You may roll an additional d20 for any test to resist being intimidated, persuaded, or impressed by a “civilized” person. This is usually a Discipline test, but can extend to Personality-based tests such as Command or Society.",
                [],
                1),
            new TalentModel(
                "Storyteller",
                "You’re able to perform particularly well, telling stories and sagas in a way that enlivens them and engrosses your audience, whether a single companion or a room full of drunken warriors. Whenever you’re using this talent, you can substitute your Lore skill for Society tests, and you may reduce your Upkeep by 1 Gold if you choose to entertain your host, if applicable.",
                [],
                1),
            new TalentModel(
                "Uncivilized",
                "You’re uncouth and lack civilized manners, and those of more civilized societies will think poorly of you upon first impression. As a result, you suffer one step of Difficulty in Social tests when dealing with people from more civilized countries. On the other hand, your Upkeep cost is reduced by 2 Gold, as you are accustomed to roughing it and making do with what you have.",
                [],
                1),
            new TalentModel(
                "Scrounger",
                "Having spent your life in the ranks of camp followers taught you how to survive. Yet, it is not the sort of survival that involves living off nature’s bounty, but rather the scrap that civilization leaves behind as the mercenary cavalry’s hooves stamp them flat as autumn leaves. You can find things to eat, use as tools, and trade where others see only junk. Treat this as the Living Off the Land talent, but only in places where the civilized exist or existed. This includes the mercenary company and the camp followers, or tross, as the mercenaries disdainfully call them.",
                [],
                1),
            new TalentModel(
                "Call of the Sea",
                "You have always looked to the sea as your destination, your home. You are more comfortable on the deck of a ship than on the streets of towns, and the great and limitless frontier is where you find yourself most at peace. As such, you have an intuitive understanding of the sea and the folk who travel upon it. You can re-roll any failed d20 for Insight or Command tests made against anyone with a naval or ocean-going background (at the gamemaster’s discretion).",
                [],
                1),
            new TalentModel(
                "Explorer",
                "Many ply the waves in search of blood or gold. Some seek adventure upon the waves. You, however, look to the ocean horizon as a place of possibility. You and your family are navigators, and have always sought to explore and chart the seas and expand the knowledge of your immediate coast. Whenever attempting an Observation, Sailing, or Survival test while in unfamiliar waters you can reduce the Difficulty by one step.",
                [],
                1),
            new TalentModel(
                "Fisher",
                "Some part of your youth was spent on a fishing boat, or diving for fish in the shallow waters near your home. When making Survival or Swim tests in or adjacent to the water, you may add an additional +1d20 to your rolls. Every point of Momentum on the Survival roll provides enough food to feed an additional person for one day.",
                [],
                1),
            new TalentModel(
                "Naval Discipline",
                "Whether part of a tradition as organized as the naval fleets of Argos, Zingara, Shem, or Stygia, or the corsairs of Kush and the Black Coast, your caste have traditionally served at sea, and view the sea as a battlefield. When at sea, you gain 2[CD] non-stackable Morale and Cover Soak when fighting alongside at least one other character with this talent that has not suffered any Wounds.",
                [],
                1),
            new TalentModel(
                "Reaver",
                "Your caste is known for piracy or raiding activities up and down the coast, against your own people, against neighboring countries, or everyone else. Your Reputation is increased by +1 when dealing with anyone with a nautical or pirate background, and you inflict an additional 1[CD] damage on Threaten attacks against anyone that has heard of you.",
                [],
                1),
            new TalentModel(
                "Salt for Blood",
                "Your family has had a long tradition of ocean-going and sailing, and you’ve grown up on the shore, spending as much of your time on or in the water as on land. Swimming tests are reduced by one step of Difficulty.",
                [],
                1),
            new TalentModel(
                "Sea-trader",
                "Due to your familiarity with the coastal trade routes, you’ve developed a network of friends and allies in the various port cities, and know your way around such environments. In coastal settlements, you gain the Tradesman talent. When engaging in trade, you gain an additional +1d20 when rolling for Persuade or Discipline tests to get the best deals.",
                [],
                1),
            new TalentModel(
                "Shipbuilder",
                "The craft of shipbuilding is zealously guarded by the members of your caste, whether they be the hereditary shipwrights of the Vanir; the guilds of Argos, Shem, or Zingara; or the Stygian sect devoted to such labor. You add +1d20 on any Craft test to repair or maintain a watercraft.",
                [],
                1),
            new TalentModel(
                "Wave-harvester",
                "Your family has always taken its wealth from the sea, whether in the form of fishing or diving for the sea’s bounty. When you attempt to dive for pearls, gather a harvest of saleable fish, etc. in familiar waters, you gain the Hunter and Tradesman talents.",
                [],
                1),
            new TalentModel(
                "Forager",
                "You’ve grown up in the wild and are accustomed to foraging for food and extracting whatever nutrition you can from meager grasses, tough weeds, and scraggly plants in your home region, and know their properties regarding health. When in the wild, you may make a Challenging (D2) Survival test to find healing herbs. Each Momentum yields 1 Reload for a healer’s bag or 1 dose of medicine.",
                [],
                1),
            new TalentModel(
                "Migrant",
                "Life in the steppes is hard enough, but it becomes especially onerous when dealing with the nearconstant threat of soldiers from Shem, Stygia, Khauran, and especially Turan, bent on exterminating the nomad tribes that threaten their supremacy. Furthermore, not all nomad tribes view themselves as allies, and raids between camps are all-too-common. You’re able to break camp in a moment’s notice, and transport yourself rapidly away to a new location, no matter how arduous. Whenever you or your mount suffer Fatigue from extended travel, you may make a Challenging (D2) Resistance test. Each point of Momentum reduces the Fatigue by 1 point.",
                [],
                1),
            new TalentModel(
                "Rugged",
                "The rocky hills and desolate steppes are your home more than any civilized town or city, and you are far more comfortable sleeping in the open or in a desert tent than in a bed. Between adventures, you can perform your Upkeep when in the wild. When doing so, make a Challenging (D2) Survival test. If successful, each point of Momentum can reduce the Gold cost by 1. If unsuccessful, you must spend the full amount of Gold. The expense is depletion of supplies rather than hard coin.",
                [],
                1),
            new TalentModel(
                "Saddle-bred",
                "Your people are horse nomads, and life in your tribe was entirely centered around horses. Not only were they transportation, but you also grew up wearing items of horsehide and leather, were weaned on horse milk, and ate horse meat when there was no other game. As such, the Difficulty of any Animal Handling test when dealing with a horse is reduced by one step, as well as any Survival test made when you are mounted or with a horse.",
                [],
                1),
            new TalentModel(
                "Clannish",
                "Blood, as they say, runs thick, and when dealing with those of your clan with the Command, Persuade, or Society skills, you gain 1 automatic success on any test instead of rolling. Additionally, when in your home community you count as having the Tradesman talent.",
                [],
                1),
            new TalentModel(
                "Enterprising",
                "The untamed frontier holds no fear for you. You may also choose to “rough it” between adventures, forgoing any Upkeep cost entirely, but during such a period any equipment is not restored and you cannot upgrade or seek out new equipment, cultivate Renown, find new contacts, etc. You do not roll for any Carousing events when roughing it, though the gamemaster may wish to introduce or select an event appropriate to your circumstances.",
                [],
                1),
            new TalentModel(
                "Regimented",
                "You’ve grown up surrounded by soldiers, part of a garrison troop, whether stationed your whole life on the frontier or from inside the great kingdoms and recently assigned. You may reroll any failed d20s when attempting Society or Command rolls with military non-player characters but must accept the results of the second roll. Additionally, your Upkeep cost between adventures is halved if you are quartered in a military barracks or with soldiers assigned to a garrison.",
                [],
                1),
            new TalentModel(
                "Indebted",
                "Your family once had considerable wealth and privilege, but now has been reduced financially, either disenfranchised or otherwise stripped of a formerly reliable source of income. Your family’s holding, whether a manor house or keep, is now its sole source of income, discretely being sold piece by piece. While in your homeland during Downtime, you may make a Challenging (D2) Society roll to generate 1 Gold per Momentum earned, representing the distasteful necessity of selling of your family’s treasures. Unfortunately, any Complication rolled with this test reduces your Social Standing by 1, to a minimum of 0, and likely makes an enemy from within your family, angry at your reckless selling off of their inheritance.",
                [],
                1),
            new TalentModel(
                "Respected",
                "You are treated with respect by the folk within your homeland, regardless of their personal feelings towards you. You may add +1d20 to any Society rolls made with anyone from your homeland who knows who you are and has heard of your family and is not of the same Social Standing as you. ",
                [],
                1),
            new TalentModel(
                "Hyperliterate",
                "Those with the Hyperliterate talent go beyond the simple literacy of the everyday scribe. They have studied multiple languages equal to their literacy focus and while unable to speak them in any meaningful way can read and write them fluently. Should the character later gain the Polyglot talent, the languages they gain from Hyperliterate add to that talent as well. ",
                [],
                1),

            // Ancient Bloodlines
            new TalentModel(
                "Ancient Bloodline",
                "Whenever you fail a Personality test, pay the GM 1 Doom and add a d20 to your test (unless you already rolled 3d20).",
                [new AncientBloodlinePrerequisite()],
                1),
            new TalentModel(
                "Ancient Bloodline: Brythunian",
                "The Brythunian heritage is almost entirely Hyborian, a remnant from that tribe's wandering. Whenever you fail a Personality test, pay the GM 1 Doom and add a d20 to your test (unless you already rolled 3d20). You will also feel a powerful sense of pride and connectedness to the Hyborian people, almost to a fault. Others will get the sense of this direct lineage to the primary Hyborian bloodline.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(13), new SourcePrerequisite(Source.Thief)],
                1),
            new TalentModel(
                "Ancient Bloodline: Corinthian",
                "Though the origin of the Corinthian people does not extend beyond the Cataclysm, they were nontheless a flourishing kingdom when the empire of dreaded Acheron rose and fell. Whenever you fail a Personality test, pay the GM 1 Doom and add a d20 to your test (unless you already rolled 3d20). You will also feel a flush of satisfication and a slight superiority, and others might sense a bit of arrogance.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(18), new SourcePrerequisite(Source.Thief)],
                1),
            new TalentModel(
                "Ancient Bloodline: Nemedian",
                "Born out of the ashes of ancient Acheron, this country's descendants are inheritors to the rich tradition of knowledge and scholarship that the land is known for. Whenever you fail a Personality test, pay the GM 1 Doom and add a d20 to your test (unless you already rolled 3d20). You will also feel the weight of antiquity and a sense of the immensity of time press upon you, while others beholding you feel detachment and aloofness.",
                [new AncientBloodlinePrerequisite(), , new HomelandPrerequisite(14), new SourcePrerequisite(Source.Thief)],
                1),
            new TalentModel(
                "Ancient Bloodline: Zamoran",
                "These folk are descendent from the Zhemri, one of the races that came into being after the Cataclysm. Whenever you fail a Personality test, pay the GM 1 Doom and add a d20 to your test (unless you already rolled 3d20); and those around you will experience illicit sensations of bygone times, hints of some ancient depravity and debasement.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(15), new SourcePrerequisite(Source.Thief)],
                1),
            new TalentModel(
                "Ancient Bloodline: Cimmerian",
                "Cimmerians that have the blood of ancient Atlantis running through their veins, inheritors of that majestic lineage that stems back to the island nation of Conan’s forefather Kull, barbarian king of Valusia. When a Personality test fails, the thunder of ancient drums sounds in the characters’ ears, and they might become gripped with cold fury. Pay the GM 1 Doom and add a d20 to your test (unless you already rolled 3d20).",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(5), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Ancient Bloodline: Nordheimer",
                "Whether from Asgard or Vanaheim, these folk are descended from a race of humankind that devolved into snow-apedom after the Cataclysm. The earliest true humans in the land, forefathers of the Hyborians, drove them northward past the Arctic Circle, where they once again became humans, eventually returning to the lands that would later be known as Nordheim. When a Nordheimer with an Ancient Bloodline fails a Personality test, they are prone to boastfulness and foolhardy overconfidence. Pay the GM 1 Doom and add a d20 to your test (unless you already rolled 3d20).",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(8), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Ancient Bloodline: Hyperborean",
                "Among the Hyborian races, the original denizens of Hyperborea were the first to climb the ladder towards civilization, eschewing their nomadic horse-tribe existence in favor of rough-hewn cities and mountain fastnesses. A Hyperborean with this talent is descended from those proud and enigmatic builders of stone forts. Failure with a Personality test causes the Hyperborean to display the heritage of this lineage, exulting in a cold arrogance that is disquieting to any who behold it. Pay the GM 1 Doom and add a d20 to your test (unless you already rolled 3d20).",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(6), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Ancient Bloodline: Blood of Bori",
                "While not as ancient as the lineage of sunken Atlantis, or the mysterious Zhemri of Zamora, those descended from Bori give name to this age. It is the Hyborians who rule in the West, having risen from barbarism to form the civilized world. When a character with this talent fails a Personality test, they are filled with pride and disdain for anyone who would question the blood which made the world (as they see it). Pay the GM 1 Doom and add a d20 to your test (unless you already rolled 3d20).",
                [new AncientBloodlinePrerequisite(), new SourcePrerequisite(Source.Mercenary)],
                1),
            new TalentModel(
                "Ancient Bloodline: Fell Blood of Acheron",
                "The remnants of dark Acheron remain not only in ruins and memory but also in blood. After the Cataclysm, Acheron rose to a power of which Turan and Aquilonia can yet only dream. The Sons of Bori are nothing compared to this more ancient, pure blood. That barbarous people may have pulled down the towers of Python, but they will see the whips of Acheron at their backs again. A character with this talent that fails a Personality test is filled with anger and entitlement, perhaps even with a surge of that sorcery-tainted blood that burns in their veins. Pay the GM 1 Doom and add a d20 to your test (unless you already rolled 3d20).",
                [new AncientBloodlinePrerequisite(), new SourcePrerequisite(Source.Mercenary)],
                1),
            new TalentModel(
                "Ancient Bloodline: Khaurani",
                "Though their root stock is Kothic, Khauran gained independence long ago. They are stirred by national pride and, when any person mentions Koth, burn with a desire not only to match that powerful kingdom, but to outdo it.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(20), new SourcePrerequisite(Source.Brigand)],
                1),
            new TalentModel(
                "Ancient Bloodline: Turanian",
                "Turan is an empire on the rise. When any suggest otherwise, Turanian rage is on full display. That comes with a sense of entitlement, as if the whole of the world is theirs for the taking. To intimate they are not so destined is to conjure all the boldness of this young nation to the fore.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(25), new SourcePrerequisite(Source.Brigand)],
                1),
            new TalentModel(
                "Ancient Bloodline: Yuetshi",
                "One of the tribes inhabiting the coast of the Vilayet, the Yuetshi are in decline and know that their way of life is vanishing. When failing a Personality test, a Yuetshi with this bloodline feels an immediate sense of loss that stirs almost immediately to defiant resentment.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(30), new SourcePrerequisite(Source.Brigand)],
                1),
            new TalentModel(
                "Ancient Bloodline: Zamboulan",
                "Zamboula is a city of secrets, and its people do not like to discuss them. Anytime something questionable about the city arises, cannibalism for example, a Zamboulan fights fiercely to either refute the accusation or make the accuser wish it had never been leveled.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(31), new SourcePrerequisite(Source.Brigand)],
                1),
            new TalentModel(
                "Ancient Bloodline: Zuagir",
                "A tribe of nomads of the steppes between the Zaporaskan and Ilbars rivers, the Zuagir have long suffered at the hands of the Turanians and the folk of Khauran, who they now raid in return. When a Zuagir fails a Personality test, they are filled with fierce rage, every instinct telling them avenge any apparent slight, even if none was intended.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(32), new SourcePrerequisite(Source.Brigand)],
                1),
            new TalentModel(
                "Ancient Bloodline: Argos",
                "Though the root stock is Hyborian, the bloodline of the folk of Argos has blended with an influx from Shem, Zingara, and even Stygia, inheriting ancestral traits from those ancient bloodlines. When this talent becomes active, the Argossean feels a strong sense of competition with others, a desire to get the better of any negotiation, no matter what the cost.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(11), new SourcePrerequisite(Source.Pirate)],
                1),
            new TalentModel(
                "Ancient Bloodline: The Black Coast and Kush",
                "These ancient bloodlines draw from those great kingdoms south of Stygia, whose ways are so different from the Hyborians. They are a scattered and diverse people, long separated from the rest of the dreaming west by the twin barriers of Stygia and the River Styx. When someone from Kush or the Black Coast exhibits this talent, they are filled with a fierce pride, scoffing at the ways and accomplishments of the upstart Hyborian kingdoms, pale reflections of their own fallen glory.",
                [new AncientBloodlinePrerequisite(), new VariableHomelandPrerequisite(3, 23), new SourcePrerequisite(Source.Pirate)],
                1),
            new TalentModel(
                "Ancient Bloodline: Shem",
                "The folk descended from the Sons of Shem suffered much at the hands of their Stygian neighbors, enslaved and brutalized over the course of centuries. When a Personality test is failed, the Shemite with this talent feels a sense of outrage and the desire to dominate, turning the tables on a perceived opponent.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(16), new SourcePrerequisite(Source.Pirate)],
                1),
            new TalentModel(
                "Ancient Bloodline: Stygia",
                "Descended from the Lemurians who fled to the West and supplanted an ancient kingdom, embracing its ways, the Stygian bloodline is an ancient and terrible one, steeped in evil. A Stygian with the Ancient Bloodline talent failing a Personality test feels the presence of the Old Serpent and will view any situation they are enmeshed in as an opportunity to do Set’s bidding. Though the Stygian is not beholden to commit an evil act, the desire to do so is there and must be suppressed.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(19), new SourcePrerequisite(Source.Pirate)],
                1),
            new TalentModel(
                "Ancient Bloodline: Vanaheim",
                "A Vanir with this talent comes from a lineage that devolved into apedom after the Cataclysm and later returned to the semblance of humanity. A Vanir with this talent failing a Personality test is prone to boastfulness and foolhardy overconfidence.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(8), new RegionPrerequisite("Vanaheim"), new SourcePrerequisite(Source.Pirate)],
                1),
            new TalentModel(
                "Ancient Bloodline: Zingara",
                "Originating in the Valley of Zingg and boasting a bloodline that mixes the Hyborian ancestry with that of the folk of Zingg, this bloodline is expressed in the fashion of extreme boldness, almost rash emotion and feeling. A Zingaran suffering the effects of this talent will take insult over the merest slight, even mistaking honesty for mockery.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(17), new SourcePrerequisite(Source.Pirate)],
                1),
            new TalentModel(
                "Ancient Bloodline: Hyboria",
                "This is the default Ancient Bloodline for any character from Aquilonia or any of its provinces — whether Tauran, the Bossonian Marches, or the Westermarck. In the people of Gunderland the Hyborian lineage is strongest, and they bear the most resemblance to their ancestors in temperament and appearance. When the Hyborian bloodline manifests, the character feels a distinct sense of pride and ambition stemming from their ancestry, a pride that can easily pass into arrogance, and an ambition that can lead to reckless overreach.",
                [new AncientBloodlinePrerequisite(), new HomelandsPrerequisite([0,1,12,35]), new SourcePrerequisite(Source.Scout)],
                1),
            new TalentModel(
                "Ancient Bloodline: Border Kingdom",
                "The folk of the Border Kingdom bear a variety of ancient ancestries, mostly Brythunian or Nemedian, or they are descended from Hyperboreans. Brythunian ancestry are essentially Hyborian and they bear the most resemblance to their ancestors in temperament and appearance. When the Border Kingdom bloodline manifests, the character feels a distinct sense of pride and ambition stemming from their ancestry, a pride that can easily pass into arrogance, and an ambition that can lead to reckless overreach.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(7), new SourcePrerequisite(Source.Scout)],
                1),
            new TalentModel(
                "Ancient Bloodline: Ghulistan",
                "A wild hill people who resist all forms of foreign domination, the Ghuli are fierce, proud, and old. They have stubbornly persisted and thrived — if it can be called thriving — in a treacherous and rough environment when other peoples would have long since fled or attempted to build cities. When failing a Personality test, a Ghuli reacts with anger, usually assigning blame to any non-Ghuli, emotionally siding with any of their kind, despite any past relation.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(36), new SourcePrerequisite(Source.Wanderer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Hyrkania",
                "Originally of Lemurian stock, Hyrkanians keep some of the barbarous nature of their ancient ancestors. Yet, unlike the Lemurians, the Hyrkanians have never known the yoke of a master. They are free people, many in number, and feared in combat. They say that all Hyrkanian blood flows with that of their god, the grim Erlik. A Hyrkanian failing a Personality test is filled with the desire to depart the scene: not fleeing, but instead abandoning the current task and setting forth, free and unencumbered. Those witnessing this will see their interest instantly fade in whatever is at hand.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(26), new SourcePrerequisite(Source.Wanderer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Iranistan",
                "A faded but proud bloodline; Iranistan mastered civilization before the people of Bori could walk upright. Their ancestry is rich in astronomy, mathematics, and the art of war. Failed Personality tests cause an Iranistani to become cold and calculating, pondering how the lessons of the past might apply to the challenges of the present.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(27), new SourcePrerequisite(Source.Wanderer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Khitai",
                "The blood of Khitai carries with it the destiny of the East, for no empire can rival their power there. Indeed, the kingdoms of the West would be hard pressed to find blood as fine and fated as those of Khitai. At least this is their belief. A Khitan failing a Personality test becomes almost alien, the Lemurian bloodline defining them starkly against the lesser lineages. A Khitan is thus gripped with a profound and easily apparent arrogance. ",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(29), new SourcePrerequisite(Source.Wanderer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Kosala",
                "Kosalan blood is older than can easily be counted. Their civilization once mastered the heights of science, a near-magical level of technological development which saw to their every need. Most remain in new Kosala, though some ventured west to found the mysterious green cities that dot the unmapped portions of the Earth. When failing a Personality test, someone of Kosalan descent feels the crushing weight of ages descend upon them, a reminder that theirs is a land old when this continent was newly formed. ",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(37), new SourcePrerequisite(Source.Wanderer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Vendhya",
                "Vendhyans view their blood as their fate, each born to a caste from which they cannot migrate. Such is the will of Asura and the tradition of the Vendhyan people. Taking pride in one’s place is an ideal; but, long ago, there was something of the wild in them, as in all folk, and that strain of blood caused them to wander. Vendhyans failing Personality tests tend to fall back on the prescribed roles of caste and place, deferring to those above them and asserting dominance over those below their station",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(28), new SourcePrerequisite(Source.Wanderer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Aquilonia",
                "Sons and daughters of “the Flower of the West”, Aquilonians are rightly proud of their direct lineage from Bori and consider themselves the exemplars of civilization. An Aquilonian failing a Personality test feels as if their pride has been injured, and becomes haughty and aloof, potentially blaming others for any misunderstanding. ",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(0), new SourcePrerequisite(Source.King)],
                1),
            new TalentModel(
                "Ancient Bloodline: Koth",
                "Like Aquilonians, Kothians are descendants of the primitive Hyborian tribes who dominated the northern and western territories and defended them savagely against the Stygians and Acheronians of old. Failing a Personality test for a Kothian means an affront to civilization itself, and they are often loath to admit such a defeat, holding to tradition and rebuffing any conciliatory gestures. ",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(10), new SourcePrerequisite(Source.King)],
                1),
            new TalentModel(
                "Ancient Bloodline: Nemedia",
                "Descendants of the tribes who fought the ancient kingdom of Acheron and were ultimately touched by its bloodline, a Nemedian who fails a Personal test becomes arrogant and resentful, their decadent mind filled with notions of elaborate revenge. It is up to the player whether these are acted upon. ",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(14), new SourcePrerequisite(Source.King)],
                1),
            new TalentModel(
                "Ancient Bloodline: Ophir",
                "Ophir has stood for centuries against much larger and more powerful neighbors on all sides, resisting attempts at being absorbed into Aquilonia, Nemedia, or Argos. When this bloodline is activated through a failed Personality test, an Ophirian’s initial instinct is to act defensively, rebuffing others and even abandoning any attempt at communication. ",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(9), new SourcePrerequisite(Source.King)],
                1),
            new TalentModel(
                "Ancient Bloodline: Darfari",
                "Music and song suffuse most of dayto-day Dafari life. A Dafari failing a Personality test is overwhelmed by legends of ancient ancestors, as relayed by the griot storytellers of their land. They may begin humming, singing, or otherwise chanting intensely, a sometimes disquieting practice to those who do not expect it.",
                [new AncientBloodlinePrerequisite(), new HomelandsPrerequisite([24, 39]), new SourcePrerequisite(Source.Adventurer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Keshani",
                "A tightly-knit warrior culture, a Keshani who fails a personality test often becomes impatient and curt with outsiders — anyone not from Keshan — and may be quick to challenge them to an honor duel, particularly with hand-to-hand weapons such as spear or blade.",
                [new AncientBloodlinePrerequisite(), new HomelandsPrerequisite([2, 39]), new SourcePrerequisite(Source.Adventurer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Kordafan",
                "Inheritors of a culture that was old when Acheron was founded, Kordafans are among the most ancient of the post-Cataclysmic bloodlines. They regard their lineage as almost divine, and when failing a personality test, a Kordafan is gripped with this sense of superiority and aloofness, regarding all others as being lesser in stature.",
                [new AncientBloodlinePrerequisite(), new HomelandsPrerequisite([38, 39]), new SourcePrerequisite(Source.Adventurer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Kushite (Gallah)",
                "The Gallah, native to Kush, inherit a proud, tribal ancestry and sense of wanderlust. When failing Personality tests, Gallahs are roused to pride, scoffing at the ways of the upstart Hyborians.",
                [new AncientBloodlinePrerequisite(), new HomelandsPrerequisite([3, 39]), new SourcePrerequisite(Source.Adventurer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Kushite (Chaga)",
                "Chaga are Stygian descendants whose blood has intermingled with the native Gallah for centuries but share the Stygian temperament. However, they are more passionate, and prone to violence when failing a Personality test, which is how they have held onto the leadership of Kush for centuries: by harsh reprisals when challenged.",
                [new AncientBloodlinePrerequisite(), new HomelandsPrerequisite([3, 39]), new SourcePrerequisite(Source.Adventurer)],
                1),
            new TalentModel(
                "Ancient BLoodline: Puntian",
                "The people of the Puntian grasslands are wealthy due to their gold trade and exports, which instilled in them a sense of disdain for material things. Whatever one has, no matter how precious, can be gotten again. What matters is one’s honor. When they fail a Personality test, they may try to bargain or buy their way out of any threatening situation, demanding to know what it would cost to rid themselves of it.",
                [new AncientBloodlinePrerequisite(), new HomelandsPrerequisite([22, 39]), new SourcePrerequisite(Source.Adventurer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Stygian",
                "Descended from the Lemurians who fled to the West and supplanted an ancient kingdom, the Stygian bloodline is ancient, corrupted by long association with the Old Serpent Set. Stygians with the Ancient Bloodline talent who fail a Personality test feel the presence of the god and will view any situation as an opportunity to do Set’s bidding. Though not beholden to commit an evil act, the desire to do so is there, and must be suppressed.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(19), new SourcePrerequisite(Source.Adventurer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Tombalkan",
                "The Aphaki, when failing a Personality test, become fiercely independent, even discounting the efforts and value of allies, believing that they can stand any challenge alone. Other Tombalkans, being formed of a variety of influences, can pick any other Black Kingdom ancient bloodline characterization as their own.",
                [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(39), new SourcePrerequisite(Source.Adventurer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Xuchotlan",
                "Founded by Old Kosalans on a western exodus, the Xuchotlan bloodline resulted of their intermingling with indigenous people of the region. A Xuchotli with the Ancient Bloodline talent failing a Personality test feels the long lost ancient ways in their heart. They rage at the loss of their high technological civilization and the comparatively diminished fortunes of their people.",
                [new AncientBloodlinePrerequisite(), new HomelandsPrerequisite([39, 40]), new SourcePrerequisite(Source.Adventurer)],
                1),
            new TalentModel(
                "Ancient Bloodline: Zembabweian",
                "Zembabweian culture emphasizes a duality of spirit: they have two kings, two almost opposed gods, and they are famed for both trade and defensive architecture. A Zembabweian failing a Personality test may be torn by indecision, wondering which of two opposing paths to follow to resolve any conflict they are caught up in.",
                [new AncientBloodlinePrerequisite(), new HomelandsPrerequisite([21, 39]), new SourcePrerequisite(Source.Adventurer)],
                1),
            //new TalentModel(    in SPEAR & FANG
            //    "Ancient Bloodline: Pict",
            //    "Descended from the Lemurians who fled to the West and supplanted an ancient kingdom, embracing its ways, the Stygian bloodline is an ancient and terrible one, steeped in evil. A Stygian with the Ancient Bloodline talent failing a Personality test feels the presence of the Old Serpent and will view any situation they are enmeshed in as an opportunity to do Set’s bidding. Though the Stygian is not beholden to commit an evil act, the desire to do so is there and must be suppressed.",
            //    [new AncientBloodlinePrerequisite(), new HomelandPrerequisite(-1), new SourcePrerequisite(Source.Scout)],
            //    1),
        ],
        [Skill.Bard]: [
            new TalentModel(
                "Skald",
                "You gain the Tradesman and Vagabond talents in any barbaric land such as Nordheim, Cimmeria, and Hyperborea. At the gamemaster’s discretion, this benefit may also apply to nomadic kingdoms such as Hyrkania or regions like the Black Kingdoms.",
                [new ExpertisePrerequisite(Skill.Persuade, 1), new ExpertisePrerequisite(Skill.Lore, 1), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Flattery",
                "You have learned the art of turning a phrase in such a manner that it sounds both beautiful and wise, no matter how common or even trite the subject matter. With Flattery, you automatically gain 1 bonus Momentum on any successful Persuade test when used in a positive (complimentary) fashion.",
                [new TalentPrerequisite("Skald"), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Right of Hospitality",
                "It is one thing to join in with the fray, but you are most at home in a great hall, giving performances to the high and mighty. You gain 1 bonus Momentum on any tests taken when you act purely to impress others with the delivery of your prose or music. Additionally, before any Downtime you can attempt an Average (D1) Persuasion test to gain the invitation of a great lord, noble, or wealthy landowner. The Difficulty of this attempt may be adjusted by the gamemaster based on the environs and your knowledge of the society you find yourself in. Success merits such an invitation, with the Momentum increasing the quality and status of the host. Your Upkeep cost is met by the host, and the Momentum listed above is also rewarded to you in Gold that must be spent during downtime (the Gold does not go into your coin-purse, but anything you have purchased is yours). If you are ever thrown out by a lord for any reason, you lose this talent and must purchase it again at full price.",
                [new TalentPrerequisite("Flattery"), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Do We Fear This?",
                "You can easily buoy the spirits of your allies, imbuing them with a sense of purpose that lets them endure great adversity. All members of your immediate group within Close range can temporarily increase their Courage Soak by an amount equal to your Persuade Focus. Even if you have, for whatever reason, lost the Rite of Hospitality talent (undoubtedly due to a simple misunderstanding), this talent is unaffected.",
                [new TalentPrerequisite("Right of Hospitality"), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Runecasting",
                "Runecasting is the act of seeking inspiration from drawing a rune and interpreting its meaning. While some sorcerers might use runes to seek out a divination, the bard draws runes as an act of theater. Judgement is pronounced as if from the gods themselves. Runecasting reduces the Difficulty of Persuasion tests against the superstitious by one step and increases the mental damage of all Threaten Actions by +1[CD]. Targets with Willpower 11+ or an Insight, Sorcery, or Thievery Focus 3+ are immune to these effects, unless you have Runecasting 2, at which point even they are convinced by your trickery.",
                [new TalentPrerequisite("Skald"), new SourcePrerequisite(Source.Barbarian)],
                2),
            new TalentModel(
                "Believe My Words",
                "When attempting a Persuade or Command test to make another person believe a falsehood or other trick of yours, you can re-roll all d20s that fail to result in a success. Any d20 resulting in a Complication can still be re-rolled, but the Complication results in the gamemaster gaining 2 Doom. The results of any re-roll must be accepted, even if resulting in another Complication. Such is the danger of falsehood and deception.",
                [new TalentPrerequisite("Runecasting"), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Make a Feast of Dry Bread",
                "You can make even the paltriest of meals feel like a banquet. By emphasizing victories to come, the beauty of attendees, or the valor of warriors present, you lift spirits where bitterness might lead to despair. When characters dine with you, they gain +1d20 to any Healing or Counsel tests taken to remove any Fatigue or Despair.",
                [new TalentPrerequisite("Skald"), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Sagas",
                "You can deliver oratory dripping with the histories of your people, or that of a folk you are familiar with. In combining performance with lore, you can inspire or pass judgement in such a way that few can deny your counsel. You can substitute Persuade for Command, Counsel, Insight, or Lore.",
                [new TalentPrerequisite("Make a Feast of Dry Bread"), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Eye of the Grim Father",
                "The sagas are filled with tales of the uncanny and stories of monstrous beasts. When first witnessing any notable creature or person of importance, you can spend 1 Doom to ask whether the being has any sorcerous or unusual powers. If the answer to this is “yes” the gamemaster must answer with an answer to the effect of: “none”, “some”, or “vastly so”. Creatures with three or fewer supernatural abilities (Doom spends or special abilities) are described as having “some” and this insight inflicts you with 3[CD] mental damage. Beings with over four such abilities count as “vastly so” and this insight inflicts you with 6[CD] in mental damage. You may then choose to spend 1 Doom for further understanding by attempting a Simple (D0) Discipline test. Each point of Momentum reduces this damage by 1[CD]. Once you have taken this damage, the gamemaster should provide you with a brief and honest appraisal of the being’s capabilities.",
                [new TalentPrerequisite("Sagas"), new SourcePrerequisite(Source.Barbarian)],
                1),
        ],
        [Skill.Berserk]: [
            new TalentModel(
                "Berserker",
                "You can accept 1 point of Fatigue to become Enraged. While Enraged, you gain 1 bonus Momentum to all Melee and thrown Ranged attacks. Anyone facing you gains Momentum equal to your bonus Momentum, and in your berserk frenzy the gamemaster may spend 2 Doom to have you attack an additional character within Reach. This character might even be an ally! While Enraged, you must make every effort to attack or charge an enemy every round. You cannot use the Acrobatics or Parry skills in Reactions and you can’t fall into any defensive formation such as a shield wall. The gamemaster may apply a penalty of two steps of Difficulty to any skill test outside those used to attack an opponent. To end the Enraged condition, you must make a Dire (D4) Discipline test. The Difficulty decreases to Daunting (D3) if you have killed an allied player or non-player character in the last round.",
                [new ExpertisePrerequisite(Skill.Melee, 1), new ExpertisePrerequisite(Skill.Lore, 1), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Courage of the Bear",
                "While Enraged, you can substitute Melee for Discipline when determining Courage Soak. If you do not possess the Courageous talent, you gain Courage Soak equal to Melee, but must make a Dire (D4) Discipline test at the end of combat or gain 1 Trauma.",
                [new TalentPrerequisite("Berserker"), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Fierce Visage",
                "All your melee attacks gain the Fearsome Quality when you are Enraged.",
                [new TalentPrerequisite("With Wild Abandon"), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Warband",
                "Having learnt all the secrets of the berserkergang, you can now form a warband (called “mannerbund” by Nordheimer). You can prepare a ritual draught made of potent herbs and mushrooms prior to battle (requiring 2 Resources), for you and any group of warriors familiar to you, of a number equal to your Command Expertise. All who consume the draught gain the Berserker talent for the duration of a battle, and they can form a Squad around you. All members will gain a Courage Soak 2 while in that squad, though this does not stack with existing Courage Soak. Any member of the warband with a higher Courage Soak will use that value instead. The gamemaster should determine the exact length of a battle, with it generally lasting the duration of a raid, a ship battle, or a massed combat, versus a single encounter.",
                [new TalentPrerequisite("Fierce Visage"), new TalentPrerequisite("War-shirt"), new TalentPrerequisite("With the Wolf's Eyes"), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "War-shirt",
                "As you are recognized by your kin, you are visited by one of the Wise — whether a skald, witch, or witch-priest — and you are taught the craft of the war-shirt (called “serkr” in the tongue of the Nordheimer). When Carousing, you can spend 3 Gold to engage in a ritual hunt and from that hunt create a personal talisman in the form of a leather tunic that provides a multitude of protections. Soak 2 for the torso and arm locations. +1 Courage Soak, with a minimum of 2. The Difficulty of any sorcery attack against you — whether a spell, the effects of a spell, or the attack of a Horror or Undead — is increased by one step. These protections are totemic and personal, unique to you, and the war-shirt is the equivalent of heavy clothing to anyone else wearing it, with none of the special properties listed above.",
                [new TalentPrerequisite("Courage of the Bear"), new ExpertisePrerequisite(Skill.Craft, 1), new ExpertisePrerequisite(Skill.Survival, 3), new SourcePrerequisite(Source.Barbarian)],
                1),
            new TalentModel(
                "Wild Fury",
                "When Enraged, you can increase the bonus Momentum generated by 1 for every rank of Wild Fury. It is entirely up to you whether you activate this talent in full or part.",
                [new TalentPrerequisite("Berserker"), new SourcePrerequisite(Source.Barbarian)],
                2),
            new TalentModel(
                "With the Wolf's Eyes",
                "No fool, you have learned to recognize allies from hated enemies, even when gripped with the berserker’s rage. For every rank of With the Wolf’s Eyes, the Doom required to force you to target an ally increases by +1.",
                [new TalentPrerequisite("Berserker"), new SourcePrerequisite(Source.Barbarian)],
                3),
            new TalentModel(
                "With Wild Abandon",
                "Your ferocity is horrific to behold. You may spend 2 Momentum to make a Display as a Swift Action. Unlike regular Swift Actions, the Difficulty of this Display is not increased by one step.",
                [new TalentPrerequisite("Wild Fury"), new SourcePrerequisite(Source.Barbarian)],
                1),
        ],
        [Skill.Veteran]: [
            new TalentModel(
                "Veteran",
                "Mercenaries do not reach old age without learning how to fight and how to avoid a fight. The tongue is sometimes as useful as the sword, though the veteran knows to trust their blade first. Convincing others that there are options other than killing is a rare talent, and one largely reserved for those quite capable of doing the killing. When persuading a group of mercenaries or soldiers not to take a particular action, the veteran can spend 1 Doom to reduce the Difficulty of the test by 1 so long as the soldiers are not in combat.",
                [new SourcePrerequisite(Source.Mercenary)],
                1),
        ],
        [Skill.Outlaw]: [
            new TalentModel(
                "Bolt-holes",
                "You have extended your Hidden Road right into the authorities’ safest places. You can now use Hidden Road not only to traverse the paths between your Lairs, but also to enter and escape from any cities or towns in proximity to your Lair.",
                [new SourcePrerequisite(Source.Brigand), new TalentPrerequisite("Hidden Road"), new FocusPrerequisite(Skill.Command, 1)],
                1),
            new TalentModel(
                "Brigand Band",
                "Having set up a Lair, you can attract followers to guard the Lair in your absence.",
                [new SourcePrerequisite(Source.Brigand), new TalentPrerequisite("Lair"), new ExpertisePrerequisite(Skill.Command, 1)],
                3),
            new TalentModel(
                "Hidden Road",
                "You know a series of secret paths and trails between your Lairs. When traveling between these two locations you can move freely without needing any form of Stealth test when attempting to avoid mundane authorities.",
                [new SourcePrerequisite(Source.Brigand), new AnyTalentsPrerequisite(2, ["Brigand Band", "Infamous Band", "Invisible Army", "Lair"])],
                1),
            new TalentModel(
                "Invisible Army",
                "You have built up your followers into a more disciplined force. At any time, you can send word and have your Brigand Band present a unified force.",
                [new SourcePrerequisite(Source.Brigand), new TalentPrerequisite("Brigand Band"), new ExpertisePrerequisite(Skill.Command, 2), new ExpertisePrerequisite(Skill.Siegecraft, 2)],
                1),
            new TalentModel(
                "Jailbreak",
                "When escaping from capture you can pay 1 Doom to use any of the following talents for a single test: Born Swimmer, Courageous, Human Spider, or Scout. All talents are assumed to have 1 rank.",
                [new SourcePrerequisite(Source.Brigand), new TalentPrerequisite("Liberty")],
                1),
            new TalentModel(
                "Lair",
                "With the Lair talent, you have a hidden location in one set location where you can retreat in times of trouble. The Lair functions as a cache for supplies and personal equipment, and grants the Tradesman talent while you are within the same region. Each rank of the talent is a separate location.",
                [new SourcePrerequisite(Source.Brigand), new ExpertisePrerequisite(Skill.Thievery, 2), new ExpertisePrerequisite(Skill.Stealth, 2), new ExpertisePrerequisite(Skill.Survival, 2)],
                5),
            new TalentModel(
                "Liberty",
                "At some point in your career you were captured. Vowing never to let this happen again, you made a study of locks, manacles, and knots, to the point that you knew the weak spot in each. Should you be captured and bound, your Thievery test to escape these bindings is reduced by one step of Difficulty. In addition to this, you can attempt a Struggle of your Craft versus that of your jailor to keep your escape secret.",
                [new SourcePrerequisite(Source.Brigand), new ExpertisePrerequisite(Skill.Craft, 1), new ExpertisePrerequisite(Skill.Thievery, 1)],
                1),
            new TalentModel(
                "Where May I Roam?",
                "You move with a brazen confidence across the land, knowing more hiding places, shortcuts, and forgotten trails than anyone alive. Select a single Lair, and now you can use the Hidden Road anywhere in the same kingdom as that Lair.",
                [new SourcePrerequisite(Source.Brigand), new TalentPrerequisite("Bolt-hole"), new TalentRankPrerequisite("Lair", 2), new FocusPrerequisite(Skill.Survival, 2), new FocusPrerequisite(Skill.Stealth, 2), new FocusPrerequisite(Skill.Thievery, 2)],
                1),
        ],
        [Skill.Falconry]: [
            new TalentModel(
                "Deadly Ally",
                "You have learned to control a hunting bird and can direct it in combat to attack a foe in concert with your own assault. You can roll its attack prior to taking your action and harvest any Momentum gained on that attack for the Momentum pool. If two ranks of this talent are purchased, the bird becomes a Toughened creature (increasing its Vigor and Resolve as appropriate). If this talent is purchased twice and the bird is already Toughened, it gains +1d20 on its melee attacks",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("Mighty Bird"), new ExpertisePrerequisite(Skill.Animal_Handling, 3), new ExpertisePrerequisite(Skill.Melee, 1)],
                2),
            new TalentModel(
                "Distracting Wings and Talons",
                "While it is unwise to do so, you can set your bird upon an opponent.The bird can attack as normal but can also harass the opponent, increasing the Difficulty of any attacks the opponent might make by one step.",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("My Eyes Above"), new ExpertisePrerequisite(Skill.Animal_Handling, 2), new ExpertisePrerequisite(Skill.Melee, 1)],
                1),
            new TalentModel(
                "The Hunt",
                "You have trained and cared for hunting birds for many years. When in possession of a trained bird, you may use the bird to gain + 1d20 on Survival tests.In cultures where falconry is a sport of nobles, you may substitute Animal Handling for the Society skill when dealing with other nobles.",
                [new SourcePrerequisite(Source.Wanderer), new ExpertisePrerequisite(Skill.Animal_Handling, 1)],
                1),
            new TalentModel(
                "A Majestic Sight",
                "You have learned that the sight of a bird in flight can be a majestic thing. By training yours to display its plumage while in flight, you can use this to garner acclaim from those viewing the hunt.When at a hunt, you can use Animal Handling instead of Persuade or gain favor with nobles.",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("The Hunt"), new ExpertisePrerequisite(Skill.Animal_Handling, 2), new ExpertisePrerequisite(Skill.Society, 1)],
                1),
            new TalentModel(
                "Mighty Bird",
                "Nomads from the steppes find the falcon too small a bird to adequately hunt with. With the Mighty Bird talent, you can train an eagle to serve instead. Hunting with this bird offers no additional bonuses, but allows Animal Handling to be used instead of the Survival skill. If you have the Faithful Companions talent, the eagle grants an additional +1d20 to your Survival tests.",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("The Hunt"), new ExpertisePrerequisite(Skill.Animal_Handling, 2)],
                1),
            new TalentModel(
                "My Eyes Above",
                "You understand your bird is more aware than you are and rely on this awareness. By keeping an eye on your bird, you are hard to ambush. Any attempt to ambush you increases in Difficulty by one step when your bird is in the air or nearby",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("The Hunt"), new ExpertisePrerequisite(Skill.Animal_Handling, 1), new ExpertisePrerequisite(Skill.Observation, 1)],
                1),
        ],
        [Skill.MartialArts]: [
            new TalentModel(
                "Body of Flowing Water",
                "So long as you are not wearing armor, you gain 1 point of armor Soak against melee attacks. If this talent is purchased twice, it affects all types of physical attacks.",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("Open Hand"), new ExpertisePrerequisite(Skill.Parry, 2)],
                2),
            new TalentModel(
                "Closed Fist",
                "You can cause incredible harm with a focused blow. By paying 1 Fortune point, you can roll damage twice on one successful unarmed strike and choose which roll you wish to take. Once the dice roll has been chosen, your attack gains the Vicious 1 and Intense Qualities. ",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("Smash"), new ExpertisePrerequisite(Skill.Discipline, 2)],
                1),
            new TalentModel(
                "Flashing Steel",
                "When able to benefit from the Open Hand talent, on a successful parry you can inflict 1 mental damage for every point of Momentum spent. If attacked with a ranged weapon, you can attempt to parry, though the Difficulty increases by one step.",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("Symphony of Blades"), new TalentPrerequisite("Body of Flowing Water")],
                1),
            new TalentModel(
                "Open Hand",
                "You have learned unarmed physical combat, and are able to face steel with flesh, engaging rapidly and withdrawing when you have struck. When in melee combat, so long as you are unarmed, you suffer no penalty due to Reach.",
                [new SourcePrerequisite(Source.Wanderer), new ExpertisePrerequisite(Skill.Discipline, 1), new ExpertisePrerequisite(Skill.Melee, 1), new ExpertisePrerequisite(Skill.Parry, 1)],
                1),
            new TalentModel(
                "Smash",
                "You can marshal your focus and deliver powerful blows. When delivering an unarmed blow, you deal an additional +1[CD] damage.",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("Open Hand"), new ExpertisePrerequisite(Skill.Melee, 2)],
                1),
            new TalentModel(
                "Symphony of Blades",
                "You can choose one specific weapon which, when wielded, does not impact the use of the Open Hand talent. This talent can be purchased multiple times, once for each weapon, specifying each weapon with each rank. ",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("Open Hand")],
                10),
        ],
        [Skill.Philosophy]: [
            new TalentModel(
                "Academy",
                "Through borrowed favors and the education of noble youths, you have established an Academy of fellow philosophers. Academies start with two philosophers, though you can pay 100 additional experience points to increase the size of your academy by one philosopher. These philosophers are knowledgeable academics, trained in Insight, Lore, and Persuade. They can assist in any test where they have training at the rate of 1 Gold per philosopher. The philosophers are assumed to have a TN of 12 for these tests. Academies are ideal places to situate libraries, though they must be purchased separately.",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("Savant")],
                2),
            new TalentModel(
                "Ascetic",
                "Through constant physical training and meditation, you can channel your will into physical feats, using the Discipline skill for Resistance tests. With this talent, you can increase your Vigor to the same value as your Resolve, if it is lower",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("Healthy Optimism"), new TalentPrerequisite("Metaphysics and Mysteries")],
                1),
            new TalentModel(
                "Healthy Optimism",
                "Philosophers are aware that the world is a shifting wheel of events. While as subject to moments of Despair as any other character, you recover from it much faster. When you recover Vigor and Resolve at the end of a scene, you can remove Despair equal to your Counsel Focus. ",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("Know Thyself"), new ExpertisePrerequisite(Skill.Counsel, 3)],
                1),
            new TalentModel(
                "Know Thyself",
                "A philosopher is incredibly hard to convince of something they do not already believe in. Any Persuade attempt against you is increased in Difficulty by one step for every rank of Know Thyself you possess.",
                [new SourcePrerequisite(Source.Wanderer), new ExpertisePrerequisite(Skill.Counsel, 1), new ExpertisePrerequisite(Skill.Discipline, 1)],
                3),
            new TalentModel(
                "Metaphysics and Mysteries",
                "A philosopher who has progressed into the study of metaphysics has learned to question their thoughts and justifications. When affected by Persuade or Sorcery, on a failed test you can spend 1 Fortune point in your next turn to force a Persuade or Sorcery vs. Counsel test. If successful, this allows you to ignore the result of the prior test.",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("Know Thyself"), new FocusPrerequisite(Skill.Discipline, 2), new ExpertisePrerequisite(Skill.Sorcery, 1)],
                1),
            new TalentModel(
                "Savant",
                "Philosophers are highly sought after as tutors and advisors. When in a large town or city, the Savant talent counts as if you had the Tradesman caste talent. In addition to this, when interacting with non-player characters you can voluntarily and temporarily increase your Social Standing by +1 so that you are treated as the equal of a higher status non-player character. ",
                [new SourcePrerequisite(Source.Wanderer), new TalentPrerequisite("Know Thyself"), new FocusPrerequisite(Skill.Command, 2), new ExpertisePrerequisite(Skill.Persuade, 1)],
                1),
        ],
        [Skill.Griot]: [
            new TalentModel(
                "Griot",
                "You gain the Tradesman and Vagabond talents while in the south.",
                [new SourcePrerequisite(Source.Adventurer), new ExpertisePrerequisite(Skill.Persuade, 1), new ExpertisePrerequisite(Skill.Lore, 1)],
                1),
            new TalentModel(
                "Golden Words",
                "You have learned the art of turning a phrase in such a manner that it sounds both beautiful and wise, no matter how common or even trite the subject matter. With Flattery, you automatically gain 1 bonus Momentum on any successful Persuade test when used in a positive (complimentary) fashion.",
                [new SourcePrerequisite(Source.Adventurer), new UniqueTalentPrerequisite("Sky God's Stories"), new UniqueTalentPrerequisite("Salt of the River"), new TalentPrerequisite("Griot")],
                1),
            new TalentModel(
                "As My Own Kraal",
                "It is one thing to join in with the fray, but you are most at home in a great kraal (noble’s home), giving performances to the high and mighty. You gain 1 bonus Momentum on any tests taken when you act purely to impress others with the delivery of your prose or music. Additionally, when Carousing you can attempt an Average (D1) Persuasion test to gain the invitation of a great chief or other noble. ",
                [new SourcePrerequisite(Source.Adventurer), new TalentPrerequisite("Golden Words")],
                1),
            new TalentModel(
                "Usuthu!",
                "You shout a potent war cry that buoys the spirits of your allies, imbuing them with a sense of purpose that lets them endure great adversity. All members of your immediate group within Close Range can temporarily increase their Courage Soak by an amount equal to your Persuade Focus. Even if you have, for whatever reason, lost the Rite of Hospitality talent (undoubtedly due to a simple misunderstanding), this talent is unaffected.",
                [new SourcePrerequisite(Source.Adventurer), new TalentPrerequisite("As My Own Kraal")],
                1),
            new TalentModel(
                "Sky God's Stories",
                "Legend says that the Trickster stole all tales from the Sky God and made them its own. The griot telling Anansi’s version of these tales draws inspiration from them. While some sorcerers might use runes or other means to seek out a divination, the griot performs their tales as an act of theater. Judgement comes as if from the gods themselves. This talent reduces the Difficulty of Persuasion tests against the superstitious by one step and increases the mental damage of all Threaten Actions by +1[CD]. Targets with Willpower 11+ or an Insight, Sorcery, or Thievery Focus 3+ are immune to these effects, unless you have Take the Sky God’s Stories 2, at which point even they are convinced by your trickery.",
                [new SourcePrerequisite(Source.Adventurer), new UniqueTalentPrerequisite("Golden Words"), new UniqueTalentPrerequisite("Salt of the River"), new TalentPrerequisite("Griot")],
                2),
            new TalentModel(
                "The Tiger's Tale",
                "The griot relates the tales of Anansi’s cleverness… and the Trickster’s foolishness. When attempting a Persuade or Command test to make another person believe a falsehood or other trick of yours, you can re-roll all d20s that fail to result in a success. Any d20 resulting in a complication can still be re-rolled, but the complication results in the gamemaster gaining 2 Doom. The results of any re-roll must be accepted, even if resulting in another complication. Such is the danger of falsehood and deception.",
                [new SourcePrerequisite(Source.Adventurer), new TalentPrerequisite("Sky God's Stories")],
                1),
            new TalentModel(
                "Salt of the River",
                "You can make even the paltriest of meals feel like a banquet. By emphasizing victories to come, the beauty of attendees, or the valor of warriors present, you lift spirits where bitterness might lead to despair. When characters dine with you, they gain +1d20 to any Healing or Counsel tests taken to remove any Fatigue or Despair.",
                [new SourcePrerequisite(Source.Adventurer), new UniqueTalentPrerequisite("Golden Words"), new UniqueTalentPrerequisite("Sky God's Stories"), new TalentPrerequisite("Griot")],
                1),
            new TalentModel(
                "The Tale of All",
                "You can deliver oratory dripping with the histories of your people, or that of a folk you are familiar with. In combining performance with lore, you can inspire or pass judgement in such a way that few can deny your counsel. You can substitute Persuade for Command, Counsel, Insight, or Lore.",
                [new SourcePrerequisite(Source.Adventurer), new TalentPrerequisite("Salt of the River")],
                1),
            new TalentModel(
                "Whispers of the Orishas",
                "The oldest tales seethe with the uncanny and stories of monstrous beasts. When first witnessing any notable creature or person of importance, you can spend 1 Doom to ask whether the being has any sorcerous or unusual powers. ",
                [new SourcePrerequisite(Source.Adventurer), new TalentPrerequisite("The Tale of All")],
                1)
        ],
        [Skill.Adherent]: [
            new TalentModel(
                "Archpriest",
                "You have ascended to the highest position of your cult and your god has sent you prophetic dreams of power and glory. You feel drawn to prayer daily and your adherents seek your counsel and heed your word. Archpriests increase their general Social Standing by +2, and when amongst other adherents are treated as if they had a Social Standing 8.",
                [new SourcePrerequisite(Source.Exiles), new TalentPrerequisite("Priest")],
                1),
            new TalentModel(
                "Blessings and Unguents: Derketo",
                "You have learned to create the unguents used during worship of your god. When at a shrine attending or performing any casting of a spell, you can make a Difficult (D2) Alchemy test and add any Momentum so gained to the casting of the spell. Ten Ingredients’ (or 1 Material’s) worth of Exotic Resources may be used to grant a bonus d20 to this test. ",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Alchemy, 1), new ExpertisePrerequisite(Skill.Counsel, 2), new TalentPrerequisite("Lay Worshipper: Derketo")],
                1),
            new TalentModel(
                "Blessings and Unguents: Jhebbal Sag",
                "You have learned to create the unguents used during worship of your god. When at a shrine attending or performing any casting of a spell, you can make a Difficult (D2) Alchemy test and add any Momentum so gained to the casting of the spell. Ten Ingredients’ (or 1 Material’s) worth of Exotic Resources may be used to grant a bonus d20 to this test. ",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Alchemy, 1), new ExpertisePrerequisite(Skill.Counsel, 2), new TalentPrerequisite("Lay Worshipper: Jhebbal Sag")],
                1),
            new TalentModel(
                "Blessings and Unguents: Mitra",
                "You have learned to create the unguents used during worship of your god. When at a shrine attending or performing any casting of a spell, you can make a Difficult (D2) Alchemy test and add any Momentum so gained to the casting of the spell. Ten Ingredients’ (or 1 Material’s) worth of Exotic Resources may be used to grant a bonus d20 to this test. ",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Alchemy, 1), new ExpertisePrerequisite(Skill.Counsel, 2), new TalentPrerequisite("Lay Worshipper: Mitra")],
                1),
            new TalentModel(
                "Blessings and Unguents: Set",
                "You have learned to create the unguents used during worship of your god. When at a shrine attending or performing any casting of a spell, you can make a Difficult (D2) Alchemy test and add any Momentum so gained to the casting of the spell. Ten Ingredients’ (or 1 Material’s) worth of Exotic Resources may be used to grant a bonus d20 to this test. ",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Alchemy, 1), new ExpertisePrerequisite(Skill.Counsel, 2), new TalentPrerequisite("Lay Worshipper: Set")],
                1),
            new TalentModel(
                "Blessings and Unguents: Ymir",
                "You have learned to create the unguents used during worship of your god. When at a shrine attending or performing any casting of a spell, you can make a Difficult (D2) Alchemy test and add any Momentum so gained to the casting of the spell. Ten Ingredients’ (or 1 Material’s) worth of Exotic Resources may be used to grant a bonus d20 to this test. ",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Alchemy, 1), new ExpertisePrerequisite(Skill.Counsel, 2), new TalentPrerequisite("Lay Worshipper: Ymir")],
                1),
            new TalentModel(
                "Blessings and Unguents: Yog",
                "You have learned to create the unguents used during worship of your god. When at a shrine attending or performing any casting of a spell, you can make a Difficult (D2) Alchemy test and add any Momentum so gained to the casting of the spell. Ten Ingredients’ (or 1 Material’s) worth of Exotic Resources may be used to grant a bonus d20 to this test. ",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Alchemy, 1), new ExpertisePrerequisite(Skill.Counsel, 2), new TalentPrerequisite("Lay Worshipper: Yog")],
                1),
            new TalentModel(
                "Ceremonial Blade: Derketo",
                "You have learnt the mysteries of creating a ceremonial blade. While each religion has a different ceremonial blade with different abilities, this talent is enough to craft all such blades so long as the character is, or becomes, a lay worshipper of that god and performs the task at a shrine of that god. The specific special qualities and abilities of any given god’s ceremonial blade is up to the gamemaster to decide.",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Craft, 2), new ExpertisePrerequisite(Skill.Discipline, 1), new TalentPrerequisite("Lay Worshipper: Derketo")],
                1),
            new TalentModel(
                "Ceremonial Blade: Jhebbal Sag",
                "You have learnt the mysteries of creating a ceremonial blade. While each religion has a different ceremonial blade with different abilities, this talent is enough to craft all such blades so long as the character is, or becomes, a lay worshipper of that god and performs the task at a shrine of that god. The specific special qualities and abilities of any given god’s ceremonial blade is up to the gamemaster to decide.",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Craft, 2), new ExpertisePrerequisite(Skill.Discipline, 1), new TalentPrerequisite("Lay Worshipper: Jhebbal Sag")],
                1),
            new TalentModel(
                "Ceremonial Blade: Mitra",
                "You have learnt the mysteries of creating a ceremonial blade. While each religion has a different ceremonial blade with different abilities, this talent is enough to craft all such blades so long as the character is, or becomes, a lay worshipper of that god and performs the task at a shrine of that god. The specific special qualities and abilities of any given god’s ceremonial blade is up to the gamemaster to decide.",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Craft, 2), new ExpertisePrerequisite(Skill.Discipline, 1), new TalentPrerequisite("Lay Worshipper: Mitra")],
                1),
            new TalentModel(
                "Ceremonial Blade: Set",
                "You have learnt the mysteries of creating a ceremonial blade. While each religion has a different ceremonial blade with different abilities, this talent is enough to craft all such blades so long as the character is, or becomes, a lay worshipper of that god and performs the task at a shrine of that god. The specific special qualities and abilities of any given god’s ceremonial blade is up to the gamemaster to decide.",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Craft, 2), new ExpertisePrerequisite(Skill.Discipline, 1), new TalentPrerequisite("Lay Worshipper: Set")],
                1),
            new TalentModel(
                "Ceremonial Blade: Ymir",
                "You have learnt the mysteries of creating a ceremonial blade. While each religion has a different ceremonial blade with different abilities, this talent is enough to craft all such blades so long as the character is, or becomes, a lay worshipper of that god and performs the task at a shrine of that god. The specific special qualities and abilities of any given god’s ceremonial blade is up to the gamemaster to decide.",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Craft, 2), new ExpertisePrerequisite(Skill.Discipline, 1), new TalentPrerequisite("Lay Worshipper: Ymir")],
                1),
            new TalentModel(
                "Ceremonial Blade: Yog",
                "You have learnt the mysteries of creating a ceremonial blade. While each religion has a different ceremonial blade with different abilities, this talent is enough to craft all such blades so long as the character is, or becomes, a lay worshipper of that god and performs the task at a shrine of that god. The specific special qualities and abilities of any given god’s ceremonial blade is up to the gamemaster to decide.",
                [new SourcePrerequisite(Source.Exiles), new ExpertisePrerequisite(Skill.Craft, 2), new ExpertisePrerequisite(Skill.Discipline, 1), new TalentPrerequisite("Lay Worshipper: Yog")],
                1),
            new TalentModel(
                "Lay Worshipper: Derketo",
                "You are a lay worshipper and have a basic understanding of the devotional rites related to your god. You understand how to honor your god, and to make yourself known to other adherents. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Lay Worshipper: Jhebbal Sag",
                "You are a lay worshipper and have a basic understanding of the devotional rites related to your god. You understand how to honor your god, and to make yourself known to other adherents. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Lay Worshipper: Mitra",
                "You are a lay worshipper and have a basic understanding of the devotional rites related to your god. You understand how to honor your god, and to make yourself known to other adherents. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Lay Worshipper: Set",
                "You are a lay worshipper and have a basic understanding of the devotional rites related to your god. You understand how to honor your god, and to make yourself known to other adherents. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Lay Worshipper: Ymir",
                "You are a lay worshipper and have a basic understanding of the devotional rites related to your god. You understand how to honor your god, and to make yourself known to other adherents. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Lay Worshipper: Yog",
                "You are a lay worshipper and have a basic understanding of the devotional rites related to your god. You understand how to honor your god, and to make yourself known to other adherents. ",
                [new SourcePrerequisite(Source.Exiles)],
                1),
            new TalentModel(
                "Priest: Derketo",
                "Your vision and insight have led you to temporal power. When amongst your flock you are treated as if you had a Social Standing 4 (or if yours is higher, use yours) and when interacting with any character that is a lay worshipper of any god you gain 1 bonus Momentum on Council and Persuade tests with any of the faithful.",
                [new SourcePrerequisite(Source.Exiles), new AnyTalentsPrerequisite(2, ["Blesings and Unguents: Derketo", "Ceremonial Blade: Derketo", "The Spoils of Fervor: Derketo"])],
                1),
            new TalentModel(
                "Priest: Jhebbal Sag",
                "Your vision and insight have led you to temporal power. When amongst your flock you are treated as if you had a Social Standing 4 (or if yours is higher, use yours) and when interacting with any character that is a lay worshipper of any god you gain 1 bonus Momentum on Council and Persuade tests with any of the faithful.",
                [new SourcePrerequisite(Source.Exiles), new AnyTalentsPrerequisite(2, ["Blesings and Unguents: Jhebbal Sag", "Ceremonial Blade: Jhebbal Sag", "The Spoils of Fervor: Jhebbal Sag"])],
                1),
            new TalentModel(
                "Priest: Mitra",
                "Your vision and insight have led you to temporal power. When amongst your flock you are treated as if you had a Social Standing 4 (or if yours is higher, use yours) and when interacting with any character that is a lay worshipper of any god you gain 1 bonus Momentum on Council and Persuade tests with any of the faithful.",
                [new SourcePrerequisite(Source.Exiles), new AnyTalentsPrerequisite(2, ["Blesings and Unguents: Mitra", "Ceremonial Blade: Mitra", "The Spoils of Fervor: Mitra"])],
                1),
            new TalentModel(
                "Priest: Set",
                "Your vision and insight have led you to temporal power. When amongst your flock you are treated as if you had a Social Standing 4 (or if yours is higher, use yours) and when interacting with any character that is a lay worshipper of any god you gain 1 bonus Momentum on Council and Persuade tests with any of the faithful.",
                [new SourcePrerequisite(Source.Exiles), new AnyTalentsPrerequisite(2, ["Blesings and Unguents: Set", "Ceremonial Blade: Set", "The Spoils of Fervor: Set"])],
                1),
            new TalentModel(
                "Priest: Ymir",
                "Your vision and insight have led you to temporal power. When amongst your flock you are treated as if you had a Social Standing 4 (or if yours is higher, use yours) and when interacting with any character that is a lay worshipper of any god you gain 1 bonus Momentum on Council and Persuade tests with any of the faithful.",
                [new SourcePrerequisite(Source.Exiles), new AnyTalentsPrerequisite(2, ["Blesings and Unguents: Ymir", "Ceremonial Blade: Ymir", "The Spoils of Fervor: Ymir"])],
                1),
            new TalentModel(
                "Priest: Yog",
                "Your vision and insight have led you to temporal power. When amongst your flock you are treated as if you had a Social Standing 4 (or if yours is higher, use yours) and when interacting with any character that is a lay worshipper of any god you gain 1 bonus Momentum on Council and Persuade tests with any of the faithful.",
                [new SourcePrerequisite(Source.Exiles), new AnyTalentsPrerequisite(2, ["Blesings and Unguents: Yog", "Ceremonial Blade: Yog", "The Spoils of Fervor: Yog"])],
                1),
            new TalentModel(
                "The Spoils of Fervor: Derketo",
                "You have learnt the minutia of your faith and can now create all the ephemera of your faith. If a shrine of your faith, or faiths, can be used to make an item, you can perform the task. If the item is a petty enchantment, then you are considered to have any talent needed to make it so long as you are at the shrine.",
                [new SourcePrerequisite(Source.Exiles), new FocusPrerequisite(Skill.Alchemy, 2), new FocusPrerequisite(Skill.Craft, 2), new TalentPrerequisite("Lay Worshipper: Derketo")],
                1),
            new TalentModel(
                "The Spoils of Fervor: Jhebbal Sag",
                "You have learnt the minutia of your faith and can now create all the ephemera of your faith. If a shrine of your faith, or faiths, can be used to make an item, you can perform the task. If the item is a petty enchantment, then you are considered to have any talent needed to make it so long as you are at the shrine.",
                [new SourcePrerequisite(Source.Exiles), new FocusPrerequisite(Skill.Alchemy, 2), new FocusPrerequisite(Skill.Craft, 2), new TalentPrerequisite("Lay Worshipper: Jhebbal Sag")],
                1),
            new TalentModel(
                "The Spoils of Fervor: Mitra",
                "You have learnt the minutia of your faith and can now create all the ephemera of your faith. If a shrine of your faith, or faiths, can be used to make an item, you can perform the task. If the item is a petty enchantment, then you are considered to have any talent needed to make it so long as you are at the shrine.",
                [new SourcePrerequisite(Source.Exiles), new FocusPrerequisite(Skill.Alchemy, 2), new FocusPrerequisite(Skill.Craft, 2), new TalentPrerequisite("Lay Worshipper: Mitra")],
                1),
            new TalentModel(
                "The Spoils of Fervor: Set",
                "You have learnt the minutia of your faith and can now create all the ephemera of your faith. If a shrine of your faith, or faiths, can be used to make an item, you can perform the task. If the item is a petty enchantment, then you are considered to have any talent needed to make it so long as you are at the shrine.",
                [new SourcePrerequisite(Source.Exiles), new FocusPrerequisite(Skill.Alchemy, 2), new FocusPrerequisite(Skill.Craft, 2), new TalentPrerequisite("Lay Worshipper: Set")],
                1),
            new TalentModel(
                "The Spoils of Fervor: Ymir",
                "You have learnt the minutia of your faith and can now create all the ephemera of your faith. If a shrine of your faith, or faiths, can be used to make an item, you can perform the task. If the item is a petty enchantment, then you are considered to have any talent needed to make it so long as you are at the shrine.",
                [new SourcePrerequisite(Source.Exiles), new FocusPrerequisite(Skill.Alchemy, 2), new FocusPrerequisite(Skill.Craft, 2), new TalentPrerequisite("Lay Worshipper: Ymir")],
                1),
            new TalentModel(
                "The Spoils of Fervor: Yog",
                "You have learnt the minutia of your faith and can now create all the ephemera of your faith. If a shrine of your faith, or faiths, can be used to make an item, you can perform the task. If the item is a petty enchantment, then you are considered to have any talent needed to make it so long as you are at the shrine.",
                [new SourcePrerequisite(Source.Exiles), new FocusPrerequisite(Skill.Alchemy, 2), new FocusPrerequisite(Skill.Craft, 2), new TalentPrerequisite("Lay Worshipper: Yog")],
                1),
        ],
    };

    getTalents() {
        return this._talents;
    }

    getTalent(name: string) {
        var talent: TalentModel = null;

        for (var i = 0; i < this._talents[Skill.None].length; i++) {
            var t = this._talents[Skill.None][i];
            if (t.name === name) {
                talent = t;
                break;
            }
        }

        if (talent === null) {
            var found = false;
            for (var tal in this._talents) {
                if (found) {
                    break;
                }

                for (var i = 0; i < this._talents[tal].length; i++) {
                    var t = this._talents[tal][i];
                    if (t.name === name) {
                        talent = t;
                        break;
                    }
                }
            }
        }

        return talent;
    }

    getTalentsForSkills(skills: Skill[]) {
        var talents: TalentViewModel[] = [];

        skills.forEach((s, i) => {
            for (var i = 0; i < this._talents[s].length; i++) {
                var include = true;
                var talent = this._talents[s][i];

                talent.prerequisites.forEach((p, i) => {
                    if (!p.isPrerequisiteFulfilled()) {
                        include = false;
                    }
                });

                if (include) {
                    if (talent.maxRank > 1) {
                        if (character.hasTalent(talent.name) && character.talents[talent.name].rank === talent.maxRank) {
                            include = false;
                        }
                    }
                    else {
                        if (character.hasTalent(talent.name)) {
                            include = false;
                        }
                    }

                    if (include) {
                        var rank = character.hasTalent(talent.name)
                            ? character.talents[talent.name].rank + 1
                            : 1;

                        talents.push(new TalentViewModel(talent.name, rank, talent.maxRank > 1, talent.description, s));
                    }
                }
            }
        });

        talents.sort((a, b) => a.name.localeCompare(b.name));

        return talents;
    }

    getSkillForTalent(talent: string) {
        for (var skill in this._talents) {
            for (var i = 0; i < this._talents[skill].length; i++) {
                var t = this._talents[skill][i];
                if (t.name === talent) {
                    return parseInt(skill);
                }
            }
        }

        return Skill.None;
    }

    getSourceForTalent(name: string) {
        const talent = this.getTalent(name);
        let src = Source.Core;

        if (talent.prerequisites.some(p => p instanceof SourcePrerequisite)) {
            src = (talent.prerequisites.filter(p => p instanceof SourcePrerequisite)[0] as SourcePrerequisite).getSource();
        }

        return src;
    }

    applyTalent(talent: string) {
        if (talent === "Sorcerer") {
            character.resolveReduction += DiceRoller.rollSpecial(2, 0).hits;
        }
        else if (talent === "Barter Your Soul") {
            character.resolveReduction += DiceRoller.rollSpecial(2, character.spells.length + 1).hits;
        }
        else if (talent === "Born in the Saddle" && character.archetype === 44/*Beast*/) {
            character.addTalent("Faithful Companion");
        }
    }
}

export const TalentsHelper = new Talents();