import * as React from 'react';
import { Skill } from '../helpers/skills';
import { TalentsHelper, TalentViewModel } from '../helpers/talents';
import { CheckBox } from './checkBox';
import { DropDownInput } from './dropDownInput';

interface ITalentListProperties {
  skills: Skill[];
  onSelection: (talent: string) => void;
}

export class TalentList extends React.Component<ITalentListProperties, {}> {
  private _talents: TalentViewModel[];
  private _selectedIndex: number;
  private _talent: string;

  constructor(props: ITalentListProperties) {
    super(props);
    this._talents = [];
    this._selectedIndex = 0;
  }

  componentWillReceiveProps(props: ITalentListProperties) {
    this._selectedIndex = 0;
    this.props.onSelection('');
  }

  render() {
    this._talents = TalentsHelper.getTalentsForSkills([
      ...this.props.skills,
      Skill.Bard,
      Skill.Berserk,
      Skill.Adherent,
      Skill.Falconry,
      Skill.Griot,
      Skill.MartialArts,
      Skill.Philosophy,
      Skill.Outlaw,
    ]);
    this._talents = this._talents.filter(
      (value, index, array) => !array.filter((v, i) => value.name === v.name && i < index).length
    );

    const talents = this._talents.map((t, i) => {
      return (
        <tr key={i}>
          <td className="selection-header-small">{t.name}</td>
          <td>{t.description}</td>
          <td>
            <CheckBox
              text=""
              value={t.name}
              isChecked={this._talent === t.name}
              onChanged={(val) => {
                this.selectTalent(val);
              }}
            />
          </td>
        </tr>
      );
    });

    return (
      <table className="selection-list">
        <tbody>{talents}</tbody>
      </table>
    );
  }

  private selectTalent(talent: string) {
    this._talent = talent;
    this.props.onSelection(this._talent);
    this.forceUpdate();
  }
}
