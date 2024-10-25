import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import LandingPage from '../components/Home/LandingPage';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import Muestras from '../components/muestras';
import {PackageFull} from "../modules/package/pages/PackageFull.jsx";
import {PackageView} from "../modules/package/pages/PackageView.jsx";
import {UserGuestRoutes} from "./UserGuestRoutes.jsx";
import {UserPrivateRoutes} from "./UserPrivateRoutes.jsx";
import {AdminPackages} from "../modules/admin/pages/AdminPackages.jsx";
import PageNotFound from "../shared/pages/error/PageNotFound.jsx";
import {CreateEditPackage} from "../modules/admin/components/CreateEditPackage.jsx";
import About from '../components/Home/About.jsx';

const AppRoutes = () => (
  <Router>
    <Routes>

      <Route path="/" element={<LandingPage />} />

        <Route path="/" element={<UserGuestRoutes />} >
            <Route path="/login" element={<Login />} />,
            <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/muestras" element={<Muestras />} />
        <Route path="/salidas" element={<PackageView />} />
        <Route path="/about" element={<About />} />
        <Route path="/paquetes/:id" element={<PackageFull />} />


        <Route path="/admin" element={<UserPrivateRoutes />}>
            <Route index element={<Navigate to="usuarios" replace />} />
            <Route path="usuarios" element={<AdminDashboard />} />
            <Route path="paquetes" element={<AdminPackages />} />
            <Route path="paquetes/nuevo" element={<CreateEditPackage />} />
            <Route path="paquetes/editar/:id" element={<CreateEditPackage />} />
        </Route>

        <Route path="/404" element={<PageNotFound />} />

        {/*Not found or error*/}
        <Route path="*" element={ <Navigate to="/404" replace /> } />

    </Routes>
  </Router>
);

export default AppRoutes;