import { IArticle, IItem, IList, ISource } from "../interfaces/DataInterfaces";
import { IStats } from "../interfaces/StatsInterface";
import store from "../redux/store";

// getSourceTitleFromId : Returns the title of a source given its ID
export const getSourceTitleFromId = (sourceId: string) => {
  const sources: ISource[] = store.getState().sources.sources;
  for (let i = 0; i < sources.length; i++) {
    if (sources[i]._id === sourceId) return sources[i].title;
  }
  return "Unknown Source";
};

// getSourceLanguageFromId : Returns the language of a source from its ID
export const getSourceLanguageFromId = (sourceId: string) => {
  const sources: ISource[] = store.getState().sources.sources;
  for (let i = 0; i < sources.length; i++) {
    if (sources[i]._id === sourceId) return sources[i].language;
  }
  return "No Language";
};

// getArticleFromId : Returns article given its ID
export const getArticleFromId = (articleId: string) => {
  const articles: IArticle[] = store.getState().articles.articles;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i]._id === articleId) return articles[i];
  }
  return {} as IArticle;
};

// listNameTaken : Checks if there is an existing list with a name
export const listNameTaken = (listName: string) => {
  const lists: IList[] = store.getState().lists.lists as IList[];
  for (let i = 0; lists && i < lists?.length; i++) {
    if (lists[i].title === listName) return true;
  }

  return false;
};

// getListFromTitle : Gets list object from title
export const getListFromTitle = (title: string) => {
  const lists: IList[] = store.getState().lists.lists as IList[];
  for (let i = 0; lists && i < lists?.length; i++) {
    if (lists[i].title === title) return lists[i];
  }
  return {} as IList;
};

// getListFromListId : Returns list Object from list ID
export const getListFromListId = (listId: string) => {
  const lists: IList[] = store.getState().lists.lists;
  for (let i = 0; lists && i < lists?.length; i++) {
    if (lists[i]._id === listId) return lists[i];
  }
  return undefined;
};

// getItemsFromListId : Returns items in a list
export const getItemsFromListId = (listId: string) => {
  const items: IItem[] = store.getState().items.items;
  const listItems: IItem[] = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].list === listId) {
      listItems.push(items[i]);
    }
  }

  return listItems;
};

// getItemFromListIdAndTitle : Gets first item in a given list that matches the title
export const getItemFromListIdAndTitle = (listId: string, title: string) => {
  const items: IItem[] = getItemsFromListId(listId);

  for (let i = 0; i < items.length; i++) {
    if (items[i].title === title) {
      return items[i];
    }
  }
  return null;
};

// mongoTimeToJsTime : Converts mongoDB timestamp to Javascript object
export const mongoTimeToJsTime = (mongoTime: string) => {
  return new Date(mongoTime);
};

// getStatsFromDataObj : Returns stats such as created at and edited at from a data obj
export const getStatsFromDataObj = (dataObj: any) => {
  const nullStats: IStats = { createdAt: "", updatedAt: "" };

  if (!dataObj) return nullStats;

  const createdAt = new Date(dataObj?.createdAt);
  const updatedAt = new Date(dataObj?.updatedAt);

  if (!(createdAt && updatedAt)) return nullStats;

  const dataStats: IStats = {
    createdAt: createdAt.toLocaleDateString(),
    updatedAt: updatedAt.toLocaleDateString(),
  };

  return dataStats;
};
