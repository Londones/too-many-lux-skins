import React, { useEffect, useMemo, useState } from "react";
import "./assets/App.css";
import { ChampionFetcherService } from "./services/champion-fetcher.service";
import { fetchLanguages } from "./services/langage-fetcher.service";
import SearchBar from "./components/SearchBar";
import SkinCarousel from "./components/SkinCarousel";
import LangageSelect from "./components/LangageSelect";
import { HeartTwoTone } from "@ant-design/icons";
import { BackgroundChangerService } from "./services/background-changer.service";
import TitleImage from "./components/TitleImage";
import { Switch } from "antd";

function App() {
  const backgroundChanger = new BackgroundChangerService();
  const localTime = new Date().getHours();
  const preferedLangage = localStorage.getItem("langage");
  const [langage, setLangage] = useState<string>(preferedLangage ?? "en_US");
  const [champion, setChampion] = useState<any>(null);
  const [includeChromas, setIncludeChromas] = useState<boolean>(false);
  const championFetcher = useMemo(
    () => new ChampionFetcherService(langage),
    [langage]
  );
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      backgroundChanger.initBackground(localTime);
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
      <div className="flex justify-center items-center gap-2 mt-[2rem]">
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
        <div className="flex h-10 items-center rounded border border-white/80 bg-white px-3">
          <span className="mr-2 text-xs uppercase tracking-wide text-slate-700">
            Chromas
          </span>
          <Switch checked={includeChromas} onChange={setIncludeChromas} />
        </div>
      </div>
      {champion && (
        <SkinCarousel
          className={!champion ? "fade-in-top" : ""}
          key={`${champion}-${includeChromas}`}
          champion={champion}
          championFetcher={championFetcher}
          includeChromas={includeChromas}
        />
      )}
      <div className="footer">
        Made with <HeartTwoTone twoToneColor="#a10030" /> by Mytsu
      </div>
    </div>
  );
}

export default App;
