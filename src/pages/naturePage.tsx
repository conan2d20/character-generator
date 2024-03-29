﻿import * as React from 'react';
import { character, CreationMode } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { NatureSelection } from '../components/natureSelection';
import { Nature, NaturesHelper } from '../helpers/natures';
import { Source } from '../helpers/sources';
import { IPageProperties, PageIdentity } from './pageFactory';

interface INaturePageState {
  showSelection: boolean;
}

export class NaturePage extends React.Component<IPageProperties, INaturePageState> {
  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('NATURE');

    this.state = {
      showSelection: false,
    };
  }

  render() {
    var selectButton =
      character.creationMode !== CreationMode.Random ? (
        <Button className="button" text="Select Nature" onClick={() => this.showNatures()} />
      ) : undefined;

    var sorcerousButton = character.hasSource(Source.Skelos) ? (
      <Button className="button" text="Roll Sorcerous Nature" onClick={() => this.rollNature(Source.Skelos)} />
    ) : undefined;

    var pirateButton = character.hasSource(Source.Pirate) ? (
      <Button className="button" text="Roll Pirate Nature" onClick={() => this.rollNature(Source.Pirate)} />
    ) : undefined;

    var content = !this.state.showSelection ? (
      <div>
        <div className="page-text">
          While Archetype determines what your character does, Nature tells you how and why your character acts in a
          certain way.Your Nature will give you attribute improvement, skills and a talent.
          <br />
          <br />
          Either roll or select your Nature.
        </div>
        <div className="button-container">
          <Button className="button" text="Roll Nature" onClick={() => this.rollNature(Source.Core)} />
          {sorcerousButton}
          {pirateButton}
          {selectButton}
        </div>
      </div>
    ) : (
      <div>
        <NatureSelection onSelection={(caste) => this.selectNature(caste)} onCancel={() => this.hideNatures()} />
      </div>
    );

    return (
      <div className="page">
        {content}
        <CopyrightDisclaimer />
      </div>
    );
  }

  private rollNature(source: Source) {
    var nature = NaturesHelper.generateNature(source);
    this.selectNature(nature);
  }

  private showNatures() {
    this.setState({ showSelection: true });
  }

  private hideNatures() {
    this.setState({ showSelection: false });
  }

  private selectNature(nature: Nature) {
    character.nature = nature;
    NaturesHelper.applyNature(nature);
    Navigation.navigateToPage(PageIdentity.NatureDetails);
  }
}
