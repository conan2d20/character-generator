import * as React from 'react';
import { character } from '../common/character';
import { HomeLand, HomelandsHelper } from '../helpers/homelands';
import { Button } from './button';

interface IHomelandSelectionProperties {
    onSelection: (homeland: HomeLand) => void;
    onCancel: () => void;
}

export class HomelandSelection extends React.Component<IHomelandSelectionProperties, {}> {
    constructor(props: IHomelandSelectionProperties) {
        super(props);
    }

    render() {
        const homelands = HomelandsHelper.getHomelands().map((h, i) => {
            const talent = h.id !== HomeLand.Atlantis
                ? h.talent.name
                : "Primitive/Uncivilized";

            return (
                <tr key={i}>
                    <td className="selection-header">{h.name}</td>
                    <td>{talent}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(h.id) }} /></td>
                </tr>
            )
        })

        return (
            <div>
                <div className="header-text">SELECT HOMELAND</div>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><b>Talent</b></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {homelands}
                    </tbody>
                </table>
                <Button text="Cancel" className="button" onClick={() => this.props.onCancel()} />
            </div>
        );
    }

    private renderHomelands(homelands: any[], label: string) {
        const homes = homelands.map((h, i) => {
            return (
                <tr key={i}>
                    <td className="selection-header">{h.name}</td>
                    <td>{h.talent.name}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(h.id) }} /></td>
                </tr>
            )
        });

        return (
            <div>
                <b>{label}</b>

            </div>
        );
    }
}