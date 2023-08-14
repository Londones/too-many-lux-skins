import React, { useEffect, useState } from "react";
import "./assets/App.css";
import { ChampionFetcherService } from "./services/champion-fetcher.service";
import { fetchVersion } from "./services/lastestversion-fetcher.service";
import SearchBar from "./components/SearchBar";

function App() {
  const [champion, setChampion] = useState<string>("");
  const [version, setVersion] = useState<string>("13.15.1");
  const championFetcher = new ChampionFetcherService(version, "fr_FR");

  useEffect(() => {
    const fetchData = async () => {
      const mostRecentVersion = await fetchVersion();
      if (version !== mostRecentVersion) {
        setVersion(mostRecentVersion);
      }
    };

    fetchData();
  }, []);

  const handleChampionSelect = (champion: string) => {
    setChampion(champion);
    console.log(champion);
  };

  return (
    <div className="App">
      <SearchBar
        championFetcher={championFetcher}
        onChampionSelect={handleChampionSelect}
      />
    </div>
  );
}

export default App;
