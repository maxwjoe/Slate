import { reset as resetAuth } from "../redux/slices/authSlice";
import { reset as resetSource } from "../redux/slices/sourceSlice";
import { reset as resetArticle } from "../redux/slices/articleSlice";
import { reset as resetList } from "../redux/slices/listSlice";
import { reset as resetApplication } from "../redux/slices/applicationSlice";

// resetAll : Resets all Redux states
export const resetAll = (dispatch: any) => {
  dispatch(resetAuth());
  dispatch(resetSource());
  dispatch(resetArticle());
  dispatch(resetList());
  dispatch(resetApplication());
};
