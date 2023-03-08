import * as React from 'react';
import {character} from '../common/character';
import {Events, EventIdentity} from '../common/eventChannel';
import {ArchetypesHelper} from '../helpers/archetypes';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {CastesHelper} from '../helpers/castes';
import {EducationsHelper} from '../helpers/educations';
import {HomelandsHelper} from '../helpers/homelands';
import {NaturesHelper} from '../helpers/natures';
import {Skill, SkillsHelper} from '../helpers/skills';
import {TalentsHelper} from '../helpers/talents';

interface ICharacterSheetProperties {
    isVisible?: boolean;
}

class SectionContent {
    name: string;
    value: any;

    constructor(name: string, value: any) {
        this.name = name;
        this.value = value;
    }
}

class CharacterSheetData {
    private _data: SectionContent[] = [
        new SectionContent("HOMELAND", character.region ? character.region : character.homeland >= 0 ? HomelandsHelper.getHomeland(character.homeland).name : "None"),
        new SectionContent("ATTRIBUTE ASPECTS", character.firstAspect >= 0 ? AttributesHelper.getAttributeAspect(character.firstAspect).name + " & " + AttributesHelper.getAttributeAspect(character.secondAspect).name : "None"),
        new SectionContent("CASTE", character.caste >= 0 ? CastesHelper.getCaste(character.caste).name : "None"),
        new SectionContent("ARCHETYPE", character.archetype >= 0 ? ArchetypesHelper.getArchetype(character.archetype).name : "None"),
        new SectionContent("NATURE", character.nature >= 0 ? NaturesHelper.getNature(character.nature).name : "None"),
        new SectionContent("EDUCATION", character.education >= 0 ? EducationsHelper.getEducation(character.education).name : "None"),
        new SectionContent("STORY", character.story ? character.story : ""),
        new SectionContent("TRAIT", character.trait ? character.trait : ""),
        new SectionContent("WAR STORY", character.warStory ? character.warStory : ""),
        new SectionContent("SOCIAL STANDING", character.socialStanding),
        new SectionContent("GOLD", character.gold),
        new SectionContent("FORTUNE POINTS", character.fortunePoints),
        new SectionContent("VIGOR", character.vigour),
        new SectionContent("RESOLVE", character.resolve),
    ];

    private _attributes1: Attribute[] = [
        Attribute.Agility,
        Attribute.Awareness,
        Attribute.Brawn,
        Attribute.Coordination
    ];

    private _attributes2: Attribute[] = [
        Attribute.Intelligence,
        Attribute.Personality,
        Attribute.Willpower
    ];

    get dataSection() {
        return this._data;
    }

    get firstAttributesSection() {
        return this._attributes1;
    }

    get secondAttributesSection() {
        return this._attributes2;
    }
}

export class CharacterSheet extends React.Component<ICharacterSheetProperties, {}> {
    private _sheetData: CharacterSheetData;

    constructor(props: ICharacterSheetProperties) {
        super(props);

        this._sheetData = new CharacterSheetData();

        Events.listen(EventIdentity.UpdateCharacter, () => {
            this._sheetData = new CharacterSheetData();
            this.forceUpdate();
        });
    }

    render() {
        const data = this._sheetData.dataSection.map((s, i) => {
            return (
                <tr key={i}>
                    <td className="bg-dark">{s.name}</td>
                    <td className="bg-light border-dark text-dark">{s.value}</td>
                </tr>
            )
        });

        const attributesAndSkills1 = this._sheetData.firstAttributesSection.map((a, i) => {
            const skills = SkillsHelper.getSkillsForAttribute(a).map((s, i) => {
                return (
                    <tr key={i}>
                        <td className="bg-light border-dark text-dark sheet-skillname">
                            {SkillsHelper.getSkillName(s).toLocaleUpperCase() }
                        </td>
                        <td className="bg-light border-dark text-dark text-center">{character.skills[s].expertise}</td>
                        <td className="bg-light border-dark text-dark text-center">{character.skills[s].focus}</td>
                    </tr>
                )
            });

            return (
                <table className="sheet-section" key={i}>
                    <tbody>
                        <tr>
                            <td className="bg-dark-wide" style={{ padding: "4px" }}>{AttributesHelper.getAttributeName(a).toLocaleUpperCase() }</td>
                            <td colSpan={2} className="bg-light border-dark text-dark text-center">{character.attributes[a].value}</td>
                        </tr>
                        {skills}
                    </tbody>
                </table>
            )
        });

        const attributesAndSkills2 = this._sheetData.secondAttributesSection.map((a, i) => {
            const skills = SkillsHelper.getSkillsForAttribute(a).map((s, i) => {
                return (
                    <tr key={i}>
                        <td className="bg-light border-dark text-dark sheet-skillname">
                            {SkillsHelper.getSkillName(s).toLocaleUpperCase() }
                        </td>
                        <td className="bg-light border-dark text-dark text-center">{character.skills[s].expertise}</td>
                        <td className="bg-light border-dark text-dark text-center">{character.skills[s].focus}</td>
                    </tr>
                )
            });

            return (
                <table className="sheet-section" key={i}>
                    <tbody>
                        <tr>
                            <td className="bg-dark-wide" style={{ padding: "4px" }}>{AttributesHelper.getAttributeName(a).toLocaleUpperCase() }</td>
                            <td colSpan={2} className="bg-light border-dark text-dark text-center">{character.attributes[a].value}</td>
                        </tr>
                        {skills}
                    </tbody>
                </table>
            )
        });

        let characterTalents = [];
        for (var talent in character.talents) {
            var t = character.talents[talent];
            var tt = TalentsHelper.getTalent(talent);
            if (tt && tt.maxRank > 1) {
                characterTalents.push(talent + " [Rank: " + t.rank + "]");
            } else {
                characterTalents.push(talent);
            }
        }

        if (character.ancientBloodline) {
            characterTalents.push(character.bloodlineTalent);
        }

        const talents = characterTalents.map((t, i) => {
            return (<div key={i}>{t}</div>)
        });

        const equipment = character.equipment.map((e, i) => {
            return (<div key={i}>{e}</div>)
        });

        const languages = character.languages.map((l, i) => {
            return (<div key={i}>{l}</div>)
        });

        let containerClass = "sheet-container";
        if (this.props.isVisible) {
            containerClass = "sheet-container-nonfixed";
        }

        return (
            <div id="character-sheet" className="sheet-hidden">
                <div className="sheet-bg" id="sheet-bg" style={{ display: "none" }}></div>
                <div className={containerClass} id="sheet-container">
                    <div className="sheet-panel">
                        <table className="sheet-section">
                            <tbody>
                                {data}
                            </tbody>
                        </table>
                    </div>
                    <div className="sheet-panel">
                        {attributesAndSkills1}
                    </div>
                    <div className="sheet-panel">
                        {attributesAndSkills2}
                    </div>
                    <div className="sheet-panel">
                        <table className="sheet-section">
                            <tbody>
                                <tr>
                                    <td className="bg-dark">TALENTS</td>
                                    <td className="bg-light border-dark-nopadding text-dark">
                                        {talents}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="sheet-panel">
                        <table className="sheet-section">
                            <tbody>
                                <tr>
                                    <td className="bg-dark">EQUIPMENT</td>
                                    <td className="bg-light border-dark text-dark">
                                        {equipment}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="sheet-panel">
                        <table className="sheet-section">
                            <tbody>
                                <tr>
                                    <td className="bg-dark">LANGUAGES</td>
                                    <td className="bg-light border-dark text-dark">
                                        {languages}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                </div>
            </div>
        );
    }
}