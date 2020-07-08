import * as React from 'react';
import {PageFactory, PageIdentity} from  './pageFactory';
import {Footer} from '../components/footer';
import {CharacterSheet} from '../components/characterSheet';

interface IPageBaseProperties {
    page: PageIdentity;
}

export class Page extends React.Component<IPageBaseProperties, {}> {
    private pageFactory: PageFactory;

    constructor(props: IPageBaseProperties) {
        super(props);

        this.pageFactory = new PageFactory();
    }

    render() {
        const {page} = this.props;
        const pageContent = this.pageFactory.createPage(page);
        const isFullscreen = this.pageFactory.isFullscreen(page);

        const footer = !isFullscreen
            ? (
                <Footer />
              )
            : undefined;

        return (
            <div>
                <div>
                    {pageContent}
                </div>
                <CharacterSheet />
                {footer}
            </div>
        );
    }
}