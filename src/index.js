import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PreLoader from "./components/loader/Preloader";

import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import store from "./store";

// deployment
import {disableReactDevTools} from "@fvilers/disable-react-devtools";
if(process.env.NODE_ENV === 'production') disableReactDevTools();


// store to persit
const persistedStore = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<PreLoader />} persistor={persistedStore}>
      <App />
    </PersistGate>
  </Provider>
);

reportWebVitals();
