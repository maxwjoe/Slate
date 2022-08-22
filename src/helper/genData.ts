// getExampleLanguage : Returns a random language for the placeholder in create modal
export const getExampleLanguage = () => {
  const languages = [
    "Chinese",
    "Spanish",
    "French",
    "English",
    "German",
    "Korean",
    "Japanese",
    "Italian",
  ];
  const languageIndex = Math.floor(Math.random() * languages.length);
  return languages[languageIndex];
};

// getExampleTitle : Returns a random title for the placeholder in create modal
export const getExampleTitle = () => {
  const titles = ["Class", "Movies", "Books", "News Articles", "Podcasts"];
  const titleIndex = Math.floor(Math.random() * titles.length);
  return titles[titleIndex];
};
