import * as React from 'react';
import { character } from '../common/character';
import { Skill, SkillsHelper } from '../helpers/skills';
import { LegendaryCheckBox } from './LegendaryCheckBox';

interface ILegendarySkillProperties {
  controller: LegendarySkills;
  skill: Skill;
  isLegendary: boolean;
  showIncrease: boolean;
  showDecrease: boolean;
  showLegendary?: boolean;
}

export class LegendarySkill extends React.Component<
  ILegendarySkillProperties,
  {}
> {
  constructor(props: ILegendarySkillProperties) {
    super(props);
  }

  render() {
    const { skill, showDecrease, showIncrease, showLegendary } = this.props;

    const expertise = character.skills[skill].expertise;

    const dec = showDecrease ? (
      <img
        height="20"
        src="img/dec.png"
        onClick={() => {
          this.onDecrease();
        }}
      />
    ) : undefined;

    const inc = showIncrease ? (
      <img
        height="20"
        src="img/inc.png"
        onClick={() => {
          this.onIncrease();
        }}
      />
    ) : undefined;

    return (
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td>
              <div className="skill-name">
                {SkillsHelper.getSkillName(skill)}
              </div>
            </td>
            <td>
              {dec}&nbsp; &nbsp;{inc}
            </td>
          </tr>
          <tr>
            <td className="skill-expertise">Expertise</td>
            <td>{expertise}</td>
          </tr>
          <tr>
            <td className="skill-focus">Focus</td>
            <td>{character.skills[skill].focus}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  private onLegendarySelected(skill: Skill) {
    this.props.controller.onLegendarySelected(skill);
  }

  private onIncrease() {
    this.props.controller.onIncrease(this.props.skill);
  }

  private onDecrease() {
    this.props.controller.onDecrease(this.props.skill);
  }
}

interface ILegendarySkillsProperties {
  points: number;
  skills: Skill[];
  onLegendarySelected: (skills: Skill[]) => void;
}

class SkillContainer {
  skill: Skill;
  value: number;
  minValue: number;
  maxValue: number;
  showDecrease: boolean;
  showIncrease: boolean;
  showLegendary: boolean;
  isLegendary: boolean;

  constructor(
    skill: Skill,
    value: number,
    showDecrease: boolean,
    showIncrease: boolean
  ) {
    this.skill = skill;
    this.value = value;
    this.minValue = value;
    this.maxValue = 5;
    this.showDecrease = showDecrease;
    this.showIncrease = showIncrease;
    this.isLegendary = false;
    this.showLegendary = false;
  }
}

export class LegendarySkills extends React.Component<
  ILegendarySkillsProperties,
  {}
> {
  private _points: number;
  private _skills: SkillContainer[];
  private _legendary: Skill[];

  constructor(props: ILegendarySkillsProperties) {
    super(props);

    this._points = props.points;
    this._skills = [];
    this._legendary = [];

    for (var i = 0; i < character.skills.length; i++) {
      this._skills.push(
        new SkillContainer(i, character.skills[i].expertise, false, true)
      );
    }
  }

  render() {
    const skills = this._skills.map((s, i) => {
      return (
        <LegendarySkill
          key={i}
          controller={this}
          skill={s.skill}
          isLegendary={s.isLegendary}
          showDecrease={s.showDecrease}
          showIncrease={
            s.showIncrease && character.skills[s.skill].expertise < s.maxValue
          }
          showLegendary={s.showLegendary}
        />
      );
    });

    return (
      <div>
        <div>{skills}</div>
      </div>
    );
  }

  onDecrease(skill: Skill) {
    this._points++;

    character.skills[skill].expertise--;
    character.skills[skill].focus--;

    var numEligible = 0;

    this._skills.forEach((container, i) => {
      if (container.skill === skill) {
        container.value--;

        if (container.value < 3 && container.isLegendary) {
          container.isLegendary = false;
          this.removeLegendary(container.skill);
        }

        if (container.value >= 3) {
          numEligible++;
        }
      }

      container.showDecrease = container.value > container.minValue;
      container.showIncrease =
        container.value < container.maxValue && this._points > 0;
    });

    if (numEligible < 3) {
      this._skills.forEach((container, i) => {
        container.showLegendary = container.value >= 3;
      });
    }

    this.forceUpdate();
  }

  onIncrease(skill: Skill) {
    this._points--;

    character.skills[skill].expertise++;
    character.skills[skill].focus++;

    var numEligible = 0;

    this._skills.forEach((container, i) => {
      if (container.skill === skill) {
        container.value++;
      }

      if (container.value >= 3) {
        numEligible++;
      }

      container.showDecrease = container.value > container.minValue;
      container.showIncrease =
        container.value < container.maxValue && this._points > 0;
    });

    if (numEligible < 3 && this._points === 0) {
      this._skills.forEach((container, i) => {
        container.showLegendary = true;
      });
    }

    this.forceUpdate();
  }

  onLegendarySelected(skill: Skill) {
    this._legendary.push(skill);

    if (this._legendary.length === 4) {
      this.deselectLegendary(this._legendary[0]);
      this._legendary.splice(0, 1);
    }

    this.selectLegendary(skill);

    this.props.onLegendarySelected(this._legendary);
    this.forceUpdate();
  }

  private deselectLegendary(skill: Skill) {
    this._skills[skill].isLegendary = false;
    character.skills[skill].isLegendary = false;
  }

  private selectLegendary(skill: Skill) {
    this._skills[skill].isLegendary = true;
    character.skills[skill].isLegendary = true;
  }

  private removeLegendary(skill: Skill) {
    var n = -1;
    for (var i = 0; i < this._skills.length; i++) {
      if (this._skills[i].skill === skill) {
        n = i;
        break;
      }
    }

    if (n > -1) {
      this._legendary.splice(n, 1);
      this.deselectLegendary(skill);
    }
  }
}
