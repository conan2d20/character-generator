import * as React from 'react';
import { character } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { ExiledBackgroundSelection } from '../components/exiledBackgroundSelection';
import { ExiledBackground, ExiledBackgroundHelper } from '../helpers/exiledBackgrounds';
import { IPageProperties, PageIdentity } from './pageFactory';

interface IExiledBackgroundPageState {
  showSelection: boolean;
}

export class ExiledBackgroundPage extends React.Component<IPageProperties, IExiledBackgroundPageState> {
  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('EXILED BACKGROUND');

    this.state = {
      showSelection: false,
    };
  }

  render() {
    var content = !this.state.showSelection ? (
      <div>
        <div className="page-text">
          Those unfortunates who inhabit the Exiled Lands are there for a reason. Once, they possessed lives. Once,
          perhaps, they were people of note. People whose names were spoken in awe, reverence, or at least affection.
          Now they are husks, devoid of anything save the desperate pursuit of survival. But, for those who do manage to
          survive, to hew some form of life from the indifference of hard earth and remorseless sun, memory can be
          important. It can drive some on. It can provide the motive and purpose and drive necessary to any who wish to
          conquer the Exiled Lands.
        </div>
        <div className="button-container">
          <Button className="button" text="Roll Background" onClick={() => this.rollBackground()} />
          <Button className="button" text="Select Background" onClick={() => this.showBackgrounds()} />
        </div>
      </div>
    ) : (
      <div>
        <ExiledBackgroundSelection
          onSelection={(bg) => this.selectBackground(bg)}
          onCancel={() => this.hideBackgrounds()}
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

  private rollBackground() {
    var bg = ExiledBackgroundHelper.generateBackground();
    this.selectBackground(bg);
  }

  private showBackgrounds() {
    this.setState({ showSelection: true });
  }

  private hideBackgrounds() {
    this.setState({ showSelection: false });
  }

  private selectBackground(bg: ExiledBackground) {
    character.exiledBackground = bg;
    ExiledBackgroundHelper.applyBackground(bg);
    Navigation.navigateToPage(PageIdentity.ExiledBackgroundDetails);
  }
}
