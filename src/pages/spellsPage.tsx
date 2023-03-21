import * as React from 'react';
import { character } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CheckBox } from '../components/checkBox';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { SpellsHelper } from '../helpers/spells';
import { TalentsHelper } from '../helpers/talents';
import { IPageProperties, PageIdentity } from './pageFactory';

export class SpellsPage extends React.Component<IPageProperties, {}> {
  private _enchantments: string[];
  private _spells: string[];
  private _numSpells: number;
  private _numPettyEnchantments: number;
  private _necro: string;

  private _raiseDead = 'Raise Up the Dead';

  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('SPELLS');

    this._enchantments = [];
    this._spells = [];
    this._numSpells = 0;
    this._numPettyEnchantments = 0;

    if (character.hasTalent('Patron')) {
      this._numPettyEnchantments++;
    }

    if (character.hasTalent('Master of Formulae')) {
      this._numPettyEnchantments++;
    }

    if (character.hasTalent('Sorcerer')) {
      this._numSpells++;
    }

    if (character.hasTalent('Barter Your Soul')) {
      this._numSpells++;
    }

    if (character.hasTalent('Pact')) {
      this._numSpells += character.talents['Pact'].rank;
    }
  }

  render() {
    const enchantmentsHeader =
      this._numPettyEnchantments > 0 ? (
        <tr>
          <td className="panel" colSpan={2}>
            <b>PETTY ENCHANTMENTS</b>
          </td>
          <td className="panel"></td>
        </tr>
      ) : undefined;

    const enchantments =
      this._numPettyEnchantments > 0
        ? SpellsHelper.getPettyEnchantments().map((enchantment, i) => {
            return (
              <tr key={i}>
                <td>{enchantment.name}</td>
                <td>{enchantment.description}</td>
                <td>
                  <CheckBox
                    isChecked={this._enchantments.indexOf(enchantment.name) > -1}
                    value={enchantment.name}
                    onChanged={(spell) => {
                      this.selectEnchantment(spell);
                    }}
                  />
                </td>
              </tr>
            );
          })
        : undefined;

    const spellsHeader =
      this._numSpells > 0 ? (
        <tr>
          <td className="panel" colSpan={2}>
            <b>SPELLS</b>
          </td>
          <td className="panel">
            <b>Resolve Cost</b>
          </td>
          <td className="panel"></td>
        </tr>
      ) : undefined;

    const spells =
      this._numSpells > 0
        ? SpellsHelper.getSpells().map((spell, i) => {
            return (
              <tr key={i}>
                <td>{spell.name}</td>
                <td>{spell.description}</td>
                <td>{spell.cost}</td>
                <td>
                  <CheckBox
                    isChecked={this._spells.indexOf(spell.name) > -1}
                    value={spell.name}
                    onChanged={(spell) => {
                      this.selectSpell(spell);
                    }}
                  />
                </td>
              </tr>
            );
          })
        : undefined;

    const necro = character.hasTalent('Necromancer') ? (
      <table className="selection-list">
        <tbody>
          <tr>
            <td colSpan={4}>
              You have the Necromancer talent. Therefore you are entitled to either the <b>Raise Up the Dead</b> spell
              or any of the <b>Skinwalker</b> talents.
            </td>
          </tr>
          <tr>
            <td style={{ width: '150px' }}>Raise Up the Dead</td>
            <td colSpan={2}>
              <small>Binds the spirit of a deceased into its reanimated body.</small>
            </td>
            <td>
              <CheckBox
                isChecked={this._necro === this._raiseDead}
                value={this._raiseDead}
                onChanged={(necro) => {
                  this.selectNecro(necro);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Skinwalker: Eyes</td>
            <td colSpan={2}>
              <small>{TalentsHelper.getTalent('Skinwalker: Eyes').description}</small>
            </td>
            <td>
              <CheckBox
                isChecked={this._necro && this._necro === 'Skinwalker: Eyes'}
                value={'Skinwalker: Eyes'}
                onChanged={(necro) => {
                  this.selectNecro(necro);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Skinwalker: Heart</td>
            <td colSpan={2}>
              <small>{TalentsHelper.getTalent('Skinwalker: Heart').description}</small>
            </td>
            <td>
              <CheckBox
                isChecked={this._necro && this._necro === 'Skinwalker: Heart'}
                value={'Skinwalker: Heart'}
                onChanged={(necro) => {
                  this.selectNecro(necro);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Skinwalker: Hand</td>
            <td colSpan={2}>
              <small>{TalentsHelper.getTalent('Skinwalker: Hand').description}</small>
            </td>
            <td>
              <CheckBox
                isChecked={this._necro && this._necro === 'Skinwalker: Hand'}
                value={'Skinwalker: Hand'}
                onChanged={(necro) => {
                  this.selectNecro(necro);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Skinwalker: Face</td>
            <td colSpan={2}>
              <small>{TalentsHelper.getTalent('Skinwalker: Face').description}</small>
            </td>
            <td>
              <CheckBox
                isChecked={this._necro && this._necro === 'Skinwalker: Face'}
                value={'Skinwalker: Face'}
                onChanged={(necro) => {
                  this.selectNecro(necro);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Skinwalker: Tongue and Ears</td>
            <td colSpan={2}>
              <small>{TalentsHelper.getTalent('Skinwalker: Tongue and Ears').description}</small>
            </td>
            <td>
              <CheckBox
                isChecked={this._necro && this._necro === 'Skinwalker: Tongue and Ears'}
                value={'Skinwalker: Tongue and Ears'}
                onChanged={(necro) => {
                  this.selectNecro(necro);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    ) : undefined;

    return (
      <div className="page">
        <div className="page-text">
          Determine your starting petty enchantments and/or spells.
          <br />
          Select <b>{this._numPettyEnchantments}</b> petty enchantment(s) and <b>{this._numSpells}</b> spell(s) from the
          lists below.
        </div>
        <table className="selection-list">
          <tbody>
            {enchantmentsHeader}
            {enchantments}
            {spellsHeader}
            {spells}
          </tbody>
        </table>
        {necro}
        <CopyrightDisclaimer />
        <Button text="FINISH" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private selectEnchantment(spell: string) {
    this._enchantments.push(spell);

    if (this._enchantments.length === this._numPettyEnchantments + 1) {
      this._enchantments.splice(0, 1);
    }

    this.forceUpdate();
  }

  private selectSpell(spell: string) {
    this._spells.push(spell);

    if (this._spells.length === this._numSpells + 1) {
      this._spells.splice(0, 1);
    }

    this.forceUpdate();
  }

  private selectNecro(necro: string) {
    this._necro = necro;
    this.forceUpdate();
  }

  private onNext() {
    this._enchantments.forEach((e) => {
      character.pettyEnchantments.push(e);
    });

    character.spells.push(...this._spells);

    if (this._necro) {
      if (this._necro === this._raiseDead) {
        character.spells.push(this._raiseDead);
      } else {
        character.addTalent(this._necro);
      }
    }

    Navigation.navigateToPage(PageIdentity.Finish);
  }
}
