import axios from "axios";
import { Option } from "../interfaces/LanguageOptionInterface";

// languageOptions : Language to ISO code pairings for supported languages
export const languageOptions: Option[] = [
  { disp: "English", iso: "en" },
  { disp: "Chinese", iso: "zh" },
  { disp: "Korean", iso: "ko" },
  { disp: "French", iso: "fr" },
  { disp: "German", iso: "de" },
  { disp: "Spanish", iso: "es" },
  { disp: "Japanese", iso: "ja" },
  { disp: "Italian", iso: "it" },
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
    if (languageOptions[i].iso === isoCode) return languageOptions[i].disp;
  }
  return "Select a language";
};
