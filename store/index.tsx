import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "./themeConfigSlice";
import userSlice from "./slice/user.slice";
import subcriptionSlice from "./slice/subscription.slice";
import commonSlice from "./slice/common.slice";

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  userSlice: userSlice,
  subcription: subcriptionSlice,
  common: commonSlice,
});

export default configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
