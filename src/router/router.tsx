import BottomNavBar from "@/components/navBar";
import Botoes from "@/pages/botoes";
import Home from "@/pages/home";
import Login from "@/pages/login/login";
import { ListaPessoa } from "@/pages/pessoa/components/pessoaLista";
import Pessoa from "@/pages/pessoa/pessoa";
import Rifa from "@/pages/rifa/rifa";
import RifaForm from "@/pages/rifa/rifaForm";
import RifaList from "@/pages/rifa/rifaList";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pessoa/:formType?/:userId?" element={<Pessoa />} />
        <Route path="/login" element={<Login />} />
        <Route path="/table" element={<ListaPessoa />} />
        <Route path="/rifa/:rifaId?" element={<Rifa />} />
        <Route path="/botoes" element={<Botoes />} />
        <Route path="/home/:formType?/:rifaId?" element={<RifaForm />} />
        <Route path="/:cpf?" element={<RifaList />} />
        <Route path="/index" element={<Home />} />
      </Routes>

      {/* O useLocation precisa estar dentro do Router */}
      <NavBarWrapper />
    </Router>
  );
};

const NavBarWrapper = () => {
  const location = useLocation();
  const noNavBarRoutes = ["/login", "/index"];

  return !noNavBarRoutes.includes(location.pathname) ? <BottomNavBar /> : null;
};

export default AppRouter;
