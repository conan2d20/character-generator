import * as React from 'react';
import { character, CreationMode } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CasteSelection } from '../components/casteSelection';
import { PageHeader } from '../components/pageHeader';
import { Caste, CastesHelper } from '../helpers/castes';
import { Source } from '../helpers/sources';
import { IPageProperties, PageIdentity } from './pageFactory';

interface ICastePageState {
  showSelection: boolean;
}

export class CastePage extends React.Component<IPageProperties, ICastePageState> {
  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('CASTE');

    this.state = {
      showSelection: false,
    };
  }

  render() {
    var selectButton =
      character.creationMode !== CreationMode.Random ? (
        <Button className="button" text="Select Caste" onClick={() => this.showCastes()} />
      ) : undefined;

    var sorcerousButton = character.hasSource(Source.Skelos) ? (
      <Button className="button" text="Roll Sorcerous Caste" onClick={() => this.rollCaste(Source.Skelos)} />
    ) : undefined;

    var pirateButton = character.hasSource(Source.Pirate) ? (
      <Button className="button" text="Roll Pirate Caste" onClick={() => this.rollCaste(Source.Pirate)} />
    ) : undefined;

    var content = !this.state.showSelection ? (
      <div>
        <div className="page-text">
          Caste is the social class from which the character was born and/or has emerged. Generally, this will have been
          the character’s class since birth, though occasionally nobles get enslaved and barbarians become kings and
          queens.
          <br />
          <br />
          Roll or select your caste.
        </div>
        <div className="button-container">
          <Button className="button" text="Roll Caste" onClick={() => this.rollCaste(Source.Core)} />
          {sorcerousButton}
          {pirateButton}
          {selectButton}
        </div>
      </div>
    ) : (
      <div>
        <CasteSelection onSelection={(caste) => this.selectCaste(caste)} onCancel={() => this.hideCastes()} />
      </div>
    );

    return <div className="page">{content}</div>;
  }

  private rollCaste(source: Source) {
    var caste = CastesHelper.generateCaste(source);
    this.selectCaste(caste);
  }

  private showCastes() {
    this.setState({ showSelection: true });
  }

  private hideCastes() {
    this.setState({ showSelection: false });
  }

  private selectCaste(caste: Caste) {
    character.caste = caste;
    CastesHelper.applyCaste(caste);
    Navigation.navigateToPage(PageIdentity.CasteDetails);
  }
}
