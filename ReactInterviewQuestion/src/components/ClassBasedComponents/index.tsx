import React from "react";

// Define the types for props if any.
// In this case, you don't have any props, but I'll leave the type as an empty object.
interface CounterClassProps {}

// Define the types for the state.
interface CounterClassState {
  count: number;
  count1: number;
}

class CounterClass extends React.Component<
  CounterClassProps,
  CounterClassState
> {
  // Mounting phase
  constructor(props: CounterClassProps) {
    super(props);
    this.state = {
      count: 0,
      count1: 0,
    };
  }

  incrementCount = (): void => {
    this.setState({ count: this.state.count + 1 });
  };

  incrementCount1 = (): void => {
    this.setState({ count1: this.state.count1 + 1 });
  };

  componentDidMount(): void {
    console.log("Mounted");
  }

  componentDidUpdate(
    prevProps: CounterClassProps,
    prevState: CounterClassState
  ): void {
    // This works similarly to useEffect - fetching, subscriptions
    if (prevState.count !== this.state.count) {
      console.log(prevProps, prevState);
    }
  }

  componentWillUnmount(): void {
    // Used to clean up our component
    console.log("Unmounted");
  }

  // Mounting phase
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
        <button onClick={this.incrementCount1}>Increment1</button>
      </div>
    );
  }
}

export default CounterClass;
