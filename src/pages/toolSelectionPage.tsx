import * as React from 'react';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { IPageProperties, PageIdentity } from './pageFactory';

enum Tool {
  CharacterGenerator,
  TalentsOverview,
}

export class ToolSelectionPage extends React.Component<IPageProperties, {}> {
  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('TOOLS');
  }

  render() {
    return (
      <div className="page">
        <div className="page-text">Select tool.</div>
        <div className="button-container">
          <Button
            text="Character Generator"
            className="button"
            onClick={() => {
              this.selectTool(Tool.CharacterGenerator);
            }}
          />
          <Button
            text="Talents Overview"
            className="button"
            onClick={() => {
              this.selectTool(Tool.TalentsOverview);
            }}
          />
        </div>
        <CopyrightDisclaimer />
      </div>
    );
  }

  private selectTool(tool: Tool) {
    switch (tool) {
      case Tool.CharacterGenerator:
        Navigation.navigateToPage(PageIdentity.Options);
        break;
      case Tool.TalentsOverview:
        Navigation.navigateToPage(PageIdentity.TalentsOverview);
        break;
    }
  }
}
