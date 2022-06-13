import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";





ReactDOM.render(
  <Auth0Provider
    domain="dev-uz8vcmit.us.auth0.com"
    clientId="H8eNfxX49PU3CYSohNNnnUfMMg93XW8B"
    redirectUri={window.location.origin}
  >
    <App />
    
  </Auth0Provider>,
  document.getElementById("root")
);