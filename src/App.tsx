import React from "react";
import logo from "./assets/logo.svg";
import "./assets/App.css";
import { SkinFetcherService } from "./services/skin-fetcher.service";

function App() {
  const skinFetcher = new SkinFetcherService("fr_FR", "13.12.1");

  console.log(
    skinFetcher.returnChampionObject(skinFetcher.fetchChampion("Aatrox"))
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
