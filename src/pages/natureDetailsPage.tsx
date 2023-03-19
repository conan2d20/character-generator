import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { AttributeView } from '../components/attribute';
import { Button } from '../components/button';
import { Dialog } from '../components/dialog';
import { ElectiveSkillList } from '../components/electiveSkillList';
import { PageHeader } from '../components/pageHeader';
import { SkillView } from '../components/skill';
import { TalentList } from '../components/talentList';
import { AttributesHelper } from '../helpers/attributes';
import { EducationsHelper } from '../helpers/educations';
import { Nature, NaturesHelper } from '../helpers/natures';
import { Skill, SkillsHelper } from '../helpers/skills';
import { TalentsHelper } from '../helpers/talents';
import { IPageProperties, PageIdentity } from './pageFactory';

export class NatureDetailsPage extends React.Component<IPageProperties, {}> {
  private _electiveSkills: Skill[];
  private _selectedTalent: string;

  constructor(props: IPageProperties) {
    super(props);

    this._electiveSkills = [];
  }

  render() {
    var nature = NaturesHelper.getNature(character.nature);

    const mandatory = nature.mandatory.map((s, i) => {
      return <SkillView key={i} skill={s} points={1} />;
    });

    let talentSkills = [...nature.talentSkills];
    if (character.useWeedOfSorcery) {
      talentSkills.push(Skill.Sorcery);
    }

    return (
      <div className="page">
        <div className="header-text">{nature.name}</div>
        <div className="panel">
          <div className="desc-text">{nature.description}</div>
        </div>
        <div className="panel">
          <div className="header-small">ATTRIBUTE</div>
          <AttributeView
            name={AttributesHelper.getAttributeName(nature.attribute)}
            value={character.attributes[nature.attribute].value}
            points={1}
          />
        </div>
        <div className="panel">
          <div className="header-small">MANDATORY SKILLS</div>
          {mandatory}
        </div>
        <div className="panel">
          <div className="header-small">ELECTIVE SKILLS</div>
          <ElectiveSkillList skills={nature.elective} onUpdated={(skills) => this.onElectiveSkillsSelected(skills)} />
        </div>
        <div className="panel">
          <div className="header-small">TALENT</div>
          <TalentList skills={talentSkills} onSelection={(talent) => this.onTalentSelected(talent)} />
        </div>
        <Button text="EDUCATION" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private onElectiveSkillsSelected(skills: Skill[]) {
    this._electiveSkills = skills;
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

    if (this._electiveSkills.length === 2) {
      character.addTalent(this._selectedTalent);
      Navigation.navigateToPage(PageIdentity.Education);
    } else {
      Dialog.show('You must select 2 Elective Skills before proceeding.');
    }
  }
}
