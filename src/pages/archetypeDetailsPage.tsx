import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { Dialog } from '../components/dialog';
import { ElectiveSkillList } from '../components/electiveSkillList';
import { EquipmentList } from '../components/equipmentList';
import { PageHeader } from '../components/pageHeader';
import { SkillView } from '../components/skill';
import { TalentDescription } from '../components/talentDescription';
import { TalentSelection } from '../components/talentSelection';
import { Archetype, ArchetypesHelper } from '../helpers/archetypes';
import { EquipmentHelper } from '../helpers/equipment';
import { Skill, SkillsHelper } from '../helpers/skills';
import { TalentsHelper } from '../helpers/talents';
import { IPageProperties, PageIdentity } from './pageFactory';

export class ArchetypeDetailsPage extends React.Component<IPageProperties, {}> {
  private _selectedEquipment: string[];
  private _electiveSkills: Skill[];
  private _kits: string[];
  private _talent: string;

  constructor(props: IPageProperties) {
    super(props);

    this._selectedEquipment = [];
    ArchetypesHelper.getArchetype(character.archetype).equipment.forEach((eq) => {
      if (eq.indexOf('|') > -1) {
        const e = eq.split('|');
        this._selectedEquipment.push(e[0]);
      }
    });

    var archetype = ArchetypesHelper.getArchetype(character.archetype);

    if (character.useWeedOfSorcery || character.archetype === Archetype.Veteran) {
      this._talent = archetype.careerTalent.name;
    }

    this._electiveSkills = [];
    this._kits = [];

    this.updateKits();
  }

  render() {
    var archetype = ArchetypesHelper.getArchetype(character.archetype);

    const mandatory = archetype.mandatorySkills.map((s) => {
      return <SkillView key={s} skill={s} points={1} />;
    });

    let veteranTalents = [archetype.careerTalent.name, 'Veteran'];
    if (character.useWeedOfSorcery) {
      veteranTalents.push(
        ...TalentsHelper.getTalentsForSkills([Skill.Sorcery]).map((t) => {
          return t.name;
        })
      );
    }

    const talent =
      character.archetype === Archetype.Veteran ? (
        <div>
          <TalentSelection
            onSelection={(talent) => {
              this.onTalentSelected(talent);
            }}
            talents={veteranTalents}
          />
        </div>
      ) : !character.useWeedOfSorcery ? (
        <div>
          <TalentDescription name={archetype.careerTalent.name} description={archetype.careerTalent.description} />
        </div>
      ) : (
        <div>
          <TalentSelection
            onSelection={(talent) => {
              this.onTalentSelected(talent);
            }}
            talents={[
              archetype.careerTalent.name,
              ...TalentsHelper.getTalentsForSkills([Skill.Sorcery]).map((t) => {
                return t.name;
              }),
            ]}
          />
        </div>
      );

    const equipment = [...archetype.equipment, ...(this._kits || [''])];

    return (
      <div className="page">
        <div className="header-text">{archetype.name}</div>
        <div className="panel">
          <div className="desc-text">{archetype.description}</div>
        </div>
        <div className="panel">
          <div className="header-small">CAREER SKILL</div>
          <SkillView skill={archetype.careerSkill} points={2} />
        </div>
        <div className="panel">
          <div className="header-small">CAREER TALENT</div>
          {talent}
        </div>
        <div className="panel">
          <div className="header-small">MANDATORY SKILLS</div>
          {mandatory}
        </div>
        <div className="panel">
          <div className="header-small">ELECTIVE SKILLS</div>
          <ElectiveSkillList
            skills={archetype.electiveSkills}
            onUpdated={(skills) => this.onElectivSkillsUpdated(skills)}
          />
        </div>
        <div className="panel">
          <div className="header-small">EQUIPMENT</div>
          <EquipmentList equipment={equipment} onSelected={(eq, index) => this.onEquipmentSelected(eq, index)} />
        </div>
        <Button text="NATURE" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private onElectivSkillsUpdated(skills: Skill[]) {
    this._electiveSkills = skills;
    this.updateKits();
    this.forceUpdate();
  }

  private onTalentSelected(talent: string) {
    this._talent = talent;
    this.forceUpdate();
  }

  private updateKits() {
    if (character.archetype !== Archetype.Priest && character.archetype !== Archetype.Scholar) {
      return;
    }

    this._kits = [];

    if (character.archetype === Archetype.Scholar) {
      var archetype = ArchetypesHelper.getArchetype(character.archetype);
      archetype.mandatorySkills.forEach((skill) => {
        this._kits.push(EquipmentHelper.getKitsForSkill(skill));
      });
    }

    this._electiveSkills.forEach((skill) => {
      this._kits.push(EquipmentHelper.getKitsForSkill(skill));
    });
  }

  private onEquipmentSelected(eq: string, index: number) {
    this._selectedEquipment.splice(index, 1, eq);
  }

  private onNext() {
    if (this._electiveSkills.length === 2) {
      this._selectedEquipment.forEach((eq) => {
        if (eq !== 'None') {
          character.addEquipment(eq);
        }
      });

      if (character.useWeedOfSorcery || character.archetype === Archetype.Veteran) {
        if (!this._talent) {
          Dialog.show('You need to select a talent before proceeding.');
          return;
        }

        character.addTalent(this._talent);
      }

      Navigation.navigateToPage(PageIdentity.Nature);
    } else {
      Dialog.show('You must select 2 Elective Skills before proceeding.');
    }
  }
}
