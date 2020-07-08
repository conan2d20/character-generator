import * as React from 'react';
import {character} from '../common/character';
import {Attribute, AttributeAspect, AttributesHelper} from '../helpers/attributes';
import {Skill} from '../helpers/skills';
import {Archetype, ArchetypesHelper} from '../helpers/archetypes';
import {Caste, CastesHelper} from '../helpers/castes';
import {Education, EducationsHelper} from '../helpers/educations';
import {HomeLand, HomelandsHelper} from '../helpers/homelands';
import {Nature, NaturesHelper} from '../helpers/natures';

export class PrintableSheet extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        const languages = character.languages.map((l, i) => {
            var lang = l;
            lang += (i < character.languages.length - 1) ? "," : "";
            return lang;
        });

        const home = HomelandsHelper.getHomeland(character.homeland);
        const caste = CastesHelper.getCaste(character.caste);
        const education = EducationsHelper.getEducation(character.education);
        const nature = NaturesHelper.getNature(character.nature);
        const archetype = ArchetypesHelper.getArchetype(character.archetype);

        var fortune = undefined;

        if (character.fortunePoints === 3) {
            fortune = (
                <div className="sheet-fortune">
                    <div className="sheet-fortune1">X</div>
                    <div className="sheet-fortune2">X</div>
                    <div className="sheet-fortune3">X</div>
                </div>
            )
        }
        else if (character.fortunePoints === 2) {
            fortune = (
                <div className="sheet-fortune">
                    <div className="sheet-fortune1">X</div>
                    <div className="sheet-fortune2">X</div>
                </div>
            )
        }

        const belongings = character.equipment.map((eq, i) => {
            var item = eq.indexOf("(Armor") === -1
                ? eq
                : eq.substring(0, eq.indexOf("(Armor"));

            item += (i < character.equipment.length - 1 ? ", " : "");

            return (
                <span key={i}>
                    {item}
                </span>
            );
        });

        //let armor = undefined;
        //character.equipment.forEach((eq, i) => {
        //    if (eq.indexOf("(Armor") > -1) {

        //});

        return (
            <div className="sheet-page">
                <div className="sheet-name">{"Name"}</div>
                <div className="sheet-age-gender">{character.age}{" year old "}</div>
                <div className="sheet-caste">{caste.name}</div>
                <div className="sheet-archetype">{archetype.name}</div>
                <div className="sheet-education">{education.name}</div>
                <div className="sheet-homeland">{home.name}</div>
                <div className="sheet-trait">{character.trait}</div>
                <div className="sheet-nature">{nature.name}</div>
                <div className="sheet-warstory">{character.warStory}</div>
                <div className="sheet-languages">{languages}</div>

                <div className="sheet-talent-home">{home.talent.name}</div>
                <div className="sheet-talent-caste1">{caste.talents[0].name}</div>
                <div className="sheet-talent-caste2">{caste.talents[1].name}</div>
                <div className="sheet-talent-education">{"Education Talent"}</div>
                <div className="sheet-talent-nature">{"Nature Talent"}</div>
                <div className="sheet-talent-archetype">{"Archetype Talent"}</div>

                <div className="sheet-agility">{character.attributes[Attribute.Agility].value}</div>
                <div className="sheet-acrobatics-exp">{character.skills[Skill.Acrobatics].focus}</div>
                <div className="sheet-acrobatics-foc">{character.skills[Skill.Acrobatics].expertise}</div>
                <div className="sheet-acrobatics-tn">{character.skills[Skill.Acrobatics].expertise + character.attributes[Attribute.Agility].value}</div>
                <div className="sheet-melee-exp">{character.skills[Skill.Melee].expertise}</div>
                <div className="sheet-melee-foc">{character.skills[Skill.Melee].focus}</div>
                <div className="sheet-melee-tn">{character.skills[Skill.Melee].expertise + character.attributes[Attribute.Agility].value}</div>
                <div className="sheet-stealth-exp">{character.skills[Skill.Stealth].expertise}</div>
                <div className="sheet-stealth-foc">{character.skills[Skill.Stealth].focus}</div>
                <div className="sheet-stealth-tn">{character.skills[Skill.Stealth].expertise + character.attributes[Attribute.Agility].value}</div>

                <div className="sheet-awareness">{character.attributes[Attribute.Awareness].value}</div>
                <div className="sheet-insight-exp">{character.skills[Skill.Insight].expertise}</div>
                <div className="sheet-insight-foc">{character.skills[Skill.Insight].focus}</div>
                <div className="sheet-insight-tn">{character.skills[Skill.Insight].expertise + character.attributes[Attribute.Awareness].value}</div>
                <div className="sheet-observation-exp">{character.skills[Skill.Observation].expertise}</div>
                <div className="sheet-observation-foc">{character.skills[Skill.Observation].focus}</div>
                <div className="sheet-observation-tn">{character.skills[Skill.Observation].expertise + character.attributes[Attribute.Awareness].value}</div>
                <div className="sheet-survival-exp">{character.skills[Skill.Survival].expertise}</div>
                <div className="sheet-survival-foc">{character.skills[Skill.Survival].focus}</div>
                <div className="sheet-survival-tn">{character.skills[Skill.Survival].expertise + character.attributes[Attribute.Awareness].value}</div>
                <div className="sheet-thievery-exp">{character.skills[Skill.Thievery].expertise}</div>
                <div className="sheet-thievery-foc">{character.skills[Skill.Thievery].focus}</div>
                <div className="sheet-thievery-tn">{character.skills[Skill.Thievery].expertise + character.attributes[Attribute.Awareness].value}</div>

                <div className="sheet-brawn">{character.attributes[Attribute.Brawn].value}</div>
                <div className="sheet-athletics-exp">{character.skills[Skill.Athletics].expertise}</div>
                <div className="sheet-athletics-foc">{character.skills[Skill.Athletics].focus}</div>
                <div className="sheet-athletics-tn">{character.skills[Skill.Athletics].expertise + character.attributes[Attribute.Brawn].value}</div>
                <div className="sheet-resistance-exp">{character.skills[Skill.Resistance].expertise}</div>
                <div className="sheet-resistance-foc">{character.skills[Skill.Resistance].focus}</div>
                <div className="sheet-resistance-tn">{character.skills[Skill.Resistance].expertise + character.attributes[Attribute.Brawn].value}</div>

                <div className="sheet-coordination">{character.attributes[Attribute.Coordination].value}</div>
                <div className="sheet-parry-exp">{character.skills[Skill.Parry].expertise}</div>
                <div className="sheet-parry-foc">{character.skills[Skill.Parry].focus}</div>
                <div className="sheet-parry-tn">{character.skills[Skill.Parry].expertise + character.attributes[Attribute.Coordination].value}</div>
                <div className="sheet-ranged-exp">{character.skills[Skill.Ranged_Weapons].expertise}</div>
                <div className="sheet-ranged-foc">{character.skills[Skill.Ranged_Weapons].focus}</div>
                <div className="sheet-ranged-tn">{character.skills[Skill.Ranged_Weapons].expertise + character.attributes[Attribute.Coordination].value}</div>
                <div className="sheet-sailing-exp">{character.skills[Skill.Sailing].expertise}</div>
                <div className="sheet-sailing-foc">{character.skills[Skill.Sailing].focus}</div>
                <div className="sheet-sailing-tn">{character.skills[Skill.Sailing].expertise + character.attributes[Attribute.Coordination].value}</div>

                <div className="sheet-intelligence">{character.attributes[Attribute.Intelligence].value}</div>
                <div className="sheet-alchemy-exp">{character.skills[Skill.Alchemy].expertise}</div>
                <div className="sheet-alchemy-foc">{character.skills[Skill.Alchemy].focus}</div>
                <div className="sheet-alchemy-tn">{character.skills[Skill.Alchemy].expertise + character.attributes[Attribute.Intelligence].value}</div>
                <div className="sheet-craft-exp">{character.skills[Skill.Craft].expertise}</div>
                <div className="sheet-craft-foc">{character.skills[Skill.Craft].focus}</div>
                <div className="sheet-craft-tn">{character.skills[Skill.Craft].expertise + character.attributes[Attribute.Intelligence].value}</div>
                <div className="sheet-healing-exp">{character.skills[Skill.Healing].expertise}</div>
                <div className="sheet-healing-foc">{character.skills[Skill.Healing].focus}</div>
                <div className="sheet-healing-tn">{character.skills[Skill.Healing].expertise + character.attributes[Attribute.Intelligence].value}</div>
                <div className="sheet-linguistics-exp">{character.skills[Skill.Linguistics].expertise}</div>
                <div className="sheet-linguistics-foc">{character.skills[Skill.Linguistics].focus}</div>
                <div className="sheet-linguistics-tn">{character.skills[Skill.Linguistics].expertise + character.attributes[Attribute.Intelligence].value}</div>
                <div className="sheet-lore-exp">{character.skills[Skill.Lore].expertise}</div>
                <div className="sheet-lore-foc">{character.skills[Skill.Lore].focus}</div>
                <div className="sheet-lore-tn">{character.skills[Skill.Lore].expertise + character.attributes[Attribute.Intelligence].value}</div>
                <div className="sheet-warfare-exp">{character.skills[Skill.Siegecraft].expertise}</div>
                <div className="sheet-warfare-foc">{character.skills[Skill.Siegecraft].focus}</div>
                <div className="sheet-warfare-tn">{character.skills[Skill.Siegecraft].expertise + character.attributes[Attribute.Intelligence].value}</div>

                <div className="sheet-personality">{character.attributes[Attribute.Personality].value}</div>
                <div className="sheet-animal-exp">{character.skills[Skill.Animal_Handling].expertise}</div>
                <div className="sheet-animal-foc">{character.skills[Skill.Animal_Handling].focus}</div>
                <div className="sheet-animal-tn">{character.skills[Skill.Animal_Handling].expertise + character.attributes[Attribute.Personality].value}</div>
                <div className="sheet-command-exp">{character.skills[Skill.Command].expertise}</div>
                <div className="sheet-command-foc">{character.skills[Skill.Command].focus}</div>
                <div className="sheet-command-tn">{character.skills[Skill.Command].expertise + character.attributes[Attribute.Personality].value}</div>
                <div className="sheet-counsel-exp">{character.skills[Skill.Counsel].expertise}</div>
                <div className="sheet-counsel-foc">{character.skills[Skill.Counsel].focus}</div>
                <div className="sheet-counsel-tn">{character.skills[Skill.Counsel].expertise + character.attributes[Attribute.Personality].value}</div>
                <div className="sheet-persuade-exp">{character.skills[Skill.Persuade].expertise}</div>
                <div className="sheet-persuade-foc">{character.skills[Skill.Persuade].focus}</div>
                <div className="sheet-persuade-tn">{character.skills[Skill.Persuade].expertise + character.attributes[Attribute.Personality].value}</div>
                <div className="sheet-society-exp">{character.skills[Skill.Society].expertise}</div>
                <div className="sheet-society-foc">{character.skills[Skill.Society].focus}</div>
                <div className="sheet-society-tn">{character.skills[Skill.Society].expertise + character.attributes[Attribute.Personality].value}</div>

                <div className="sheet-willpower">{character.attributes[Attribute.Willpower].value}</div>
                <div className="sheet-discipline-exp">{character.skills[Skill.Discipline].expertise}</div>
                <div className="sheet-discipline-foc">{character.skills[Skill.Discipline].focus}</div>
                <div className="sheet-discipline-tn">{character.skills[Skill.Discipline].expertise + character.attributes[Attribute.Willpower].value}</div>
                <div className="sheet-sorcery-exp">{character.skills[Skill.Sorcery].expertise}</div>
                <div className="sheet-sorcery-foc">{character.skills[Skill.Sorcery].focus}</div>
                <div className="sheet-sorcery-tn">{character.skills[Skill.Sorcery].expertise + character.attributes[Attribute.Willpower].value}</div>

                <div className="sheet-social">{character.socialStanding}</div>
                <div className="sheet-gold">{character.gold}</div>
                {fortune}

                <div className="sheet-ranged">+{character.rangedBonus}</div>
                <div className="sheet-melee">+{character.meleeBonus}</div>
                <div className="sheet-presence">+{character.mentalBonus}</div>

                <div className="sheet-belongings">{belongings}</div>
            </div>
        );
    }
}