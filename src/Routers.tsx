import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import WeatherLocation from './Containers/WeatherLocation'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={WeatherLocation} />
    </Router>
  );
};

export default AppRouter;
