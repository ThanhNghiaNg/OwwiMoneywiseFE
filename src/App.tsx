import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import { HREFS } from "./constants";
import TransactionList from "./components/TransactionList/TransactionList";
import { Provider } from "react-redux";
import store from "./store/store";
import AuthForm from "./components/AuthForm/AuthForm";


function App() {

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
