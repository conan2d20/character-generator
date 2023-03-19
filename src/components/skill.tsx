import * as React from 'react';
import { character } from '../common/character';
import { Skill, SkillsHelper } from '../helpers/skills';

interface ISkillProperties {
  skill: Skill;
  points: number;
}

export class SkillView extends React.Component<ISkillProperties, {}> {
  constructor(props: ISkillProperties) {
    super(props);
  }

  render() {
    const { skill, points } = this.props;

    return (
      <div className="skill-container">
        <div className="skill-name">{SkillsHelper.getSkillName(skill)}</div>
        <div className="skill-expertise">
          Expertise (+{points})&nbsp;
          {character.skills[skill].expertise}
        </div>
        <div className="skill-focus">
          Focus (+{points})&nbsp;
          {character.skills[skill].focus}
        </div>
      </div>
    );
  }
}
