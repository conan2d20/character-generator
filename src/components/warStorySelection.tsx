import * as React from 'react';
import { character } from '../common/character';
import { SkillsHelper } from '../helpers/skills';
import { Source } from '../helpers/sources';
import { WarStoriesHelper, WarStoryModel } from '../helpers/warStories';
import { Button } from './button';

interface ICasteSelectionProperties {
  header: string;
  options: WarStoryModel[];
  onSelection: (story: number) => void;
  onCancel: () => void;
}

export class WarStorySelection extends React.Component<ICasteSelectionProperties, {}> {
  constructor(props: ICasteSelectionProperties) {
    super(props);
  }

  render() {
    const stories = this.props.options
      .sort((a, b) => {
        return a.description.localeCompare(b.description);
      })
      .map((ws, i) => {
        const skills = ws.skills.map((s, i) => {
          return <div>{SkillsHelper.getSkillName(s)}</div>;
        });

        return (
          <tr key={i}>
            <td className="selection-header">{ws.description}</td>
            <td>{skills}</td>
            <td>
              <Button
                className="button-small"
                text="Select"
                onClick={() => {
                  this.props.onSelection(ws.roll);
                }}
              />
            </td>
          </tr>
        );
      });

    return (
      <div>
        <div className="header-text">{this.props.header}</div>
        <table className="selection-list">
          <thead>
            <tr>
              <td></td>
              <td>
                <b>Skill Improvements</b>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>{stories}</tbody>
        </table>
        <Button text="Cancel" className="button" onClick={() => this.props.onCancel()} />
      </div>
    );
  }
}
