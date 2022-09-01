import axios from "axios";
import { IArticle } from "../interfaces/DataInterfaces";
import { setSelectedArticle } from "../redux/slices/applicationSlice";
import store from "../redux/store";

const API_URL: string = `${process.env.REACT_APP_API_BASE_ENDPOINT}/api/articles/`;

// getArticles: Gets all user articles from the backend
const getArticles = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  const articles: IArticle[] = response?.data?.["articles"] || [];
  return articles;
};

// createArticle : Creates an article in the backend
const createArticle = async (ArticleObj: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ArticleObj, config);
  const newArticle: IArticle = response?.data;

  if (!newArticle?._id) return {} as IArticle;

  // Set selected article to the new article to highlight it in the UI
  store.dispatch(setSelectedArticle(newArticle));

  return newArticle;
};

// updateArticle : Updates an article in the database
const updateArticle = async (ArticleData: IArticle, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + ArticleData._id,
    ArticleData,
    config
  );

  const updatedArticle: IArticle = response?.data;
  store.dispatch(setSelectedArticle(updatedArticle));
  return updatedArticle;
};

// deleteArticle : Deletes an article from the database
const deleteArticle = async (articleId: string, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + articleId, config);
  return response.data;
};

const articleService = {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};

export default articleService;
