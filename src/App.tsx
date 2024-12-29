import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "Router";
import dayjs from "dayjs";
import { useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useAuthStore } from "stores/authStore";

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
