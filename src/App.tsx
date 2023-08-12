import React, { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import "./assets/App.css";
import { ChampionFetcherService } from "./services/champion-fetcher.service";
import { fetchVersion } from "./services/lastestversion-fetcher.service";
import { AutoComplete } from "antd";

function App() {
  const [champion, setChampion] = useState<string>("Aatrox");
  const [championData, setChampionData] = useState<any>(null);
  const championFetcher = new ChampionFetcherService("fr_FR", "13.12.1");
  const [championsArray, setChampionsArray] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false); // add state variable to control dropdown visibility

  useEffect(() => {
    console.log(fetchVersion().then((res) => console.log(res)));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await championFetcher.returnChampionObject(champion);
      const championsArray = await championFetcher.fetchChampionsName();
      setChampionData(data);
      setChampionsArray(championsArray);
      console.log(championsArray);
      console.log(data);
    };

    fetchData();
  }, [champion]);

  const handleFocus = () => {
    setShowDropdown(false); // hide the dropdown when the input is focused
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  return (
    <div className="App">
      <AutoComplete
        className="w-[50%]"
        placeholder="Search a champion"
        options={championsArray.map((champion) => ({
          value: champion,
        }))}
        filterOption={true}
        open={showDropdown} // use the state variable to control the dropdown visibility
        onFocus={handleFocus} // hide the dropdown when the input is focused
        onSearch={handleSearch}
      />
    </div>
  );
}

export default App;
