import React, { useEffect, useState } from "react";
import "./assets/App.css";
import { ChampionFetcherService } from "./services/champion-fetcher.service";
import { fetchVersion } from "./services/lastestversion-fetcher.service";
import { fetchLanguages } from "./services/langage-fetcher.service";
import SearchBar from "./components/SearchBar";
import SkinCarousel from "./components/SkinCarousel";
import LangageSelect from "./components/LangageSelect";
import { HeartTwoTone } from "@ant-design/icons";
import { BackgroundChangerService } from "./services/background-changer.service";
import TitleImage from "./components/TitleImage";

function App() {
  const backgroundChanger = new BackgroundChangerService();
  const localTime = new Date().getHours();
  const preferedLangage = localStorage.getItem("langage");
  const [langage, setLangage] = useState<string>(preferedLangage ?? "en_US");
  const [champion, setChampion] = useState<any>(null);
  const [version, setVersion] = useState<string>("14.3.1");
  const championFetcher = new ChampionFetcherService(version, langage);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      backgroundChanger.initBackground(localTime);
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
      <TitleImage localTime={localTime} />
      <div className="flex justify-center mt-[2rem]">
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
          className={!champion ? "fade-in-top" : ""}
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
