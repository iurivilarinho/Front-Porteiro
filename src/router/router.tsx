import BottomNavBar from "@/components/navBar";
import Botoes from "@/pages/botoes";
import Login from "@/pages/login/login";
import { ListaPessoa } from "@/pages/pessoa/components/pessoaLista";
import Pessoa from "@/pages/pessoa/pessoa";
import Rifa from "@/pages/rifa/rifa";
import RifaForm from "@/pages/rifa/rifaForm";
import UserForm from "@/pages/usuario/usuarioForm";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pessoa/:formType?/:userId?" element={<Pessoa />} />
        <Route path="/login" element={<Login />} />
        <Route path="/table" element={<ListaPessoa />} />
        <Route path="/rifa" element={<Rifa />} />
        <Route path="/botoes" element={<Botoes />} />
        <Route path="/home" element={<RifaForm />} />
        <Route path="/user" element={<UserForm />} />
      </Routes>
      <BottomNavBar></BottomNavBar>
    </Router>
  );
};

export default AppRouter;
