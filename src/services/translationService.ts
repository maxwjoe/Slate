import axios from "axios";

// translateText : Translates text from a source language to a target language (inputs as ISO codes)
export const translateText = async (
  text: string,
  sourceLang: string,
  tgtLang: string
) => {
  if (text == "" || text?.split(" ").length < 1) return;
  const reqString: string = `https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|${tgtLang}`;
  const res = await axios.get(reqString);
  console.log(res);
  // Parse response
  const translationData: any = res?.data?.responseData;
  if (!translationData?.match) return null;
  return translationData;
};
