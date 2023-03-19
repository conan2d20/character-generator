import { Archetype, ArchetypesHelper } from '../helpers/archetypes';
import { Attribute, AttributeAspect, AttributesHelper } from '../helpers/attributes';
import { Caste, CastesHelper } from '../helpers/castes';
import { Education, EducationsHelper } from '../helpers/educations';
import { ExiledBackground } from '../helpers/exiledBackgrounds';
import { HomeLand, HomelandsHelper } from '../helpers/homelands';
import { Nature, NaturesHelper } from '../helpers/natures';
import { Skill } from '../helpers/skills';
import { Source } from '../helpers/sources';
import { StoriesHelper } from '../helpers/stories';
import { TalentsHelper } from '../helpers/talents';
import { WarStoriesHelper } from '../helpers/warStories';

export enum CreationMode {
  Normal,
  NoGods,
  Random,
  AllRandom,
}

export enum Gender {
  Male,
  Female,
}

export class CharacterAttribute {
  attribute: Attribute;
  value: number;

  constructor(attr: Attribute, val: number) {
    this.attribute = attr;
    this.value = val;
  }
}

export class CharacterSkill {
  skill: Skill;
  expertise: number;
  focus: number;
  isLegendary: boolean;

  constructor(skill: Skill, expertise: number, focus: number) {
    this.skill = skill;
    this.expertise = expertise;
    this.focus = focus;
  }
}

export class CharacterTalent {
  rank: number;

  constructor(rank: number) {
    this.rank = rank;
  }
}

class Step {
  page: number;
  character: Character;

  constructor(page: number, character: Character) {
    this.page = page;
    this.character = character;
  }
}

export class Character {
  private _attributeInitialValue: number = 7;
  private _steps: Step[];

  public sources: Source[];
  public creationMode: CreationMode = CreationMode.Normal;
  public attributes: CharacterAttribute[] = [];
  public skills: CharacterSkill[] = [];
  public firstAspect: AttributeAspect;
  public secondAspect: AttributeAspect;
  public ancientBloodline: boolean;
  public bloodlineTalent: string;
  public talents: { [name: string]: CharacterTalent };
  public homeland: HomeLand;
  public region: string;
  public languages: string[];
  public caste: Caste;
  public socialStanding: number;
  public story: string;
  public trait: string;
  public storyId: number;
  public archetype: Archetype;
  public nature: Nature;
  public warStory: string;
  public warStoryId: number;
  public heist: string;
  public heistId: number;
  public education: Education;
  public educationMandatory: Skill[];
  public educationElective: Skill[];
  public educationTalentSkills: Skill[];
  public educationEquipment: string[];
  public age: number;
  public name: string;
  public gender: Gender = Gender.Male;
  public appearance: string;
  public personality: string;
  public fortunePoints: number;
  public equipment: string[];
  public provenanceWeapon: string;
  public resolve: number;
  public resolveReduction: number;
  public vigour: number;
  public meleeBonus: number;
  public rangedBonus: number;
  public mentalBonus: number;
  public gold: number;
  public spells: string[];
  public pettyEnchantments: string[];
  public useWeedOfSorcery: boolean;
  public pageQueue: number[];
  public exiledBackground: ExiledBackground;

  constructor() {
    this.attributes.push(new CharacterAttribute(Attribute.Agility, this._attributeInitialValue));
    this.attributes.push(new CharacterAttribute(Attribute.Awareness, this._attributeInitialValue));
    this.attributes.push(new CharacterAttribute(Attribute.Brawn, this._attributeInitialValue));
    this.attributes.push(new CharacterAttribute(Attribute.Coordination, this._attributeInitialValue));
    this.attributes.push(new CharacterAttribute(Attribute.Intelligence, this._attributeInitialValue));
    this.attributes.push(new CharacterAttribute(Attribute.Personality, this._attributeInitialValue));
    this.attributes.push(new CharacterAttribute(Attribute.Willpower, this._attributeInitialValue));

    for (var i = 0; i <= Skill.Siegecraft; i++) {
      this.skills.push(new CharacterSkill(i, 0, 0));
    }

    this.sources = [];

    this.educationMandatory = [];
    this.educationElective = [];
    this.educationTalentSkills = [];
    this.educationEquipment = [];
    this.ancientBloodline = false;
    this.talents = {};
    this.languages = [];
    this.age = 18;
    this.fortunePoints = 3;
    this.equipment = [];
    this.spells = [];
    this.pettyEnchantments = [];
    this.pageQueue = [];
    this._steps = [];

    this.resolve = 0;
    this.resolveReduction = 0;
    this.vigour = 0;
    this.gold = 0;
    this.meleeBonus = 0;
    this.mentalBonus = 0;
    this.rangedBonus = 0;
  }

  private copy(): Character {
    var character = new Character();
    this.sources.forEach((s) => {
      character.sources.push(s);
    });
    this._steps.forEach((s) => {
      character.steps.push(new Step(s.page, s.character));
    });
    character.creationMode = this.creationMode;
    this.attributes.forEach((a) => {
      character.attributes[a.attribute].attribute = a.attribute;
      character.attributes[a.attribute].value = a.value;
    });
    this.skills.forEach((s) => {
      character.skills[s.skill].skill = s.skill;
      character.skills[s.skill].expertise = s.expertise;
      character.skills[s.skill].focus = s.focus;
      character.skills[s.skill].isLegendary = s.isLegendary;
    });
    character.firstAspect = this.firstAspect;
    character.secondAspect = this.secondAspect;
    character.ancientBloodline = this.ancientBloodline;
    character.bloodlineTalent = this.bloodlineTalent;
    for (var talent in this.talents) {
      const t = this.talents[talent];
      character.talents[talent] = new CharacterTalent(t.rank);
    }
    character.homeland = this.homeland;
    character.region = this.region;
    this.languages.forEach((lang) => {
      character.addLanguage(lang);
    });
    character.caste = this.caste;
    character.socialStanding = this.socialStanding;
    character.story = this.story;
    character.trait = this.trait;
    character.storyId = this.storyId;
    character.archetype = this.archetype;
    character.nature = this.nature;
    character.warStory = this.warStory;
    character.warStoryId = this.warStoryId;
    character.heist = this.heist;
    character.heistId = this.heistId;
    character.education = this.education;
    this.educationMandatory.forEach((m) => {
      character.educationMandatory.push(m);
    });
    this.educationElective.forEach((e) => {
      character.educationElective.push(e);
    });
    this.educationTalentSkills.forEach((t) => {
      character.educationTalentSkills.push(t);
    });
    this.educationEquipment.forEach((e) => {
      character.educationEquipment.push(e);
    });
    character.age = this.age;
    character.name = this.name;
    character.gender = this.gender;
    character.appearance = this.appearance;
    character.personality = this.personality;
    character.fortunePoints = this.fortunePoints;
    this.equipment.forEach((eq) => {
      character.addEquipment(eq);
    });
    character.provenanceWeapon = this.provenanceWeapon;
    character.resolve = this.resolve;
    character.vigour = this.vigour;
    character.meleeBonus = this.meleeBonus;
    character.rangedBonus = this.rangedBonus;
    character.mentalBonus = this.mentalBonus;
    character.gold = this.gold;
    this.spells.forEach((s) => {
      character.spells.push(s);
    });
    this.pettyEnchantments.forEach((s) => {
      character.pettyEnchantments.push(s);
    });
    character.useWeedOfSorcery = this.useWeedOfSorcery;
    character.exiledBackground = this.exiledBackground;

    return character;
  }

  saveStep(page: number) {
    if (!this._steps.some((s) => s.page === page)) {
      const copy = this.copy();
      this._steps.push(new Step(page, copy));
    }
  }

  goToStep(page: number) {
    for (var i = this._steps.length - 1; i >= 0; i--) {
      if (this._steps[i].page === page) {
        character = this._steps[i].character;
        character.saveStep(page);
        break;
      }
    }
  }

  get steps() {
    return this._steps;
  }

  addSource(source: Source) {
    this.sources.push(source);
  }

  removeSource(source: Source) {
    if (this.hasSource(source)) {
      this.sources.splice(this.sources.indexOf(source), 1);
    }
  }

  hasSource(source: Source) {
    return character.sources.indexOf(source) > -1 || source === Source.Core;
  }

  addTalent(name: string) {
    var found = false;

    if (name.indexOf('[') > -1) {
      name = name.substr(0, name.indexOf('[') - 1);
    } else if (name.indexOf('(') > -1) {
      name = name.substr(0, name.indexOf('(') - 1);
    }

    for (var talent in this.talents) {
      var t = this.talents[talent];
      if (talent === name) {
        t.rank++;
        found = true;
        break;
      }
    }

    if (!found) {
      this.talents[name] = new CharacterTalent(1);

      TalentsHelper.applyTalent(name);
    }
  }

  hasTalent(name: string) {
    var found = false;

    for (var talent in this.talents) {
      var t = this.talents[talent];
      if (talent === name) {
        found = true;
        break;
      }
    }

    return found;
  }

  addLanguage(name: string) {
    var found = false;

    for (var i = 0; i < this.languages.length; i++) {
      if (this.languages[i] === name) {
        found = true;
        break;
      }
    }

    if (!found) {
      this.languages.push(name);
    }
  }

  hasLanguage(name: string) {
    return this.languages.indexOf(name) > -1;
  }

  addEquipment(name: string) {
    if (name && name != 'undefined') {
      this.equipment.push(name);
    }
  }

  hasSpells() {
    return this.hasTalent('Patron') || this.hasTalent('Master of Formulae') || this.hasTalent('Sorcerer');
  }

  isExile() {
    return (
      this.archetype === Archetype.Exile ||
      this.archetype === Archetype.Forgotten ||
      this.archetype === Archetype.Shaper ||
      this.archetype === Archetype.WastelandPriest
    );
  }

  update() {
    this.attributes.forEach((attr) => {
      if (attr.value > 12) {
        if (this.creationMode === CreationMode.NoGods) {
          attr.value = 12;
        } else {
          if (!this.ancientBloodline) {
            this.ancientBloodline = true;
          }
        }
        return;
      }
    });

    if (this.creationMode === CreationMode.NoGods) {
      this.skills.forEach((skill) => {
        if (skill.expertise > 3) skill.expertise = 3;
        if (skill.focus > 3) skill.focus = 3;
      });
    } else {
      this.skills.forEach((skill) => {
        if (skill.expertise > 5) skill.expertise = 5;
        if (skill.focus > 5) skill.focus = 5;
      });
    }

    this.vigour = this.attributes[Attribute.Brawn].value + this.skills[Skill.Resistance].expertise;
    this.resolve =
      this.attributes[Attribute.Willpower].value + this.skills[Skill.Discipline].expertise - this.resolveReduction;

    if (this.archetype !== Archetype.Beast) {
      this.gold = this.attributes[Attribute.Personality].value + this.skills[Skill.Society].expertise;
    } else {
      this.gold = 0;
    }

    this.meleeBonus = this.calculateBonus(this.attributes[Attribute.Brawn].value);
    this.rangedBonus = this.calculateBonus(this.attributes[Attribute.Awareness].value);
    this.mentalBonus = this.calculateBonus(this.attributes[Attribute.Personality].value);
  }

  randomAll(dice: number[]) {
    character.homeland = HomelandsHelper.getHomelandForRoll(dice[0] + dice[1]);
    character.archetype = ArchetypesHelper.getArchetypeForRoll(dice[6]);

    HomelandsHelper.applyHomeland(character.homeland);
    ArchetypesHelper.applyArchetype(character.archetype);

    character.firstAspect = AttributesHelper.getAttributeAspectForRoll(dice[2], Source.Core);
    character.secondAspect = AttributesHelper.getAttributeAspectForRoll(dice[3], Source.Core);

    character.caste = CastesHelper.getCasteForRoll(dice[4]);
    CastesHelper.applyCaste(character.caste);

    character.nature = NaturesHelper.getNatureForRoll(dice[7]);
    NaturesHelper.applyNature(character.nature);

    character.education = EducationsHelper.getEducationForRoll(dice[8]);
    //EducationsHelper.applyEducation(character.education);

    var story = StoriesHelper.getStoryForRoll(dice[5]);
    StoriesHelper.applyStory(story.roll);
    character.storyId = story.roll;

    var warStory = WarStoriesHelper.getWarStoryForRoll(dice[9]);
    WarStoriesHelper.applyWarStory(warStory.roll);

    //this.pageQueue.push(25); // TODO: remove

    this.pageQueue.push(2); // Homeland Details
    this.pageQueue.push(5); // Attribute Aspect Details
    this.pageQueue.push(7); // Caste Details
    this.pageQueue.push(9); // Story Details
    this.pageQueue.push(11); // Archetype Details
    this.pageQueue.push(13); // Nature Details
    this.pageQueue.push(15); // Education Details
    this.pageQueue.push(17); // War Story Details
  }

  random() {
    character.firstAspect = AttributesHelper.generateAttributeAspect(Source.Core);
    character.secondAspect = AttributesHelper.generateAttributeAspect(Source.Core);

    character.caste = CastesHelper.generateCaste(Source.Core);
    CastesHelper.applyCaste(character.caste);

    character.nature = NaturesHelper.generateNature(Source.Core);
    NaturesHelper.applyNature(character.nature);

    character.education = EducationsHelper.generateEducation(0);
    //EducationsHelper.applyEducation(character.education);

    var story = StoriesHelper.generateStory();
    StoriesHelper.applyStory(story.roll);
    character.storyId = story.roll;

    var warStory = WarStoriesHelper.generateWarStory(0);
    WarStoriesHelper.applyWarStory(warStory.roll);

    this.pageQueue.push(1); // Homeland
    this.pageQueue.push(2); // Homeland Details
    this.pageQueue.push(5); // Attribute Aspect Details
    this.pageQueue.push(7); // Caste Details
    this.pageQueue.push(9); // Story Details
    this.pageQueue.push(10); // Archetype
    this.pageQueue.push(11); // Archetype Details
    this.pageQueue.push(13); // Nature Details
    this.pageQueue.push(15); // Education Details
    this.pageQueue.push(17); // War Story Details
  }

  private calculateBonus(sum: number) {
    if (sum >= 16) {
      return 5;
    } else if (sum >= 14) {
      return 4;
    } else if (sum >= 12) {
      return 3;
    } else if (sum >= 10) {
      return 2;
    } else if (sum > 8) {
      return 1;
    }

    return 0;
  }
}

export let character = new Character();
