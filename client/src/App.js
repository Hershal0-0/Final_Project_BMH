import React,{useEffect} from "react"
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
// Importing Components
import Trial from "./components/Trial";
import Login from "./components/Login"
import Dashboard from './components/Dashboard'
import StudentDetail from "./components/StudentDetail";
import FacultyClass from "./components/FacultyClass";

// Import Redux requirements
import { Provider } from 'react-redux'
import store from './store'
import {loadUser} from './actions/auth'
import setAuthToken from "./utils/setAuthToken";
import "./style/style.css"
import Solve from "./components/Solve";
if(localStorage.token){
  setAuthToken(localStorage.token)
}


function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
      <Router>
        <Switch>
            <Route exact path="/trial" component={Trial} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/solve/:id" component={Solve} />
            <Route exact path="/student_detail" component={StudentDetail} />
            <Route exact path='/classes' component={FacultyClass} />
        </Switch>
      </Router>
    </Provider>
  );
}



export default App;
