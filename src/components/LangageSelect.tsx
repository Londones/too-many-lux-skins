import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { ChampionFetcherService } from "../services/champion-fetcher.service";

interface LangageSelectProps {
  languages: string[];
  championFetcher: ChampionFetcherService;
  onSelect: (langage: string) => void;
  language: string;
}

const LangageSelect: React.FC<LangageSelectProps> = ({
  languages,
  language,
  championFetcher,
  onSelect,
}) => {
  const [langage, setLangage] = useState<string>(language);

  useEffect(() => {
    championFetcher.language = langage;
  }, [langage]);

  const langagesToFlagsAndLangagesLabelsArray = (langages: string[]) => {
    return langages
      .map((langage) => {
        switch (langage) {
          case "en_US":
            return {
              label: "English",
              image: "https://www.countryflagicons.com/FLAT/16/US.png",
              value: "en_US",
            };
          case "fr_FR":
            return {
              label: "Français",
              image: "https://www.countryflagicons.com/FLAT/16/FR.png",
              value: "fr_FR",
            };
          case "es_ES":
            return {
              label: "Español",
              image: "https://www.countryflagicons.com/FLAT/16/ES.png",
              value: "es_ES",
            };
          case "de_DE":
            return {
              label: "Deutsch",
              image: "https://www.countryflagicons.com/FLAT/16/DE.png",
              value: "de_DE",
            };
          case "it_IT":
            return {
              label: "Italiano",
              image: "https://www.countryflagicons.com/FLAT/16/IT.png",
              value: "it_IT",
            };
          case "pt_PT":
            return {
              label: "Português",
              image: "https://www.countryflagicons.com/FLAT/16/PT.png",
              value: "pt_PT",
            };
          case "ja_JP":
            return {
              label: "日本語",
              image: "https://www.countryflagicons.com/FLAT/16/JP.png",
              value: "ja_JP",
            };
          case "ko_KR":
            return {
              label: "한국어",
              image: "https://www.countryflagicons.com/FLAT/16/KR.png",
              value: "ko_KR",
            };
          case "zh_CN":
            return {
              label: "简体中文",
              image: "https://www.countryflagicons.com/FLAT/16/CN.png",
              value: "zh_CN",
            };
          case "ru_RU":
            return {
              label: "Русский",
              image: "https://www.countryflagicons.com/FLAT/16/RU.png",
              value: "ru_RU",
            };
          case "tr_TR":
            return {
              label: "Türkçe",
              image: "https://www.countryflagicons.com/FLAT/16/TR.png",
              value: "tr_TR",
            };
          case "ms_MY":
            return {
              label: "Bahasa Melayu",
              image: "https://www.countryflagicons.com/FLAT/16/MY.png",
              value: "ms_MY",
            };
          case "id_ID":
            return {
              label: "Bahasa Indonesia",
              image: "https://www.countryflagicons.com/FLAT/16/ID.png",
              value: "id_ID",
            };
          case "th_TH":
            return {
              label: "ภาษาไทย",
              image: "https://www.countryflagicons.com/FLAT/16/TH.png",
              value: "th_TH",
            };
          case "vi_VN":
            return {
              label: "Tiếng Việt",
              image: "https://www.countryflagicons.com/FLAT/16/VN.png",
              value: "vi_VN",
            };
          case "pl_PL":
            return {
              label: "Polski",
              image: "https://www.countryflagicons.com/FLAT/16/PL.png",
              value: "pl_PL",
            };
          case "pt_BR":
            return {
              label: "Português Brasileiro",
              image: "https://www.countryflagicons.com/FLAT/16/BR.png",
              value: "pt_BR",
            };
          case "ro_RO":
            return {
              label: "Română",
              image: "https://www.countryflagicons.com/FLAT/16/RO.png",
              value: "ro_RO",
            };
          case "hu_HU":
            return {
              label: "Magyar",
              image: "https://www.countryflagicons.com/FLAT/16/HU.png",
              value: "hu_HU",
            };
          case "cs_CZ":
            return {
              label: "Čeština",
              image: "https://www.countryflagicons.com/FLAT/16/CZ.png",
              value: "cs_CZ",
            };
          case "el_GR":
            return {
              label: "Ελληνικά",
              image: "https://www.countryflagicons.com/FLAT/16/GR.png",
              value: "el_GR",
            };
          case "en_GB":
            return {
              label: "English",
              image: "https://www.countryflagicons.com/FLAT/16/GB.png",
              value: "en_GB",
            };
          case "es_MX":
            return {
              label: "Español",
              image: "https://www.countryflagicons.com/FLAT/16/MX.png",
              value: "es_MX",
            };
          case "es_AR":
            return {
              label: "Español",
              image: "https://www.countryflagicons.com/FLAT/16/AR.png",
              value: "es_AR",
            };
          case "en_AU":
            return {
              label: "English",
              image: "https://www.countryflagicons.com/FLAT/16/AU.png",
              value: "en_AU",
            };
          case "en_PH":
            return {
              label: "English",
              image: "https://www.countryflagicons.com/FLAT/16/PH.png",
              value: "en_PH",
            };
          case "zh_MY":
            return {
              label: "简体中文",
              image: "https://www.countryflagicons.com/FLAT/16/MY.png",
              value: "zh_MY",
            };
          case "zh_TW":
            return {
              label: "繁體中文",
              image: "https://www.countryflagicons.com/FLAT/16/TW.png",
              value: "zh_TW",
            };
          case "EN_SG":
            return {
              label: "English",
              image: "https://www.countryflagicons.com/FLAT/16/SG.png",
              value: "EN_SG",
            };
          default:
            return null;
        }
      })
      .filter((langage) => langage !== null);
  };

  return (
    <Select
      defaultValue={langage}
      onChange={(value) => setLangage(value)}
      size="large"
      onSelect={onSelect}
    >
      {langagesToFlagsAndLangagesLabelsArray(languages).map((langage) => (
        <Select.Option key={langage?.value} value={langage?.value}>
          <div className="flex items-center">
            <img className="mr-1" src={langage?.image} alt={langage?.value} />
            <span>{langage?.label}</span>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default LangageSelect;
