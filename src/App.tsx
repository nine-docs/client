import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "Router";
import { BrowserRouter } from "react-router-dom";

import "styles/common.scss";

import queryClient from "apis/query_config/queryClient";

import Layout from "components/layout/Layout";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
