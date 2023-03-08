import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {SetHeaderText} from '../common/extensions';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Archetype, ArchetypesHelper} from '../helpers/archetypes';
import {Source} from '../helpers/sources';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {ArchetypeSelection} from '../components/archetypeSelection';

interface IArchetypePageState {
    showSelection: boolean;
}

export class ArchetypePage extends React.Component<IPageProperties, IArchetypePageState> {
    constructor(props: IPageProperties) {
        super(props);

        SetHeaderText("ARCHETYPE");

        this.state = {
            showSelection: false
        };
    }

    render() {
        var mercRoll = character.hasSource(Source.Mercenary)
            ? <Button className="button" text="Roll Mercenary Archetype" onClick={() => this.rollMercenaryArchetype() }/>
            : undefined;

        var wandererRoll = character.hasSource(Source.Wanderer)
            ? <Button className="button" text="Roll Wanderer Archetype" onClick={() => this.rollWandererArchetype()} />
            : undefined;

        var kingRoll = character.hasSource(Source.King)
            ? <Button className="button" text="Roll Noble Archetype" onClick={() => this.rollNobleArchetype()} />
            : undefined;

        var exileRoll = character.hasSource(Source.Exiles)
            ? <Button className="button" text="Roll Exile Archetype" onClick={() => this.rollExileArchetype()} />
            : undefined;

        var content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        What is it your character does for a living?
                        <br/>
                        Determine the Archetype of your character by rolling or selecting.
                        <br /><br />
                        Archetypes will grant you skill improvements and a talent.
                    </div>
                    <div className="button-container">
                        <Button className="button" text="Roll Archetype" onClick={() => this.rollArchetype() } />
                        {mercRoll}
                        {wandererRoll}
                        {kingRoll}
                        {exileRoll}
                        <Button className="button" text="Select Archetype" onClick={() => this.showArchetypes() } />
                    </div>
                </div>
            )
            : (
                <div>
                    <ArchetypeSelection
                        onSelection={(caste) => this.selectArchetype(caste) }
                        onCancel={() => this.hideArchetypes() } />
                </div>
            );

        return (
            <div className="page">
                {content}
            </div>
        );
    }

    private rollArchetype() {
        var archetype = ArchetypesHelper.generateArchetype();
        this.selectArchetype(archetype);
    }

    private rollMercenaryArchetype() {
        var archetype = ArchetypesHelper.generateMercenaryArchetype();
        this.selectArchetype(archetype);
    }

    private rollWandererArchetype() {
        var archetype = ArchetypesHelper.generateWandererArchetype();
        this.selectArchetype(archetype);
    }

    private rollNobleArchetype() {
        var archetype = ArchetypesHelper.generateKingArchetype();
        this.selectArchetype(archetype);
    }

    private rollExileArchetype() {
        var archetype = ArchetypesHelper.generateExileArchetype();
        this.selectArchetype(archetype);
    }

    private showArchetypes() {
        this.setState({ showSelection: true });
    }

    private hideArchetypes() {
        this.setState({ showSelection: false });
    }

    private selectArchetype(archetype: Archetype) {
        character.archetype = archetype;
        ArchetypesHelper.applyArchetype(archetype);
        Navigation.navigateToPage(PageIdentity.ArchetypeDetails);
    }
}