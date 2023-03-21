import * as React from 'react';
import { character } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { Dialog } from '../components/dialog';
import { DropDownInput } from '../components/dropDownInput';
import { LanguageList } from '../components/languageList';
import { TalentDescription } from '../components/talentDescription';
import { TalentSelection } from '../components/talentSelection';
import { Skill, SkillsHelper } from '../helpers/skills';
import { TalentsHelper } from '../helpers/talents';
import { IPageProperties, PageIdentity } from './pageFactory';

export class TalentAndLanguagesPage extends React.Component<IPageProperties, {}> {
  private _talent: string;
  private _bloodlines: string[];
  private _bloodline: string;
  private _bloodlineDesc: string;
  private _languages: string[];
  private _numLanguages: number;

  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('TALENT & LANGUAGES');

    this._languages = [];
    this._numLanguages = 1 + character.skills[Skill.Linguistics].focus;

    if (character.hasTalent('Hyperliterate')) {
      this._numLanguages += character.skills[Skill.Linguistics].focus;
    }

    const talents = TalentsHelper.getTalentsForSkills([
      ...SkillsHelper.getSkills(),
      Skill.Bard,
      Skill.Berserk,
      Skill.Adherent,
      Skill.Falconry,
      Skill.Griot,
      Skill.MartialArts,
      Skill.Philosophy,
      Skill.Outlaw,
    ]);
    this._talent = talents[0].name;

    const bloodlineTalents = TalentsHelper.getTalentsForSkills([Skill.None]).filter((t) => {
      return t.name.indexOf('Ancient Bloodline') > -1;
    });

    if (bloodlineTalents && bloodlineTalents.length > 0) {
      this._bloodlines = bloodlineTalents.map((t) => {
        return t.name;
      });

      this._bloodline = bloodlineTalents[0].name;
      this._bloodlineDesc = bloodlineTalents[0].description;
      character.bloodlineTalent = character.ancientBloodline ? this._bloodline : '';
    }
  }

  render() {
    const bloodline = character.ancientBloodline ? (
      <div className="panel">
        <div className="header-small">ANCIENT BLOODLINE</div>
        <div>
          Select an <b>ancient bloodline</b> talent.
        </div>
        <DropDownInput
          items={this._bloodlines}
          defaultValue={this._bloodline}
          onChange={(e) => this.onBloodlineSelected(e)}
        />
        <TalentDescription name={this._bloodline} description={this._bloodlineDesc} />
      </div>
    ) : undefined;

    return (
      <div className="page">
        <div className="page-text">Select a talent and additional languages.</div>
        <div className="panel">
          <div className="header-small">TALENT</div>
          <div>
            Select <b>one</b> talent for any of your skills.
          </div>
          <TalentSelection onSelection={(talent) => this.onTalentSelected(talent)} />
        </div>
        {bloodline}
        <div className="panel">
          <div className="header-small">LANGUAGES</div>
          <div>
            Select <b>{this._numLanguages}</b> language(s).
          </div>
          <LanguageList onSelection={(langs) => this.onLanguageSelected(langs)} points={this._numLanguages} />
        </div>
        <CopyrightDisclaimer />
        <Button text="NEXT" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private onTalentSelected(talent: string) {
    this._talent = talent;
  }

  private onBloodlineSelected(index: number) {
    const bloodlineTalents = TalentsHelper.getTalentsForSkills([Skill.None]).filter((t) => {
      return t.name.indexOf('Ancient Bloodline') > -1;
    });

    this._bloodline = bloodlineTalents[index].name;
    this._bloodlineDesc = bloodlineTalents[index].description;

    character.bloodlineTalent = this._bloodline;

    this.forceUpdate();
  }

  private onLanguageSelected(langs: string[]) {
    this._languages = langs;
    this.forceUpdate();
  }

  private onNext() {
    if (this._languages.length === this._numLanguages) {
      character.addTalent(this._talent);

      this._languages.forEach((lang) => {
        character.addLanguage(lang);
      });

      Navigation.navigateToPage(PageIdentity.FortunePoints);
    } else {
      Dialog.show(`You need to select ${this._numLanguages} languages.`);
    }
  }
}
