import { configureStore } from '@reduxjs/toolkit';

import settings from "./reducers/settingsReducer";

export default configureStore({
  reducer: {
    settings: settings,
   
  },
});
