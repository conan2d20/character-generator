import { CreationMode } from '../common/character';

class CreationModeModel {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

class CreationModeViewModel extends CreationModeModel {
  id: CreationMode;

  constructor(id: CreationMode, base: CreationModeModel) {
    super(base.name, base.description);
    this.id = id;
  }
}

class CreationModes {
  private _modes: { [id: number]: CreationModeModel } = {
    [CreationMode.Normal]: new CreationModeModel('Normal', 'Create your character using the normal rules.'),
    [CreationMode.NoGods]: new CreationModeModel(
      'Shadows of the Past',
      'Apart from the normal rules, attributes start at 6 and cannot go above 12, and no skills can go above 3 during creation.'
    ),
    [CreationMode.Random]: new CreationModeModel(
      'Play The Hand You Are Dealt',
      'You are only allowed to select Homeland and Archetype, everything else must be randomly generated. Your second Elective Skill is always random.'
    ),
    [CreationMode.AllRandom]: new CreationModeModel(
      'Random',
      'All steps are randomized, but you get a chance to rearrange the rolls to better suit the character you want to play.'
    ),
  };

  getModes() {
    var modes: CreationModeViewModel[] = [];
    var n = 0;
    for (var mode in this._modes) {
      var mod = this._modes[mode];
      modes.push(new CreationModeViewModel(n, mod));
      n++;
    }

    return modes;
  }
}

export const CreationModesHelper = new CreationModes();
