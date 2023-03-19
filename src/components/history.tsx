import * as React from 'react';
import { character } from '../common/character';
import { EventIdentity, Events } from '../common/eventChannel';
import { Navigation } from '../common/navigator';
import { PageIdentity } from '../pages/pageFactory';

interface IHistoryState {
  showHistory: boolean;
}

export class History extends React.Component<{}, IHistoryState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      showHistory: false,
    };

    Events.listen(EventIdentity.ShowHistory, (arg) => {
      if (arg && arg === true) {
        this.hideHistory();
      } else {
        this.toggleHistory();
      }
    });
  }

  render() {
    const pages =
      character.steps.length > 0 ? (
        character.steps.map((step, i) => {
          const name = this.getPageName(step.page);
          if (name.length > 0) {
            return (
              <div className="history-item" key={i} onClick={() => this.goToPage(step.page)}>
                {name}
              </div>
            );
          }
        })
      ) : (
        <div>No history.</div>
      );

    const history = this.state.showHistory ? <div className="history">{pages}</div> : undefined;

    return <div>{history}</div>;
  }

  private toggleHistory() {
    this.setState({
      showHistory: !this.state.showHistory,
    });
  }

  private hideHistory() {
    this.setState({
      showHistory: false,
    });
  }

  private goToPage(page: PageIdentity) {
    this.toggleHistory();
    character.goToStep(page);
    Navigation.navigateToHistory(page);
  }

  private getPageName(page: PageIdentity) {
    switch (page) {
      case PageIdentity.Archetype:
        return 'Archetype';
      case PageIdentity.ArchetypeDetails:
        return 'Archetype Details';
      case PageIdentity.AttributeAspectDetails:
        return 'Attribute Aspect Details';
      case PageIdentity.AttributeAspects:
        return 'Attribute Aspects';
      case PageIdentity.Attributes:
        return 'Attributes';
      case PageIdentity.AttributesAndSkills:
        return 'Attributes & Skills';
      case PageIdentity.Caste:
        return 'Caste';
      case PageIdentity.CasteDetails:
        return 'Caste Details';
      case PageIdentity.Education:
        return 'Education';
      case PageIdentity.EducationDetails:
        return 'Education Details';
      case PageIdentity.Equipment:
        return 'Equipment';
      case PageIdentity.FortunePoints:
        return 'Fortune Points';
      case PageIdentity.Homeland:
        return 'Homeland';
      case PageIdentity.HomelandDetails:
        return 'Homeland Details';
      case PageIdentity.Nature:
        return 'Nature';
      case PageIdentity.NatureDetails:
        return 'Nature Details';
      case PageIdentity.Options:
        return 'Options';
      case PageIdentity.Spells:
        return 'Spells';
      case PageIdentity.Story:
        return 'Story';
      case PageIdentity.StoryDetails:
        return 'Story Details';
      case PageIdentity.TalentAndLanguages:
        return 'Talent & Languages';
      case PageIdentity.TalentsOverview:
        return 'Talents Overview';
      case PageIdentity.Tools:
        return 'Tools';
      case PageIdentity.WarStory:
        return 'War Story';
      case PageIdentity.WarStoryDetails:
        return 'War Story Details';
      case PageIdentity.ExiledBackground:
        return 'Exiled Background';
      case PageIdentity.ExiledBackgroundDetails:
        return 'Exiled Background Details';
    }

    return '';
  }
}
