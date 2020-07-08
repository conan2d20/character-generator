import * as React from 'react';
import {character} from '../common/character';
import {SetHeaderText} from '../common/extensions';
import {IPageProperties} from './pageFactory';
import {CharacterSerializer} from '../common/characterSerializer';
import {EquipmentHelper} from '../helpers/equipment';
import {ArchetypesHelper} from '../helpers/archetypes';

export class EquipmentTestPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);

        SetHeaderText("EQUIPMENT TEST");
    }

    render() {
        let errors = [];

        //ArchetypesHelper.getArchetypes().forEach(arch => {
        //    arch.equipment.forEach(eq => {
        //        if (eq.indexOf("|") === -1) {
        //            if (eq.indexOf("Armor") > -1 && !EquipmentHelper.getArmorByName(eq)) {
        //                errors.push("Armor not found: " + eq);
        //            }
        //        }
        //    });
        //});

        //EquipmentHelper.getProvenances().forEach(prov => {
        //    EquipmentHelper.getProvenanceWeapons().forEach(weap => {
        //        const wp = prov.replace("...", ` ${weap} `);
        //        if (!EquipmentHelper.getWeaponByName(wp)) {
        //            errors.push("Weapon/Provenance combination not found: " + wp);
        //        }
        //    });
        //});

        const error = errors.map((e, i) => {
            return <div key={i}>{e}</div>
        });

        return (
            <div className="page">
                {error}
            </div>
        );
    }
}