import React, { Component } from "react";
import axios from "axios";
import { Loading, LoadingWithProps, LoadingWithMessage } from "./Loading";

class FirstApp extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      loading: true,
      users: [],
      count: 0,
    };
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  handleIncrement = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  handleLoadMoreClick() {
    this.getUser();
  }

  getUser() {
    this.setState({
      loading: true,
    });

    axios
      .get("https://api.randomuser.me/?results=5&nat=US")
      .then((response) => {
        // console.log(this, this.state.users.length, response.data.results)
        this.setState({
          users: [...this.state.users, ...response.data.results],
          loading: false,
        });
      });
  }

  showUsers() {
    let { loading, users } = this.state;
    return !loading ? (
      users.map((dct) => (
        <div className="col-sm-4" key={dct.id.value}>
          <h3>
            <img src={dct.picture.thumbnail} alt="thumbnail" /> {dct.name.first}{" "}
            {dct.name.last}
          </h3>
          <p>{dct.email}</p>
          <hr />
        </div>
      ))
    ) : (
      // <Loading message='Loading data...'/>
      // <LoadingWithProps message='Loading data...'/>
      <LoadingWithMessage message="Loading message..." />
    );
  }

  // componentWillMount() {
  //   this.getUser();
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">React Basics</header>
        <p className="bg-color-blueviolet">
          Counter!!
          <button onClick={this.handleIncrement}>
            Clicked {this.state.count} times
          </button>
        </p>
        <p>
          The length of users : {this.state.users.length}.
          <button onClick={this.handleLoadMoreClick}>Click Me</button> load more
        </p>
        <div className="row">{this.showUsers()}</div>
      </div>
    );
  }
}

export default FirstApp;
