import * as React from 'react';
import { character } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CheckBox } from '../components/checkBox';
import { PageHeader } from '../components/pageHeader';
import { TalentList } from '../components/talentList';
import { Skill } from '../helpers/skills';
import { IPageProperties, PageIdentity } from './pageFactory';

export class WeedOfSorceryPage extends React.Component<IPageProperties, {}> {
  private _talents: string[];

  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('WEED OF SORCERY');

    this._talents = [];
    for (var talent in character.talents) {
      var t = character.talents[talent];
      this._talents.push(talent);
    }
  }

  render() {
    var custTalent = this._talents[this._talents.length - 1];
    var eduTalent = this._talents[this._talents.length - 2];
    var natTalent = this._talents[this._talents.length - 3];
    var archTalent = this._talents[this._talents.length - 4];

    const next = character.hasSpells() ? (
      <Button text="SPELLS" className="button-next" onClick={() => this.onNext(true)} />
    ) : (
      <Button text="FINISH" className="button-next" onClick={() => this.onNext(true)} />
    );

    return (
      <div className="page">
        <div className="page-text">
          You can now opt to exchange your talents from Archetype, Nature, Education and Customization for Sorcery
          talents. If you are not interested in creating a practicing sorcerer, or if your GM does not allow it, skip
          this step.
        </div>
        <div className="button-container">
          <Button text="SKIP" className="button" onClick={() => this.onNext(false)} />
          <div>
            Exchange <b>{custTalent}</b>?
            <TalentList skills={[Skill.Sorcery]} onSelection={(val) => this.onCustomizationTalentChanged(val)} />
          </div>
          <br />
          <div>
            Exchange <b>{eduTalent}</b>?
            <TalentList skills={[Skill.Sorcery]} onSelection={(val) => this.onEducationTalentChanged(val)} />
          </div>
          <br />
          <div>
            Exchange <b>{natTalent}</b>?
            <TalentList skills={[Skill.Sorcery]} onSelection={(val) => this.onNatureTalentChanged(val)} />
          </div>
          <br />
          <div>
            Exchange <b>{archTalent}</b>?
            <TalentList skills={[Skill.Sorcery]} onSelection={(val) => this.onArchetypeTalentChanged(val)} />
          </div>
          <Button text="FINISH" className="button" onClick={() => this.onNext(true)} />
        </div>
      </div>
    );
  }

  private onNext(save: boolean) {
    // TODO: save
    if (character.hasSpells()) {
      Navigation.navigateToPage(PageIdentity.Spells);
    } else {
      Navigation.navigateToPage(PageIdentity.Finish);
    }
  }

  private onCustomizationTalentChanged(talent: string) {
    character.addTalent(talent);
    this.forceUpdate();
  }

  private onEducationTalentChanged(talent: string) {}

  private onNatureTalentChanged(talent: string) {}

  private onArchetypeTalentChanged(talent: string) {}
}
