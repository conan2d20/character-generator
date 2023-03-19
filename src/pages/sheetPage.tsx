import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { PageHeader } from '../components/pageHeader';
import { PrintableSheet } from '../components/printableSheet';
import { IPageProperties, PageIdentity } from './pageFactory';

export class SheetPage extends React.Component<IPageProperties, {}> {
  constructor(props: IPageProperties) {
    super(props);

    var contentContainer = document.getElementsByClassName('content-container')[0];
    contentContainer.className = 'content-container-wide';

    var body = document.getElementsByTagName('body')[0];
    body.className += ' content-scrollable';

    var logo = document.getElementsByClassName('logo')[0];
    logo.className = 'logo-hidden';
  }

  render() {
    return (
      <div className="page-wide">
        <PrintableSheet />
      </div>
    );
  }
}
