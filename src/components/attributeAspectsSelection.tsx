import * as React from 'react';
import { Button } from '../components/button';
import { AttributeAspect, AttributeAspectViewModel, AttributesHelper } from '../helpers/attributes';
import { RadioButton } from './radioButton';

interface IAttributeAspectSelectionProperties {
  aspect: AttributeAspectViewModel;
  group: string;
  onSelection: (aspect: AttributeAspect) => void;
}

class AttributeAspectSelection extends React.Component<IAttributeAspectSelectionProperties, {}> {
  constructor(props: IAttributeAspectSelectionProperties) {
    super(props);
  }

  render() {
    const { aspect, group, onSelection } = this.props;

    const mandatory = aspect.mandatory.map((m, i) => {
      return <div>{AttributesHelper.getAttributeName(m)}</div>;
    });

    const optional = aspect.optional.map((o, i) => {
      return <div>{AttributesHelper.getAttributeName(o)}</div>;
    });

    return (
      <tr>
        <td>
          <div className="selection-header">{aspect.name}</div>
        </td>
        <td>{mandatory}</td>
        <td>{optional}</td>
        <td>
          <RadioButton groupId={group} value={aspect.id} onChanged={() => onSelection(aspect.id)} />
        </td>
      </tr>
    );
  }
}

interface IAttributeAspectsSelectionProperties {
  onFirstAspectSelection: (aspect: AttributeAspect) => void;
  onSecondAspectSelection: (aspect: AttributeAspect) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export class AttributeAspectsSelection extends React.Component<IAttributeAspectsSelectionProperties, {}> {
  private aspect1: AttributeAspect;
  private aspect2: AttributeAspect;

  constructor(props: IAttributeAspectsSelectionProperties) {
    super(props);
  }

  render() {
    const aspects1 = AttributesHelper.getAttributeAspects().map((a, i) => {
      return (
        <AttributeAspectSelection
          group="first"
          aspect={a}
          onSelection={(aspect) => this.onFirstAspectSelected(aspect)}
        />
      );
    });

    const aspects2 = AttributesHelper.getAttributeAspects().map((a, i) => {
      return (
        <AttributeAspectSelection
          group="second"
          aspect={a}
          onSelection={(aspect) => this.onSecondAspectSelected(aspect)}
        />
      );
    });

    const next =
      this.aspect1 >= 0 && this.aspect2 >= 0 ? (
        <Button text="Next" className="button-next" onClick={() => this.props.onConfirm()} />
      ) : undefined;

    return (
      <div>
        <div className="header-text">SELECT ATTRIBUTE ASPECTS</div>
        <br />
        <div className="panel">
          <b>FIRST ASPECT</b>
        </div>
        <table className="selection-list">
          <thead>
            <tr>
              <td></td>
              <td>
                <b>Mandatory Attributes</b>
              </td>
              <td>
                <b>Optional Attributes</b>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>{aspects1}</tbody>
        </table>
        <br />
        <div className="panel">
          <b>SECOND ASPECT</b>
        </div>
        <table className="selection-list">
          <thead>
            <tr>
              <td></td>
              <td>
                <b>Mandatory Attributes</b>
              </td>
              <td>
                <b>Optional Attributes</b>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>{aspects2}</tbody>
        </table>
        {next}
        <Button text="Cancel" className="button" onClick={() => this.props.onCancel()} />
      </div>
    );
  }

  private onFirstAspectSelected(aspect: AttributeAspect) {
    this.aspect1 = aspect;
    this.props.onFirstAspectSelection(aspect);
    this.forceUpdate();
  }

  private onSecondAspectSelected(aspect: AttributeAspect) {
    this.aspect2 = aspect;
    this.props.onSecondAspectSelection(aspect);
    this.forceUpdate();
  }
}
