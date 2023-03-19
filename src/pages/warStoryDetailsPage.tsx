import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { PageHeader } from '../components/pageHeader';
import { SkillView } from '../components/skill';
import { WarStoriesHelper } from '../helpers/warStories';
import { IPageProperties, PageIdentity } from './pageFactory';

export class WarStoryDetailsPage extends React.Component<IPageProperties, {}> {
  constructor(props: IPageProperties) {
    super(props);
  }

  render() {
    var story = WarStoriesHelper.getWarStory(character.warStoryId);

    const skills = story.skills.map((s, i) => {
      return <SkillView key={i} skill={s} points={1} />;
    });

    return (
      <div className="page">
        <div className="header-text">{story.description}</div>
        <br />
        <div className="panel">
          <div className="header-small">SKILL IMPROVEMENTS</div>
          {skills}
        </div>
        <Button text="CUSTOMIZATION" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private onNext() {
    Navigation.navigateToPage(PageIdentity.AttributesAndSkills);
  }
}
