import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {SetHeaderText} from '../common/extensions';
import {PageIdentity, IPageProperties} from './pageFactory';
import {HomeLand, HomelandsHelper} from '../helpers/homelands';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';
import {TalentDescription} from '../components/talentDescription';
import { TalentList } from '../components/talentList';
import { TalentSelection } from '../components/talentSelection';

export class HomelandDetailsPage extends React.Component<IPageProperties, {}> {
    private _selectedLanguage: string;
    private _selectedRegion: string;
    private _selectedTalent: string;

    constructor(props: IPageProperties) {
        super(props);

        const homeland = HomelandsHelper.getHomeland(character.homeland);
        this._selectedLanguage = homeland.languageOptions[0];

        if (character.region === undefined) {
            const regions = HomelandsHelper.getRegions(character.homeland);
            if (regions && regions.length > 0) {
                this._selectedRegion = regions[0];
            }
        }
        else {
            this._selectedRegion = character.region;
        }
    }

    render() {
        const homeland = HomelandsHelper.getHomeland(character.homeland);
        let regions = HomelandsHelper.getRegions(character.homeland);

        if (character.region !== undefined && regions) {
            regions.filter(r => r === character.region);
        }

        const languageContent = homeland.languageOptions.length === 1
            ? (<div>{homeland.languageOptions[0]}</div>)
            : (<DropDownInput
                items={homeland.languageOptions}
                defaultValue={this._selectedLanguage ? this._selectedLanguage : homeland.languageOptions[0]} 
                onChange={e => { this.onLanguageSelected(e) } }/>);

        const regionContent = regions && regions.length > 0
            ? (
                <div className="panel">
                    <div className="header-small">REGION</div>
                    <DropDownInput
                        items={regions}
                        defaultValue={this._selectedRegion}
                        onChange={e => { this.onRegionSelected(e)}} />
                </div>
              )
            : undefined;

        const talent = character.homeland !== HomeLand.Atlantis
            ? <TalentDescription name={homeland.talent.name} description={homeland.talent.description} />
            : <TalentSelection talents={["Primitive", "Uncivilized"]} onSelection={(talent) => { this._selectedTalent = talent; }} />;

        return (
            <div className="page">
                <div className="header-text">{homeland.name}</div>
                {regionContent}
                <div className="panel">
                    <div className="header-small">TALENT</div>
                    {talent}
                </div>
                <div className="panel">
                    <div className="header-small">LANGUAGE OPTIONS</div>
                    <div>{languageContent}</div>
                </div>
                <Button text="ATTRIBUTES" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onRegionSelected(index: number) {
        var regions = HomelandsHelper.getRegions(character.homeland);
        this._selectedRegion = regions[index];
        this.forceUpdate();
    }

    private onLanguageSelected(index: number) {
        var homeland = HomelandsHelper.getHomeland(character.homeland);
        this._selectedLanguage = homeland.languageOptions[index];
        this.forceUpdate();
    }

    private onNext() {
        if (this._selectedLanguage) {
            character.addLanguage(this._selectedLanguage);
        }

        if (this._selectedRegion) {
            character.region = this._selectedRegion;
        }

        if (this._selectedTalent) {
            character.addTalent(this._selectedTalent);
        }

        Navigation.navigateToPage(PageIdentity.Attributes);
    }
}