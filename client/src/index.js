import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <GoogleOAuthProvider clientId="753982119080-h7o049ftvh7b97pldpnglgs6rqqfd3qe.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,
    
  document.getElementById("root")
);
