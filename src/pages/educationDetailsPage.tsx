import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { Dialog } from '../components/dialog';
import { ElectiveSkillList } from '../components/electiveSkillList';
import { EquipmentList } from '../components/equipmentList';
import { PageHeader } from '../components/pageHeader';
import { SkillView } from '../components/skill';
import { TalentList } from '../components/talentList';
import { TalentSelection } from '../components/talentSelection';
import { Education, EducationsHelper } from '../helpers/educations';
import { Skill, SkillsHelper } from '../helpers/skills';
import { Source } from '../helpers/sources';
import { TalentsHelper } from '../helpers/talents';
import { IPageProperties, PageIdentity } from './pageFactory';

export class EducationDetailsPage extends React.Component<IPageProperties, {}> {
  private _selectedTalent: string;
  private _selectedEquipment: string;
  private _electiveSkills: Skill[];

  constructor(props: IPageProperties) {
    super(props);

    // Doing this here to better support random creation, where certain educations are dependent on an archetype.
    EducationsHelper.applyEducation(character.education);

    var education = EducationsHelper.getEducation(character.education);
    education.equipment.forEach((eq) => {
      if (eq.indexOf('|') > -1) {
        const e = eq.split('|');
        this._selectedEquipment = e[0];
      }
    });

    if (education.source === Source.Cults) {
      this._selectedTalent = 'Scribe';
    }

    this._electiveSkills = [];
  }

  render() {
    var education = EducationsHelper.getEducation(character.education);

    const mandatory = character.educationMandatory.map((s, i) => {
      return <SkillView key={i} skill={s} points={1} />;
    });

    let talentSkills = [...character.educationTalentSkills];
    if (character.useWeedOfSorcery) {
      talentSkills.push(Skill.Sorcery);
    }

    let talent =
      education.source !== Source.Cults ? (
        <TalentList skills={talentSkills} onSelection={(talent) => this.onTalentSelected(talent)} />
      ) : (
        <TalentSelection talents={['Scribe']} onSelection={(talent) => this.onTalentSelected(talent)} />
      );

    const buttonLabel = character.isExile() ? 'EXILED BACKGROUND' : 'NOTABLE EVENT';

    return (
      <div className="page">
        <div className="header-text">{education.name}</div>
        <div className="panel">
          <div className="desc-text">{education.description}</div>
        </div>
        <div className="panel">
          <div className="header-small">MANDATORY SKILLS</div>
          {mandatory}
        </div>
        <div className="panel">
          <div className="header-small">ELECTIVE SKILLS</div>
          <ElectiveSkillList
            skills={character.educationElective}
            onUpdated={(skills) => this.onElectiveSkillsSelected(skills)}
          />
        </div>
        <div className="panel">
          <div className="header-small">TALENT</div>
          {talent}
        </div>
        <div className="panel">
          <div className="header-small">EQUIPMENT</div>
          <EquipmentList equipment={character.educationEquipment} onSelected={(eq) => this.onEquipmentSelected(eq)} />
        </div>
        <Button text={buttonLabel} className="button-next" onClick={() => this.onNext()} />
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

  private onEquipmentSelected(eq: string) {
    this._selectedEquipment = eq;
  }

  private onNext() {
    if (!this._selectedTalent || this._selectedTalent === 'Select talent') {
      Dialog.show('You have not selected a talent.');
      return;
    }

    if (this._electiveSkills.length === 2) {
      character.addTalent(this._selectedTalent);
      character.addEquipment(this._selectedEquipment);

      if (character.isExile()) {
        Navigation.navigateToPage(PageIdentity.ExiledBackground);
      } else {
        Navigation.navigateToPage(PageIdentity.WarStory);
      }
    } else {
      Dialog.show('You must select 2 Elective Skills before proceeding.');
    }
  }
}
