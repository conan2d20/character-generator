import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { ElectiveSkillList } from '../components/electiveSkillList';
import { SkillView } from '../components/skill';
import { TalentDescription } from '../components/talentDescription';
import { Caste, CastesHelper } from '../helpers/castes';
import { Skill } from '../helpers/skills';
import { IPageProperties, PageIdentity } from './pageFactory';

export class CasteDetailsPage extends React.Component<IPageProperties, {}> {
  constructor(props: IPageProperties) {
    super(props);
  }

  render() {
    var caste = CastesHelper.getCaste(character.caste);

    const talents = caste.talents.map((t, i) => {
      return <TalentDescription key={i} name={t.name} description={t.description} />;
    });

    const skill =
      caste.id === Caste.Tribesperson ? (
        <ElectiveSkillList points={1} skills={[Skill.Animal_Handling, Skill.Healing]} />
      ) : (
        <SkillView skill={caste.skill} points={1} />
      );

    return (
      <div className="page">
        <div className="header-text">{caste.name}</div>
        <div className="panel">
          <div className="desc-text">
            {caste.description}
            <br />
            <br />
            <b>Social Standing:</b> {caste.socialStanding}
          </div>
        </div>
        <div className="panel">
          <div className="header-small">TALENTS</div>
          {talents}
        </div>
        <div className="panel">
          <div className="header-small">SKILL</div>
          <div>{skill}</div>
        </div>
        <CopyrightDisclaimer />
        <Button text="STORY" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private onNext() {
    Navigation.navigateToPage(PageIdentity.Story);
  }
}
