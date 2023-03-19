import * as React from 'react';

interface ICheckBoxProperties {
  value: any;
  onChanged: (val: any) => void;
  isChecked: boolean;
}

export class LegendaryCheckBox extends React.Component<ICheckBoxProperties, {}> {
  constructor(props: ICheckBoxProperties) {
    super(props);
  }

  render() {
    const { value, onChanged, isChecked } = this.props;

    const divClass = isChecked ? 'legendary-selected' : 'legendary-unselected';

    return (
      <div className={divClass} onClick={() => this.onChanged()}>
        L
      </div>
    );
  }

  private onChanged() {
    this.props.onChanged(this.props.value);
    this.forceUpdate();
  }
}
