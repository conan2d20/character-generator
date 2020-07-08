import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Events, EventIdentity} from './common/eventChannel';
import {character} from './common/character';
import {PageIdentity} from './pages/pageFactory';
import {Page} from './pages/pageBase';
import {History} from './components/history';

class Application {
    private _activePage: PageIdentity;

    constructor() {
        this._activePage = PageIdentity.Tools;
    }

    start() {
        this.initialize()
        this.render();
    }

    private initialize() {
        Events.listen(EventIdentity.ShowPage, (page: PageIdentity) => {
            this.activatePage(page, false);
        });

        Events.listen(EventIdentity.HistoryBack, (page: PageIdentity) => {
            this.activatePage(page, true);
        });
    }

    private activatePage(page: PageIdentity, isHistory: boolean) {
        var body = document.getElementsByTagName("html")[0];
        if (body) {
            body.scrollTop = 0;
        }

        if (!isHistory) {
            character.saveStep(this._activePage);
        }

        if (character.pageQueue.length > 0) {
            this._activePage = character.pageQueue[0];
            character.pageQueue.splice(0, 1);
        }
        else {
            this._activePage = page;
        }

        if (!isHistory) {
            character.saveStep(this._activePage);
        }

        this.render();
    }

    private render() {
        ReactDOM.render(
            React.createElement(Page, {
                page: this._activePage
            }),
            document.getElementById("app"));

        ReactDOM.render(
            React.createElement(History),
            document.getElementById("history"));
    }
}

const app = new Application();
app.start();