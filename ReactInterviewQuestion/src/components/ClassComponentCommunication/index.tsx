import React from "react";

interface IProps {
  name: string;
  age: number;
}

export class ParentComponent extends React.Component {
  render() {
    // We can import class as well as functional component inside a parent component
    // and this will be nature independent.
    // return <ChildComponent name="Rishabh" age={25} />;
    return <ChildComponentFn name="Rishabh" age={25} />;
  }
}

export class ChildComponent extends React.Component<IProps> {
  render() {
    return (
      <>
        <div>{this.props.name}</div>
        <div>{this.props.age}</div>
      </>
    );
  }
}

export const ParentComponentFn = () => {
  return <ChildComponentFn name="Rishabh" age={25} />;
};

const ChildComponentFn = ({ name, age }: IProps) => {
  return (
    <div>
      <div>{name}</div>
      <div>{age}</div>
    </div>
  );
};
