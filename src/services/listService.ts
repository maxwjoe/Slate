import axios from "axios";
import { IList } from "../interfaces/DataInterfaces";
import { setSelectedList } from "../redux/slices/applicationSlice";
import store from "../redux/store";

const API_URL = `${process.env.REACT_APP_API_BASE_ENDPOINT}/api/lists/`;

// getLists: Gets all user Lists from the backend
const getLists = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  const Lists: IList[] = response?.data?.["lists"] || [];
  return Lists;
};

// createList : Creates an List in the backend
const createList = async (ListObj: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ListObj, config);

  const newList: IList = response?.data;
  if (!newList?._id) return {} as IList;

  // Set selected list to be new list to highlight in UI
  store.dispatch(setSelectedList(newList));

  return newList;
};

// updateList : Updates an List in the database
const updateList = async (ListData: IList, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + ListData._id, ListData, config);
  return response.data;
};

// deleteList : Deletes an List from the database
const deleteList = async (ListId: string, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + ListId, config);
  return response.data;
};

const ListService = {
  getLists,
  createList,
  updateList,
  deleteList,
};

export default ListService;
