import * as React from 'react';
import { character, CreationMode } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CheckBox } from '../components/checkBox';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { PDFNotice } from '../components/PDFNotice';
import { CreationModesHelper } from '../helpers/creationModes';
import { Source, SourcesHelper } from '../helpers/sources';
import { IPageProperties, PageIdentity } from './pageFactory';

export class OptionsPage extends React.Component<IPageProperties, {}> {
  constructor(props: IPageProperties) {
    super(props);
    SetHeaderText('OPTIONS');
  }

  render() {
    const modes = CreationModesHelper.getModes().map((mode, i) => {
      return (
        <tr key={i}>
          <td className="selection-header">{mode.name}</td>
          <td>{mode.description}</td>
          <td>
            <Button text="SELECT" className="button-small" onClick={() => this.selectMode(mode.id)} />
          </td>
        </tr>
      );
    });

    const sources = SourcesHelper.getSources().map((src, i) => {
      return (
        <div key={i}>
          <div className="source-select">
            <CheckBox value={i} onChanged={(val) => this.onSourceChanged(val)} isChecked={character.hasSource(i)} />
          </div>
          <div className="source-name">{src.name}</div>
        </div>
      );
    });

    return (
      <div className="page">
        <div className="page-text">
          Select sources and creation options below.
          <br />
          Ask your GM for available sources and options.
          <PDFNotice />
        </div>
        <div>
          <div
            className="source-action"
            onClick={() => {
              this.selectSources(true);
            }}
          >
            Select all
          </div>
          <div className="source-action">|</div>
          <div
            className="source-action"
            onClick={() => {
              this.selectSources(false);
            }}
          >
            Select none
          </div>
        </div>
        <br />
        <div className="source-list">{sources}</div>
        <br />
        <br />
        <div>
          <div className="header-small">OPTIONS</div>
          <div style={{ padding: 5 }}>
            <div className="source-select">
              <CheckBox
                value={1}
                onChanged={(val) => this.onUseWeedOfSorceryChanged()}
                isChecked={character.useWeedOfSorcery}
              />
            </div>
            <div className="source-name">
              Use <i>Weed of Sorcery</i> rule (Core Book, page 44)
            </div>
          </div>
        </div>
        <br />
        <table className="selection-list">
          <tbody>{modes}</tbody>
        </table>
        <CopyrightDisclaimer />
      </div>
    );
  }

  private onSourceChanged(source: Source) {
    if (character.hasSource(source)) {
      character.removeSource(source);
    } else {
      character.addSource(source);
    }

    this.forceUpdate();
  }

  private selectSources(all: boolean) {
    if (all) {
      SourcesHelper.getSources().forEach((s) => {
        character.addSource(s.id);
      });
    } else {
      SourcesHelper.getSources().forEach((s) => {
        character.removeSource(s.id);
      });
    }

    this.forceUpdate();
  }

  private onUseWeedOfSorceryChanged() {
    character.useWeedOfSorcery = !character.useWeedOfSorcery;
    this.forceUpdate();
  }

  private selectMode(mode: CreationMode) {
    character.creationMode = mode;

    if (character.creationMode === CreationMode.NoGods) {
      character.attributes.forEach((attr) => {
        attr.value = 6;
      });
    } else if (character.creationMode === CreationMode.Random) {
      character.random();
    } else if (character.creationMode === CreationMode.AllRandom) {
      Navigation.navigateToPage(PageIdentity.RandomGeneration);
      return;
    }

    Navigation.navigateToPage(PageIdentity.Homeland);
  }
}
