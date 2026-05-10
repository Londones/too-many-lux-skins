import React, { useEffect, useState } from "react";
import { ChampionFetcherService } from "../services/champion-fetcher.service";
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchBarProps {
  championFetcher: ChampionFetcherService;
  onChampionSelect: (selectedChampion: any) => void;
}

const championAliasMap: Record<string, string[]> = {
  monkeyking: ["wukong", "monkey-king", "monkey king"],
};

const normalizeSearchTerm = (value: string): string =>
  value.toLowerCase().replace(/[\s_-]/g, "");

const SearchBar: React.FC<SearchBarProps> = ({
  championFetcher,
  onChampionSelect,
}) => {
  const [championsArray, setChampionsArray] = useState<
    { championName: string; squareAsset: string; id: string }[]
  >([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const championsSquareAsset =
        await championFetcher.fetchChampionsSquareAsset();
      setChampionsArray(championsSquareAsset);
    };

    fetchData();
  }, [championFetcher]);

  const handleFocus = () => {
    setShowDropdown(false);
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  const filterOption = (inputValue: string, option: any) => {
    const normalizedInput = normalizeSearchTerm(inputValue);

    if (!normalizedInput) {
      return true;
    }

    const value = option?.value ?? "";
    const championData = championsArray.find((champion) => champion.id === value);
    const championName = championData?.championName ?? "";
    const aliases = championAliasMap[value.toLowerCase()] ?? [];

    const terms = [value, championName, ...aliases]
      .filter(Boolean)
      .map((term: string) => normalizeSearchTerm(term));

    return terms.some((term: string) => term.includes(normalizedInput));
  };

  const handleChampionSelect = (selectedChampion: string) => {
    onChampionSelect(selectedChampion);
    setShowDropdown(false);
  };

  const handleClear = () => {
    onChampionSelect(null);
    setShowDropdown(false);
  };

  return (
    <Select
      showSearch
      allowClear
      size="large"
      suffixIcon={<SearchOutlined />}
      className="w-[30%] mr-2"
      placeholder="Search a champion"
      filterOption={filterOption}
      open={showDropdown}
      onFocus={handleFocus}
      onSearch={handleSearch}
      onSelect={handleChampionSelect}
      onClear={handleClear}
    >
      {championsArray.map((champion) => (
        <Select.Option key={champion.id} value={champion.id}>
          <div className="flex ml-[0.25rem] items-center">
            <img
              src={champion.squareAsset}
              alt={champion.championName}
              className="w-8 h-8 mr-2"
            />
            <span>{champion.championName}</span>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default SearchBar;
