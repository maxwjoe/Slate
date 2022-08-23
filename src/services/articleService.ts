import axios from "axios";
import { IArticle } from "../interfaces/DataInterfaces";

const API_URL = "api/articles/";

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
  return response.data;
};

const articleService = {
  getArticles,
  createArticle,
};

export default articleService;
