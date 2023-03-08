import * as React from 'react';
import { character, CreationMode } from '../common/character';
import { Attribute, AttributesHelper } from '../helpers/attributes';

interface IAttributeImprovementProperties {
  controller: AttributeImprovementCollection;
  attribute: Attribute;
  value: number;
  showIncrease: boolean;
  showDecrease: boolean;
}

export class AttributeImprovement extends React.Component<
  IAttributeImprovementProperties,
  {}
> {
  constructor(props: IAttributeImprovementProperties) {
    super(props);
  }

  render() {
    const { attribute, value, showDecrease, showIncrease } = this.props;

    const dec = showDecrease ? (
      <img
        style={{ float: 'left' }}
        height="20"
        src={`${BASE_URL}img/dec.png`}
        onClick={() => {
          this.onDecrease();
        }}
      />
    ) : undefined;

    const inc = showIncrease ? (
      <img
        style={{ float: 'right' }}
        height="20"
        src={`${BASE_URL}img/inc.png`}
        onClick={() => {
          this.onIncrease();
        }}
      />
    ) : undefined;

    return (
      <div>
        <div className="attribute-container">
          {AttributesHelper.getAttributeName(attribute)}
        </div>
        <div className="attribute-value">
          {dec}
          {value}
          {inc}
        </div>
      </div>
    );
  }

  private onDecrease() {
    this.props.controller.onDecrease(this.props.attribute);
  }

  private onIncrease() {
    this.props.controller.onIncrease(this.props.attribute);
  }
}

export enum AttributeImprovementCollectionMode {
  Increase,
  Conan,
}

interface AttributeImprovementCollectionProperties {
  points: number;
  mode: AttributeImprovementCollectionMode;
  onDone?: (done: boolean) => void;
}

class AttributeContainer {
  attribute: Attribute;
  value: number;
  minValue: number;
  maxValue: number;
  showDecrease: boolean;
  showIncrease: boolean;

  constructor(
    attribute: Attribute,
    value: number,
    minValue: number,
    maxValue: number,
    showDecrease: boolean,
    showIncrease: boolean
  ) {
    this.attribute = attribute;
    this.value = value;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.showDecrease = showDecrease;
    this.showIncrease = showIncrease;
  }
}

export class AttributeImprovementCollection extends React.Component<
  AttributeImprovementCollectionProperties,
  {}
> {
  private _absoluteMax: number = 14;

  private _points: number;
  private _attributes: AttributeContainer[];

  constructor(props: AttributeImprovementCollectionProperties) {
    super(props);

    this._points = props.points;
    this._attributes = [];

    if (character.creationMode === CreationMode.NoGods) {
      this._absoluteMax = 12;
    }

    switch (props.mode) {
      case AttributeImprovementCollectionMode.Increase:
        for (var i = 0; i < character.attributes.length; i++) {
          this._attributes.push(
            new AttributeContainer(
              character.attributes[i].attribute,
              character.attributes[i].value,
              character.attributes[i].value,
              this._absoluteMax,
              false,
              character.attributes[i].value < this._absoluteMax
            )
          );
        }
        break;
      case AttributeImprovementCollectionMode.Conan:
        for (var i = 0; i < character.attributes.length; i++) {
          this._attributes.push(
            new AttributeContainer(
              character.attributes[i].attribute,
              character.attributes[i].value,
              character.creationMode === CreationMode.NoGods ? 5 : 6,
              character.creationMode === CreationMode.NoGods ? 7 : 8,
              true,
              false
            )
          );
        }
        break;
    }
  }

  render() {
    const attributes = this._attributes.map((a, i) => {
      return (
        <AttributeImprovement
          key={i}
          controller={this}
          attribute={a.attribute}
          value={a.value}
          showIncrease={a.showIncrease}
          showDecrease={a.showDecrease}
        />
      );
    });

    return <div>{attributes}</div>;
  }

  onDecrease(attr: Attribute) {
    for (var i = 0; i < this._attributes.length; i++) {
      var a = this._attributes[i];
      if (a.attribute === attr) {
        a.value--;
        character.attributes[a.attribute].value = a.value;
        break;
      }
    }

    switch (this.props.mode) {
      case AttributeImprovementCollectionMode.Increase:
        this._points++;

        for (var i = 0; i < this._attributes.length; i++) {
          var a = this._attributes[i];
          a.showDecrease = a.value > a.minValue;
          a.showIncrease = a.value < a.maxValue;
        }
        break;
      case AttributeImprovementCollectionMode.Conan:
        this._points++;
        var numDec = 0;

        for (var i = 0; i < this._attributes.length; i++) {
          var a = this._attributes[i];
          if (a.value === a.minValue) {
            numDec++;
          }
        }

        for (var i = 0; i < this._attributes.length; i++) {
          var a = this._attributes[i];
          a.showDecrease =
            (a.value > a.minValue && numDec < 2) || a.value === a.maxValue;
          a.showIncrease = a.value < a.maxValue;
        }

        break;
    }

    if (this.props.onDone) {
      this.props.onDone(this._points === 0);
    }

    this.forceUpdate();
  }

  onIncrease(attr: Attribute) {
    for (var i = 0; i < this._attributes.length; i++) {
      var a = this._attributes[i];
      if (a.attribute === attr) {
        a.value++;
        character.attributes[a.attribute].value = a.value;
        break;
      }
    }

    switch (this.props.mode) {
      case AttributeImprovementCollectionMode.Increase:
        this._points--;

        for (var i = 0; i < this._attributes.length; i++) {
          var a = this._attributes[i];
          a.showDecrease = a.value > a.minValue;
          a.showIncrease = a.value < a.maxValue && this._points > 0;
        }
        break;
      case AttributeImprovementCollectionMode.Conan:
        this._points--;
        var numDec = 0;

        for (var i = 0; i < this._attributes.length; i++) {
          var a = this._attributes[i];
          if (a.value === a.minValue) {
            numDec++;
          }
        }

        for (var i = 0; i < this._attributes.length; i++) {
          var a = this._attributes[i];
          a.showDecrease =
            (a.value > a.minValue && numDec < 2) || a.value === a.maxValue;
          a.showIncrease = this._points > 0 && a.value < a.maxValue;
        }

        break;
    }

    if (this.props.onDone) {
      this.props.onDone(this._points === 0);
    }

    this.forceUpdate();
  }
}
