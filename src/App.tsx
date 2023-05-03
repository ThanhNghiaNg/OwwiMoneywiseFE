import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import { HREFS } from "./constants";
import TransactionList from "./components/TransactionList/TransactionList";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path={HREFS.dashboard} element={<Dashboard />} />
            <Route path={HREFS.transactions} element={<TransactionList />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
