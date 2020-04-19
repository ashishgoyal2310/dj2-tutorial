import React, { Component } from "react";

class RowCounter extends Component {
  // state = {
  //   value: this.props.counter.value,
  // };

  styles = {
    // fontSize: 15,
    // fontWeight: "bold",
  };

  // handleIncrement = (data) => {
  //   console.log("handleIncrement", data);
  //   this.setState({ value: this.state.value + 1 });
  // };

  render() {
    return (
      <div>
        {this.props.children}
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger dtm-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }

  getBadgeClasses() {
    const { value } = this.props.counter;
    let badgeClasses = "badge badge-pill m-2 ";
    badgeClasses += value === 0 ? "badge-warning" : "badge-primary";
    return badgeClasses;
  }
}

class RowCounters extends Component {
  state = {
    counters: [
      { id: 1, value: 3 },
      { id: 2, value: 0 },
      { id: 3, value: 1 },
      { id: 4, value: 0 },
    ],
    tags: [],
  };

  handleIncrement = (counter) => {
    const updatedCounters = [...this.state.counters];
    const index = updatedCounters.indexOf(counter);
    updatedCounters[index].value++;
    this.setState({ counters: updatedCounters });
  };

  handleDelete = (counterId) => {
    // console.log("Counters handleDelete", counterId);
    const updatedCounters = this.state.counters.filter(
      (dct) => dct.id != counterId
    );
    this.setState({ counters: updatedCounters });
  };

  handleReset = () => {
    const updatedCounters = this.state.counters.map((dct) => {
      dct.value = 0;
      return dct;
    });
    this.setState({ counters: updatedCounters });
  };

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">Row Counter</header>
          <button
            className="btn btn-primary btn-sm m-2"
            onClick={this.handleReset}
          >
            Reset
          </button>
          {this.state.counters.map((counter) => (
            <RowCounter
              key={counter.id}
              counter={counter}
              onIncrement={this.handleIncrement}
              onDelete={this.handleDelete}
            >
              Counter #{counter.id}
            </RowCounter>
          ))}
          {this.renderTags()}
        </div>
      </React.Fragment>
    );
  }

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;

    return (
      <ul className="list-group">
        {this.state.tags.map((tag) => (
          <li className="list-group-item list-group-item-primary" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    );
  }
}

export default RowCounters;
