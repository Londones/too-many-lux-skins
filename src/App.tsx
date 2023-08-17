import React, { useEffect, useState } from "react";
import "./assets/App.css";
import { ChampionFetcherService } from "./services/champion-fetcher.service";
import { fetchVersion } from "./services/lastestversion-fetcher.service";
import { fetchLanguages } from "./services/langage-fetcher.service";
import SearchBar from "./components/SearchBar";
import SkinCarousel from "./components/SkinCarousel";
import LangageSelect from "./components/LangageSelect";
import { HeartTwoTone } from "@ant-design/icons";

function App() {
  const [champion, setChampion] = useState<any>(null);
  const [version, setVersion] = useState<string>("13.14.1");
  const preferedLangage = localStorage.getItem("langage");
  const [langage, setLangage] = useState<string>(preferedLangage ?? "en_US"); // TODO: add langage selector [en_US, fr_FR, es_ES, de_DE, it_IT, ja_JP, ko_KR, pl_PL, pt_BR, ru_RU, tr_TR, zh_CN, zh_TW]
  const championFetcher = new ChampionFetcherService(version, langage);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const mostRecentVersion = await fetchVersion();
      if (version !== mostRecentVersion) {
        setVersion(mostRecentVersion);
        championFetcher.version = mostRecentVersion;
      }
      const languages = await fetchLanguages();
      setLanguages(languages);
    };

    fetchData();
  }, []);

  const handleChampionSelect = (champion: string) => {
    setChampion(champion);
  };

  const handleLangageSelect = (langage: string) => {
    localStorage.setItem("langage", langage);
    setLangage(localStorage.getItem("langage")!);
  };

  return (
    <div className="App bg-pan-right">
      <div className="flex justify-center mt-[15rem]">
        <SearchBar
          championFetcher={championFetcher}
          onChampionSelect={handleChampionSelect}
        />
        <LangageSelect
          languages={languages}
          language={langage}
          championFetcher={championFetcher}
          onSelect={handleLangageSelect}
        />
      </div>
      {champion && (
        <SkinCarousel
          key={champion}
          champion={champion}
          championFetcher={championFetcher}
        />
      )}
      <div className="footer">
        Made with <HeartTwoTone twoToneColor="#a10030" /> by Mytsu
      </div>
    </div>
  );
}

export default App;
