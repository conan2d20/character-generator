import * as React from 'react';
import { character } from '../common/character';
import { Caste, CastesHelper } from '../helpers/castes';
import { SkillsHelper } from '../helpers/skills';
import { Button } from './button';

interface ICasteSelectionProperties {
  onSelection: (caste: Caste) => void;
  onCancel: () => void;
}

export class CasteSelection extends React.Component<ICasteSelectionProperties, {}> {
  constructor(props: ICasteSelectionProperties) {
    super(props);
  }

  render() {
    var castes = CastesHelper.getCastes().map((c, i) => {
      const talents = c.talents.map((t, i) => {
        return <div>{t.name}</div>;
      });

      return (
        <tr key={i}>
          <td className="selection-header">{c.name}</td>
          <td>{talents}</td>
          <td>{c.skill > -1 ? SkillsHelper.getSkillName(c.skill) : 'Animal Handling/Healing'}</td>
          <td>{c.socialStanding}</td>
          <td>
            <Button
              className="button-small"
              text="Select"
              onClick={() => {
                this.props.onSelection(c.id);
              }}
            />
          </td>
        </tr>
      );
    });

    return (
      <div>
        <div className="header-text">SELECT CASTE</div>
        <table className="selection-list">
          <thead>
            <tr>
              <td></td>
              <td>
                <b>Talents</b>
              </td>
              <td>
                <b>Skill</b>
              </td>
              <td>
                <b>Social Standing</b>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>{castes}</tbody>
        </table>
        <Button text="Cancel" className="button" onClick={() => this.props.onCancel()} />
      </div>
    );
  }
}
