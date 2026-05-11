import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import { Toaster } from "react-hot-toast";

// Context
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminLayout from "./layouts/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import Distritu from "./pages/Distritu";
import InformasaunGeral from "./pages/InformasaunGeral";
import FilterMoras from "./pages/Moras";
import LoginPage from "./pages/LoginPage";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import DistrictList from "./pages/DistrictList";
import DistrictForm from "./pages/DistrictForm";
import HospitalList from "./pages/admin/HospitalList";
import HospitalForm from "./pages/admin/HospitalForm";
import EducationList from "./pages/admin/EducationList";
import EducationForm from "./pages/admin/EducationForm";
import UserList from "./pages/admin/UserList";

const GOOGLE_API_KEY = "AIzaSyCj8ylxwCRQFiMCDb1i-WQ1TWG8CloZ2Eg";

// Public Layout Wrapper
const PublicLayout = () => (
  <div className="flex flex-col h-screen font-poppins bg-gray-50 overflow-hidden">
    <Header />
    <main className="flex-1 relative overflow-hidden">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
        <Toaster position="top-right" />
        <Router>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/distritu" element={<Distritu />} />
              <Route path="/informasaun" element={<InformasaunGeral />} />
              <Route path="/filtermoras" element={<FilterMoras />} />
            </Route>

            {/* ADMIN ROUTES (Protected) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              
              {/* Hospitals */}
              <Route path="hospitals" element={<HospitalList />} />
              <Route path="hospitals/new" element={<HospitalForm />} />
              <Route path="hospitals/edit/:id" element={<HospitalForm />} />

              {/* Education / First Aid */}
              <Route path="education" element={<EducationList />} />
              <Route path="education/new" element={<EducationForm />} />
              <Route path="education/edit/:id" element={<EducationForm />} />

              {/* Users */}
              <Route path="users" element={<UserList />} />
            </Route>

            {/* Separate Admin Path for Districts (to keep existing logic) */}
            <Route
              path="/districts"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DistrictList />} />
              <Route path="create" element={<DistrictForm />} />
              <Route path="edit/:id" element={<DistrictForm />} />
            </Route>
          </Routes>
        </Router>
      </LoadScript>
    </AuthProvider>
  );
}

export default App;
