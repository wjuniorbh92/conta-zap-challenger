import { configureStore } from '@reduxjs/toolkit';

import settings from "../containers/Setting/settingsReducer";
import counter from "../containers/Dashboard/counterReducer"
// import modalReducer from '../components/Modal/modalReducer';

export default configureStore({
  reducer: {
    settings: settings,
    counter: counter,
    // modal :  modalReducer,
  },
});
