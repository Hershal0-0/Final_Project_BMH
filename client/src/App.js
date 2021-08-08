import React,{useEffect} from "react"

// Importing Components
import Trial from "./components/Trial";

// Import Redux requirements
import { Provider } from 'react-redux'
import store from './store'


function App() {
  return (
    <Provider store={store}>
      <Trial />
    </Provider>
  );
}



export default App;
