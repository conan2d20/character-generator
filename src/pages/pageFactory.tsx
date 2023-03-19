import * as React from 'react';
import { character } from '../common/character';
import { ArchetypeDetailsPage } from './archetypeDetailsPage';
import { ArchetypePage } from './archetypePage';
import { AttributeAspectDetailsPage } from './attributeAspectDetailsPage';
import { AttributeAspectsPage } from './attributeAspectsPage';
import { AttributesAndSkillsPage } from './attributesAndSkillsPage';
import { AttributesPage } from './attributesPage';
import { CasteDetailsPage } from './casteDetailsPage';
import { CastePage } from './castePage';
import { EducationDetailsPage } from './educationDetailsPage';
import { EducationPage } from './educationPage';
import { EquipmentPage } from './equipmentPage';
import { EquipmentTestPage } from './equipmentTestPage';
import { ExiledBackgroundDetailsPage } from './exiledBackgroundDetailsPage';
import { ExiledBackgroundPage } from './exiledBackgroundPage';
import { ExportTestPage } from './exportTestPage';
import { FinishPage } from './finishPage';
import { FortunePointsPage } from './fortunePointsPage';
import { HomelandDetailsPage } from './homelandDetailsPage';
import { HomelandPage } from './homelandPage';
import { NatureDetailsPage } from './natureDetailsPage';
import { NaturePage } from './naturePage';
import { OptionsPage } from './optionsPage';
import { RandomGenerationPage } from './randomGenerationPage';
import { SheetPage } from './sheetPage';
import { SpellsPage } from './spellsPage';
import { StoryDetailsPage } from './storyDetailsPage';
import { StoryPage } from './storyPage';
import { TalentAndLanguagesPage } from './talentAndLanguagesPage';
import { TalentsOverviewPage } from './talentsOverviewPage';
import { ToolSelectionPage } from './toolSelectionPage';
import { WarStoryDetailsPage } from './warStoryDetailsPage';
import { WarStoryPage } from './warStoryPage';
import { WeedOfSorceryPage } from './weedOfSorceryPage';

export enum PageIdentity {
  Options,
  Homeland,
  HomelandDetails,
  Attributes,
  AttributeAspects,
  AttributeAspectDetails,
  Caste,
  CasteDetails,
  Story,
  StoryDetails,
  Archetype,
  ArchetypeDetails,
  Nature,
  NatureDetails,
  Education,
  EducationDetails,
  WarStory,
  WarStoryDetails,
  AttributesAndSkills,
  TalentAndLanguages,
  FortunePoints,
  Equipment,
  WeedOfSorcery,
  Spells,
  ExiledBackground,
  ExiledBackgroundDetails,
  Finish,
  Sheet,

  Tools,
  RandomGeneration,
  TalentsOverview,

  ExportTest,
  EquipmentTest,
}

export interface IPageProperties {}

export class PageFactory {
  private factories: { [pageId: number]: () => JSX.Element } = {};

  constructor() {
    this.factories[PageIdentity.Tools] = () => <ToolSelectionPage />;
    this.factories[PageIdentity.Options] = () => <OptionsPage />;
    this.factories[PageIdentity.Homeland] = () => <HomelandPage />;
    this.factories[PageIdentity.HomelandDetails] = () => <HomelandDetailsPage />;
    this.factories[PageIdentity.Attributes] = () => <AttributesPage />;
    this.factories[PageIdentity.AttributeAspects] = () => <AttributeAspectsPage />;
    this.factories[PageIdentity.AttributeAspectDetails] = () => <AttributeAspectDetailsPage />;
    this.factories[PageIdentity.Caste] = () => <CastePage />;
    this.factories[PageIdentity.CasteDetails] = () => <CasteDetailsPage />;
    this.factories[PageIdentity.Story] = () => <StoryPage />;
    this.factories[PageIdentity.StoryDetails] = () => <StoryDetailsPage />;
    this.factories[PageIdentity.Archetype] = () => <ArchetypePage />;
    this.factories[PageIdentity.ArchetypeDetails] = () => <ArchetypeDetailsPage />;
    this.factories[PageIdentity.Nature] = () => <NaturePage />;
    this.factories[PageIdentity.NatureDetails] = () => <NatureDetailsPage />;
    this.factories[PageIdentity.Education] = () => <EducationPage />;
    this.factories[PageIdentity.EducationDetails] = () => <EducationDetailsPage />;
    this.factories[PageIdentity.WarStory] = () => <WarStoryPage />;
    this.factories[PageIdentity.WarStoryDetails] = () => <WarStoryDetailsPage />;
    this.factories[PageIdentity.AttributesAndSkills] = () => <AttributesAndSkillsPage />;
    this.factories[PageIdentity.TalentAndLanguages] = () => <TalentAndLanguagesPage />;
    this.factories[PageIdentity.FortunePoints] = () => <FortunePointsPage />;
    this.factories[PageIdentity.Equipment] = () => <EquipmentPage />;
    this.factories[PageIdentity.WeedOfSorcery] = () => <WeedOfSorceryPage />;
    this.factories[PageIdentity.Spells] = () => <SpellsPage />;
    this.factories[PageIdentity.Finish] = () => <FinishPage />;
    this.factories[PageIdentity.Sheet] = () => <SheetPage />;
    this.factories[PageIdentity.RandomGeneration] = () => <RandomGenerationPage />;
    this.factories[PageIdentity.TalentsOverview] = () => <TalentsOverviewPage />;
    this.factories[PageIdentity.ExportTest] = () => <ExportTestPage />;
    this.factories[PageIdentity.EquipmentTest] = () => <EquipmentTestPage />;
    this.factories[PageIdentity.ExiledBackground] = () => <ExiledBackgroundPage />;
    this.factories[PageIdentity.ExiledBackgroundDetails] = () => <ExiledBackgroundDetailsPage />;
  }

  createPage(page: PageIdentity) {
    const factory = this.factories[page];
    if (!factory) {
      console.error(`Unable to find a page factory for ${PageIdentity[page]}`);
    }

    character.update();

    return factory ? factory() : undefined;
  }

  isFullscreen(page: PageIdentity) {
    if (page === PageIdentity.Finish) {
      return true;
    }

    return false;
  }
}
