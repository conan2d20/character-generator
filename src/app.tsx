import * as React from 'react';
import * as ReactDom from 'react-dom/client';
import { character } from './common/character';
import { EventIdentity, Events } from './common/eventChannel';
import { History } from './components/history';
import { Page } from './pages/pageBase';
import { PageIdentity } from './pages/pageFactory';
import './styles/index.scss';

class Application {
  private _activePage: PageIdentity;
  private _root: ReactDom.Root;

  constructor() {
    this._activePage = PageIdentity.Tools;
    this._root = ReactDom.createRoot(document.getElementById('app'));
  }

  start() {
    this.initialize();
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
    var body = document.getElementsByTagName('html')[0];
    if (body) {
      body.scrollTop = 0;
    }

    if (!isHistory) {
      character.saveStep(this._activePage);
    }

    if (character.pageQueue.length > 0) {
      this._activePage = character.pageQueue[0];
      character.pageQueue.splice(0, 1);
    } else {
      this._activePage = page;
    }

    if (!isHistory) {
      character.saveStep(this._activePage);
    }

    this.render();
  }

  private render() {
    this._root.render(
      React.createElement(Page, {
        page: this._activePage,
      })
    );
  }
}

const app = new Application();
app.start();
