import React, { Component } from 'react';
import axios from 'axios'
import './index.css';

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
      users: []
    }
  }

  getUser() {
    axios.get('https://api.randomuser.me/?results=5&nat=US').then((response) => 
      {
        console.log(this, this.state.users.length, response.data.results)
        this.setState({
          users: response.data.results
        })
      }
    );
  }

  componentWillMount() {
    this.getUser();
  }

  render() {
    return (
      <div className="App App-header"> 
          
          {this.state.users.length ? 
            this.state.users.map((dct) => 
              <div>
                <h3>
                  <img src={dct.picture.thumbnail} /> {dct.name.first} {dct.name.last}
                </h3>
                <p>{dct.email}</p>
                <hr />
              </div>
            ) : 'loading...'
          }

      </div>
    )
  }
}

export default App;
