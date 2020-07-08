import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {SetHeaderText} from '../common/extensions';
import {PageIdentity, IPageProperties} from './pageFactory';
import {HomeLand, HomelandsHelper} from '../helpers/homelands';
import {Source} from '../helpers/sources';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {HomelandSelection} from '../components/homelandSelection';

interface IHomelandPageState {
    showSelection: boolean;
}

export class HomelandPage extends React.Component<IPageProperties, IHomelandPageState> {
    constructor(props: IPageProperties) {
        super(props);

        SetHeaderText("HOMELAND");

        this.state = {
            showSelection: false
        };
    }

    render() {
        const brigandHomelands = character.hasSource(Source.Brigand)
            ? <Button className="button" text="Roll Brigand Homeland" onClick={() => this.rollBrigandHomeland() } />
            : undefined;

        const pirateHomelands = character.hasSource(Source.Pirate)
            ? <Button className="button" text="Roll Pirate Homeland" onClick={() => this.rollPirateHomeland() } />
            : undefined;

        const scoutHomelands = character.hasSource(Source.Scout)
            ? <Button className="button" text="Roll Scout Homeland" onClick={() => this.rollScoutHomeland()} />
            : undefined;

        const easternHomelands = character.hasSource(Source.Wanderer)
            ? <Button className="button" text="Roll Eastern Homeland" onClick={() => this.rollEasternHomeland()} />
            : undefined;

        const southernHomelands = character.hasSource(Source.Adventurer)
            ? <Button className="button" text="Roll Southern Homeland" onClick={() => this.rollSouthernHomeland()} />
            : undefined;

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        Where was your character born?
                        <br/>
                        Roll or select your Homeland to receive a mother tongue and a talent.
                    </div>
                    <div className="button-container">
                        <Button className="button" text="Roll Homeland" onClick={() => this.rollHomeland() } />
                        {brigandHomelands}
                        {pirateHomelands}
                        {scoutHomelands}
                        {easternHomelands}
                        {southernHomelands}
                        <Button className="button" text="Select Homeland" onClick={() => this.showHomelands() } />
                    </div>
                </div>
            )
            : (
                <div>
                    <HomelandSelection
                        onSelection={(homeland) => this.selectHomeland(homeland) }
                        onCancel={() => this.hideHomelands() } />
                </div>
              );

        return (
            <div className="page">
                {content}
            </div>
        );
    }

    private rollHomeland() {
        var homeland = HomelandsHelper.generateHomeland();
        this.selectHomeland(homeland);
    }

    private rollBrigandHomeland() {
        var homeland = HomelandsHelper.generateBrigandHomeland();
        this.selectHomeland(homeland);
    }

    private rollPirateHomeland() {
        var homeland = HomelandsHelper.generatePirateHomeland();
        this.selectHomeland(homeland);
    }

    private rollScoutHomeland() {
        var homeland = HomelandsHelper.generateScoutHomeland();
        this.selectHomeland(homeland);
    }

    private rollEasternHomeland() {
        var homeland = HomelandsHelper.generateEasternHomeland();
        this.selectHomeland(homeland);
    }

    private rollSouthernHomeland() {
        var homeland = HomelandsHelper.generateSouthernHomeland();
        this.selectHomeland(homeland);
    }

    private showHomelands() {
        this.setState({ showSelection: true });
    }

    private hideHomelands() {
        this.setState({ showSelection: false });
    }

    private selectHomeland(homeland: HomeLand) {
        character.homeland = homeland;
        HomelandsHelper.applyHomeland(homeland);
        Navigation.navigateToPage(PageIdentity.HomelandDetails);
    }
}