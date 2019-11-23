import React from "react";
import Helmet from "react-helmet";
import jsLogger from 'js-logger'

import AppRouter from "./Routers";

jsLogger.useDefaults();

const App: React.FC = () => {
  return (
    <>
      <Helmet>
        <script src="https://unpkg.com/js-logger/src/logger.min.js"></script>
      </Helmet>
      <AppRouter />
    </>
  );
};

export default App;
