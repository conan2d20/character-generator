import * as React from 'react';
import { character, CreationMode } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { PageHeader } from '../components/pageHeader';
import { WarStorySelection } from '../components/warStorySelection';
import { Source } from '../helpers/sources';
import { WarStoriesHelper, WarStoryModel } from '../helpers/warStories';
import { IPageProperties, PageIdentity } from './pageFactory';

interface IWarStoryPageState {
  showOptions: boolean;
  showSelection: boolean;
}

export class WarStoryPage extends React.Component<IPageProperties, IWarStoryPageState> {
  private _candidates: WarStoryModel[];
  private _section: Source;
  private _descriptions: { [id: number]: string } = {};

  constructor(props: IPageProperties) {
    super(props);

    var header = 'NOTABLE EVENT';

    SetHeaderText(header);

    this.state = {
      showOptions: true,
      showSelection: false,
    };

    this._descriptions = {
      [Source.Core]:
        'War is a constant throughout the Hyborian kingdoms, a battle of kings and chieftains, empires and armies. Everyone, including your character, has likely encountered war in one form or another, or some sort of conflict that proved instrumental in their current fate. For some, it is their most fearsome encounter or adventure to date, while for others, it is merely the latest in a string of harrowing experiences.',
      [Source.Thief]:
        'Thieves usually have heists of note, particularly big scores that they are known for and helped shape their worldviews.',
      [Source.Barbarian]:
        'War is a constant throughout the Hyborian kingdoms, a battle of kings and chieftains, empires and armies. Everyone, including your character, has likely encountered war in one form or another, or some sort of conflict that proved instrumental in their current fate. For some, it is their most fearsome encounter or adventure to date, while for others, it is merely the latest in a string of harrowing experiences.',
      [Source.Skelos]: 'Sorcerers often have different stories than that of regular folk.',
      [Source.Mercenary]:
        'Mercenaries are as much about the tales they tell as the deeds they have done. A mercenary character will often embellish their tales.',
      [Source.Pirate]:
        'These tales are either the most notable experience your character has had, or the event that sent them onto the road of the pirate.',
      [Source.Cults]:
        'These events reflect the more unusual experiences that those deeply enmeshed within a committed, religious community might have.',
      [Source.Brigand]:
        'If you were not born into the ranks of the Zuagir, or raised as a kozaki, what turned you into a brigand? As a career, it isn’t the most likely of options for the average person. Something in your past turned you from what you were, to what you are now.',
      [Source.Beastmasters]:
        'Characters oriented towards the animal kingdom would have experienced a hunting story rather than a war story.',
      [Source.Scout]:
        'Life on the frontier is filled with danger and hard work. What kind of significant event did you experience?',
      [Source.Wanderer]: 'What significant event did you experience during your life in the east?',
      [Source.King]:
        'Noble characters has a Court Story, some exploit within their household or that of their kingdom’s court, whether tragic or beneficial, that set them upon the path to adventure.',
      [Source.Adventurer]:
        'Just as in the north, the south is wracked by war, both at the tribal and the kingdom level. Everyone, no matter how remotely placed or their status, is affected by the ceaseless tide of human conflict, and thus all of those from the lands south of the Styx have war stories, experiences that set them upon the path of adventure. ',
      [Source.Kull]:
        'War, like all human endeavors, is eternal, and the Thurian Age is no different, its squabbles and frays echoing throughout the centuries to come.',
    };
  }

  render() {
    if (this.state.showOptions) {
      const thief = character.hasSource(Source.Thief) ? (
        <div>
          <br />
          <div className="header-small">Thief</div>
          <Button className="button" text="Heist of Note" onClick={() => this.showSection(Source.Thief)} />
        </div>
      ) : undefined;

      const barbarian = character.hasSource(Source.Barbarian) ? (
        <div>
          <br />
          <div className="header-small">Barbarian</div>
          <Button className="button" text="War Story" onClick={() => this.showSection(Source.Barbarian)} />
        </div>
      ) : undefined;

      const skelos = character.hasSource(Source.Skelos) ? (
        <div>
          <br />
          <div className="header-small">Skelos</div>
          <Button className="button" text="Sorcery Story" onClick={() => this.showSection(Source.Skelos)} />
        </div>
      ) : undefined;

      const merc = character.hasSource(Source.Mercenary) ? (
        <div>
          <br />
          <div className="header-small">Mercenary</div>
          <Button className="button" text="War Story" onClick={() => this.showSection(Source.Mercenary)} />
        </div>
      ) : undefined;

      const pirate = character.hasSource(Source.Pirate) ? (
        <div>
          <br />
          <div className="header-small">Pirate</div>
          <Button className="button" text="Pirate Story" onClick={() => this.showSection(Source.Pirate)} />
        </div>
      ) : undefined;

      const cults = character.hasSource(Source.Cults) ? (
        <div>
          <br />
          <div className="header-small">Nameless Cults</div>
          <Button className="button" text="Cult Story" onClick={() => this.showSection(Source.Cults)} />
        </div>
      ) : undefined;

      const brigand = character.hasSource(Source.Brigand) ? (
        <div>
          <br />
          <div className="header-small">Brigand</div>
          <Button className="button" text="War Story" onClick={() => this.showSection(Source.Brigand)} />
        </div>
      ) : undefined;

      const beasts = character.hasSource(Source.Beastmasters) ? (
        <div>
          <br />
          <div className="header-small">Beast Masters</div>
          <Button className="button" text="Hunting Story" onClick={() => this.showSection(Source.Beastmasters)} />
        </div>
      ) : undefined;

      const scout = character.hasSource(Source.Scout) ? (
        <div>
          <br />
          <div className="header-small">Scout</div>
          <Button className="button" text="War Story" onClick={() => this.showSection(Source.Scout)} />
        </div>
      ) : undefined;

      const wanderer = character.hasSource(Source.Wanderer) ? (
        <div>
          <br />
          <div className="header-small">Eastern</div>
          <Button className="button" text="War Story" onClick={() => this.showSection(Source.Wanderer)} />
        </div>
      ) : undefined;

      const king = character.hasSource(Source.King) ? (
        <div>
          <br />
          <div className="header-small">King</div>
          <Button className="button" text="Court Story" onClick={() => this.showSection(Source.King)} />
        </div>
      ) : undefined;

      const adventurer = character.hasSource(Source.Adventurer) ? (
        <div>
          <br />
          <div className="header-small">Southern</div>
          <Button className="button" text="War Story" onClick={() => this.showSection(Source.Adventurer)} />
        </div>
      ) : undefined;

      const kull = character.hasSource(Source.Kull) ? (
        <div>
          <br />
          <div className="header-small">Kull</div>
          <Button className="button" text="War Story" onClick={() => this.showSection(Source.Kull)} />
        </div>
      ) : undefined;

      return (
        <div className="page">
          <div className="page-text">
            Select the type of notable event that your character has encountered. The available options are dependent on
            the sources you have selected.
          </div>
          <div>
            <div className="header-small">Core</div>
            <Button className="button" text="War Story" onClick={() => this.showSection(Source.Core)} />
          </div>
          {thief}
          {barbarian}
          {skelos}
          {merc}
          {pirate}
          {cults}
          {brigand}
          {beasts}
          {scout}
          {wanderer}
          {king}
          {adventurer}
          {kull}
        </div>
      );
    } else {
      let type = 'War Story';

      if (this._section === Source.Thief) {
        type = 'Heist of Note';
      } else if (this._section === Source.Skelos) {
        type = 'Sorcery Story';
      } else if (this._section === Source.Pirate) {
        type = 'Pirate Story';
      } else if (this._section === Source.Cults) {
        type = 'Cult Story';
      } else if (this._section === Source.Beastmasters) {
        type = 'Hunting Story';
      } else if (this._section === Source.Wanderer) {
        type = 'Eastern War Story';
      } else if (this._section === Source.King) {
        type = 'Court Story';
      } else if (this._section === Source.Adventurer) {
        type = 'Southern War Story';
      }

      const roll = <Button className="button" text={`Roll ${type}`} onClick={() => this.rollWarStory(this._section)} />;

      const select =
        character.creationMode !== CreationMode.Random ? (
          <Button className="button" text={`Select ${type}`} onClick={() => this.showWarStories()} />
        ) : undefined;

      const content = !this.state.showSelection ? (
        <div>
          <div className="page-text">
            {this._descriptions[this._section]}
            <br />
            <br />
            Roll or select your notable event to receive skill improvements.
          </div>
          <div className="button-container">
            {roll}
            {select}
            <Button className="button" text="Select Event Type" onClick={() => this.onChangeType()} />
          </div>
        </div>
      ) : (
        <div>
          <WarStorySelection
            header={`Select ${type}`}
            options={this._candidates}
            onSelection={(story) => this.selectWarStory(story)}
            onCancel={() => this.hideWarStories()}
          />
        </div>
      );

      return <div className="page">{content}</div>;
    }
  }

  private showSection(section: Source) {
    this._section = section;
    this._candidates = WarStoriesHelper.getWarStories(this._section);

    this.setState({
      showOptions: false,
      showSelection: false,
    });
  }

  private onChangeType() {
    this.setState({
      showOptions: true,
      showSelection: false,
    });
  }

  private rollWarStory(source: Source) {
    var story = WarStoriesHelper.generateWarStory(source * 100);
    this.selectWarStory(story.roll);
  }

  private showWarStories() {
    this.setState({ showSelection: true, showOptions: false });
  }

  private hideWarStories() {
    this.setState({ showSelection: false, showOptions: false });
  }

  private selectWarStory(id: number) {
    var story = WarStoriesHelper.getWarStory(id);

    character.warStory = story.description;
    character.warStoryId = story.roll;
    WarStoriesHelper.applyWarStory(id);

    Navigation.navigateToPage(PageIdentity.WarStoryDetails);
  }
}
