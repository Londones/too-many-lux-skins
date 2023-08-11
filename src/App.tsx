import React, { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import "./assets/App.css";
import { SkinFetcherService } from "./services/skin-fetcher.service";
import { fetchVersion } from "./services/lastestversion-fetcher.service";

function App() {
  const [champion, setChampion] = useState<string>("Aatrox");
  const [championData, setChampionData] = useState<any>(null);
  const skinFetcher = new SkinFetcherService("fr_FR", "13.12.1");

  useEffect(() => {
    console.log(fetchVersion().then((res) => console.log(res)));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await skinFetcher.returnChampionObject(champion);
      setChampionData(data);
      console.log(data);
    };

    fetchData();
  }, [champion]);

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
