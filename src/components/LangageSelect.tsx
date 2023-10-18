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
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg",
              value: "en_US",
            };
          case "fr_FR":
            return {
              label: "Français",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg",
              value: "fr_FR",
            };
          case "es_ES":
            return {
              label: "Español",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg",
              value: "es_ES",
            };
          case "de_DE":
            return {
              label: "Deutsch",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/DE.svg",
              value: "de_DE",
            };
          case "it_IT":
            return {
              label: "Italiano",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/IT.svg",
              value: "it_IT",
            };
          case "pt_PT":
            return {
              label: "Português",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/PT.svg",
              value: "pt_PT",
            };
          case "ja_JP":
            return {
              label: "日本語",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/JP.svg",
              value: "ja_JP",
            };
          case "ko_KR":
            return {
              label: "한국어",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/KR.svg",
              value: "ko_KR",
            };
          case "zh_CN":
            return {
              label: "简体中文",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/CN.svg",
              value: "zh_CN",
            };
          case "ru_RU":
            return {
              label: "Русский",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/RU.svg",
              value: "ru_RU",
            };
          case "tr_TR":
            return {
              label: "Türkçe",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/TR.svg",
              value: "tr_TR",
            };
          case "ms_MY":
            return {
              label: "Bahasa Melayu",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/MY.svg",
              value: "ms_MY",
            };
          case "id_ID":
            return {
              label: "Bahasa Indonesia",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/ID.svg",
              value: "id_ID",
            };
          case "th_TH":
            return {
              label: "ภาษาไทย",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/TH.svg",
              value: "th_TH",
            };
          case "vi_VN":
            return {
              label: "Tiếng Việt",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg",
              value: "vi_VN",
            };
          case "pl_PL":
            return {
              label: "Polski",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/PL.svg",
              value: "pl_PL",
            };
          case "pt_BR":
            return {
              label: "Português Brasileiro",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg",
              value: "pt_BR",
            };
          case "ro_RO":
            return {
              label: "Română",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/RO.svg",
              value: "ro_RO",
            };
          case "hu_HU":
            return {
              label: "Magyar",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/HU.svg",
              value: "hu_HU",
            };
          case "cs_CZ":
            return {
              label: "Čeština",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/CZ.svg",
              value: "cs_CZ",
            };
          case "el_GR":
            return {
              label: "Ελληνικά",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/GR.svg",
              value: "el_GR",
            };
          case "en_GB":
            return {
              label: "English",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/BG.svg",
              value: "en_GB",
            };
          case "es_MX":
            return {
              label: "Español",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/MX.svg",
              value: "es_MX",
            };
          case "es_AR":
            return {
              label: "Español",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/AR.svg",
              value: "es_AR",
            };
          case "en_AU":
            return {
              label: "English",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/AU.svg",
              value: "en_AU",
            };
          case "en_PH":
            return {
              label: "English",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/PH.svg",
              value: "en_PH",
            };
          case "zh_MY":
            return {
              label: "简体中文",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/MY.svg",
              value: "zh_MY",
            };
          case "zh_TW":
            return {
              label: "繁體中文",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/TW.svg",
              value: "zh_TW",
            };
          case "EN_SG":
            return {
              label: "English",
              image:
                "http://purecatamphetamine.github.io/country-flag-icons/3x2/SG.svg",
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
            <img
              className="mr-1 w-4"
              src={langage?.image}
              alt={langage?.label}
            />
            <span>{langage?.label}</span>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default LangageSelect;
