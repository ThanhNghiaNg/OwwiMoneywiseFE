import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import TransactionTracker from "./pages/TransactionTracker";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
          <Route
              path="/"
              element={<TransactionTracker />}
            />
            <Route
              path="/transaction-tracker"
              element={<TransactionTracker />}
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
