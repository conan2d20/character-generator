import * as React from 'react';
import { character } from '../common/character';
import { SetHeaderText } from '../common/extensions';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { EducationSelection } from '../components/educationSelection';
import { PageHeader } from '../components/pageHeader';
import { Education, EducationsHelper } from '../helpers/educations';
import { Source } from '../helpers/sources';
import { IPageProperties, PageIdentity } from './pageFactory';

interface IEducationPageState {
  showSelection: boolean;
}

export class EducationPage extends React.Component<IPageProperties, IEducationPageState> {
  constructor(props: IPageProperties) {
    super(props);

    SetHeaderText('EDUCATION');

    this.state = {
      showSelection: false,
    };
  }

  render() {
    const thiefEdu = character.hasSource(Source.Thief) ? (
      <Button className="button" text="Roll Thief Education" onClick={() => this.rollEducation(100)} />
    ) : undefined;

    const pirateEdu = character.hasSource(Source.Pirate) ? (
      <Button className="button" text="Roll Pirate Education" onClick={() => this.rollEducation(500)} />
    ) : undefined;

    const easternEdu = character.hasSource(Source.Wanderer) ? (
      <Button className="button" text="Roll Eastern Education" onClick={() => this.rollEducation(1000)} />
    ) : undefined;

    const nobleEdu = character.hasSource(Source.King) ? (
      <Button className="button" text="Roll Noble Education" onClick={() => this.rollEducation(1100)} />
    ) : undefined;

    const southernEdu = character.hasSource(Source.Adventurer) ? (
      <Button className="button" text="Roll Southern Education" onClick={() => this.rollEducation(1200)} />
    ) : undefined;

    var content = !this.state.showSelection ? (
      <div>
        <div className="page-text">
          The nature of education varies tremendously across the countries of the Hyborian Age. Literacy is rare and
          most of what is learned comes at the steep price of experience. Those who are lucky will enjoy what they are
          taught by their parents, or will be able to find a mentor or tutor able to educate them properly about the
          world.
          <br />
          <br />
          Your Education gives you skills and a talent; and can only be rolled unless your GM allows you to select it.
        </div>
        <div className="button-container">
          <Button className="button" text="Roll Education" onClick={() => this.rollEducation(0)} />
          {thiefEdu}
          {pirateEdu}
          {easternEdu}
          {nobleEdu}
          {southernEdu}
          <Button className="button" text="Select Education" onClick={() => this.showEducations()} />
        </div>
      </div>
    ) : (
      <div>
        <EducationSelection onSelection={(edu) => this.selectEducation(edu)} onCancel={() => this.hideEducations()} />
      </div>
    );

    return <div className="page">{content}</div>;
  }

  private rollEducation(magnitude: number) {
    var education = EducationsHelper.generateEducation(magnitude);
    this.selectEducation(education);
  }

  private showEducations() {
    this.setState({ showSelection: true });
  }

  private hideEducations() {
    this.setState({ showSelection: false });
  }

  private selectEducation(education: Education) {
    character.education = education;
    Navigation.navigateToPage(PageIdentity.EducationDetails);
  }
}
