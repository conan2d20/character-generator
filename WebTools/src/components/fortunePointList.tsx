import * as React from 'react';
import {character, CharacterSkill} from '../common/character';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {Skill, SkillsHelper} from '../helpers/skills';
import {RadioButton} from './radioButton';

interface IFortunePointListProperties {
    onSelection: (val: string) => void;
}

export class FortunePointList extends React.Component<IFortunePointListProperties, {}> {
    private _selected: string;

    constructor(props: IFortunePointListProperties) {
        super(props);
    }

    render() {
        const attributes = character.attributes.map((a, i) => {
            if (a.value < 14) {
                return (
                    <tr key={i}>
                        <td><RadioButton groupId="box" value={'attr-' + a.attribute} onChanged={val => this.onSelection(val) }/></td>
                        <td>{Attribute[a.attribute] }</td>
                        <td>{this._selected === "attr-" + a.attribute ? a.value + 1 : a.value}</td>
                    </tr>
                )
            }
        });

        const skills = SkillsHelper.getSkills().map((s, i) => {
            if (character.skills[s].expertise < 2) {
                return (
                    <tr key={i}>
                        <td><RadioButton groupId="box" value={'skill-' + s} onChanged={val => this.onSelection(val) }/></td>
                        <td>{SkillsHelper.getSkillName(s) }</td>
                        <td>{this._selected === "skill-" + s ? character.skills[s].expertise + 2 : character.skills[s].expertise} / {this._selected === "skill-" + s ? character.skills[s].focus + 2 : character.skills[s].focus}</td>
                    </tr>
                )
            }
        });

        return (
            <table className="selection-list">
                <tbody>
                    <tr>
                        <td style={{ width: "50px" }}>
                            <RadioButton groupId="box" value="None" onChanged={val => this.onSelection(val) } />
                        </td>
                        <td style={{ width: "150px" }}>
                            None
                        </td>
                        <td></td>
                    </tr>
                    <tr className="selection-list-header">
                        <td></td>
                        <td>ATTRIBUTE</td>
                        <td>VALUE</td>
                    </tr>
                    {attributes}
                    <tr className="selection-list-header">
                        <td></td>
                        <td>SKILL</td>
                        <td>EXPERTISE / FOCUS</td>
                    </tr>
                    {skills}
                </tbody>
            </table>
        );
    }

    private onSelection(val: string) {
        this._selected = val;
        this.props.onSelection(val);
    }
}