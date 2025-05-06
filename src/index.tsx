import React from "react";
import { createRoot } from "react-dom/client";
import TagManager from "react-gtm-module";

import App from "@dashboard/app";
import { history } from "@presentation/shared/Router";

import { GTM_ID } from "./configs";
import errorTracker from "./services/errorTracking";

import "@saleor/macaw-ui-next/style";
import "@assets/styles/index.css";

if (GTM_ID) {
  TagManager.initialize({ gtmId: GTM_ID });
}

errorTracker.init(history);

/*
  Handle legacy theming toggle. Since we use new and old macaw,
  we need to handle both theme swticher for a while.
*/
const handleLegacyTheming = () => {
  const activeTheme = localStorage.getItem("activeMacawUITheme");

  if (activeTheme === "defaultDark") {
    localStorage.setItem("macaw-ui-theme", "dark");

    return;
  }

  localStorage.setItem("macaw-ui-theme", "light");
};

handleLegacyTheming();

// const isValidChannel = (channelId: string, channelList?: ChannelFragment[]) => {
//   if (!channelId) {
//     return false;
//   }

//   return channelList?.some(getById(channelId));
// };

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
