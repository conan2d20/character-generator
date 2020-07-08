import * as React from 'react';

interface ITalentDescriptionProperties {
    name: string;
    description: string;
}

export class TalentDescription extends React.Component<ITalentDescriptionProperties, {}> {
    constructor(props: ITalentDescriptionProperties) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={{fontWeight: 'bold'}}>{this.props.name}</div>
                <div>{this.props.description}</div>
            </div>
        );
    }
}