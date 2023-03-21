import * as React from 'react';
import { character, Gender } from '../common/character';
import { CharacterSerializer } from '../common/characterSerializer';
import { SetHeaderText } from '../common/extensions';
import { CharacterSheet } from '../components/characterSheet';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { PDFNotice } from '../components/PDFNotice';
import { RadioButton } from '../components/radioButton';
import { HomelandsHelper } from '../helpers/homelands';
import { IPageProperties } from './pageFactory';

export class FinishPage extends React.Component<IPageProperties, {}> {
  private name: HTMLInputElement;
  private age: HTMLInputElement;
  private appearance: HTMLInputElement;
  private personality: HTMLInputElement;
  private male: RadioButton;

  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('FINISHED');

    var highest = 7;
    var lowest = 7;

    character.attributes.forEach((a) => {
      if (a.value > highest) {
        highest = a.value;
      } else if (a.value < lowest) {
        lowest = a.value;
      }
    });

    character.age = highest + lowest;
  }

  componentDidMount() {
    this.male.select();
  }

  render() {
    const characterData = CharacterSerializer.serialize(character);

    // const data = characterData.map((d, i) => {
    //   return <input key={i} type="hidden" name={d.name} value={d.value} />;
    // });

    const names = HomelandsHelper.getNameSuggestions(character.gender)[character.homeland].sort((a, b) => {
      return a.localeCompare(b);
    });
    const suggestions = names.map((n, i) => {
      return `${n}${i < names.length - 1 ? ',' : ''} `;
    });

    return (
      <div className="page">
        <div className="page-text">
          Your character is finished. You can either use this reference to fill in a character sheet by hand, or use the
          button at the bottom to export your character to PDF.
          <PDFNotice />
        </div>
        <div className="panel">
          <div className="header-small">NAME</div>
          <div>
            <input type="text" onChange={() => this.onNameChanged()} ref={(input) => (this.name = input)} />
            <div>
              <small>
                <b>Suggestions: </b> <i>{suggestions}</i>
              </small>
            </div>
          </div>
        </div>
        <br />
        <div className="panel">
          <div className="header-small">GENDER</div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <RadioButton
                      groupId="gender"
                      value={Gender.Male}
                      onChanged={(val) => this.onGenderChanged(val)}
                      ref={(radio) => (this.male = radio)}
                    />
                  </td>
                  <td>Male</td>
                </tr>
                <tr>
                  <td>
                    <RadioButton
                      groupId="gender"
                      value={Gender.Female}
                      onChanged={(val) => this.onGenderChanged(val)}
                    />
                  </td>
                  <td>Female</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <div className="panel">
          <div className="header-small">AGE</div>
          <div>
            <div>
              Your default age has been calculated for you, but feel free to type any age you wish. Remember that it
              should reflect your character: Veterans are often middle aged, while young hot-heads exist everywhere.
            </div>
            <input
              type="text"
              placeholder={character.age.toString()}
              onChange={() => this.onAgeChanged()}
              ref={(input) => (this.age = input)}
            />
          </div>
        </div>
        <br />
        <div className="panel">
          <div className="header-small">APPEARANCE</div>
          <div>
            {' '}
            <div>
              <i>(max 65 characters)</i>
            </div>
            <input
              type="text"
              maxLength={65}
              className="full-width"
              onChange={() => this.onAppearanceChanged()}
              ref={(input) => (this.appearance = input)}
            />
          </div>
        </div>
        <div className="panel">
          <div className="header-small">PERSONALITY</div>
          <div>
            <div>
              <i>(max 65 characters)</i>
            </div>
            <input
              type="text"
              maxLength={65}
              className="full-width"
              onChange={() => this.onPersonalityChanged()}
              ref={(input) => (this.personality = input)}
            />
          </div>
        </div>
        <br />
        <div className="panel">
          <CharacterSheet isVisible={true} />
        </div>
        <CopyrightDisclaimer />
      </div>
    );
  }

  private onNameChanged() {
    character.name = this.name.value;
    this.forceUpdate();
  }

  private onAgeChanged() {
    character.age = parseInt(this.age.value);
    this.forceUpdate();
  }

  private onGenderChanged(gender: Gender) {
    character.gender = gender;
    this.forceUpdate();
  }

  private onAppearanceChanged() {
    character.appearance = this.appearance.value;
    this.forceUpdate();
  }

  private onPersonalityChanged() {
    character.personality = this.personality.value;
    this.forceUpdate();
  }
}
