import * as React from 'react';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { AttributeImprovementCollection, AttributeImprovementCollectionMode } from '../components/attributeImprovement';
import { Button } from '../components/button';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { Dialog } from '../components/dialog';
import { LegendarySkills } from '../components/legendarySkills';
import { Skill, SkillsHelper } from '../helpers/skills';
import { IPageProperties, PageIdentity } from './pageFactory';

export class AttributesAndSkillsPage extends React.Component<IPageProperties, {}> {
  private _legendarySkills: Skill[];
  private _attributesAreDone: boolean;

  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('ATTRIBUTES & SKILLS');
  }

  render() {
    return (
      <div className="page">
        <div className="page-text">Improve attributes and skills.</div>
        <div className="panel">
          <div className="header-small">ATTRIBUTES</div>
          <div>
            Either increase <b>one</b> attribute by +2, or <b>two</b> attributes by +1 each.
          </div>
          <AttributeImprovementCollection
            mode={AttributeImprovementCollectionMode.Increase}
            points={2}
            onDone={(done) => this.onAttributesDone(done)}
          />
        </div>
        <div className="panel">
          <div className="header-small">SKILLS</div>
          <div>
            Distribute <b>3</b> skill points on any of your skills.
          </div>
          <LegendarySkills
            skills={SkillsHelper.getSkills()}
            points={3}
            onLegendarySelected={(skills) => this.onLegendarySelected(skills)}
          />
        </div>
        <CopyrightDisclaimer />
        <Button text="NEXT" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private onAttributesDone(done: boolean) {
    this._attributesAreDone = done;
  }

  private onLegendarySelected(skills: Skill[]) {
    this._legendarySkills = skills;
    this.forceUpdate();
  }

  private onNext() {
    if (this._attributesAreDone) {
      Navigation.navigateToPage(PageIdentity.TalentAndLanguages);
    } else {
      Dialog.show('You must increase up to 2 attributes before proceeding.');
    }
  }
}
