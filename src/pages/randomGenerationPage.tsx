import * as React from 'react';
import { character } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { DieRoll } from '../components/dieRoll';
import { ArchetypesHelper } from '../helpers/archetypes';
import { AttributesHelper } from '../helpers/attributes';
import { CastesHelper } from '../helpers/castes';
import { EducationsHelper } from '../helpers/educations';
import { HomelandsHelper } from '../helpers/homelands';
import { NaturesHelper } from '../helpers/natures';
import { Source } from '../helpers/sources';
import { StoriesHelper } from '../helpers/stories';
import { WarStoriesHelper } from '../helpers/warStories';
import { IPageProperties, PageIdentity } from './pageFactory';

export class RandomGenerationPage extends React.Component<IPageProperties, {}> {
  private _dice: number[];
  private _selected: number;

  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('RANDOM CHARACTER');

    this._dice = [];
    for (var i = 0; i < 10; i++) {
      this._dice.push(Math.floor(Math.random() * 20) + 1);
    }

    character.caste = CastesHelper.getCasteForRoll(this._dice[4]);
  }

  render() {
    return (
      <div className="page">
        <div className="page-text">Click on a die roll and then on another to swap them. Click OK to proceed.</div>
        <table className="selection-list">
          <tbody>
            <tr style={{ backgroundColor: '#5f643e', color: 'white' }}>
              <td></td>
              <td>
                <b>Homeland</b>
              </td>
            </tr>
            <tr>
              <td>
                <DieRoll
                  roll={this._dice[0]}
                  index={0}
                  onSelect={(index) => this.selectDie(index)}
                  isSelected={this._selected === 0}
                />
                <DieRoll
                  roll={this._dice[1]}
                  index={1}
                  onSelect={(index) => this.selectDie(index)}
                  isSelected={this._selected === 1}
                />
              </td>
              <td>
                {HomelandsHelper.getHomeland(HomelandsHelper.getHomelandForRoll(this._dice[0] + this._dice[1])).name}
              </td>
            </tr>
            <tr style={{ backgroundColor: '#5f643e', color: 'white' }}>
              <td></td>
              <td>
                <b>Attribute Aspects</b>
              </td>
            </tr>
            <tr>
              <td>
                <DieRoll
                  roll={this._dice[2]}
                  index={2}
                  onSelect={(index) => this.selectDie(index)}
                  isSelected={this._selected === 2}
                />
              </td>
              <td>
                {
                  AttributesHelper.getAttributeAspect(
                    AttributesHelper.getAttributeAspectForRoll(this._dice[2], Source.Core)
                  ).name
                }
              </td>
            </tr>
            <tr>
              <td>
                <DieRoll
                  roll={this._dice[3]}
                  index={3}
                  onSelect={(index) => this.selectDie(index)}
                  isSelected={this._selected === 3}
                />
              </td>
              <td>
                {
                  AttributesHelper.getAttributeAspect(
                    AttributesHelper.getAttributeAspectForRoll(this._dice[3], Source.Core)
                  ).name
                }
              </td>
            </tr>
            <tr style={{ backgroundColor: '#5f643e', color: 'white' }}>
              <td></td>
              <td>
                <b>Caste</b>
              </td>
            </tr>
            <tr>
              <td>
                <DieRoll
                  roll={this._dice[4]}
                  index={4}
                  onSelect={(index) => this.selectDie(index)}
                  isSelected={this._selected === 4}
                />
              </td>
              <td>{CastesHelper.getCaste(CastesHelper.getCasteForRoll(this._dice[4])).name}</td>
            </tr>
            <tr style={{ backgroundColor: '#5f643e', color: 'white' }}>
              <td></td>
              <td>
                <b>Story</b>
              </td>
            </tr>
            <tr>
              <td>
                <DieRoll
                  roll={this._dice[5]}
                  index={5}
                  onSelect={(index) => this.selectDie(index)}
                  isSelected={this._selected === 5}
                />
              </td>
              <td>{StoriesHelper.getStoryForRoll(this._dice[5]).name}</td>
            </tr>
            <tr style={{ backgroundColor: '#5f643e', color: 'white' }}>
              <td></td>
              <td>
                <b>Archetype</b>
              </td>
            </tr>
            <tr>
              <td>
                <DieRoll
                  roll={this._dice[6]}
                  index={6}
                  onSelect={(index) => this.selectDie(index)}
                  isSelected={this._selected === 6}
                />
              </td>
              <td>{ArchetypesHelper.getArchetype(ArchetypesHelper.getArchetypeForRoll(this._dice[6])).name}</td>
            </tr>
            <tr style={{ backgroundColor: '#5f643e', color: 'white' }}>
              <td></td>
              <td>
                <b>Nature</b>
              </td>
            </tr>
            <tr>
              <td>
                <DieRoll
                  roll={this._dice[7]}
                  index={7}
                  onSelect={(index) => this.selectDie(index)}
                  isSelected={this._selected === 7}
                />
              </td>
              <td>{NaturesHelper.getNature(NaturesHelper.getNatureForRoll(this._dice[7])).name}</td>
            </tr>
            <tr style={{ backgroundColor: '#5f643e', color: 'white' }}>
              <td></td>
              <td>
                <b>Education</b>
              </td>
            </tr>
            <tr>
              <td>
                <DieRoll
                  roll={this._dice[8]}
                  index={8}
                  onSelect={(index) => this.selectDie(index)}
                  isSelected={this._selected === 8}
                />
              </td>
              <td>{EducationsHelper.getEducation(EducationsHelper.getEducationForRoll(this._dice[8])).name}</td>
            </tr>
            <tr style={{ backgroundColor: '#5f643e', color: 'white' }}>
              <td></td>
              <td>
                <b>War Story</b>
              </td>
            </tr>
            <tr>
              <td>
                <DieRoll
                  roll={this._dice[9]}
                  index={9}
                  onSelect={(index) => this.selectDie(index)}
                  isSelected={this._selected === 9}
                />
              </td>
              <td>{WarStoriesHelper.getWarStoryForRoll(this._dice[9]).description}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <CopyrightDisclaimer />
        <Button text="OK" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private selectDie(index) {
    if (index > -1) {
      if (this._selected === undefined) {
        this._selected = index;
      } else {
        this.swapDice(this._selected, index);
      }
    } else {
      this._selected = undefined;
    }
  }

  private swapDice(from: number, to: number) {
    const f = this._dice[from];
    const t = this._dice[to];

    this._dice[from] = t;
    this._dice[to] = f;

    this._selected = undefined;

    character.caste = CastesHelper.getCasteForRoll(this._dice[4]);

    this.forceUpdate();
  }

  private onNext() {
    character.randomAll(this._dice);
    Navigation.navigateToPage(PageIdentity.HomelandDetails);
  }
}
