import * as React from 'react';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { AttributeImprovementCollection, AttributeImprovementCollectionMode } from '../components/attributeImprovement';
import { Button } from '../components/button';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { IPageProperties, PageIdentity } from './pageFactory';

export class AttributesPage extends React.Component<IPageProperties, {}> {
  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('ATTRIBUTES');
  }

  render() {
    return (
      <div className="page">
        <div className="page-text">
          With your GM's permission, you can lower up to two attributes
          <br />
          and raise an equal amount of attributes by one point.
        </div>
        <div className="panel">
          <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.Conan} points={0} />
        </div>
        <CopyrightDisclaimer />
        <Button text="ASPECTS" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private onNext() {
    Navigation.navigateToPage(PageIdentity.AttributeAspects);
  }
}
