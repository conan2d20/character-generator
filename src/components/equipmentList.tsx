import * as React from 'react';

interface IEquipmentListProperties {
  equipment: string[];
  onSelected: (eq: string, index: number) => void;
}

export class EquipmentList extends React.Component<
  IEquipmentListProperties,
  {}
> {
  private _selectCount: number;

  constructor(props: IEquipmentListProperties) {
    super(props);

    this._selectCount = 0;
  }

  render() {
    this._selectCount = 0;

    const equipment = this.props.equipment.map((eq, i) => {
      if (eq.indexOf('|') > -1) {
        const eqs = eq.split('|');

        const eqList = eqs.map((e, i) => {
          return (
            <option key={i} value={e}>
              {e}
            </option>
          );
        });

        const index = this._selectCount++;

        return (
          <select
            key={i}
            onChange={(e) =>
              this.props.onSelected(
                eqs[(e.target as HTMLSelectElement).selectedIndex],
                index
              )
            }
          >
            {eqList}
          </select>
        );
      } else {
        return <div key={i}>{eq}</div>;
      }
    });

    return <div>{equipment}</div>;
  }
}
