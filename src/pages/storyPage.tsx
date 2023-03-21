import * as React from 'react';
import { character, CreationMode } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { StorySelection } from '../components/storySelection';
import { Source } from '../helpers/sources';
import { StoriesHelper } from '../helpers/stories';
import { IPageProperties, PageIdentity } from './pageFactory';

interface IStoryPageState {
  showSelection: boolean;
  showCultStories: boolean;
}

export class StoryPage extends React.Component<IPageProperties, IStoryPageState> {
  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('STORY');

    this.state = {
      showSelection: false,
      showCultStories: false,
    };
  }

  render() {
    var selectButton =
      character.creationMode !== CreationMode.Random ? (
        <Button className="button" text="Select Story" onClick={() => this.showStories(false)} />
      ) : undefined;

    var rollCultStory = character.hasSource(Source.Cults) ? (
      <Button className="button" text="Roll Cult Story" onClick={() => this.rollCultStory()} />
    ) : undefined;

    var selectCultStory =
      character.hasSource(Source.Cults) && character.creationMode !== CreationMode.Random ? (
        <Button className="button" text="Select Cult Story" onClick={() => this.showStories(true)} />
      ) : undefined;

    var content = !this.state.showSelection ? (
      <div>
        <div className="page-text">
          Based on your Caste, your character will have a background story and a trait. Traits are elements of your
          character that can be invoked during play to regain Fortune points.
          <br />
          <br />
          Roll or select your Story.
        </div>
        <div className="button-container">
          <Button className="button" text="Roll Story" onClick={() => this.rollStory()} />
          {selectButton}
          {rollCultStory}
          {selectCultStory}
        </div>
      </div>
    ) : (
      <div>
        <StorySelection
          showCultStories={this.state.showCultStories}
          onSelection={(caste) => this.selectStory(caste)}
          onCancel={() => this.hideStories()}
        />
      </div>
    );

    return (
      <div className="page">
        {content}
        <CopyrightDisclaimer />
      </div>
    );
  }

  private rollStory() {
    var story = StoriesHelper.generateStory();
    this.selectStory(story.roll);
  }

  private rollCultStory() {
    var story = StoriesHelper.generateCultStory();
    this.selectStory(story.roll);
  }

  private showStories(showCultStories: boolean) {
    this.setState({ showSelection: true, showCultStories: showCultStories });
  }

  private hideStories() {
    this.setState({ showSelection: false, showCultStories: false });
  }

  private selectStory(id: number) {
    var story = StoriesHelper.getStory(id);

    character.story = story.name;
    character.storyId = story.roll;
    StoriesHelper.applyStory(id);

    Navigation.navigateToPage(PageIdentity.StoryDetails);
  }
}
