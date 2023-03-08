import * as React from 'react';
import {Education, EducationsHelper} from '../helpers/educations';
import {SkillsHelper} from '../helpers/skills';
import {Button} from './button';

interface IEducationSelectionProperties {
    onSelection: (edu: Education) => void;
    onCancel: () => void;
}

export class EducationSelection extends React.Component<IEducationSelectionProperties, {}> {
    constructor(props: IEducationSelectionProperties) {
        super(props);
    }

    render() {
        var edus = EducationsHelper.getEducations().map((n, i) => {
            const mandatory = n.mandatory.map((s, i) => {
                return (<div>{SkillsHelper.getSkillName(s) }</div>)
            });

            const elective = n.elective.map((s, i) => {
                return (<div>{SkillsHelper.getSkillName(s) }</div>)
            });

            const talent = n.id === Education.CultTrained
                ? "Scribe"
                : "Any talent from mandatory or elective skills.";

            return (
                <tr key={i}>
                    <td className="selection-header">{n.name}</td>
                    <td>{mandatory}</td>
                    <td>{elective}</td>
                    <td>{talent}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(n.id) } } /></td>
                </tr>
            )
        });

        return (
            <div>
                <div className="header-text">SELECT EDUCATION</div>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><b>Mandatory Skills</b></td>
                            <td><b>Elective Skills</b></td>
                            <td><b>Talent</b></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {edus}
                    </tbody>
                </table>
                <Button text="Cancel" className="button" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}