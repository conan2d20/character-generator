import * as React from 'react';
import {character} from '../common/character';
import {SetHeaderText} from '../common/extensions';
import {IPageProperties} from './pageFactory';
import {CharacterSerializer} from '../common/characterSerializer';

export class ExportTestPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);

        SetHeaderText("EXPORT TEST");

        character.age = 34;
        character.gender = 0;
        character.homeland = 0;
        character.addTalent("Savage Court");
        character.addLanguage("Hyperborean");
        character.caste = 3;
        character.addTalent("Sentry");
        character.addTalent("Subject");
        character.socialStanding = 1;
        character.skills[2] = { expertise: 2, focus: 2, isLegendary: false, skill: 2 };
        character.story = "A Heavy Lambing Season";
        character.storyId = 0;
        character.trait = "Exotic Tastes";
        character.archetype = 9;
        character.addTalent("Force of Presence");
        character.skills[15] = { expertise: 2, focus: 2, isLegendary: false, skill: 15 };
        character.skills[1] = { expertise: 2, focus: 2, isLegendary: false, skill: 1 };
        character.skills[6] = { expertise: 1, focus: 1, isLegendary: false, skill: 6 };
        character.skills[8] = { expertise: 2, focus: 2, isLegendary: false, skill: 8 };
        character.skills[11] = { expertise: 2, focus: 2, isLegendary: false, skill: 11 };
        character.skills[23] = { expertise: 1, focus: 1, isLegendary: false, skill: 23 };
        character.addEquipment("Dagger");
        character.addEquipment("Scale hauberk with helm (Armor 3: Torso/Head)");
        //character.addEquipment("Helmet (Armor 3: Head; Heavy)");
        character.addEquipment("Healer's Bag");
        character.addEquipment("Alchemist's Bag");
        character.addEquipment("Personal Library");
        character.addEquipment("Riding Horse");
        character.nature = 5;
        character.attributes[2].value++;
        character.skills[7] = { expertise: 1, focus: 1, isLegendary: false, skill: 7 };
        character.skills[4] = { expertise: 2, focus: 2, isLegendary: false, skill: 4 };
        character.skills[13] = { expertise: 1, focus: 1, isLegendary: false, skill: 13 };
        character.addTalent("Alchemist");
        character.education = 8;
        character.skills[0] = { expertise: 1, focus: 1, isLegendary: false, skill: 0 };
        character.skills[3] = { expertise: 1, focus: 1, isLegendary: false, skill: 3 };
        character.skills[21] = { expertise: 1, focus: 1, isLegendary: false, skill: 21 };
        character.skills[22] = { expertise: 2, focus: 2, isLegendary: false, skill: 22 };
        character.addTalent("Scribe");
        character.warStory = "Prevented a Disaster";
        character.warStoryId = 5;
        character.addTalent("Sage");
        character.fortunePoints = 3;
        character.addLanguage("Aquilonian");
        character.vigour = 7;
        character.resolve = 8;
        character.gold = 7;
        character.addEquipment("A necklace of animal teeth and bones");
        character.addEquipment("Deerskin leggings and a heavy hooded cloak");
        character.addEquipment("A simple length of chain, humble yet servicable");
        character.personality = "God-fearing";
        character.appearance = "Rough and battered, tattooed";
        character.name = "Nameless";
        character.ancientBloodline = true;
        character.bloodlineTalent = "Ancient Bloodline: Acheron";
        character.provenanceWeapon = "Broadsword";

        character.spells = [
            "Artifice of Yag",
            "Astral Wanderings",
            //"Atavistic Voyage",
            //"Bid Hydra to Waken",
            //"Commune with the Wild",
            //"Dismember",
            //"Enslave",
            //"False Resurrection",
        ];
        character.pettyEnchantments.push("Acid");
        character.pettyEnchantments.push("Poison");
    }

    render() {
        const characterData = CharacterSerializer.serialize(character);

        const data = characterData.map((d, i) => {
            return (<input type="hidden" name={d.name} value={d.value}/>)
        });

        const url = "http://pdf.modiphiusapps.hostinguk.org/api/sheet";
        //const url = "http://localhost:52355/api/sheet";

        return (
            <div className="page">
                <div className="panel button-container">
                    <form action={url} method="post" encType="application/x-www-form-urlencoded" target="_blank">
                        {data}
                        <input type="submit" value="Export PDF" className="button"/>
                    </form>
                    <form action={url} method="post" encType="application/x-www-form-urlencoded" target="_blank">
                        {data}
                        <input type="hidden" name="PRINTERFRIENDLY" value="1"/>
                        <input type="submit" value="Export PDF (Printer Friendly)" className="button"/>
                    </form>
                    <br/>
                </div>
            </div>
        );
    }
}