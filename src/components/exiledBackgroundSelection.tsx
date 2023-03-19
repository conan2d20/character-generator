import * as React from 'react';
import { AttributesHelper } from '../helpers/attributes';
import { ExiledBackground, ExiledBackgroundHelper } from '../helpers/exiledBackgrounds';
import { SkillsHelper } from '../helpers/skills';
import { Button } from './button';

interface IExiledBackgroundSelectionProperties {
  onSelection: (bg: ExiledBackground) => void;
  onCancel: () => void;
}

export class ExiledBackgroundSelection extends React.Component<IExiledBackgroundSelectionProperties, {}> {
  constructor(props: IExiledBackgroundSelectionProperties) {
    super(props);
  }

  render() {
    var bgs = ExiledBackgroundHelper.getBackgrounds().map((b, i) => {
      return (
        <tr key={i}>
          <td className="selection-header">{b.name}</td>
          <td>{SkillsHelper.getSkillName(b.electiveSkill)}</td>
          <td>
            {AttributesHelper.getAttributeName(b.reduction[0])}/{AttributesHelper.getAttributeName(b.reduction[1])}{' '}
          </td>
          <td>
            <Button
              className="button-small"
              text="Select"
              onClick={() => {
                this.props.onSelection(b.id);
              }}
            />
          </td>
        </tr>
      );
    });

    return (
      <div>
        <div className="header-text">SELECT EXILED BACKGROUND</div>
        <table className="selection-list">
          <thead>
            <tr>
              <td></td>
              <td>
                <b>Skill Bonus</b>
              </td>
              <td>
                <b>Lost Attribute</b>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>{bgs}</tbody>
        </table>
        <Button text="Cancel" className="button" onClick={() => this.props.onCancel()} />
      </div>
    );
  }
}
