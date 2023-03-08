import {Attribute} from './attributes';

export enum Skill {
    Acrobatics,
    Alchemy,
    Animal_Handling,
    Athletics,
    Craft,
    Command,
    Counsel,
    Discipline,
    Healing,
    Insight,
    Linguistics,
    Lore,
    Melee,
    Observation,
    Parry,
    Persuade,
    Ranged_Weapons,
    Resistance,
    Sailing,
    Society,
    Sorcery,
    Stealth,
    Survival,
    Thievery,
    Siegecraft, // Warfare

    None,
    Career,
    RandomCareer,

    Bard,
    Berserk,
    Veteran,
    Outlaw,
    Falconry,
    MartialArts,
    Philosophy,
    Griot,
    Adherent,

    Max
}

class SkillModel {
    name: string;
    attribute: Attribute;

    constructor(name: string, attr: Attribute) {
        this.name = name;
        this.attribute = attr
    }
}

export class Skills {
    private _skills: { [id: number]: SkillModel } = {
        [Skill.Acrobatics]: new SkillModel("Acrobatics", Attribute.Agility),
        [Skill.Alchemy]: new SkillModel("Alchemy", Attribute.Intelligence),
        [Skill.Animal_Handling]: new SkillModel("Animal Handling", Attribute.Personality),
        [Skill.Athletics]: new SkillModel("Athletics", Attribute.Brawn),
        [Skill.Craft]: new SkillModel("Craft", Attribute.Intelligence),
        [Skill.Command]: new SkillModel("Command", Attribute.Personality),
        [Skill.Counsel]: new SkillModel("Counsel", Attribute.Personality),
        [Skill.Discipline]: new SkillModel("Discipline", Attribute.Willpower),
        [Skill.Healing]: new SkillModel("Healing", Attribute.Intelligence),
        [Skill.Insight]: new SkillModel("Insight", Attribute.Awareness),
        [Skill.Linguistics]: new SkillModel("Linguistics", Attribute.Intelligence),
        [Skill.Lore]: new SkillModel("Lore", Attribute.Intelligence),
        [Skill.Melee]: new SkillModel("Melee", Attribute.Agility),
        [Skill.Observation]: new SkillModel("Observation", Attribute.Awareness),
        [Skill.Parry]: new SkillModel("Parry", Attribute.Coordination),
        [Skill.Persuade]: new SkillModel("Persuade", Attribute.Personality),
        [Skill.Ranged_Weapons]: new SkillModel("Ranged Weapons", Attribute.Coordination),
        [Skill.Resistance]: new SkillModel("Resistance", Attribute.Brawn),
        [Skill.Sailing]: new SkillModel("Sailing", Attribute.Coordination),
        [Skill.Society]: new SkillModel("Society", Attribute.Personality),
        [Skill.Sorcery]: new SkillModel("Sorcery", Attribute.Willpower),
        [Skill.Stealth]: new SkillModel("Stealth", Attribute.Agility),
        [Skill.Survival]: new SkillModel("Survival", Attribute.Awareness),
        [Skill.Thievery]: new SkillModel("Thievery", Attribute.Awareness),
        [Skill.Siegecraft]: new SkillModel("Warfare", Attribute.Intelligence),
    };

    getSkills() {
        let skills: Skill[] = [];
        for (var s = 0; s <= Skill.Siegecraft; s++) {
            skills.push(s);
        }

        return skills;
    }

    getSkill(skill: Skill) {
        return this._skills[skill];
    }

    getSkillName(skill: Skill) {
        if (skill === Skill.Career) {
            return "Career Skill";
        }
        else if (skill === Skill.RandomCareer) {
            return "Random Career Skill";
        }
        else if (skill === Skill.None) {
            return "None";
        }
        else if (skill === Skill.Bard) {
            return "Bard";
        }
        else if (skill === Skill.Berserk) {
            return "Berserk";
        }
        else if (skill === Skill.Veteran) {
            return "Veteran";
        }
        else if (skill === Skill.Outlaw) {
            return "Outlaw";
        }
        else if (skill === Skill.Falconry) {
            return "Falconry";
        }
        else if (skill === Skill.MartialArts) {
            return "Martial Arts";
        }
        else if (skill === Skill.Philosophy) {
            return "Philosophy";
        }
        else if (skill === Skill.Griot) {
            return "Griot";
        }
        else if (skill === Skill.Adherent) {
            return "Adherent";
        }

        return this._skills[skill].name;
    }

    getSkillsForAttribute(attr: Attribute) {
        var skills = [];

        for (var skill in this._skills) {
            var s = this._skills[skill];
            if (s.attribute === attr) {
                skills.push(skill);
            }
        }

        return skills;
    }

    toSkill(name: string) {
        for (var i = 0; i < Skill.Max; i++) {
            if (this._skills[i] && this._skills[i].name === name) {
                return i as Skill;
            }
            else {
                if (name === "Bard") {
                    return Skill.Bard;
                }
                else if (name === "Berserk") {
                    return Skill.Berserk;
                }
                else if (name === "Veteran") {
                    return Skill.Veteran;
                }
                else if (name === "Outlaw") {
                    return Skill.Outlaw;
                }
                else if (name === "Falconry") {
                    return Skill.Falconry;
                }
                else if (name === "Martial Arts") {
                    return Skill.MartialArts;
                }
                else if (name === "Philosophy") {
                    return Skill.Philosophy;
                }
                else if (name === "Griot") {
                    return Skill.Griot;
                }
                else if (name === "Adherent") {
                    return Skill.Adherent;
                }
            }
        }

        return Skill.None;
    }
}

export const SkillsHelper = new Skills();