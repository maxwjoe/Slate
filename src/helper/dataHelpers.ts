import { ISource } from "../interfaces/DataInterfaces";
import store from "../redux/store";

// getSourceTitleFromId : Returns the title of a source given its ID
export const getSourceTitleFromId = (sourceId: string) => {
  const sources: ISource[] = store.getState().sources.sources;
  for (let i = 0; i < sources.length; i++) {
    if (sources[i]._id === sourceId) return sources[i].title;
  }
  return "Unknown Source";
};
