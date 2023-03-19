import { Archetype, ArchetypesHelper } from '../helpers/archetypes';
import { Castes, CastesHelper } from '../helpers/castes';
import { DiceRoller } from '../helpers/diceRoller';
import { Education, EducationsHelper } from '../helpers/educations';
import { EquipmentHelper, IArmorProperties, IWeaponProperties } from '../helpers/equipment';
import { HomelandsHelper } from '../helpers/homelands';
import { Nature, NaturesHelper } from '../helpers/natures';
import { SkillsHelper } from '../helpers/skills';
import { SpellsHelper } from '../helpers/spells';
import { StoriesHelper } from '../helpers/stories';
import { TalentsHelper } from '../helpers/talents';
import { WarStoriesHelper } from '../helpers/warStories';
import { Character, CharacterAttribute, CharacterSkill, CharacterTalent, Gender } from './character';

export interface ICharacterData {
  name: string;
  value: string;
}

export class CharacterSerializer {
  static serialize(character: Character): ICharacterData[] {
    return [
      { name: 'game', value: 'CONAN' },
      { name: 'attributes', value: CharacterSerializer.serializeAttributes(character.attributes) },
      { name: 'skills', value: CharacterSerializer.serializeSkills(character.skills) },
      { name: 'talents', value: CharacterSerializer.serializeTalents(character.talents) },
      { name: 'archetype', value: ArchetypesHelper.getArchetype(character.archetype).name },
      { name: 'caste', value: CastesHelper.getCaste(character.caste).name },
      {
        name: 'homeland',
        value: character.region ? character.region : HomelandsHelper.getHomeland(character.homeland).name,
      },
      { name: 'nature', value: NaturesHelper.getNature(character.nature).name },
      { name: 'story', value: character.story },
      { name: 'warStory', value: character.warStoryId ? character.warStory : character.heist },
      { name: 'education', value: EducationsHelper.getEducation(character.education).name },
      { name: 'languages', value: CharacterSerializer.serializeArray(character.languages) },
      { name: 'age', value: character.age.toString() },
      { name: 'specialPoints', value: character.fortunePoints.toString() },
      { name: 'equipment', value: CharacterSerializer.serializeEquipment(character.equipment) },
      {
        name: 'weapons',
        value: CharacterSerializer.serializeWeapons(character.equipment.concat([character.provenanceWeapon])),
      },
      { name: 'armor', value: CharacterSerializer.serializeArmor(character.equipment) },
      {
        name: 'derived',
        value: `${CharacterSerializer.serializeResolve(character)},${character.vigour},${character.gold}`,
      },
      { name: 'bonuses', value: `${character.meleeBonus},${character.rangedBonus},${character.mentalBonus}` },
      { name: 'socialStanding', value: character.socialStanding.toString() },
      { name: 'name', value: character.name },
      { name: 'gender', value: Gender[character.gender] },
      { name: 'trait', value: character.trait },
      { name: 'appearance', value: character.appearance },
      { name: 'personality', value: character.personality },
      { name: 'bloodline', value: CharacterSerializer.serializeBloodline(character) },
      {
        name: 'spells',
        value: CharacterSerializer.serializeArray(character.spells.concat(character.pettyEnchantments)),
      },
    ];
  }

  private static serializeAttributes(attrs: CharacterAttribute[]) {
    var result = '';
    attrs.forEach((a) => {
      result += `${a.value},`;
    });
    return result;
  }

  private static serializeSkills(skills: CharacterSkill[]) {
    var result = '';
    skills.forEach((s) => {
      result += `${SkillsHelper.getSkillName(s.skill)},${s.expertise},${s.focus}|`;
    });
    return result;
  }

  private static serializeTalents(talents: { [name: string]: CharacterTalent }) {
    var result = '';

    for (var talent in talents) {
      var t = talents[talent];
      var skill = SkillsHelper.getSkillName(TalentsHelper.getSkillForTalent(talent));
      result += `${talent},${t.rank},${skill}|`;
    }

    return result;
  }

  private static serializeEquipment(eq: string[]) {
    var result = '';

    if (eq) {
      eq.forEach((item) => {
        if (EquipmentHelper.getWeaponByName(item)) {
          result += `${EquipmentHelper.getWeaponByName(item).sheetName}|`;
        } else if (EquipmentHelper.getShieldByName(item)) {
          result += `${EquipmentHelper.getShieldByName(item).sheetName}|`;
        } else if (EquipmentHelper.getArmorByName(item)) {
          result += `${EquipmentHelper.getArmorByName(item).sheetName}|`;
        } else {
          result += `${item}|`;
        }
      });
    }

    return result;
  }

  private static serializeWeapons(eq: string[]) {
    var result = '';

    if (eq) {
      eq.forEach((item) => {
        if (EquipmentHelper.getWeaponByName(item)) {
          const weapon = EquipmentHelper.getWeaponByName(item);
          const props = weapon.properties as IWeaponProperties;

          if (item.indexOf('Ceremonial ') > -1) {
            props.damage -= 1;

            if (props.qualities.indexOf('Improvised') == -1) {
              props.qualities.push('Improvised');
            }
          }

          result += `${weapon.sheetName},${props.range},${EquipmentHelper.weaponSizeToString(props.size)},${
            props.damage
          },${props.qualities.join('>')}|`;
        }
      });
    }

    return result;
  }

  private static serializeArmor(eq: string[]) {
    var name = '';
    var head = 0;
    var arms = 0;
    var torso = 0;
    var legs = 0;
    var qualities = '';

    if (eq) {
      eq.forEach((item) => {
        const armor = EquipmentHelper.getArmorByName(item);
        if (armor) {
          const props = armor.properties as IArmorProperties;

          if (armor.sheetName !== 'Helmet') {
            name = armor.sheetName;
            head = props.head;
            arms = props.arms;
            torso = props.torso;
            legs = props.legs;
            qualities = props.qualities.join('>');
          } else if (head === 0) {
            head = props.head;
          }
        }
      });
    }

    return name.length > 0 ? `${name},${head},${arms},${torso},${legs},${qualities}` : '';
  }

  private static serializeResolve(character: Character) {
    var resolve = character.resolve;

    if (character.hasTalent('Jaded')) {
      resolve += character.talents['Jaded'].rank;
    }

    if (character.hasTalent('Sorcerer')) {
      const roll = DiceRoller.rollSpecial(2, 0);
      resolve -= roll.hits;
    }

    if (character.hasTalent('Barter Your Soul')) {
      const roll = DiceRoller.rollSpecial(2, character.spells.length);
      resolve -= roll.hits;
    }

    character.spells.forEach((s) => {
      const spell = SpellsHelper.getSpell(s);
      resolve -= spell.cost;
    });

    resolve = Math.max(resolve, 1);

    return resolve.toString();
  }

  private static serializeArray(array: string[]) {
    var result = '';
    if (array) {
      array.forEach((item) => {
        result += `${item}|`;
      });
    }
    return result;
  }

  private static serializeBloodline(character: Character) {
    const n = character.bloodlineTalent ? character.bloodlineTalent.indexOf(':') : 0;
    return character.ancientBloodline && n > 0 ? character.bloodlineTalent.substring(n + 1) : '';
  }
}
