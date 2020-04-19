import React from "react";
import Main from "./Main";
import RowCounters from "./RowCounter";

function App() {
  return (
    <div className="App">
      <header className="App-header">Welcome to ReactJs Project!!</header>
      <div className="container">
        <Main />
        <RowCounters />
      </div>
      <p className="bg-color-custom">
        Currently using React Version | {React.version}
      </p>
    </div>
  );
}

export default App;
