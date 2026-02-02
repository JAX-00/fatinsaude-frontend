import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Homeeee";
import Distritu from "./pages/Distritu";
import InformasaunGeral from "./pages/InformasaunGeral";
import FilterMoras from "./pages/Moras";
import { LoadScript } from "@react-google-maps/api";

const GOOGLE_API_KEY = "AIzaSyCj8ylxwCRQFiMCDb1i-WQ1TWG8CloZ2Eg";

function App() {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
      <Router>
        <div className="flex flex-col min-h-screen font-poppins">
          <Header />
          <main className="flex-1 bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/distritu" element={<Distritu />} />
              <Route path="/informasaun" element={<InformasaunGeral />} />
              <Route path="/filtermoras" element={<FilterMoras />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LoadScript>
  );
}

export default App;
