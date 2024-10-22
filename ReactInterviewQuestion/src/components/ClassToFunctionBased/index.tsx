import React from "react";

interface IProps {}

interface IData {
  id: string;
  title: string;
}

interface IState {
  data: IData[];
  isLoading: boolean;
  error: null;
}

class DataList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount(): void {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => this.setState({ data, isLoading: false }))
      .catch((err) => {
        this.setState({ error: err, isLoading: false });
        console.error(err);
      });
  }

  render() {
    const { data, isLoading, error } = this.state;
    if (isLoading) {
      return <div>Loading....</div>;
    }
    if (error) {
      <div>{error}</div>;
    }
    return (
      <div>
        <h3>Datalist</h3>
        <ul>
          {data.splice(0, 6).map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DataList;
