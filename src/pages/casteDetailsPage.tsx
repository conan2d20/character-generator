﻿import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Caste, CastesHelper} from '../helpers/castes';
import {PageHeader} from '../components/pageHeader';
import {SkillView} from '../components/skill';
import {Button} from '../components/button';
import {TalentDescription} from '../components/talentDescription';
import { ElectiveSkillList } from '../components/electiveSkillList';
import { Skill } from '../helpers/skills';

export class CasteDetailsPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        var caste = CastesHelper.getCaste(character.caste);

        const talents = caste.talents.map((t, i) => {
            return (<TalentDescription key={i} name={t.name} description={t.description} />)
        });

        const skill = caste.id === Caste.Tribesperson
            ? <ElectiveSkillList points={1} skills={[Skill.Animal_Handling, Skill.Healing]} />
            : <SkillView skill={caste.skill} points={1} />;

        return (
            <div className="page">
                <div className="header-text">{caste.name}</div>
                <div className="panel">
                    <div className="desc-text">
                        {caste.description}
                        <br/><br/>
                        <b>Social Standing:</b> {caste.socialStanding}
                    </div>
                </div>
                <div className="panel">
                    <div className="header-small">TALENTS</div>
                    {talents}
                </div>
                <div className="panel">
                    <div className="header-small">SKILL</div>
                    <div>{skill}</div>
                </div>
                <Button text="STORY" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        Navigation.navigateToPage(PageIdentity.Story);
    }
}