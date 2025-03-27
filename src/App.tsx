import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}
 

export default App;

//import { useState } from 'react'
//import './App.css'
//import { Provider } from "react-redux";
//import { AppRouter } from "./router/AppRouter";
//import { store } from "./store/store"; // Import the store


/**
function App() {
  //const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
}

export default App;
* */