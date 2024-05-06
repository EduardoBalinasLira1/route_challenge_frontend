import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layout/Layout';
import OperatorPage from './pages/OperatorPage';
import HomePage from "./pages/HomePage";
import RoutePage from "./pages/RoutesPage";
import VehiclePage from "./pages/VehiclePage";


function App() {
  return (
<BrowserRouter>
      <Layout> 
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="routes" element={<RoutePage />}/>
          <Route path="operators" element={<OperatorPage />} />
          <Route path="vehicles" element={<VehiclePage />} />
          <Route path="*" element={<h1>No page</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
