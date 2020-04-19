import React from "react";
import Main from "./Main";
import { SimpleNavBar } from "./Loading";

function App() {
  return (
    <div className="App">
      <header className="App-header">Welcome to ReactJs Project!!</header>
      <SimpleNavBar />
      <main className="container">
        <Main />
      </main>
      <p className="bg-color-custom">
        Currently using React Version | {React.version}
      </p>
    </div>
  );
}

export default App;
