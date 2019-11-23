import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import AutoCompleteSearch from './Containers/AutoCompleteSearchLocation'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={() => <div>TEST ROUTER<AutoCompleteSearch /></div>} />
    </Router>
  );
};

export default AppRouter;
