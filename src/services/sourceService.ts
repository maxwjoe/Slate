import axios from "axios";
import { ISource } from "../interfaces/DataInterfaces";

const API_URL = "api/sources/";

// getSources : Gets sources from the backend
const getSources = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  const sources: ISource[] = response?.data["sources"] || [];

  console.log("Source Service [GET] : ");
  console.log(sources);
  return sources;
};

// createSource : Creates a source in the backend
const createSource = async (sourceData: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, sourceData, config);
  return response.data;
};

// deleteSource : Deletes a source in the backend
const deleteSource = async (sourceId: string, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + sourceId, config);
  return response.data;
};

const sourceService = {
  getSources,
  createSource,
  deleteSource,
};

export default sourceService;
