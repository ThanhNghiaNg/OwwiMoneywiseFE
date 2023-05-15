import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import { HREFS } from "./constants";
import TransactionList from "./components/TransactionList/TransactionList";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./store/store";
import AuthForm from "./components/AuthForm/AuthForm";

function App() {
  const isLoggedIn = !!useSelector(
    (state: RootState) => state.auth.accessToken
  );

  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to={HREFS.dashboard} />
                ) : (
                  <Navigate to={HREFS.login} />
                )
              }
            />
            <Route path={HREFS.dashboard} element={<Dashboard />} />
            <Route path={HREFS.transactions} element={<TransactionList />} />
            <Route path={HREFS.login} element={<AuthForm isLogin={true} />} />
            <Route
              path={HREFS.register}
              element={<AuthForm isLogin={false} />}
            />
            <Route path="*" element={<Navigate to={HREFS.login} />} />
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
