import { IArticle, IItem, ISource } from "../interfaces/DataInterfaces";
import store from "../redux/store";

// getSourceTitleFromId : Returns the title of a source given its ID
export const getSourceTitleFromId = (sourceId: string) => {
  const sources: ISource[] = store.getState().sources.sources;
  for (let i = 0; i < sources.length; i++) {
    if (sources[i]._id === sourceId) return sources[i].title;
  }
  return "Unknown Source";
};

// getArticleFromId : Returns article given its ID
export const getArticleFromId = (articleId: string) => {
  const articles: IArticle[] = store.getState().articles.articles;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i]._id === articleId) return articles[i];
  }
  return undefined;
};

// getItemsFromListId : Returns items in a list
export const getItemsFromListId = (listId: string) => {
  const items: IItem[] = store.getState().items.items;
  const listItems: IItem[] = [];

  for (let i = 0; i < items.length; i++) {
    if (items[i].list === listId) listItems.push(items[i]);
  }

  return listItems;
};
