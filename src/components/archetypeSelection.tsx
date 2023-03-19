import * as React from 'react';
import { Archetype, ArchetypesHelper } from '../helpers/archetypes';
import { SkillsHelper } from '../helpers/skills';
import { Button } from './button';

interface IArchetypeSelectionProperties {
  onSelection: (archetype: Archetype) => void;
  onCancel: () => void;
  hideCancel?: boolean;
}

export class ArchetypeSelection extends React.Component<IArchetypeSelectionProperties, {}> {
  constructor(props: IArchetypeSelectionProperties) {
    super(props);
  }

  render() {
    var archetypes = ArchetypesHelper.getArchetypes().map((a, i) => {
      const mandatory = a.mandatorySkills.map((s, i) => {
        return <div>{SkillsHelper.getSkillName(s)}</div>;
      });

      const elective = a.electiveSkills.map((s, i) => {
        return <div>{SkillsHelper.getSkillName(s)}</div>;
      });

      return (
        <tr key={i}>
          <td className="selection-header">{a.name}</td>
          <td>{SkillsHelper.getSkillName(a.careerSkill)}</td>
          <td>{a.careerTalent.name}</td>
          <td>{mandatory}</td>
          <td>{elective}</td>
          <td>
            <Button
              className="button-small"
              text="Select"
              onClick={() => {
                this.props.onSelection(a.id);
              }}
            />
          </td>
        </tr>
      );
    });

    const cancel = !this.props.hideCancel ? (
      <Button text="Cancel" className="button" onClick={() => this.props.onCancel()} />
    ) : undefined;

    return (
      <div>
        <div className="header-text">SELECT ARCHETYPE</div>
        <table className="selection-list">
          <thead>
            <tr>
              <td></td>
              <td>
                <b>Career Skill</b>
              </td>
              <td>
                <b>Talent</b>
              </td>
              <td>
                <b>Mandatory Skills</b>
              </td>
              <td>
                <b>Elective Skills</b>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>{archetypes}</tbody>
        </table>
        {cancel}
      </div>
    );
  }
}
