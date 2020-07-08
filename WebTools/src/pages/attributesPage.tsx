import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {SetHeaderText} from '../common/extensions';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';

export class AttributesPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);

        SetHeaderText("ATTRIBUTES");
    }

    render() {
        return (
            <div className="page">
                <div className="page-text">
                    With your GM's permission, you can lower up to two attributes
                    <br/>
                    and raise an equal amount of attributes by one point.
                </div>
                <div className="panel">
                    <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.Conan} points={0}/>
                </div>
                <Button text="ASPECTS" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        Navigation.navigateToPage(PageIdentity.AttributeAspects);
    }
}