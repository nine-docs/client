import Layout from "Layout";
import Router from "Router";
import { BrowserRouter } from "react-router-dom";

import "styles/common.scss";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
