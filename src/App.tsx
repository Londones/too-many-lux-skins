import React, { useEffect, useState } from "react";
import "./assets/App.css";
import { ChampionFetcherService } from "./services/champion-fetcher.service";
import { fetchVersion } from "./services/lastestversion-fetcher.service";
import SearchBar from "./components/SearchBar";
import SkinCarousel from "./components/SkinCarousel";

function App() {
  const [champion, setChampion] = useState<string>("");
  const [version, setVersion] = useState<string>("13.15.1");
  const [langage, setLangage] = useState<string>("en_US"); // TODO: add langage selector [en_US, fr_FR, es_ES, de_DE, it_IT, ja_JP, ko_KR, pl_PL, pt_BR, ru_RU, tr_TR, zh_CN, zh_TW]
  const championFetcher = new ChampionFetcherService(version, langage);

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
  };

  return (
    <div className="App">
      <SearchBar
        championFetcher={championFetcher}
        onChampionSelect={handleChampionSelect}
      />
      {champion && (
        <SkinCarousel champion={champion} championFetcher={championFetcher} />
      )}
    </div>
  );
}

export default App;
