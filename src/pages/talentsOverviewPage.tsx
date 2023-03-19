import React = require('react');
import { character } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { DropDownInput } from '../components/dropDownInput';
import { CastesHelper } from '../helpers/castes';
import { HomelandsHelper } from '../helpers/homelands';
import { Skill, SkillsHelper } from '../helpers/skills';
import { Source } from '../helpers/sources';
import { ITalentPrerequisite, TalentsHelper } from '../helpers/talents';

class TalentViewModel {
  name: string;
  description: string;
  source: string;
  prerequisites: string;

  constructor(name: string, description: string, source: string, prerequisites: string) {
    this.name = name;
    this.description = description;
    this.source = source;
    this.prerequisites = prerequisites;
  }
}

export class TalentsOverviewPage extends React.Component<{}, {}> {
  private _categories: string[] = [];
  private _category: string = '';
  private _talents: { [category: string]: TalentViewModel[] } = {};

  constructor(props: {}) {
    super(props);

    SetHeaderText('Talents');

    this.setupSources();
    this.setupCategories();
    this.loadTalents();
  }

  render() {
    const talents = this._talents[this._category].map((t, i) => {
      return (
        <tr key={i}>
          <td className="selection-header">
            {t.name}
            <div className="selection-header-small">({t.source})</div>
          </td>
          <td>
            <div>
              <b>Prerequisites:</b> {t.prerequisites}
            </div>
            <br />
            <div>{t.description}</div>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <div className="float-top">
          <DropDownInput
            items={this._categories}
            defaultValue={this._category}
            onChange={(index) => {
              this.onCategoryChanged(index);
            }}
          />
        </div>
        <div className="page">
          <table className="selection-list">
            <tbody>{talents}</tbody>
          </table>
        </div>
      </div>
    );
  }

  private setupSources() {
    for (let source in Object.keys(Source).filter((src) => !isNaN(Number(Source[src])))) {
      let src = Number(source);
      character.addSource(src);
    }
  }

  private setupCategories() {
    var skillFilter = [25, 26, 27, 37];

    for (let sk in Object.keys(Skill).filter((skill) => !isNaN(Number(Skill[skill])))) {
      if (skillFilter.indexOf(Number(sk)) === -1) {
        let s = SkillsHelper.getSkillName(Number(sk));
        this._categories.push(s);
      }
    }

    this._categories.push('Ancient Bloodlines');
    this._categories.push('Castes');
    this._categories.push('Homelands');

    this._categories = this._categories.sort((a, b) => a.localeCompare(b));
    this._category = this._categories[0];

    for (var c = 0; c < this._categories.length; c++) {
      const category = this._categories[c];
      if (!this._talents[category]) {
        this._talents[category] = [];
      }
    }
  }

  private loadTalents() {
    for (var c = 0; c < this._categories.length; c++) {
      const category = this._categories[c];
      console.log(category);
      if (category === 'Castes') {
        const castes = CastesHelper.getCastes();
        for (var i = 0; i < castes.length; i++) {
          let caste = castes[i];
          for (var j = 0; j < caste.talents.length; j++) {
            const talent = TalentsHelper.getTalent(caste.talents[j].name);
            if (!this.hasTalent(this._talents[category], talent.name)) {
              this._talents[category].push(
                new TalentViewModel(
                  talent.name,
                  talent.description,
                  this.getSource(talent.name),
                  this.prerequisitesToString(talent.prerequisites)
                )
              );
            }
          }
        }
      } else if (category === 'Homelands') {
        const homelands = HomelandsHelper.getHomelands();
        for (var i = 0; i < homelands.length; i++) {
          let homeland = homelands[i];
          if (homeland.talent) {
            const talent = TalentsHelper.getTalent(homeland.talent.name);
            if (!this.hasTalent(this._talents[category], talent.name)) {
              this._talents[category].push(
                new TalentViewModel(
                  talent.name,
                  talent.description,
                  this.getSource(talent.name),
                  this.prerequisitesToString(talent.prerequisites)
                )
              );
            }
          }
        }

        if (!this.hasTalent(this._talents[category], 'Primitive')) {
          const tal = TalentsHelper.getTalent('Primitive');
          this._talents[category].push(
            new TalentViewModel(
              tal.name,
              tal.description,
              this.getSource(tal.name),
              this.prerequisitesToString(tal.prerequisites)
            )
          );
        }

        if (!this.hasTalent(this._talents[category], 'Uncivilized')) {
          const tal = TalentsHelper.getTalent('Uncivilized');
          this._talents[category].push(
            new TalentViewModel(
              tal.name,
              tal.description,
              this.getSource(tal.name),
              this.prerequisitesToString(tal.prerequisites)
            )
          );
        }
      } else if (category === 'Ancient Bloodlines') {
        const noneTalents = TalentsHelper.getTalents()[Skill.None];
        for (var i = 0; i < noneTalents.length; i++) {
          const talent = noneTalents[i];
          if (talent.name.indexOf('Ancient Bloodline') !== -1) {
            this._talents[category].push(
              new TalentViewModel(
                talent.name,
                talent.description,
                this.getSource(talent.name),
                this.prerequisitesToString(talent.prerequisites)
              )
            );
          }
        }
      } else {
        const talents = TalentsHelper.getTalents()[SkillsHelper.toSkill(category)];
        for (var i = 0; i < talents.length; i++) {
          const talent = talents[i];
          this._talents[category].push(
            new TalentViewModel(
              talent.name,
              talent.description,
              this.getSource(talent.name),
              this.prerequisitesToString(talent.prerequisites)
            )
          );
        }
      }

      this._talents[category].sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  private hasTalent(talents: TalentViewModel[], name: string) {
    return talents.some((t) => t.name === name);
  }

  private getSource(talent: string) {
    return Source[TalentsHelper.getSourceForTalent(talent)];
  }

  private prerequisitesToString(pre: {}[]) {
    var result = [];

    for (var p in pre) {
      var prereq = pre[p] as ITalentPrerequisite;
      var s = prereq.str();
      if (s.length > 0) {
        result.push(prereq.str());
      }
    }

    return result.join(', ');
  }

  private onCategoryChanged(index: number) {
    this._category = this._categories[index];
    this.forceUpdate();
  }
}
