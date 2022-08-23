export interface ISource {
  _id: string;
  user: string;
  title: string;
  language: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface IArticle {
  _id: string;
  source: string;
  user: string;
  title: string;
  content: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface IList {
  _id: string;
  source: string;
  user: string;
  title: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}
