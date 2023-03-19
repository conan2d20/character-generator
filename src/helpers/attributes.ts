import { character } from '../common/character';
import { Source } from './sources';

export enum Attribute {
  Agility,
  Awareness,
  Brawn,
  Coordination,
  Intelligence,
  Personality,
  Willpower,
}

export enum AttributeAspect {
  // Core
  StrongAndResolute,
  AcuteAndAware,
  FastAndFit,
  EagleEyed,
  WiseAndFriendly,
  SociallyAdept,
  BraveOrFoolhardy,
  Dexterous,
  Charismatic,
  WarriorBorn,

  // Skelos
  UnwaveringIntelligence,
  PowerfulPresence,
  MightyStature,
  CharmingPerformer,
  ScientificMind,
}

class AttributeAspectModel {
  name: string;
  mandatory: Attribute[];
  optional: Attribute[];
  source: Source;

  constructor(name: string, mandatory: Attribute[], optional: Attribute[], source: Source) {
    this.name = name;
    this.mandatory = mandatory;
    this.optional = optional;
    this.source = source;
  }
}

export class AttributeAspectViewModel extends AttributeAspectModel {
  id: AttributeAspect;

  constructor(id: AttributeAspect, base: AttributeAspectModel) {
    super(base.name, base.mandatory, base.optional, base.source);
    this.id = id;
  }
}

export class AttributeAspectAttribute {
  attribute: Attribute;
  isDuplicated: boolean;

  constructor(attribute: Attribute, isDuplicated: boolean) {
    this.attribute = attribute;
    this.isDuplicated = isDuplicated;
  }
}

export class Attributes {
  private _aspects: { [id: number]: AttributeAspectModel } = {
    [AttributeAspect.StrongAndResolute]: new AttributeAspectModel(
      'Strong and Resolute',
      [Attribute.Brawn, Attribute.Willpower],
      [Attribute.Personality, Attribute.Intelligence],
      Source.Core
    ),
    [AttributeAspect.AcuteAndAware]: new AttributeAspectModel(
      'Acute and Aware',
      [Attribute.Awareness, Attribute.Intelligence],
      [Attribute.Agility, Attribute.Coordination],
      Source.Core
    ),
    [AttributeAspect.FastAndFit]: new AttributeAspectModel(
      'Fast and Fit',
      [Attribute.Agility, Attribute.Brawn],
      [Attribute.Coordination, Attribute.Awareness],
      Source.Core
    ),
    [AttributeAspect.EagleEyed]: new AttributeAspectModel(
      'Eagle-eyed',
      [Attribute.Awareness, Attribute.Coordination],
      [Attribute.Intelligence, Attribute.Personality],
      Source.Core
    ),
    [AttributeAspect.WiseAndFriendly]: new AttributeAspectModel(
      'Wise and Friendly',
      [Attribute.Intelligence, Attribute.Personality],
      [Attribute.Coordination, Attribute.Brawn],
      Source.Core
    ),
    [AttributeAspect.SociallyAdept]: new AttributeAspectModel(
      'Socially Adept',
      [Attribute.Awareness, Attribute.Personality],
      [Attribute.Agility, Attribute.Willpower],
      Source.Core
    ),
    [AttributeAspect.BraveOrFoolhardy]: new AttributeAspectModel(
      'Brave or Foolhardy',
      [Attribute.Agility, Attribute.Willpower],
      [Attribute.Brawn, Attribute.Coordination],
      Source.Core
    ),
    [AttributeAspect.Dexterous]: new AttributeAspectModel(
      'Dexterous',
      [Attribute.Agility, Attribute.Coordination],
      [Attribute.Brawn, Attribute.Willpower],
      Source.Core
    ),
    [AttributeAspect.Charismatic]: new AttributeAspectModel(
      'Charismatic',
      [Attribute.Personality, Attribute.Willpower],
      [Attribute.Awareness, Attribute.Intelligence],
      Source.Core
    ),
    [AttributeAspect.WarriorBorn]: new AttributeAspectModel(
      'Warrior-born',
      [Attribute.Awareness, Attribute.Brawn],
      [Attribute.Agility, Attribute.Coordination],
      Source.Core
    ),
    [AttributeAspect.UnwaveringIntelligence]: new AttributeAspectModel(
      'Unwavering Intelligence',
      [Attribute.Intelligence, Attribute.Willpower],
      [Attribute.Awareness, Attribute.Agility],
      Source.Skelos
    ),
    [AttributeAspect.PowerfulPresence]: new AttributeAspectModel(
      'Powerful Presence',
      [Attribute.Personality, Attribute.Willpower],
      [Attribute.Intelligence, Attribute.Brawn],
      Source.Skelos
    ),
    [AttributeAspect.MightyStature]: new AttributeAspectModel(
      'Mighty Stature',
      [Attribute.Brawn, Attribute.Personality],
      [Attribute.Intelligence, Attribute.Willpower],
      Source.Skelos
    ),
    [AttributeAspect.CharmingPerformer]: new AttributeAspectModel(
      'Charming Performer',
      [Attribute.Agility, Attribute.Personality],
      [Attribute.Awareness, Attribute.Coordination],
      Source.Skelos
    ),
    [AttributeAspect.ScientificMind]: new AttributeAspectModel(
      'Scientific Mind',
      [Attribute.Awareness, Attribute.Intelligence],
      [Attribute.Willpower, Attribute.Coordination],
      Source.Skelos
    ),
  };

  getAttributeName(attr: Attribute) {
    return Attribute[attr];
  }

  getAttributeAspects() {
    var aspects: AttributeAspectViewModel[] = [];
    var n = 0;
    for (var aspect in this._aspects) {
      var asp = this._aspects[aspect];
      if (character.hasSource(asp.source)) {
        aspects.push(new AttributeAspectViewModel(n, asp));
      }

      n++;
    }

    return aspects.sort((a, b) => a.name.localeCompare(b.name));
  }

  getAttributeAspect(aspect: AttributeAspect) {
    return this._aspects[aspect];
  }

  getAttributeAspectForRoll(roll: number, source: Source) {
    switch (source) {
      case Source.Core:
        switch (roll) {
          case 1:
          case 2:
            return AttributeAspect.StrongAndResolute;
          case 3:
          case 4:
            return AttributeAspect.AcuteAndAware;
          case 5:
          case 6:
            return AttributeAspect.FastAndFit;
          case 7:
          case 8:
            return AttributeAspect.EagleEyed;
          case 9:
          case 10:
            return AttributeAspect.WiseAndFriendly;
          case 11:
          case 12:
            return AttributeAspect.SociallyAdept;
          case 13:
          case 14:
            return AttributeAspect.BraveOrFoolhardy;
          case 15:
          case 16:
            return AttributeAspect.Dexterous;
          case 17:
          case 18:
            return AttributeAspect.Charismatic;
          case 19:
          case 20:
            return AttributeAspect.EagleEyed;
        }
        break;
      case Source.Skelos:
        switch (roll) {
          case 1:
          case 2:
          case 3:
          case 4:
            return AttributeAspect.UnwaveringIntelligence;
          case 5:
          case 6:
          case 7:
          case 8:
            return AttributeAspect.PowerfulPresence;
          case 9:
          case 10:
          case 11:
            return AttributeAspect.MightyStature;
          case 12:
          case 13:
          case 14:
            return AttributeAspect.CharmingPerformer;
          case 15:
          case 16:
          case 17:
            return AttributeAspect.ScientificMind;
          case 18:
            return AttributeAspect.WiseAndFriendly;
          case 19:
            return AttributeAspect.Charismatic;
          case 20:
            return AttributeAspect.StrongAndResolute;
        }
        break;
    }
  }

  generateAttributeAspect(source: Source) {
    var roll = Math.floor(Math.random() * 20) + 1;
    return this.getAttributeAspectForRoll(roll, source);
  }

  getMandatoryAttributesForAspects(first: AttributeAspectModel, second: AttributeAspectModel) {
    var attrs: AttributeAspectAttribute[] = [];

    first.mandatory.forEach((a, i) => {
      attrs.push(new AttributeAspectAttribute(a, false));
    });

    second.mandatory.forEach((a, i) => {
      var exists = false;
      for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];
        if (attr.attribute === a) {
          attr.isDuplicated = true;
          exists = true;
          break;
        }
      }

      if (!exists) {
        attrs.push(new AttributeAspectAttribute(a, false));
      }
    });

    return attrs;
  }

  getOptionalAttributesForAspects(first: AttributeAspectModel, second: AttributeAspectModel) {
    var attrs: Attribute[] = [];

    first.optional.forEach((a, i) => {
      attrs.push(a);
    });

    second.optional.forEach((a, i) => {
      //if (attrs.indexOf(a) === -1) {
      attrs.push(a);
      //}
    });

    return attrs;
  }

  applyAttributeAspect(best: Attribute, worst: Attribute, optional1: Attribute, optional2: Attribute) {
    character.attributes[best].value += 3;
    character.attributes[worst].value += 1;
    character.attributes[optional1].value += 1;
    character.attributes[optional2].value += 1;

    var mandatory = this.getMandatoryAttributesForAspects(
      this.getAttributeAspect(character.firstAspect),
      this.getAttributeAspect(character.secondAspect)
    );

    mandatory.forEach((a, i) => {
      if (a.attribute !== best && a.attribute !== worst) {
        character.attributes[a.attribute].value += 2;
      }

      if (a.isDuplicated) {
        character.attributes[a.attribute].value += 2;
      }
    });
  }
}

export const AttributesHelper = new Attributes();
