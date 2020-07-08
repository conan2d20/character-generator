import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {SetHeaderText} from '../common/extensions';
import {PageIdentity, IPageProperties} from './pageFactory';
import {EquipmentHelper} from '../helpers/equipment';
import {Source} from '../helpers/sources';
import {HomeLand} from '../helpers/homelands';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';

export class EquipmentPage extends React.Component<IPageProperties, {}> {
    private _belonging: number;
    private _garment: number;
    private _weapon: number;
    private _provenance: number;
    private _equipmentSource: Source;

    constructor(props: IPageProperties) {
        super(props);

        SetHeaderText("EQUIPMENT");

        this._belonging = 0;
        this._garment = 0;
        this._weapon = 0;
        this._provenance = 0;

        this._equipmentSource = Source.Core;

        if (character.hasSource(Source.Barbarian)) {
            if (character.homeland === HomeLand.Cimmeria ||
                character.homeland === HomeLand.Nordheim ||
                character.homeland === HomeLand.Hyperborea) {
                this._equipmentSource = Source.Barbarian;
            }
        }
    }

    render() {
        const next = character.hasSpells()
            ? (<Button text="SPELLS" className="button-next" onClick={() => this.onNext() }/>)
            : (<Button text="FINISH" className="button-next" onClick={() => this.onNext() }/>);

        return (
            <div className="page">
                <div className="page-text">
                    Determine your starting equipment (in addition to any equipment gained from other steps).
                </div>
                <div className="panel">
                    <div className="header-small">BELONGINGS</div>
                    <DropDownInput
                        items={EquipmentHelper.getBelongings(this._equipmentSource) }
                        defaultValue={EquipmentHelper.getBelongings(this._equipmentSource)[this._belonging]}
                        onChange={index => this.onBelongingSelected(index) }/>
                    <Button text="Random" className="button-small" onClick={() => this.randomBelonging() }/>
                </div>
                <div className="panel">
                    <div className="header-small">GARMENTS</div>
                    <DropDownInput
                        items={EquipmentHelper.getGarments(this._equipmentSource) }
                        defaultValue={EquipmentHelper.getGarments(this._equipmentSource)[this._garment]}
                        onChange={index => this.onGarmentSelected(index) }/>
                    <Button text="Random" className="button-small" onClick={() => this.randomGarment() }/>
                </div>
                <div className="panel">
                    <div className="header-small">WEAPON & PROVENANCE</div>
                    <DropDownInput
                        items={EquipmentHelper.getProvenanceWeapons(this._equipmentSource) }
                        defaultValue={EquipmentHelper.getProvenanceWeapons(this._equipmentSource)[this._weapon]}
                        onChange={index => this.onWeaponSelected(index) }/>
                    <DropDownInput
                        items={EquipmentHelper.getProvenances(this._equipmentSource) }
                        defaultValue={EquipmentHelper.getProvenances(this._equipmentSource)[this._provenance]}
                        onChange={index => this.onProvenanceSelected(index) }/>
                    <Button text="Random" className="button-small" onClick={() => this.randomWeapon() }/>
                </div>
                {next}
            </div>
        );
    }

    private onBelongingSelected(index: number) {
        this._belonging = index;
        this.forceUpdate();
    }

    private randomBelonging() {
        this._belonging = Math.floor(Math.random() * EquipmentHelper.getBelongings(this._equipmentSource).length);
        this.forceUpdate();
    }

    private onGarmentSelected(index: number) {
        this._garment = index;
        this.forceUpdate();
    }

    private randomGarment() {
        this._garment = Math.floor(Math.random() * EquipmentHelper.getGarments(this._equipmentSource).length);
        this.forceUpdate();
    }

    private onWeaponSelected(index: number) {
        this._weapon = index;
        this.forceUpdate();
    }

    private onProvenanceSelected(index: number) {
        this._provenance = index;
        this.forceUpdate();
    }

    private randomWeapon() {
        this._weapon = Math.floor(Math.random() * EquipmentHelper.getProvenanceWeapons(this._equipmentSource).length);
        this._provenance = Math.floor(Math.random() * EquipmentHelper.getProvenances(this._equipmentSource).length);
        this.forceUpdate();
    }

    private onNext() {
        character.addEquipment(EquipmentHelper.getBelongings(this._equipmentSource)[this._belonging]);
        character.addEquipment(EquipmentHelper.getGarments(this._equipmentSource)[this._garment]);

        var weapon = EquipmentHelper.getProvenanceWeapons(this._equipmentSource)[this._weapon];
        var provenance = EquipmentHelper.getProvenances(this._equipmentSource)[this._provenance];
        provenance = provenance.replace("...", " " + weapon + " ");

        character.addEquipment(provenance);
        character.provenanceWeapon = weapon;

        if (character.hasSpells()) {
            Navigation.navigateToPage(PageIdentity.Spells);
        }
        else {
            Navigation.navigateToPage(PageIdentity.Finish);
        }
    }
}