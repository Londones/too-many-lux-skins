import React, { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import "./assets/App.css";
import { ChampionFetcherService } from "./services/champion-fetcher.service";
import { fetchVersion } from "./services/lastestversion-fetcher.service";
import { AutoComplete, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function App() {
  const [champion, setChampion] = useState<string>("Aatrox");
  const [championData, setChampionData] = useState<any>(null);
  const championFetcher = new ChampionFetcherService("fr_FR", "13.12.1");
  const [championsArray, setChampionsArray] = useState<
    { championName: string; squareAsset: string }[]
  >([]);
  const [showDropdown, setShowDropdown] = useState(false); // add state variable to control dropdown visibility

  useEffect(() => {
    const fetchData = async () => {
      //const data = await championFetcher.returnChampionObject(champion);
      const championsArray = await championFetcher.fetchChampionsSquareAsset();
      //setChampionData(data);
      setChampionsArray(championsArray);
      console.log(championsArray);
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

  const filterOption = (inputValue: any, option: any) => {
    return option.value.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  return (
    <div className="App">
      <Select
        showSearch
        suffixIcon={<SearchOutlined />}
        className="w-[50%]"
        placeholder="Search a champion"
        filterOption={filterOption}
        open={showDropdown} // use the state variable to control the dropdown visibility
        onFocus={handleFocus} // hide the dropdown when the input is focused
        onSearch={handleSearch}
      >
        {championsArray.map((champion) => (
          <Select.Option
            key={champion.championName}
            value={champion.championName}
          >
            <div className="flex align-items">
              <img
                src={champion.squareAsset}
                alt={champion.championName}
                className="w-8 h-8 mr-2"
              />
              {champion.championName}
            </div>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

export default App;
