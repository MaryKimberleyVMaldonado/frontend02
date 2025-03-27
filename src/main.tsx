import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//import './index.css'

//This is the entry point of the application
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render( 
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//It renders the App component to the root element in the index.html file
//The App component is wrapped in a React.StrictMode component
//React.StrictMode is a tool for highlighting potential problems in an application
//It does not render any visible UI
//It activates additional checks and warnings for its descendants
//It helps to identify unsafe lifecycles, legacy API usage, and a few other cases
//It is a development mode only feature
//It does not affect the production build
//It is not a polyfill for any APIs
//It does not provide any guarantees that an application will work as expected

