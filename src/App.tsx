import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import { HREFS, QUERY_CACHE_TIME_DEFAULT } from "./constants";
import TransactionList from "./components/TransactionList/TransactionList";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./store/store";
import AuthForm from "./components/AuthForm/AuthForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: QUERY_CACHE_TIME_DEFAULT,
      retry: 3, // Default retry 3
    },
    mutations: {
      retry: false, // By default TanStack Query will not retry a mutation on error, but it is possible with the retry option
    },
  },
});


function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.accessToken);

  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to={HREFS.dashboard} />} />
            <Route path={HREFS.dashboard} element={<Dashboard />} />
            <Route path={HREFS.transactions} element={<TransactionList />} />
            <Route path={HREFS.login} element={<AuthForm isLogin={true} />} />
            <Route
              path={HREFS.register}
              element={<AuthForm isLogin={false} />}
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
