import { Skill } from "./skills";
import { Attribute } from "./attributes";
import { character } from "../common/character";

export enum ExiledBackground {
    ATerribleCrime,
    UnfortunateSubject,
    FinalRevenge,
    PoliticalMachinations,
    PrisonerOfWar,
    Martyrdom,
    Framed,
    FailedCoup,
    ASinAgainstAGod,
    AnEvilPlot
}

class ExiledBackgroundModel {
    name: string;
    description: string;
    electiveSkill: Skill;
    talentTree: Skill;
    memento: string;
    reduction: Attribute[];

    constructor(name: string, description: string, electiveSkill: Skill, talentTree: Skill, memento: string, reduction: Attribute[]) {
        this.name = name;
        this.description = description;
        this.electiveSkill = electiveSkill;
        this.talentTree = talentTree;
        this.memento = memento;
        this.reduction = reduction;
    }
}

export class ExiledBackgroundViewModel extends ExiledBackgroundModel {
    id: ExiledBackground;

    constructor(id: ExiledBackground, base: ExiledBackgroundModel) {
        super(base.name, base.description, base.electiveSkill, base.talentTree, base.memento, base.reduction);
        this.id = id;
    }
}

class ExiledBackgrounds {
    private _backgrounds: { [id: number]: ExiledBackgroundModel } = {
        [ExiledBackground.ATerribleCrime]: new ExiledBackgroundModel(
            "A terrible crime",
            "You did something awful, something so heinous even death was not sufficient punishment. Perhaps you murdered your own family. Perhaps you struck a hetman. Maybe you drank from the chalice of Set’s Chosen One. Whatever the crime, you were nailed to the cross and left to slowly wither and choke. ",
            Skill.Counsel,
            Skill.Counsel,
            "A single coin from your homeland",
            [Attribute.Personality, Attribute.Willpower]),
        [ExiledBackground.UnfortunateSubject]: new ExiledBackgroundModel(
            "Unfortunate Subject",
            "You did nothing except have a worthless, cruel whelp for a master. You were a slave, or a servant, or otherwise indebted to the person who decided your fate and had you consigned to this sorry place. You had served him faithfully, or as faithfully as you knew how. But that was not enough. They should pray to every god that will listen they never see you again.",
            Skill.Observation,
            Skill.Observation,
            "A link from the chain that once hung around your neck",
            [Attribute.Intelligence, Attribute.Coordination]),
        [ExiledBackground.FinalRevenge]: new ExiledBackgroundModel(
            "Final Revenge!",
            "You were certain they were beaten, put them out of your mind entirely. Dealt with. Done. Except they were not, and that person who you were so convinced you’d defeated returned. Perhaps they brought evidence of your corruption, of your wickedness. Or perhaps they just brought enough money to bribe the right people. Whatever form their victory took, you ended up in the Exiled Lands, suspended from a cross. ",
            Skill.Persuade,
            Skill.Persuade,
            "A token of the evidence used to condemn you",
            [Attribute.Awareness, Attribute.Intelligence]),
        [ExiledBackground.PoliticalMachinations]: new ExiledBackgroundModel(
            "Political Machinations",
            "You played the game of politics, and you played it well, but you failed to play it well enough. Eventually, your enemies outmaneuvered you and you found yourself without friends, means, or mercy. But that matters little. You will find your way out of here eventually and start again. That is how the game works.",
            Skill.Society,
            Skill.Society,
            "A fragment of the ribbon or wreath you once wore",
            [Attribute.Agility, Attribute.Brawn]),
        [ExiledBackground.PrisonerOfWar]: new ExiledBackgroundModel(
            "Prisoner of War",
            "You fought bravely, obstinately, desperately. But it was not enough. Eventually, even you threw down your sword and they put the manacles about your hands. But they did not ransom you. Perhaps you did something foolish like trying to escape, or perhaps you and your comrades were unlucky. Whatever the reason, they nailed you to a cross and left you to die, baking beneath the sun.",
            Skill.Melee,
            Skill.Melee,
            "The bladeless pommel of a sword or dagger you wielded",
            [Attribute.Intelligence, Attribute.Personality]),
        [ExiledBackground.Martyrdom]: new ExiledBackgroundModel(
            "Martyrdom",
            "Faith governed every aspect of your life. It drove you in all you did and all you sought to do. When it became necessary to offer up your life to prove your belief, you did not hesitate. Yet, still you live. Did your god reject your offer of self-sacrifice? Or is there no god watching at all? You are no longer certain. Perhaps this new life granted you is a chance to find out.",
            Skill.Insight,
            Skill.Insight,
            "A scrap torn from the holy book of your sect",
            [Attribute.Agility, Attribute.Coordination]),
        [ExiledBackground.Framed]: new ExiledBackgroundModel(
            "Framed",
            "You almost expected it. Almost. It was no subtle job, but it worked. The dead man left your name scrawled in blood on the wall, or you were the only person who benefitted from the legacy of a murdered woman. The judge convicted you. Clearing your name no longer seems important… but surviving certainly does. Maybe, if you can do one, you will gain a chance to do the other.",
            Skill.Resistance,
            Skill.Resistance,
            "A warrant for your arrest",
            [Attribute.Awareness, Attribute.Intelligence]),
        [ExiledBackground.FailedCoup]: new ExiledBackgroundModel(
            "Failed Coup",
            "Whether you were trying to depose a despot, or you just sought power for yourself, your attempt to overthrow your monarch failed. Someone betrayed you, or the plan was less ingenious than you had assumed. The palace guards were waiting, and you were hurled into the deepest and dankest of cells. But your punishment didn’t end there. Somehow, you survived your crucifixion. Perhaps you may yet have a chance to try your coup again.",
            Skill.Stealth,
            Skill.Stealth,
            "The golden emblem of the ruler you sought to overthrow",
            [Attribute.Personality, Attribute.Willpower]),
        [ExiledBackground.ASinAgainstAGod]: new ExiledBackgroundModel(
            "A Sin Against a God",
            "The religious authorities of your homeland were angry with something you said or did. Who knows what it was? Perhaps you knelt incorrectly in the temple or genuflected without sufficient deference. But they came for you, seized you, and nailed you to the cross as a punishment. Nobody knows whether the god is angry at you or not, but you ache for vengeance upon the god’s representatives.",
            Skill.Lore,
            Skill.Lore,
            "The branded mark of the god's cult",
            [Attribute.Willpower, Attribute.Brawn]),
        [ExiledBackground.AnEvilPlot]: new ExiledBackgroundModel(
            "An Evil Plot",
            "People moved against you. They conspired and collaborated and together, gradually, wove your downfall. From the heights of society, you were cast down and, finally, you arrived here. Nails through hands and feet, the sun sapping your strength, your breath sobbing in overtaxed lungs. Some of the details of the plot remain hidden, but, perhaps, should you survive long enough, you might find them out. Or perhaps you no longer care.",
            Skill.Survival,
            Skill.Survival,
            "An item from your opulent home, a home you will never see again",
            [Attribute.Awareness, Attribute.Personality]),
    };

    getBackgrounds() {
        var bgs: ExiledBackgroundViewModel[] = [];
        var n = 0;

        for (var background in this._backgrounds) {
            var bg = this._backgrounds[background];
            bgs.push(new ExiledBackgroundViewModel(n, bg));
            n++;
        }

        return bgs.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }

    getBackground(bg: ExiledBackground) {
        return this._backgrounds[bg];
    }

    generateBackground() {
        var roll = (Math.floor(Math.random() * 20) + 1);
        var bg = ExiledBackground.ATerribleCrime;

        switch (roll) {
            case 1:
            case 2:
                bg = ExiledBackground.ATerribleCrime;
                break;
            case 3:
            case 4:
                bg = ExiledBackground.UnfortunateSubject;
                break;
            case 5:
            case 6:
                bg = ExiledBackground.FinalRevenge;
                break;
            case 7:
            case 8:
                bg = ExiledBackground.PoliticalMachinations;
                break;
            case 9:
            case 10:
                bg = ExiledBackground.PrisonerOfWar;
                break;
            case 11:
            case 12:
                bg = ExiledBackground.Martyrdom;
                break;
            case 13:
            case 14:
                bg = ExiledBackground.Framed;
                break;
            case 15:
            case 16:
                bg = ExiledBackground.FailedCoup;
                break;
            case 17:
            case 18:
                bg = ExiledBackground.ASinAgainstAGod;
                break;
            case 19:
            case 20:
                bg = ExiledBackground.AnEvilPlot;
                break;
        }

        return bg;
    }

    applyBackground(background: ExiledBackground) {
        var bg = this.getBackground(background);
        character.skills[bg.electiveSkill].expertise++;
        character.skills[bg.electiveSkill].focus++;
        character.addEquipment(bg.memento);
    }
}

export const ExiledBackgroundHelper = new ExiledBackgrounds();