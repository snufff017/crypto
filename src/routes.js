import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import MainPage from 'pages/Main';

// TODO Забить в массив
  export default function RoutesSwitch () {
    return (
      <Switch>
         <Route path="/" exact>
          <MainPage />
        </Route>
      </Switch>
    )
  }