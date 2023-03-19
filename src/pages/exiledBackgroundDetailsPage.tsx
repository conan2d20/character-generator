import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { Dialog } from '../components/dialog';
import { ElectiveSkillList } from '../components/electiveSkillList';
import { EquipmentList } from '../components/equipmentList';
import { PageHeader } from '../components/pageHeader';
import { RadioButton } from '../components/radioButton';
import { SkillView } from '../components/skill';
import { TalentList } from '../components/talentList';
import { TalentSelection } from '../components/talentSelection';
import { Attribute } from '../helpers/attributes';
import { Education, EducationsHelper } from '../helpers/educations';
import { ExiledBackgroundHelper } from '../helpers/exiledBackgrounds';
import { Skill, SkillsHelper } from '../helpers/skills';
import { Source } from '../helpers/sources';
import { TalentsHelper } from '../helpers/talents';
import { IPageProperties, PageIdentity } from './pageFactory';

export class ExiledBackgroundDetailsPage extends React.Component<IPageProperties, {}> {
  private _selectedTalent: string;
  private _attribute: Attribute;

  constructor(props: IPageProperties) {
    super(props);
  }

  render() {
    var bg = ExiledBackgroundHelper.getBackground(character.exiledBackground);

    return (
      <div className="page">
        <div className="header-text">{bg.name}</div>
        <div className="panel">
          <div className="desc-text">{bg.description}</div>
        </div>
        <div className="panel">
          <div className="header-small">SKILL BONUS</div>
          <SkillView skill={bg.electiveSkill} points={1} />
        </div>
        <div className="panel">
          <div className="header-small">TALENT</div>
          <TalentList skills={[bg.talentTree]} onSelection={(talent) => this.onTalentSelected(talent)} />
        </div>
        <div className="panel">
          <div className="header-small">LOST ATTRIBUTE</div>
          <table className="selection-list">
            <tbody>
              <tr>
                <td>
                  <RadioButton
                    groupId="attr"
                    value={bg.reduction[0]}
                    onChanged={(val) => this.onAttributeSelection(val)}
                  />
                </td>
                <td>{Attribute[bg.reduction[0]]}</td>
                <td>
                  {this._attribute === bg.reduction[0]
                    ? character.attributes[bg.reduction[0]].value - 1
                    : character.attributes[bg.reduction[0]].value}
                </td>
              </tr>
              <tr>
                <td>
                  <RadioButton
                    groupId="attr"
                    value={bg.reduction[1]}
                    onChanged={(val) => this.onAttributeSelection(val)}
                  />
                </td>
                <td>{Attribute[bg.reduction[1]]}</td>
                <td>
                  {this._attribute === bg.reduction[1]
                    ? character.attributes[bg.reduction[1]].value - 1
                    : character.attributes[bg.reduction[1]].value}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="panel">
          <div className="header-small">MEMENTO</div>
          <EquipmentList equipment={[bg.memento]} onSelected={() => {}} />
        </div>
        <Button text="NOTABLE EVENT" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private onAttributeSelection(attribute: Attribute) {
    this._attribute = attribute;
    this.forceUpdate();
  }

  private onTalentSelected(talent: string) {
    this._selectedTalent = talent;
  }

  private onNext() {
    if (!this._selectedTalent || this._selectedTalent === 'Select talent') {
      Dialog.show('You have not selected a talent.');
      return;
    }

    if (this._attribute === undefined) {
      Dialog.show('You have not selected a lost attribute.');
      return;
    }

    character.attributes[this._attribute].value--;
    character.addTalent(this._selectedTalent);

    Navigation.navigateToPage(PageIdentity.AttributesAndSkills);
  }
}
