import * as React from 'react';
import {character, Gender} from '../common/character';
import {Navigation} from '../common/navigator';
import {SetHeaderText} from '../common/extensions';
import {PageIdentity, IPageProperties} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {RadioButton} from '../components/radioButton';
import {CharacterSheet} from '../components/characterSheet';
import {CharacterSerializer} from '../common/characterSerializer';
import {HomelandsHelper} from '../helpers/homelands';

export class FinishPage extends React.Component<IPageProperties, {}> {
    private name: HTMLInputElement;
    private age: HTMLInputElement;
    private appearance: HTMLInputElement;
    private personality: HTMLInputElement;
    private male: RadioButton;

    constructor(props: IPageProperties) {
        super(props);

        SetHeaderText("FINISHED");

        var highest = 7;
        var lowest = 7;

        character.attributes.forEach(a => {
            if (a.value > highest) {
                highest = a.value;
            }
            else if (a.value < lowest) {
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

        const data = characterData.map((d, i) => {
            return (<input key={i} type="hidden" name={d.name} value={d.value}/>)
        });

        const names = HomelandsHelper.getNameSuggestions(character.gender)[character.homeland].sort((a, b) => { return a.localeCompare(b) });
        const suggestions = names.map((n, i) => {
            return (`${n}${i < names.length-1 ? "," : ""} `);
        });

        return (
            <div className="page">
                <div className="page-text">
                    Your character is finished. You can either use this reference to fill in a character sheet by hand, or use the button at the bottom
                    to export your character to PDF.
                </div>
                <div>
                    <b>* PDF exporting is not working on iOS 11. Use this page as a reference to fill in your character manually.</b>
                </div>
                <div className="panel">
                    <div className="header-small">NAME</div>
                    <input type="text" onChange={() => this.onNameChanged() } ref={(input) => this.name = input}/>
                    <div><small><b>Suggestions: </b> <i>{suggestions}</i></small></div>
                </div>
                <br/>
                <div className="panel">
                   <div className="header-small">GENDER</div>
                    <table>
                        <tbody>
                            <tr>
                                <td><RadioButton groupId="gender" value={Gender.Male} onChanged={(val) => this.onGenderChanged(val) } ref={(radio) => this.male = radio} /></td><td>Male</td>
                            </tr>
                            <tr>
                                <td><RadioButton groupId="gender" value={Gender.Female} onChanged={(val) => this.onGenderChanged(val) }/></td><td>Female</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <div className="panel">
                    <div className="header-small">AGE</div>
                    Your default age has been calculated for you, but feel free to type any age you wish. Remember that it should reflect your character: Veterans are often middle aged, while young hot-heads exist everywhere.
                    <input type="text" placeholder={character.age.toString()} onChange={() => this.onAgeChanged() } ref={(input) => this.age = input}/>
                </div>
                <br/>
                <div className="panel">
                    <div className="header-small">APPEARANCE</div>
                    <div><i>(max 65 characters)</i></div>
                    <input type="text" maxLength={65} style={{ width: "100%" }} onChange={() => this.onAppearanceChanged() } ref={(input) => this.appearance = input} />
                    <br/>
                    <div className="header-small">PERSONALITY</div>
                    <div><i>(max 65 characters)</i></div>
                    <input type="text" maxLength={65}  style={{ width: "100%" }} onChange={() => this.onPersonalityChanged() } ref={(input) => this.personality = input} />
                </div>
                <br/>
                <div className="panel">
                    <CharacterSheet isVisible={true} />
                </div>
                <br/>
                <div className="button-container">
                    <form action="http://pdf.modiphiusapps.hostinguk.org/api/sheet" method="post" encType="application/x-www-form-urlencoded" target="_blank">
                        {data}
                        <input type="submit" value="Export to PDF" className="button" />
                    </form>
                    <br/>
                    <form action="http://pdf.modiphiusapps.hostinguk.org/api/sheet" method="post" encType="application/x-www-form-urlencoded" target="_blank">
                        {data}
                        <input type="hidden" name="PRINTERFRIENDLY" value="1"/>
                        <input type="submit" value="Export to Printer Friendly PDF" className="button" />
                    </form>
                    <br/>
                </div>
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