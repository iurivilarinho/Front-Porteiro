import Botoes from "@/pages/botoes";
import Login from "@/pages/login/login";
import { ListaPessoa } from "@/pages/pessoa/components/pessoaLista";
import Pessoa from "@/pages/pessoa/pessoa";
import Rifa from "@/pages/rifa/rifa";
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
      </Routes>
    </Router>
  );
};

export default AppRouter;
