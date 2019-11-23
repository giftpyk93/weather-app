import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" component={() => <div>TEST ROUTER</div>} />
    </Router>
  );
};

export default AppRouter;
