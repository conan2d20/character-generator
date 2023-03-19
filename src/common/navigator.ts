import { PageIdentity } from '../pages/pageFactory';
import { EventIdentity, Events } from './eventChannel';

export class Navigator {
  constructor() {}

  navigateToPage(pageId: PageIdentity) {
    var page = document.getElementsByClassName('page')[0];
    page.classList.add('page-out');

    setTimeout(() => {
      Events.signal(EventIdentity.ShowPage, pageId);
    }, 400);
  }

  navigateToHistory(pageId: PageIdentity) {
    var page = document.getElementsByClassName('page')[0];
    page.classList.add('page-out');

    setTimeout(() => {
      Events.signal(EventIdentity.ShowPage, pageId);
    }, 400);
  }
}

export const Navigation = new Navigator();
