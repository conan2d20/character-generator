import {character} from '../common/character';
import {Source} from './sources';

export class SpellModel {
    name: string;
    description: string;
    cost: number;
    source: Source;

    constructor(name: string, description: string, cost: number, source: Source) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.source = source;
    }
}

export class Spells {
    private _petty: SpellModel[] = [
        new SpellModel("Exploding Powders", "Create powders that explode and cause damage.", 0, Source.Core),
        new SpellModel("Blinding Powders", "Create powders that blind and stun.", 0, Source.Core),
        new SpellModel("Burning Liquids", "Create liquids that burn.", 0, Source.Core),
        new SpellModel("Reinforced Fabric", "Create tough fabrics worn as armor.", 0, Source.Core),
        new SpellModel("Upas-Glass", "Create near-unbreakable glass.", 0, Source.Core),
        new SpellModel("Talismans", "Create protective talismans.", 0, Source.Core),
        new SpellModel("Lotus Pollen", "Harness the pollen from different lotus flowers.", 0, Source.Core),
        new SpellModel("Acid Powders, Gasses and Liquids", "Create vile acids that cause damage.", 0, Source.Skelos),
        new SpellModel("Mitra's Heavenly Gaze", "Gain visions, or use as mental area attack", -1, Source.Skelos),
        new SpellModel("Withering Unguent", "Causes inanimate objects to deteriorate rapidly", -3, Source.Skelos),
        new SpellModel("Mesmerizing Talisman", "Allows the use of Stun effect with items", -1, Source.Skelos),
        new SpellModel("Potion of Strength Over All", "Grants extra damage for one use", -1, Source.Skelos),
        new SpellModel("Poisons", "Create poisonous powders or gases that can damage, blind or incapacitate", 0, Source.Thief)
    ];

    private _spells: SpellModel[] = [
        new SpellModel("Artifice of Yag", "Construct objects by dreaming.", 2, Source.Skelos),
        new SpellModel("Astral Wanderings", "Visiting other places in astral form.", 1, Source.Core),
        new SpellModel("Atavistic Voyage", "Projecting perception into the past.", 3, Source.Core),
        new SpellModel("Bid Hydra to Waken", "Summon wild tempests.", 3, Source.Skelos),
        new SpellModel("Commune with the Wild", "Calling upon wild beasts to serve or inform.", 1, Source.Core),
        new SpellModel("Dismember", "Inficting physical damage upon the body of a foe.", 1, Source.Core),
        new SpellModel("Enslave", "Subverting the will of another to control their action.", 1, Source.Core),
        new SpellModel("False Resurrection", "Resurrect a person and instill a false soul.", 4, Source.Skelos),
        new SpellModel("Favor of the Gods", "Granting a spell to the gods for later utilization.", 0, Source.Core),
        new SpellModel("Flames of the Deep", "Transport a ship with blue flames.", 2, Source.Pirate),
        new SpellModel("Form of a Beast", "Transforming into a natural creature.", 0, Source.Core),
        new SpellModel("Fury of the Elements", "Causing the earth itself to strike against an area or structure.", 1, Source.Core),
        new SpellModel("Haunt the Mind", "Phantasmal visions attacking the mind of a foe.", 1, Source.Core),
        new SpellModel("Opening the Eyes of Kuth", "Enter the dreamworld.", 1, Source.Skelos),
        new SpellModel("Placate the Dead", "Calming or putting spirits to rest.", 0, Source.Core),
        new SpellModel("Raise Up the Dead", "Binding a spirit of the deceased into its reanimated body.", 1, Source.Core),
        new SpellModel("Slaves of Dream and Darkness", "Create people by dreaming.", 3, Source.Skelos),
        new SpellModel("Soul Theft", "Steal souls and place them in other objects.", 5, Source.Skelos),
        new SpellModel("Summon a Horror", "Calling a monstrous entity to this plane from the Outer Dark.", 1, Source.Core),
        new SpellModel("The Glutton's Curse", "Cause target to vomit strange substances.", 2, Source.Skelos),
        new SpellModel("Venom on the Wind", "Using intense forces of weather to harm or hinder a foe.", 1, Source.Core),
        new SpellModel("Visions of Exalted Wisdom", "Gain visions containing information.", 2, Source.Skelos),
        new SpellModel("Weave of Fate", "Read fate weave of another person or self.", 2, Source.Pirate),
    ];

    getPettyEnchantments() {
        return this._petty.filter(p => character.hasSource(p.source)).sort((a, b) => { return a.name.localeCompare(b.name); });
    }

    getSpells() {
        return this._spells.filter(p => character.hasSource(p.source)).sort((a, b) => { return a.name.localeCompare(b.name); });
    }

    getSpell(name: string) {
        return this._spells.filter(s => s.name === name)[0];
    }
}

export const SpellsHelper = new Spells();