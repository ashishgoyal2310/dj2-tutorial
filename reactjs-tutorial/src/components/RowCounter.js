import React, { Component } from "react";

class RowCounter extends Component {
  state = {
    value: this.props.counter.value,
  };

  styles = {
    // fontSize: 15,
    // fontWeight: "bold",
  };

  handleIncrement = (data) => {
    console.log("handleIncrement", data);
    this.setState({ value: this.state.value + 1 });
  };

  render() {
    return (
      <div>
        {this.props.children}
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          onClick={() => this.handleIncrement({ preCount: this.state.value })}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
      </div>
    );
  }

  formatCount() {
    return this.state.value === 0 ? "Zero" : this.state.value;
  }

  getBadgeClasses() {
    let badgeClasses = "badge badge-pill m-2 ";
    badgeClasses += this.state.value === 0 ? "badge-warning" : "badge-primary";
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

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">Row Counter</header>
          <p>We will be back!</p>
          {this.state.counters.map((counter) => (
            <RowCounter key={counter.id} counter={counter}>
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
