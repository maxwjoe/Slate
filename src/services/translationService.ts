import axios from "axios";
import { Option } from "../interfaces/OptionInterface";

// languageOptions : Language to ISO code pairings for supported languages
export const languageOptions: Option[] = [
  { disp: "English", real: "en" },
  { disp: "Chinese", real: "zh" },
  { disp: "Korean", real: "ko" },
  { disp: "French", real: "fr" },
  { disp: "German", real: "de" },
  { disp: "Spanish", real: "es" },
  { disp: "Japanese", real: "ja" },
  { disp: "Italian", real: "it" },
];

// translateText : Translates text from a source language to a target language (inputs as ISO codes)
export const translateText = async (
  text: string,
  sourceLang: string,
  tgtLang: string
) => {
  // Handle invalid input
  if (text == "" || text?.split(" ").length < 1 || sourceLang === tgtLang)
    return null;

  // Make GET Request
  const reqString: string = `https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|${tgtLang}`;
  const res = await axios.get(reqString);

  // Parse response
  const translationData: any = res?.data?.responseData;
  if (!translationData?.match) return null;
  return translationData;
};

// getLanguageFromISO : Gets english language name from ISO code
export const getLanguageFromISO = (isoCode: string) => {
  for (let i = 0; i < languageOptions.length; i++) {
    if (languageOptions[i].real === isoCode) return languageOptions[i].disp;
  }
  return "Select a language";
};
