﻿import * as React from 'react';
import {character, CreationMode} from '../common/character';
import {Skill, SkillsHelper} from '../helpers/skills';
import {CheckBox} from '../components/checkBox';
import {Button} from '../components/button';

interface IElectiveSkillProperties {
    skill: Skill;
    isSelected: boolean;
    showCheckBox?: boolean;
    onSelected: (val: any) => void;
}

class ElectiveSkill extends React.Component<IElectiveSkillProperties, {}> {
    constructor(props: IElectiveSkillProperties) {
        super(props);
    }

    render() {
        const {skill, onSelected, isSelected, showCheckBox} = this.props;

        const skillExpertise = character.skills[skill].expertise;
        const skillFocus = character.skills[skill].focus;

        const checkBox = showCheckBox
            ? <CheckBox value={skill} onChanged={val => onSelected(val) } isChecked={isSelected} />
            : undefined;

        return (
            <table className="skill-container" cellPadding="0" cellSpacing="0">
                <tbody>
                    <tr>
                        <td className="skill-name">{SkillsHelper.getSkillName(skill) }</td>
                        <td>{checkBox}</td>
                    </tr>
                    <tr>
                        <td className="skill-expertise">Expertise</td>
                        <td>{skillExpertise}</td>
                    </tr>
                    <tr>
                        <td className="skill-focus">Focus</td>
                        <td>{skillFocus}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

interface IElectiveSkillListProperties {
    skills: Skill[];
    points?: number;
    onUpdated?: (skills: Skill[]) => void;
}

export class ElectiveSkillList extends React.Component<IElectiveSkillListProperties, {}> {
    private _selected: Skill[];
    private _hasRandomized: boolean;

    constructor(props: IElectiveSkillListProperties) {
        super(props);
        this._selected = [];
        this._hasRandomized = false;
    }

    render() {
        const skills = this.props.skills.map((s, i) => {
            const isSelected = this._selected.indexOf(s) > -1;
            return (<ElectiveSkill key={i} skill={s} isSelected={isSelected} showCheckBox={!this._hasRandomized} onSelected={skill => this.onSelect(skill) }/>)
        });

        const desc = character.creationMode === CreationMode.Random
            ? "Select one elective skill. Then press Random to randomly select a second elective skill."
            : undefined;

        const random = character.creationMode === CreationMode.Random && this._selected.length === 1 && !this._hasRandomized
            ? <Button className="button-small" text="Random skill" onClick={() => this.randomSkill() } />
            : undefined;

        return (
            <div>
                <div>{desc}</div>
                {skills}
                <br/>
                {random}
            </div>
        );
    }

    private randomSkill() {
        let skills = [];
        this.props.skills.forEach(skill => {
            if (this._selected.indexOf(skill) === -1) {
                skills.push(skill);
            }
        });

        const roll = Math.floor(Math.random() * 20) + 1;
        this._selected.push(roll <= 10 ? skills[0] : skills[1]);
        this.select(roll <= 10 ? skills[0] : skills[1]);

        this._hasRandomized = true;

        if (this.props.onUpdated) {
            this.props.onUpdated(this._selected);
        }
        else {
            this.forceUpdate();
        }
    }

    private onSelect(skill: Skill) {
        const n = this._selected.indexOf(skill);

        if (n < 0) {
            this._selected.push(skill);

            if (this._selected.length === (this.props.points + 1 || (character.creationMode !== CreationMode.Random ? 3 : 2))) {
                this.deselect(this._selected[0]);
                this._selected.splice(0, 1);
            }

            this.select(skill);
        }
        else {
            this._selected.splice(n, 1);
            this.deselect(skill);
        }

        if (this.props.onUpdated) {
            this.props.onUpdated(this._selected);
        }
        else {
            this.forceUpdate();
        }
    }

    private select(skill: Skill) {
        character.skills[skill].expertise++;
        character.skills[skill].focus++;
    }

    private deselect(skill: Skill) {
        character.skills[skill].expertise--;
        character.skills[skill].focus--;
    }
}