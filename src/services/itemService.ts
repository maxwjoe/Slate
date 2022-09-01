import axios from "axios";
import { IItem } from "../interfaces/DataInterfaces";
import { setSelectedItem } from "../redux/slices/applicationSlice";
import store from "../redux/store";

const API_URL: string = `${process.env.REACT_APP_API_BASE_ENDPOINT}/api/items/`;

// getItems: Gets all user Items from the backend
const getItems = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  const Items: IItem[] = response?.data?.["items"] || [];
  return Items;
};

// createItem : Creates an Item in the backend
const createItem = async (ItemObj: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ItemObj, config);
  return response.data;
};

// updateItem : Updates an Item in the database
const updateItem = async (ItemData: IItem, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + ItemData._id, ItemData, config);
  const updatedItem: IItem = response?.data;

  store.dispatch(setSelectedItem(updatedItem));

  return updatedItem;
};

// deleteItem : Deletes an Item from the database
const deleteItem = async (ItemId: string, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + ItemId, config);
  return response.data;
};

const ItemService = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};

export default ItemService;
