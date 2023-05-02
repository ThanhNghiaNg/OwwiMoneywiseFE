import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainLayout from "./Layouts/MainLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
