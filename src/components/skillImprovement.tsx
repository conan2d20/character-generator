import * as React from 'react';
import { character } from '../common/character';
import { Skill, SkillsHelper } from '../helpers/skills';

interface ISkillImprovementProperties {
  //controller: SkillImprovementCollection;
  skill: Skill;
  expertise: number;
  focus: number;
  showIncrease: boolean;
  showDecrease: boolean;
}

export class SkillImprovement extends React.Component<ISkillImprovementProperties, {}> {
  constructor(props: ISkillImprovementProperties) {
    super(props);
  }

  render() {
    const { skill, expertise, focus, showDecrease, showIncrease } = this.props;

    const dec = showDecrease ? (
      <button
        onClick={() => {
          this.onDecrease();
        }}
      >
        -
      </button>
    ) : undefined;

    const inc =
      showIncrease && character.skills[skill].expertise < 5 ? (
        <button
          onClick={() => {
            this.onIncrease();
          }}
        >
          +
        </button>
      ) : undefined;

    return (
      <div>
        {SkillsHelper.getSkillName(skill)}
        <br />
        Expertise: {expertise}
        <br />
        Focus: {focus}
      </div>
    );
  }

  private onDecrease() {
    //this.props.controller.onDecrease(this.props.attribute);
  }

  private onIncrease() {
    //this.props.controller.onIncrease(this.props.attribute);
  }
}
