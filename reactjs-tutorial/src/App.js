import React, { Component } from 'react';
import axios from 'axios'
import { Loading, LoadingWithProps, LoadingWithMessage } from './Loading'
import { CounterApp } from './Loading'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         Hello World!!
//       </header>
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      loading: true,
      users: [],
      count: 0
    }
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  handleIncrement = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  handleLoadMoreClick() {
    this.getUser();
  }

  getUser() {
    this.setState({
      loading: true
    })

    axios.get('https://api.randomuser.me/?results=5&nat=US').then((response) => 
      {
        // console.log(this, this.state.users.length, response.data.results)
        this.setState({
          users: [...this.state.users, ...response.data.results],
          loading: false
        })
      }
    );
  }

  componentWillMount() {
    // this.getUser();
  }

  render() {
    let {loading, users} = this.state
    return (
      <div className="container-fluid">
        <div>
          Counter!! <button onClick={this.handleIncrement}>Clicked {this.state.count} times</button>
        </div>

        <CounterApp />

        <div className="row bg-color-grey">
          <div className="col-sm-12">
            <button onClick={this.handleLoadMoreClick}>Load More</button>
          </div>
          <hr />

          {!loading ?
            (users.map((dct) =>
              (<div className="col-sm-4" key={dct.id.value}>
                <h3>
                  <img src={dct.picture.thumbnail} alt='thumbnail' /> {dct.name.first} {dct.name.last}
                </h3>
                <p>{dct.email}</p>
                <hr />
              </div>
              ))
            ) : (
              // <Loading message='Loading data...'/>
              // <LoadingWithProps message='Loading data...'/>
              <LoadingWithMessage message='Loading message...'/>
            )
          }

        </div>
        <p>Currently using React Version | {React.version}</p>
      </div>
    )
  }
}

export default App;
