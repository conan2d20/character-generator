import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { CopyrightDisclaimer } from '../components/CopyrightDisclaimer';
import { Dialog } from '../components/dialog';
import { RadioButton } from '../components/radioButton';
import { Attribute, AttributesHelper } from '../helpers/attributes';
import { IPageProperties, PageIdentity } from './pageFactory';

interface IMandatoryAttributeSelectionProps {
  attribute: Attribute;
  isBest: boolean;
  isWorst: boolean;
  isFirst: boolean;
  isSecond: boolean;
  isDuplicated: boolean;
  onBestSelected: (attr: Attribute) => void;
  onWorstSelected: (attr: Attribute) => void;
}

class MandatoryAttributeSelection extends React.Component<IMandatoryAttributeSelectionProps, {}> {
  constructor(props: IMandatoryAttributeSelectionProps) {
    super(props);
  }

  render() {
    const { attribute, isBest, isWorst, isFirst, isSecond, isDuplicated } = this.props;

    let value = character.attributes[attribute].value;
    value += isBest ? 3 : isWorst ? 1 : 2;

    if (isDuplicated) {
      value += 2;
    }

    if (isFirst || isSecond) {
      value += 1;
    }

    return (
      <tr>
        <td>{AttributesHelper.getAttributeName(attribute)}</td>
        <td>
          <RadioButton
            groupId="best"
            value={attribute}
            onChanged={(attr) => this.onBestSelected(attr as Attribute)}
            disabled={isWorst}
          />
        </td>
        <td>
          <RadioButton
            groupId="worst"
            value={attribute}
            onChanged={(attr) => this.onWorstSelected(attr as Attribute)}
            disabled={isBest}
          />
        </td>
        <td>
          <div>{value}</div>
        </td>
      </tr>
    );
  }

  private onBestSelected(attr: Attribute) {
    this.props.onBestSelected(attr);
  }

  private onWorstSelected(attr: Attribute) {
    this.props.onWorstSelected(attr);
  }
}

interface IOptionalAttributeSelectionProps {
  attribute: Attribute;
  isMandatory: boolean;
  isBest: boolean;
  isWorst: boolean;
  isFirst: boolean;
  isSecond: boolean;
  onFirstSelected: (attr: Attribute) => void;
  onSecondSelected: (attr: Attribute) => void;
  index: number;
}

class OptionalAttributeSelection extends React.Component<IOptionalAttributeSelectionProps, {}> {
  constructor(props: IOptionalAttributeSelectionProps) {
    super(props);
  }

  render() {
    const { attribute, isMandatory, isBest, isWorst, isFirst, isSecond, index } = this.props;

    let value = character.attributes[attribute].value;
    value += isBest ? 3 : isWorst ? 1 : isMandatory ? 2 : 0;

    if (isFirst) {
      value += 1;
    }

    if (isSecond) {
      value += 1;
    }

    const radioFirst =
      index < 2 ? (
        <RadioButton groupId="first" value={attribute} onChanged={(attr) => this.onFirstSelected(attr as Attribute)} />
      ) : undefined;

    const radioSecond =
      index > 1 ? (
        <RadioButton
          groupId="second"
          value={attribute}
          onChanged={(attr) => this.onSecondSelected(attr as Attribute)}
        />
      ) : undefined;

    return (
      <tr>
        <td>{AttributesHelper.getAttributeName(attribute)}</td>
        <td>{radioFirst}</td>
        <td>{radioSecond}</td>
        <td>
          <div>{value}</div>
        </td>
      </tr>
    );
  }

  private onFirstSelected(attr: Attribute) {
    this.props.onFirstSelected(attr);
  }

  private onSecondSelected(attr: Attribute) {
    this.props.onSecondSelected(attr);
  }
}

export class AttributeAspectDetailsPage extends React.Component<IPageProperties, {}> {
  private _best: Attribute;
  private _worst: Attribute;
  private _firstOptional: Attribute;
  private _secondOptional: Attribute;

  constructor(props: IPageProperties) {
    super(props);
  }

  render() {
    const firstAspect = AttributesHelper.getAttributeAspect(character.firstAspect);
    const secondAspect = AttributesHelper.getAttributeAspect(character.secondAspect);

    const header = (
      <span>
        {firstAspect.name} & {secondAspect.name}
      </span>
    );

    const mandatoryAttributes = AttributesHelper.getMandatoryAttributesForAspects(firstAspect, secondAspect);
    const mandatory = mandatoryAttributes.map((a, i) => {
      return (
        <MandatoryAttributeSelection
          key={i}
          attribute={a.attribute}
          isBest={a.attribute === this._best}
          isWorst={a.attribute === this._worst}
          isFirst={a.attribute === this._firstOptional}
          isSecond={a.attribute === this._secondOptional}
          isDuplicated={a.isDuplicated}
          onBestSelected={(attr) => this.onBestSelected(attr)}
          onWorstSelected={(attr) => this.onWorstSelected(attr)}
        />
      );
    });

    const optionalAttributes = AttributesHelper.getOptionalAttributesForAspects(firstAspect, secondAspect);
    const optional = optionalAttributes.map((a, i) => {
      var isMandatory = false;
      for (var m = 0; m < mandatoryAttributes.length; m++) {
        if (mandatoryAttributes[m].attribute === a) {
          isMandatory = true;
          break;
        }
      }

      return (
        <OptionalAttributeSelection
          key={i}
          index={i}
          attribute={a}
          isMandatory={isMandatory}
          isBest={a === this._best}
          isWorst={a === this._worst}
          isFirst={a === this._firstOptional}
          isSecond={a === this._secondOptional}
          onFirstSelected={(attr) => this.onFirstSelected(attr)}
          onSecondSelected={(attr) => this.onSecondSelected(attr)}
        />
      );
    });

    return (
      <div className="page">
        <div className="page-text">
          Designate one mandatory attribute as the Best and one mandatory attribute as the Worst.
          <br />
          Then designate two Optional attributes.
        </div>
        <br />
        <div className="header-text">{header}</div>
        <br />
        <div className="panel">
          <div className="header-small">MANDATORY ATTRIBUTES</div>
          <table className="selection-list aspect-list">
            <thead>
              <tr>
                <td></td>
                <td>Best</td>
                <td>Worst</td>
                <td></td>
              </tr>
            </thead>
            <tbody>{mandatory}</tbody>
          </table>
          <br />
          <div className="header-small">OPTIONAL ATTRIBUTES</div>
          <table className="selection-list aspect-list">
            <thead>
              <tr>
                <td></td>
                <td>First</td>
                <td>Second</td>
                <td></td>
              </tr>
            </thead>
            <tbody>{optional}</tbody>
          </table>
        </div>
        <CopyrightDisclaimer />
        <Button text="CASTE" className="button-next" onClick={() => this.onNext()} />
      </div>
    );
  }

  private onBestSelected(attr: Attribute) {
    this._best = attr;
    this.forceUpdate();
  }

  private onWorstSelected(attr: Attribute) {
    this._worst = attr;
    this.forceUpdate();
  }

  private onFirstSelected(attr: Attribute) {
    this._firstOptional = attr;
    this.forceUpdate();
  }

  private onSecondSelected(attr: Attribute) {
    this._secondOptional = attr;
    this.forceUpdate();
  }

  private onNext() {
    if (this._best >= 0 && this._worst >= 0 && this._firstOptional >= 0 && this._secondOptional >= 0) {
      AttributesHelper.applyAttributeAspect(this._best, this._worst, this._firstOptional, this._secondOptional);
      Navigation.navigateToPage(PageIdentity.Caste);
    } else {
      Dialog.show('You must select your Best and Worst attribute, and two Optional attributes, before proceeding.');
    }
  }
}
