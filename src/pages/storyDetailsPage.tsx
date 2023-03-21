import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { StoriesHelper } from '../helpers/stories';
import { IPageProperties, PageIdentity } from './pageFactory';

export class StoryDetailsPage extends React.Component<IPageProperties, {}> {
  constructor(props: IPageProperties) {
    super(props);
  }

  render() {
    var story = StoriesHelper.getStory(character.storyId);

    return (
      <div className="page">
        <div className="header-text">{story.name}</div>
        <br />
        <div className="panel">
          <div className="desc-text">
            {story.description}
            <br />
            <br />
            <b>Trait:</b> {story.trait}
          </div>
        </div>
        <CopyrightDisclaimer />
        <Button text="ARCHETYPE" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private onNext() {
    Navigation.navigateToPage(PageIdentity.Archetype);
  }
}
