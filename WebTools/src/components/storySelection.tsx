import * as React from 'react';
import {character} from '../common/character';
import {StoriesHelper} from '../helpers/stories';
import {Button} from './button';

interface IStorySelectionProperties {
    showCultStories: boolean;
    onSelection: (id: number) => void;
    onCancel: () => void;
}

export class StorySelection extends React.Component<IStorySelectionProperties, {}> {
    constructor(props: IStorySelectionProperties) {
        super(props);
    }

    render() {
        var stories = this.props.showCultStories === false
            ? StoriesHelper.getStories(character.caste).map((s, i) => {
                return (
                    <tr key={i}>
                        <td className="selection-header">{s.name}</td>
                        <td>{s.trait}</td>
                        <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(s.roll) } } /></td>
                    </tr>
                )
              })
            : StoriesHelper.getCultStories().map((s, i) => {
                return (
                    <tr key={i}>
                        <td className="selection-header">{s.name}</td>
                        <td>{s.trait}</td>
                        <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(s.roll) } } /></td>
                    </tr>
                )
              });

        return (
            <div>
                <div className="header-text">SELECT STORY</div>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><b>Trait</b></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {stories}
                    </tbody>
                </table>
                <Button text="Cancel" className="button" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}