import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {WarStoriesHelper} from '../helpers/warStories';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {SkillView} from '../components/skill';

export class WarStoryDetailsPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        var story = WarStoriesHelper.getWarStory(character.warStoryId);

        const skills = story.skills.map((s, i) => {
            return (<SkillView skill={s} points={1} />)
        });

        return (
            <div className="page">
                <div className="header-text">{story.description}</div>
                <br/>
                <div className="panel">
                    <div className="header-small">SKILL IMPROVEMENTS</div>
                    {skills}
                </div>
                <Button text="CUSTOMIZATION" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        Navigation.navigateToPage(PageIdentity.AttributesAndSkills);
    }
}