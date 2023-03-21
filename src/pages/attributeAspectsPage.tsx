import * as React from 'react';
import { character, CreationMode } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { AttributeAspectsSelection } from '../components/attributeAspectsSelection';
import { Button } from '../components/button';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { AttributeAspect, AttributesHelper } from '../helpers/attributes';
import { Source } from '../helpers/sources';
import { IPageProperties, PageIdentity } from './pageFactory';

interface IAttributeAspectsPageState {
  showSelection: boolean;
}

export class AttributeAspectsPage extends React.Component<IPageProperties, IAttributeAspectsPageState> {
  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('ATTRIBUTE ASPECTS');

    this.state = {
      showSelection: false,
    };
  }

  render() {
    var selectButton =
      character.creationMode !== CreationMode.Random ? (
        <Button className="button" text="Select Aspects" onClick={() => this.showAspects()} />
      ) : undefined;

    var sorcerousButton = character.hasSource(Source.Skelos) ? (
      <Button className="button" text="Roll Sorcerous Aspects" onClick={() => this.rollAspects(Source.Skelos)} />
    ) : undefined;

    var content = !this.state.showSelection ? (
      <div>
        <div className="page-text">
          Roll or select two Attribute Aspects reflecting the character's physical and mental prowess.
        </div>
        <div className="button-container">
          <Button className="button" text="Roll Aspects" onClick={() => this.rollAspects(Source.Core)} />
          {sorcerousButton}
          {selectButton}
        </div>
      </div>
    ) : (
      <div>
        <AttributeAspectsSelection
          onFirstAspectSelection={(aspect) => this.selectAspect(aspect, 1)}
          onSecondAspectSelection={(aspect) => this.selectAspect(aspect, 2)}
          onConfirm={() => this.onNext()}
          onCancel={() => this.hideAspects()}
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

  private rollAspects(source: Source) {
    var aspect1 = AttributesHelper.generateAttributeAspect(source);
    var aspect2 = AttributesHelper.generateAttributeAspect(source);
    character.firstAspect = aspect1;
    character.secondAspect = aspect2;
    this.onNext();
  }

  private showAspects() {
    this.setState({ showSelection: true });
  }

  private hideAspects() {
    this.setState({ showSelection: false });
  }

  private selectAspect(aspect: AttributeAspect, index: number) {
    if (index === 1) {
      character.firstAspect = aspect;
    } else if (index === 2) {
      character.secondAspect = aspect;
    }
  }

  private onNext() {
    Navigation.navigateToPage(PageIdentity.AttributeAspectDetails);
  }
}
