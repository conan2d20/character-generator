import * as React from 'react';
import { character } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { FortunePointList } from '../components/fortunePointList';
import { PageHeader } from '../components/pageHeader';
import { Skill } from '../helpers/skills';
import { IPageProperties, PageIdentity } from './pageFactory';

export class FortunePointsPage extends React.Component<IPageProperties, {}> {
  private _selection: string;

  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('FORTUNE POINTS');

    this._selection = 'None';
  }

  render() {
    return (
      <div className="page">
        <div className="page-text">
          Your start the game with <b>3</b> Fortune points.You can <b>permanently sacrifice</b> one Fortune point to
          improve either an attribute or a skill.
        </div>
        <div className="panel">
          <div className="header-small">ATTRIBUTES & SKILLS</div>
          <div>Improve one attribute by +1 or one skill by +2 Expertise/Focus.</div>
          <FortunePointList onSelection={(val) => this.onSelection(val)} />
        </div>
        <Button text="NEXT" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private onSelection(val: string) {
    this._selection = val;
    this.forceUpdate();
  }

  private onNext() {
    if (this._selection !== 'None') {
      if (this._selection.indexOf('attr-') > -1) {
        const attr = this._selection.substr(this._selection.indexOf('attr-') + 5);
        character.attributes[parseInt(attr)].value++;
      } else if (this._selection.indexOf('skill-') > -1) {
        const skill = this._selection.substr(this._selection.indexOf('skill-') + 6);
        character.skills[parseInt(skill)].expertise += 2;
        character.skills[parseInt(skill)].focus += 2;
      }

      character.fortunePoints = 2;
    }

    Navigation.navigateToPage(PageIdentity.Equipment);
  }
}
