import * as React from 'react';
import {Nature, NaturesHelper} from '../helpers/natures';
import {AttributesHelper} from '../helpers/attributes';
import {SkillsHelper} from '../helpers/skills';
import {Button} from './button';

interface INatureSelectionProperties {
    onSelection: (nature: Nature) => void;
    onCancel: () => void;
}

export class NatureSelection extends React.Component<INatureSelectionProperties, {}> {
    constructor(props: INatureSelectionProperties) {
        super(props);
    }

    render() {
        var natures = NaturesHelper.getNatures().map((n, i) => {
            const mandatory = n.mandatory.map((s, i) => {
                return (<div>{SkillsHelper.getSkillName(s) }</div>)
            });

            const elective = n.elective.map((s, i) => {
                return (<div>{SkillsHelper.getSkillName(s) }</div>)
            });

            return (
                <tr key={i}>
                    <td className="selection-header">{n.name}</td>
                    <td>+1 {AttributesHelper.getAttributeName(n.attribute).substr(0, 3) }</td>
                    <td>{mandatory}</td>
                    <td>{elective}</td>
                    <td>Any talent from mandatory or elective skills.</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(n.id) } } /></td>
                </tr>
            )
        });

        return (
            <div>
                <div className="header-text">SELECT NATURE</div>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><b>Attribute</b></td>
                            <td><b>Mandatory Skills</b></td>
                            <td><b>Elective Skills</b></td>
                            <td><b>Talent</b></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {natures}
                    </tbody>
                </table>
                <Button text="Cancel" className="button" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}